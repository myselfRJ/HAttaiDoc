import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Examination_Fields from '../components/examinationFields';
import PrescriptionHead from '../components/prescriptionHead';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {
  CONSTANT,
  giveFileName,
  handleCamera,
  handleGallery,
  pickSingleFile,
  showToast,
} from '../utility/const';
import Seperator from '../components/seperator';
import {ScrollView} from 'react-native-gesture-handler';
import {useState} from 'react';
import {HButton, InputText, PlusButton} from '../components';
import {commonstyles} from '../styles/commonstyle';
import {useSelector, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import GalleryModel from '../components/GalleryModal';
import ShowChip from '../components/showChip';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {URL, fileurl} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import {addExamination} from '../redux/features/prescription/prescriptionSlice';
import CustomModal from '../components/CustomModal';
import {
  RemoveKeyFromAsync,
  RetriveAsyncData,
  StoreAsyncData,
} from '../utility/AsyncStorage';
import {clearStorage} from '../utils/storage/storage';
const Physical = ({navigation}) => {
  const doc_prof = useSelector(state => state?.doctor_profile?.doctor_profile);
  const pediatrician =
    doc_prof?.specialization?.toLowerCase() === 'pediatrics' ? true : false;
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const vitalsDat = useSelector(state => state.prescription.vitalsData);
  const vitalsData =
    vitalsDat?.length > 0
      ? vitalsDat
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.vitals
      : {};
  const phys1 = CONSTANT.physicaldata1;
  const phys2 = CONSTANT.physicaldata2;
  const phys3 = CONSTANT.physicaldata3;
  const pediatric = [
    {
      label: 'Head',
      status: '',
      desc: '',
    },
  ];
  const [txtcolor, settxtcolor] = useState(false);
  const handlebuild = (data = []) => {
    if (vitalsData?.bmi !== '' && vitalsData?.bmi !== undefined) {
      const index = phys1.findIndex(item => item.label === 'Build');
      const editBuild = [...data];
      const updatedItem = {...editBuild[index]};
      const bmiInt = parseFloat(vitalsData?.bmi);
      if (bmiInt < 18) {
        updatedItem.status = 'A';
        updatedItem.desc = `Under Weight ${bmiInt?.toString()}`;
      } else if (bmiInt >= 18 && bmiInt <= 25) {
        updatedItem.status = 'N';
        updatedItem.desc = `Normal Weight ${bmiInt?.toString()}`;
      } else {
        updatedItem.status = 'A';
        updatedItem.desc = `Over Weight ${bmiInt?.toString()}`;
      }
      editBuild[index] = updatedItem;

      return editBuild;
    } else {
      return phys1;
    }
  };
  const [data1, setData1] = useState(
    pediatrician ? [] : handlebuild(JSON.parse(JSON.stringify([...phys1]))),
  );
  const [data2, setData2] = useState(
    pediatrician ? [] : JSON.parse(JSON.stringify([...phys2])),
  );
  const [data3, setData3] = useState(
    pediatrician
      ? JSON.parse(JSON.stringify([...pediatric]))
      : JSON.parse(JSON.stringify([...phys3])),
  );
  const physical = useSelector(state => state.prescription.physicalExamination);
  const handledata1 = (index, newStatus, newDesc) => {
    setData1(data1 => {
      const updatedData1 = [...data1];
      const updatedItem = {...updatedData1[index]};
      updatedItem.status = newStatus;
      updatedItem.desc = newDesc;
      updatedData1[index] = updatedItem;
      return updatedData1;
    });
  };
  const handledata2 = (index, newStatus, newDesc) => {
    setData2(data2 => {
      const updatedData1 = [...data2];
      const updatedItem = {...updatedData1[index]};
      updatedItem.status = newStatus;
      updatedItem.desc = newDesc;
      updatedData1[index] = updatedItem;
      return updatedData1;
    });
  };
  const handledata3 = (index, newStatus, newDesc) => {
    setData3(data3 => {
      const updatedData1 = [...data3];
      const updatedItem = {...updatedData1[index]};
      updatedItem.status = newStatus;
      updatedItem.desc = newDesc;
      updatedData1[index] = updatedItem;
      return updatedData1;
    });
  };
  const token = useSelector(state => state.authenticate.auth.access);
  const route = useRoute();
  const {examinationDetails} = route.params;
  const appointment_id = examinationDetails?.appointment_id;
  const [value, setValue] = useState();
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [uploaddocument, SetUploadDocument] = useState([]);
  const [report, setreport] = useState([]);
  // const [selectedFilename, setSelectedFilename] = useState([]);
  const [consent, setConsent] = useState(false);
  const [documents, setDocuments] = useState('');
  const postData = async url => {
    const formData = new FormData();
    formData.append('notes', 'Physical');
    formData.append('generalExamination', `${JSON.stringify(data1)}`);
    formData.append('piccle', `${JSON.stringify(data2)}`);
    formData.append('body_parts_examination', `${JSON.stringify(data3)}`);
    formData.append('doctor_phone_number', `${examinationDetails?.doc_phone}`);
    formData.append(
      'patient_phone_number',
      `${examinationDetails?.patient_phone}`,
    );
    formData.append('clinic_id', `${examinationDetails?.clinic_id}`);
    formData.append('appointment_id', `${examinationDetails?.appointment_id}`);
    for (let i = 0; i < uploaddocument.length; i++) {
      formData.append(`file${i + 1}`, {
        uri: `${uploaddocument[i]?.uri}`,
        type: `${uploaddocument[i]?.type}`,
        name: `${uploaddocument[i]?.name}`,
      });
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    try {
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();

      if (responseData?.status === 'success') {
        dispatch(
          addExamination([
            ...physical,
            {data: responseData?.data, appointment_id: appointmentID},
          ]),
        );
        showToast('success', 'Succesfully saved');

        setData1([]);
        setData2([]);
        setData3([]);
        navigation.goBack();
      } else {
        showToast('error', 'Something went wrong');
      }
    } catch (error) {
      showToast('error', `${error}`);
      console.error('Error:', error);
    }
  };
  const apiUrl = URL.uploadPhysicalExamination;

  const handle = () => {
    if (report != '') {
      navigation?.goBack();
    } else {
      postData(apiUrl);
      handlePress();
    }
  };

  const onImagePress = async () => {
    try {
      const data = await handleGallery();
      SetUploadDocument([
        ...uploaddocument,
        {
          name: data?.name,
          type: data?.type,
          uri: data?.uri,
        },
      ]);
    } catch (error) {
      console.error('Error capturing data:', error);
    }
    setModal(false);
  };

  const openCamera = async () => {
    try {
      const data = await handleCamera();
      SetUploadDocument([
        ...uploaddocument,
        {
          name: data?.name,
          type: data?.type,
          uri: data?.uri,
        },
      ]);
    } catch (error) {
      console.error('Error capturing data:', error);
    }
    setModal(false);
  };

  const handleSelectFilename = async () => {
    try {
      const file = await pickSingleFile();
      SetUploadDocument([
        ...uploaddocument,
        {name: file?.name, type: file?.type, uri: file?.uri},
      ]);
    } catch (error) {}
    setModal(!modal);
  };
  const dispatch = useDispatch();
  const handlePress = () => {
    const examinations = {
      general: JSON.stringify(data1),
      piccle: JSON.stringify(data2),
      body_parts: JSON.stringify(data3),
      documents: JSON.stringify(uploaddocument),
    };
    // dispatch(addExamination(examinations));
    setValue('');
  };
  const handleDelete = index => {
    if (uploaddocument?.length > 0) {
      const updatedfiles = uploaddocument?.filter((item, ind) => ind !== index);
      SetUploadDocument(updatedfiles);
    }
  };
  const handleAlert = () => {
    Alert.alert(
      'warning !',
      'Kindly obtain patient consent to capture their image before proceeding.',
      [
        {
          text: 'OK',
          onPress: () => {
            Alert.alert(
              'warning !',
              'Upload up to 5 files, each file size under 1MB',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    setModal(!modal);
                  },
                },
              ],
            );
          },
        },
      ],
    );
  };
  const handleModal = () => {
    setConsent(true);
    if (uploaddocument?.length >= 5) {
    } else {
      setModal(!modal);
    }
  };
  const fetchPhysical = async () => {
    const response = await fetchApi(
      URL.get_physical(examinationDetails?.appointment_id),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      const jsonData = await response.json();
      setValue(
        jsonData?.data?.notes === undefined ? '' : jsonData?.data?.notes,
      );
      setDocuments(jsonData?.data);
      try {
        const general = JSON.parse(jsonData?.data?.generalExamination);
        setData1(general);
        setreport([...report, ...general]);
        const piccle = JSON.parse(jsonData?.data?.piccle);
        setData2(piccle);
        setreport([...report, ...piccle]);
        const bodyParts = JSON.parse(jsonData?.data?.body_parts_examination);
        setData3(bodyParts);
        setreport([...report, ...bodyParts]);
        dispatch(
          addExamination([
            ...physical,
            {data: jsonData?.data, appointment_id: appointmentID},
          ]),
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error('API call failed:', response.status, response);
    }
  };

  const report_findings = [
    {name: documents?.file1 ? documents?.file1 : null},
    {name: documents?.file2 ? documents?.file2 : null},
    {name: documents?.file3 ? documents?.file3 : null},
    {name: documents?.file4 ? documents?.file4 : null},
    {name: documents?.file5 ? documents?.file5 : null},
  ];
  const handleReports_Physical = filepath => {
    const path = `${fileurl}${filepath}`;
    if (filepath?.includes('pdf')) {
      navigation.navigate('pdfhistory', {path});
    } else {
      navigation.navigate('img', {path});
    }
  };

  const handleNewField = () => {
    if (value.trim() !== '') {
      const newdata = [...data3, {label: value, status: '', desc: ''}];
      setData3(newdata);
      const datatostore = data3?.map(item => ({
        label: item?.label,
        status: '',
        desc: '',
      }));
      StoreAsyncData(`physicaldata${examinationDetails?.doc_phone}`, {
        data1: pediatrician
          ? []
          : JSON.parse(JSON.stringify([...CONSTANT.physicaldata1])),
        data2: pediatrician
          ? []
          : JSON.parse(JSON.stringify([...CONSTANT.physicaldata2])),
        data3: JSON.parse(
          JSON.stringify([
            ...datatostore,
            {label: value, status: '', desc: ''},
          ]),
        ),
      });
    }
    setValue('');
  };
  const handleAsync = () => {
    // RemoveKeyFromAsync(`physicaldata${examinationDetails?.doc_phone}`);
    RetriveAsyncData(`physicaldata${examinationDetails?.doc_phone}`).then(
      array => {
        if (array) {
          const acneInc =
            array?.data2?.some(item => item?.label === 'Acne') &&
            array?.data2?.some(item => item?.label === 'Hirsutism');
          const removedElements = array?.data2.splice(-2, 2);
          const addto1 = array?.data1.concat(removedElements);
          if (vitalsData?.bmi !== '') {
            if (acneInc) {
              setData1(pediatrician ? [] : handlebuild([...addto1]));
            } else {
              setData1(pediatrician ? [] : handlebuild([...array?.data1]));
            }
          } else {
            if (acneInc) {
              setData1(pediatrician ? [] : addto1);
            } else {
              setData1(pediatrician ? [] : array?.data1);
            }
          }
          setData2(array?.data2);
          setData3(array?.data3);
        }
      },
    );
  };
  useEffect(() => {
    fetchPhysical();
    handleAsync();
  }, []);
  const handleOnpress = ind => {
    const updatedData3 = data3?.filter((_, index) => ind !== index);
    StoreAsyncData(`physicaldata${examinationDetails?.doc_phone}`, {
      data1: pediatrician
        ? []
        : JSON.parse(JSON.stringify([...CONSTANT.physicaldata1])),
      data2: pediatrician
        ? []
        : JSON.parse(JSON.stringify([...CONSTANT.physicaldata2])),
      data3: JSON.parse(
        JSON.stringify(
          updatedData3?.map(item => ({
            label: item?.label,
            status: '',
            desc: '',
          })),
        ),
      ),
    });
    setData3(updatedData3);
  };
  return (
    <View style={styles.main}>
      <ScrollView
        contentContainerStyle={{
          gap: moderateScale(32),
          paddingVertical: verticalScale(12),
        }}>
        <View>
          <PrescriptionHead heading={'Physical Examination'} />
          <Text style={styles.subText}>{' (N-Normal / A-abnormal)'}</Text>
        </View>
        {data1?.length > 0 && (
          <View style={styles.fields}>
            {data1?.map(
              (item, index) =>
                item?.label && (
                  <Examination_Fields
                    check={'present'}
                    key={index}
                    label={item?.label}
                    value={item?.desc}
                    option={item?.status}
                    setOption={value => handledata1(index, value, item?.desc)}
                    setvalue={value => handledata1(index, item?.status, value)}
                    txt={txtcolor}
                  />
                ),
            )}
          </View>
        )}
        {data2?.length > 0 && (
          <View style={styles.fields}>
            {data2?.map(
              (item, index) =>
                item?.label && (
                  <Examination_Fields
                    check={'yes'}
                    key={index}
                    label={item?.label}
                    value={item?.desc}
                    option={item?.status}
                    setOption={value => handledata2(index, value, item?.desc)}
                    setvalue={value => handledata2(index, item?.status, value)}
                  />
                ),
            )}
          </View>
        )}
        <View
          style={
            pediatrician
              ? {...styles.fields, flexDirection: 'column'}
              : {...styles.fields}
          }>
          {data3?.map(
            (item, index) =>
              item?.label &&
              (pediatrician ? (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: '90%'}}>
                    <Examination_Fields
                      label={item?.label}
                      value={item?.desc}
                      option={item?.status}
                      setOption={value => handledata3(index, value, item?.desc)}
                      setvalue={value =>
                        handledata3(index, item?.status, value)
                      }
                    />
                  </View>
                  {data3?.length > 1 && (
                    <TouchableOpacity
                      onPress={() => handleOnpress(index)}
                      style={{
                        padding: moderateScale(16),
                        borderRadius: 100,
                        backgroundColor: CUSTOMCOLOR.white,
                      }}>
                      <Icon name="close" color={'red'} size={18} />
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <Examination_Fields
                  key={index}
                  label={item?.label}
                  value={item?.desc}
                  option={item?.status}
                  setOption={value => handledata3(index, value, item?.desc)}
                  setvalue={value => handledata3(index, item?.status, value)}
                />
              )),
          )}
        </View>
        <View>
          {/* <InputText
            label={'Others'}
            lbltext={commonstyles.subhead}
            value={value}
            setValue={setValue}
            multiline={true}
            placeholder={'Write Your Notes.......'}
            textStyle={{
              height: moderateScale(200),
              textAlignVertical: 'top',
              color: CUSTOMCOLOR.black,
              fontWeight: '700',
            }}
          /> */}
          <HButton
            type="addtype"
            label={'Add'}
            icon="plus"
            onPress={() => {
              setShow(!show);
            }}
            btnstyles={{
              // backgroundColor:
              //   medicine && timing && frequency
              //     ? CUSTOMCOLOR.success
              //     : CUSTOMCOLOR.disable,
              alignSelf: 'flex-start',
            }}
          />
          {show && (
            <CustomModal visible={show} Close={setShow}>
              <View style={{backgroundColor: CUSTOMCOLOR.white}}>
                <InputText
                  label={'Organ Name:'}
                  required={true}
                  value={value}
                  setValue={setValue}
                  placeholder={'Enter Organ Name'}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: moderateScale(24),
                }}>
                <HButton
                  //   loading={loading}
                  label={'save'}
                  onPress={() => {
                    handleNewField();
                    setShow(!show);
                  }}
                />
              </View>
            </CustomModal>
          )}
          {/* <Text style={styles.note}>
            <Text style={[styles.note, {color: '#ffc9c9'}]}>NOTE: </Text>Upload
            up to 5 files, each file size under 5MB
          </Text> */}
        </View>
        {report?.length === 0 ? (
          uploaddocument?.length > 0 ? (
            <View style={{marginTop: verticalScale(16)}}>
              {uploaddocument?.map(
                (item, index) =>
                  item?.name !== undefined && (
                    <ShowChip
                      key={index}
                      onPress={() => handleDelete(index)}
                      text={
                        <>
                          <Icon
                            color={CUSTOMCOLOR.error}
                            size={moderateScale(20)}
                            name={
                              item?.type === 'application/pdf'
                                ? 'file-pdf-box'
                                : 'image'
                            }
                          />{' '}
                          {item?.name?.includes('temp')
                            ? item?.name?.split('temp_')[1]?.toString()
                            : item?.name}
                        </>
                      }
                      main={{marginHorizontal: 0}}
                    />
                  ),
              )}
            </View>
          ) : null
        ) : report_findings?.length > 0 ? (
          <View style={{marginTop: verticalScale(16)}}>
            {report_findings?.map(
              (item, index) =>
                item?.name !== null && (
                  <TouchableOpacity key={index}>
                    <ShowChip
                      onNav={() => handleReports_Physical(item?.name)}
                      edit={() => handleReports_Physical(item?.name)}
                      key={index}
                      text={
                        <>
                          <Icon
                            color={CUSTOMCOLOR.error}
                            size={moderateScale(20)}
                            name={
                              item?.name?.includes('pdf')
                                ? 'file-pdf-box'
                                : 'image'
                            }
                          />{' '}
                          {giveFileName(item?.name)}
                        </>
                      }
                      main={{marginHorizontal: 0}}
                    />
                  </TouchableOpacity>
                ),
            )}
          </View>
        ) : null}
        {/* <View
          //   onPress={() => setConsent(!consent)}
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: horizontalScale(4),
          }}>
          <Icon
            name={'information-outline'}
            color={CUSTOMCOLOR.disable}
            size={moderateScale(20)}></Icon>
          <Text style={{fontSize: CUSTOMFONTSIZE.h4}}>
            Please Take the consent from Patient
          </Text>
        </View> */}
        <PlusButton
          size={moderateScale(40)}
          style={{
            alignSelf: 'flex-end',
            // marginTop: verticalScale(16),
            backgroundColor:
              uploaddocument?.length === 5 || report?.length > 0
                ? CUSTOMCOLOR.disable
                : CUSTOMCOLOR.primary,
          }}
          icon={'file-document-outline'}
          onPress={() => {
            if (report != '') {
              setModal(false);
            } else {
              if (uploaddocument?.length === 0) {
                handleAlert();
              } else {
                handleModal();
              }
            }
          }}
        />
        {modal && (
          <GalleryModel
            visible={modal}
            Close={setModal}
            OnGallery={onImagePress}
            OnCamera={openCamera}
            document={true}
            onDocument={handleSelectFilename}
          />
        )}
      </ScrollView>
      <View>
        <HButton
          btnstyles={commonstyles.activebtn}
          onPress={handle}
          label={'Save'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    backgroundColor: CUSTOMCOLOR.background,
  },
  subText: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h3,
  },
  fields: {
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: verticalScale(16),
    borderColor: CUSTOMCOLOR.primary,
    shadowColor: CUSTOMCOLOR.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
  note: {
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: 400,
    color: '#C2C2C2',
  },
});
export default Physical;

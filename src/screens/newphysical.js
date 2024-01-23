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
const Physical = ({navigation}) => {
  const [data1, setData1] = useState([
    {
      label: 'Consciousness',
      status: '',
      desc: '',
    },
    {
      label: 'orientation',
      status: '',
      desc: '',
    },
    {
      label: 'Build',
      status: '',
      desc: '',
    },
    {
      label: 'Nutrition',
      status: '',
      desc: '',
    },
    {
      label: 'Hydration',
      status: '',
      desc: '',
    },
  ]);
  const [data2, setData2] = useState([
    {
      label: 'Pallor',
      status: '',
      desc: '',
    },
    {
      label: 'Icterus',
      status: '',
      desc: '',
    },
    {
      label: 'Cynosis',
      status: '',
      desc: '',
    },
    {
      label: 'Clubbing',
      status: '',
      desc: '',
    },
    {
      label: 'Lymphadenopathy',
      status: '',
      desc: '',
    },
    {
      label: 'Edema',
      status: '',
      desc: '',
    },
  ]);
  const [data3, setData3] = useState([
    {
      label: 'Acne',
      status: '',
      desc: '',
    },
    {
      label: 'Hirsutism',
      status: '',
      desc: '',
    },
    {
      label: 'HEENT',
      status: '',
      desc: '',
    },
    {
      label: 'Breast',
      status: '',
      desc: '',
    },
    {
      label: 'Thyroid',
      status: '',
      desc: '',
    },
    {
      label: 'C.V.S',
      status: '',
      desc: '',
    },
    {
      label: 'RS',
      status: '',
      desc: '',
    },
    {
      label: 'CNS',
      status: '',
      desc: '',
    },
    {
      label: 'P/A',
      status: '',
      desc: '',
    },
    {
      label: 'P/V',
      status: '',
      desc: '',
    },
    {
      label: 'Speculam',
      status: '',
      desc: '',
    },
  ]);

  const handledata1 = (index, newstatus, newdesc) => {
    const newdata1 = [...data1];
    newdata1[index].status = newstatus;
    newdata1[index].desc = newdesc;
    setData1(newdata1);
  };
  const handledata2 = (index, newstatus, newdesc) => {
    const newdata2 = [...data2];
    newdata2[index].status = newstatus;
    newdata2[index].desc = newdesc;
    setData2(newdata2);
  };
  const handledata3 = (index, newstatus, newdesc) => {
    const newdata3 = [...data3];
    newdata3[index].status = newstatus;
    newdata3[index].desc = newdesc;
    setData3(newdata3);
  };

  const token = useSelector(state => state.authenticate.auth.access);
  const route = useRoute();
  const {examinationDetails} = route.params;
  const appointment_id = examinationDetails?.appointment_id;
  console.log('appointment-id', appointment_id);
  const [value, setValue] = useState();
  const [modal, setModal] = useState(false);
  console.log('====================================');
  console.log('modal', modal);
  console.log('====================================');
  const [show, setShow] = useState(false);
  const [uploaddocument, SetUploadDocument] = useState([]);
  const [report, setreport] = useState('');
  // const [selectedFilename, setSelectedFilename] = useState([]);
  const [consent, setConsent] = useState(false);

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
      if (responseData) {
        showToast('success', 'Succesfully saved');
        navigation.goBack();
        console.log('API Response:', responseData);
        // const statusCosent = await fetch(URL.consent, {
        //   method: 'POST',
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     status: consent,
        //     doctor_phone_number: examinationDetails?.doc_phone,
        //     patient_phone_number: examinationDetails?.patient_phone,
        //     clinic_id: examinationDetails?.clinic_id,
        //     appointment_id: examinationDetails?.appointment_id,
        //   }),
        // });
        // const json = await statusCosent.json();
        // console.log(json);
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
      if (consent) {
        postData(apiUrl);
        handlePress();
      } else {
        showToast('error', 'Please take Declaration from Patient');
      }
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
    dispatch(addExamination(examinations));
    setValue('');
  };
  const handleDelete = index => {
    if (uploaddocument?.length > 0) {
      const updatedfiles = uploaddocument?.filter((item, ind) => ind !== index);
      SetUploadDocument(updatedfiles);
    }
  };
  const handleAlert = () => {
    Alert.alert('warning', 'Kindly obtain patient consent before proceeding', [
      {
        text: 'OK',
        onPress: () => {
          Alert.alert(
            'warning',
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
    ]);
  };
  const handleModal = () => {
    setConsent(true);
    if (uploaddocument?.length >= 5) {
    } else {
      setModal(!modal);
    }
  };

  const fetchPhysical = async () => {
    const response = await fetchApi(URL.get_physical(appointment_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setValue(
        jsonData?.data?.notes === undefined ? '' : jsonData?.data?.notes,
      );
      const general = JSON.parse(jsonData?.data?.generalExamination);
      setData1(general);
      const piccle = JSON.parse(jsonData?.data?.piccle);
      setData2(piccle);
      const bodyParts = JSON.parse(jsonData?.data?.body_parts_examination);
      setData3(bodyParts);
      //   const value =
      //     jsonData?.data?.notes === undefined ? '' : jsonData?.data?.notes;
      //   dispatch(addExamination({value: value}));
      setreport(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchPhysical();
  }, []);
  const report_findings = [
    {name: report?.file1 ? report?.file1 : null},
    {name: report?.file2 ? report?.file2 : null},
    {name: report?.file3 ? report?.file3 : null},
    {name: report?.file4 ? report?.file4 : null},
    {name: report?.file5 ? report?.file5 : null},
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
    }
    setValue('');
  };
  console.log('====================================');
  console.log('report', report);
  console.log('====================================');
  return (
    <View style={styles.main}>
      <ScrollView
        contentContainerStyle={{
          gap: moderateScale(32),
          paddingVertical: verticalScale(12),
        }}>
        <View>
          <PrescriptionHead heading={'Physical Examination'} />
          <Text style={styles.subText}>
            {'General Examination (N-Normal / A-abnormal)'}
          </Text>
        </View>
        <View style={styles.fields}>
          {data1?.map(
            (item, index) =>
              item?.label && (
                <Examination_Fields
                  key={index}
                  label={item?.label}
                  value={item?.desc}
                  option={item?.status}
                  setOption={value => handledata1(index, value, item?.desc)}
                  setvalue={value => handledata1(index, item?.status, value)}
                />
              ),
          )}
        </View>
        <View style={styles.fields}>
          {data2?.map(
            (item, index) =>
              item?.label && (
                <Examination_Fields
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
        <View style={styles.fields}>
          {data3?.map(
            (item, index) =>
              item?.label && (
                <Examination_Fields
                  key={index}
                  label={item?.label}
                  value={item?.desc}
                  option={item?.status}
                  setOption={value => handledata3(index, value, item?.desc)}
                  setvalue={value => handledata3(index, item?.status, value)}
                />
              ),
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
        {!report ? (
          uploaddocument?.length > 0 ? (
            <View style={{marginTop: verticalScale(16)}}>
              {uploaddocument?.map((item, index) => (
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
              ))}
            </View>
          ) : null
        ) : report_findings?.length > 0 ? (
          <View style={{marginTop: verticalScale(16)}}>
            {report_findings?.map(
              (item, index) =>
                item?.name !== null && (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleReports_Physical(item?.name)}>
                    <ShowChip
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
                          {item?.name}
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
              uploaddocument?.length === 5 || report != ''
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

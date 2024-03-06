import React, {useState, useCallback, useEffect} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utility/scaleDimension';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import SelectorBtn from '../components/selector';
import {useFocusEffect} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import GalleryModel from '../components/GalleryModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker, {types} from 'react-native-document-picker';
import InputText from '../components/inputext';
import HButton from '../components/button';
import {URL} from '../utility/urls';
import {useDispatch, useSelector} from 'react-redux';
import ShowChip from '../components/showChip';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {fileurl} from '../utility/urls';
import {giveFileName, pickSingleFile} from '../utility/const';
import {addAdult} from '../redux/features/prescription/adult';
const Adult = ({route, navigation}) => {
  const dispatch = useDispatch();
  const status = ['Up to date', 'Pending Vaccination', 'Covid Vaccine'];
  const {type, phone} = route.params;

  const adultdat = useSelector(state => state?.adult?.adult);
  const adultData =
    adultdat?.length > 0
      ? adultdat?.filter(item => item?.patient_phone === phone)?.slice(-1)?.[0]
      : {};

  const [selectedStatus, setSelectedStatus] = useState('');
  const [search, setsearch] = useState('');
  const datee = new Date();
  const [value, setvalue] = useState('');
  const [open, setOpen] = useState(false);
  const [show, setshow] = useState(false);
  const [visible, setvisible] = useState(false);
  const [document, setdocument] = useState([]);
  const [document1, setdocument1] = useState('');
  const token = useSelector(state => state.authenticate.auth.access);

  const [upToVaccineName, setUpToVaccineName] = useState('');
  const uptodate = new Date();
  const [updateValue, setUpDateValue] = useState('');
  const [dateOpen, setDateOpen] = useState(false);
  const [batch, setBatch] = useState('');
  const [upToData, setUpToData] = useState([]);
  const remove = index => {
    const filteredArray = [...document];
    filteredArray.splice(0, 1);
    setdocument(filteredArray);
    setshow(!show);
  };
  const pickDocument = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
      });
      const newDocuments = response.map(doc => ({
        uri: doc?.uri,
        type: doc?.type,
        name: doc?.name,
      }));

      setdocument(prevDocuments => [...prevDocuments, ...newDocuments]);
    } catch (err) {
      console.warn(err);
    }

    setshow(!show);
    setvisible(false);
  }, []);

  const handleSelectFilename = async () => {
    try {
      const file = await pickSingleFile();
      setdocument([
        ...document,
        {name: file?.name, type: file?.type, uri: file?.uri},
      ]);
    } catch (error) {}
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        setdocument([
          ...document,
          {
            uri: response.assets?.[0]?.uri,
            type: response.assets?.[0]?.type,
            name: response.assets?.[0]?.fileName,
          },
        ]);
      }
    });
    setshow(!show);
    setvisible(false);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        // console.log(response)
        // if (selectedStatus === 'Up to date') {
        setdocument([
          ...document,
          {
            name: response.assets?.[0]?.fileName,
            uri: response.assets?.[0]?.uri,
            type: response.assets?.[0]?.type,
          },
        ]);
      }
    });
    setshow(!show);
    setvisible(false);
  };

  const UploadVaccination = async () => {
    const formData = new FormData();
    formData.append('typeofVaccination', `${type}`);
    formData.append('patient_phone_number', `${phone}`);
    formData.append('status', `${selectedStatus}`);
    formData.append('date', `${value}`);
    formData.append('name', `${search}`);
    formData.append('vaccinationDetails', `${JSON.stringify(upToData)}`);
    for (let i = 0; i < document.length; i++) {
      formData.append(`file${i + 1}`, {
        uri: `${document[i]?.uri}`,
        type: `${document[i]?.type}`,
        name: `${document[i]?.name}`,
      });
    }

    try {
      const response = await fetch(URL.uploadVaccination, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const responsedata = await response.json();
      if (responsedata) {
        // console.log('API Response:', responsedata);
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
  };
  // const fetchUploadReport = async url => {
  //   const response = await fetch(`${fileurl}${url}`);
  //   const blob = await response.blob();
  //   return blob;
  // };
  // console.log('====================================');
  // console.log(
  //   fetchUploadReport(
  //     `${fileurl}/media/uploads/vaccination/sample_PzD3eLI.pdf`,
  //   ),
  // );

  // const fetchData = async () => {
  //   const response = await fetch(URL.GetVaccination(phone), {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   if (response.ok) {
  //     const jsonData = await response.json();
  //     if (jsonData?.data && jsonData?.data?.length > 0) {
  //       const latestData = jsonData?.data?.reduce((latest, current) => {
  //         return new Date(current.updated_at) > new Date(latest.updated_at)
  //           ? current
  //           : latest;
  //       }, jsonData?.data[0]);
  //       const newdata = JSON.parse(latestData?.vaccinationDetails);
  //       console.log('====================================');
  //       console.log('==============', newdata, '=============');
  //       console.log('====================================');
  //       setUpToData(newdata !== null && newdata !== undefined ? newdata : []);
  //       dispatch(addAdult({data: latestData, uptovaccination: newdata}));
  //     }
  //     setSelectedStatus(jsonData?.data[0]?.status);
  //     setsearch(jsonData?.data[0]?.name);
  //     setvalue(jsonData?.data[0]?.date);
  //     setdocument1(jsonData?.data[0]);
  //   }
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      if (adultData) {
        setUpToData(
          adultData?.uptovaccination !== null &&
            adultData?.uptovaccination !== undefined
            ? adultData?.uptovaccination
            : [],
        );
        setSelectedStatus(adultData?.data?.status);
        setsearch(
          adultData?.data?.name !== 'undefined' ? adultData?.data?.name : '',
        );
        setvalue(
          adultData?.data?.date !== 'undefined' ? adultData?.data?.date : '',
        );
        setdocument1(adultData?.data);
      }
    }, []),
  );

  const reportData = [
    {file: document1?.file1 ? document1?.file1 : ''},
    {file: document1?.file2 ? document1?.file2 : ''},
    {file: document1?.file3 ? document1?.file3 : ''},
    {file: document1?.file4 ? document1?.file4 : ''},
    {file: document1?.file5 ? document1?.file5 : ''},
  ]?.filter(item => item?.file !== '');

  const handleDelete = index => {
    if (document?.length > 0) {
      const updatedfiles = document?.filter((item, ind) => ind !== index);
      setdocument(updatedfiles);
      setshow(!show);
    }
  };
  const handleDeleteVaccine = index => {
    if (upToData?.length > 0) {
      const updatedData = upToData?.filter((item, ind) => ind !== index);
      setUpToData(updatedData);
    }
  };

  const handlevaccineReport = filepath => {
    const path = `${fileurl}${filepath}`;

    if (filepath?.includes('pdf')) {
      navigation.navigate('pdfhistory', {path});
    } else {
      navigation.navigate('img', {path});
    }
  };
  const HandleAddExistingVaccine = () => {
    if (upToVaccineName) {
      const newdata = [
        ...upToData,
        {vaccineName: upToVaccineName, date: updateValue, batch: batch},
      ];

      setUpToData(newdata);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: CUSTOMFONTSIZE.h1,
          color: CUSTOMCOLOR.black,
          fontWeight: '500',
        }}>
        {type}
      </Text>
      <View>
        <View
          style={{paddingVertical: verticalScale(15), gap: moderateScale(7)}}>
          <Text style={styles.label}>Vaccination Status</Text>
          <View style={{flexDirection: 'row', gap: moderateScale(10)}}>
            {status.map((item, index) => (
              <SelectorBtn
                key={index}
                input={item}
                select={{
                  backgroundColor:
                    item === selectedStatus
                      ? CUSTOMCOLOR.primary
                      : CUSTOMCOLOR.white,
                }}
                onPress={() => {
                  if (selectedStatus === item) {
                    setSelectedStatus('');
                  } else {
                    setSelectedStatus(item);
                  }
                }}
                int={{
                  color:
                    item === selectedStatus
                      ? CUSTOMCOLOR.white
                      : CUSTOMCOLOR.primary,
                }}
                inputstyle={{
                  color:
                    item === selectedStatus
                      ? CUSTOMCOLOR.white
                      : CUSTOMCOLOR.primary,
                }}
              />
            ))}
          </View>
        </View>
        {selectedStatus === 'Up to date' && (
          <View style={{gap: moderateScale(16)}}>
            <InputText
              label={'Vaccination Name'}
              placeholder="Vaccination Name"
              placeholderTextColor={CUSTOMCOLOR.background}
              value={upToVaccineName}
              setValue={setUpToVaccineName}
            />
            <SelectorBtn
              label={'Select Date'}
              placeholder={'Date'}
              input={updateValue || 'Date'}
              // setValue={setUpDateValue}
              name={'calendar'}
              onPress={() => setDateOpen(true)}
            />
            <DatePicker
              modal
              open={dateOpen}
              date={uptodate}
              mode="date"
              onConfirm={date => {
                setDateOpen(false);
                setUpDateValue(date.toISOString().split('T')[0]);
              }}
              onCancel={() => {
                setDateOpen(false);
              }}
            />

            <InputText
              label={'Batch No'}
              placeholder="Enter Batch Number"
              placeholderTextColor={CUSTOMCOLOR.background}
              value={batch}
              setValue={setBatch}
            />
            <HButton
              type="addtype"
              label={'Add'}
              icon="plus"
              onPress={() => {
                HandleAddExistingVaccine();
                setUpToVaccineName('');
                setUpDateValue('');
                setBatch('');
              }}
              btnstyles={{
                // backgroundColor:
                //   medicine && timing && frequency
                //     ? CUSTOMCOLOR.success
                //     : CUSTOMCOLOR.disable,
                alignSelf: 'flex-start',
              }}
            />
            {upToData.length > 0 && (
              <View>
                {upToData?.map((item, ind) => (
                  <ShowChip
                    text={
                      <View style={styles.chipContain}>
                        <Text
                          style={[
                            styles.headText,
                            {
                              width: horizontalScale(200),
                              flexWrap: 'wrap',
                            },
                          ]}>
                          Vaccine Name:{' '}
                          <Text style={styles.subText}>
                            {item?.vaccineName}
                          </Text>
                        </Text>
                        <Text style={styles.headText}>
                          Issue Date:{' '}
                          <Text style={styles.subText}>{item?.date}</Text>
                        </Text>
                        <Text style={styles.headText}>
                          Batch no:{' '}
                          <Text style={styles.subText}>{item?.batch}</Text>
                        </Text>
                      </View>
                    }
                    onPress={() => handleDeleteVaccine(ind)}
                  />
                ))}
              </View>
            )}
          </View>
        )}
        {selectedStatus === 'Pending Vaccination' && (
          <View style={{gap: moderateScale(16)}}>
            <View style={{gap: moderateScale(8)}}>
              <InputText
                label={'Vaccination Name'}
                placeholder="Vaccination Name"
                placeholderTextColor={CUSTOMCOLOR.background}
                value={search}
                setValue={setsearch}
              />
              <SelectorBtn
                label={'Select Date'}
                placeholder={'Date'}
                input={value || 'Date'}
                setValue={setvalue}
                name={'calendar'}
                onPress={() => setOpen(true)}
              />
              <DatePicker
                modal
                open={open}
                date={datee}
                mode="date"
                onConfirm={date => {
                  setOpen(false);
                  setvalue(date.toISOString().split('T')[0]);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
          </View>
        )}

        {selectedStatus === 'Covid Vaccine' && (
          <View style={{gap: moderateScale(12)}}>
            {reportData?.length <= 0 ? (
              <SelectorBtn
                select={{alignSelf: 'flex-start'}}
                label={'Upload Covid Vaccination Document'}
                // required={true}
                input={'Select Document'}
                onPress={() => handleSelectFilename()}
              />
            ) : (
              ''
            )}

            {document.length > 0 &&
              document.map(
                (item, ind) =>
                  item?.name !== undefined && (
                    <TouchableOpacity
                      // onPress={() => handlevaccineReport(item?.uri)}
                      style={{top: verticalScale(18)}}>
                      <ShowChip
                        iconcolor={CUSTOMCOLOR.delete}
                        key={ind}
                        main={{
                          gap: 4,
                          paddingHorizontal: 8,
                          borderColor: CUSTOMCOLOR.primary,
                        }}
                        nameIcon={
                          item?.type === 'application/pdf'
                            ? 'file-pdf-box'
                            : 'image'
                        }
                        onPress={() => handleDelete(ind)}
                        color={CUSTOMCOLOR.delete}
                        text={item?.name}
                      />
                    </TouchableOpacity>
                  ),
              )}

            {reportData?.length > 0 &&
              reportData?.map(
                (item, ind) =>
                  item?.file !== '' && (
                    <View style={{top: verticalScale(18)}}>
                      <ShowChip
                        key={ind}
                        onNav={() => handlevaccineReport(item?.file)}
                        edit={() => handlevaccineReport(item?.file)}
                        iconcolor={CUSTOMCOLOR.delete}
                        main={{
                          gap: 4,
                          paddingHorizontal: 8,
                          borderColor: CUSTOMCOLOR.primary,
                        }}
                        nameIcon={
                          item?.file?.includes('pdf') ? 'file-pdf-box' : 'image'
                        }
                        // onPress={() => handleDelete(ind)}
                        color={CUSTOMCOLOR.delete}
                        text={giveFileName(item?.file)}
                      />
                    </View>
                  ),
              )}
          </View>
        )}
        {/* )} */}
      </View>
      {visible && (
        <GalleryModel
          Close={setvisible}
          visible={visible}
          OnGallery={openImagePicker}
          OnCamera={handleCameraLaunch}
          onDocument={pickDocument}
          document={true}
        />
      )}
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <HButton
          label={'Save'}
          btnstyles={{alignSelf: 'center'}}
          onPress={() => {
            UploadVaccination();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CUSTOMCOLOR.white,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    flex: 1,
  },
  label: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h3,
  },
  chipContain: {
    flexDirection: 'row',
    gap: horizontalScale(64),
    alignItems: 'center',
  },
  headText: {
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: '600',
    color: CUSTOMCOLOR.primary,
  },
  subText: {
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: '600',
    color: CUSTOMCOLOR.black,
  },
});

export default Adult;

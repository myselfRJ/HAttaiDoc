import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {useSelector, useDispatch} from 'react-redux';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {
  UpdateDoctorRefer,
  addDoctorRefer,
} from '../redux/features/prescription/prescriptionSlice';
import {useNavigation} from '@react-navigation/native';
import {HButton, InputText, PlusButton, SelectorBtn} from '../components';
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '../utility/scaleDimension';
import PrescriptionHead from '../components/prescriptionHead';
import {CONSTANTS} from '../utility/constant';
import ShowChip from '../components/showChip';
import {commonstyles} from '../styles/commonstyle';
import {ScrollView} from 'react-native-gesture-handler';
import GalleryModel from '../components/GalleryModal';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {useRoute} from '@react-navigation/native';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {PermmisionStorage} from '../utility/permissions';
import {
  StoreAsyncData,
  UpdateAsyncData,
  RetriveAsyncData,
} from '../utility/AsyncStorage';

const ReferToDoctor = () => {
  const route = useRoute();
  const {patient_details} = route.params;
  const nav = useNavigation();
  const doctor = useSelector(state => state?.prescription?.selectedDoctor);
  const [sug, setSug] = useState([]);
  const [selected, setSelected] = useState('');
  const [name, setName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [dr_name, setDr_Name] = useState('');
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [loadind, setLoading] = useState(false);
  const [prevLoad, setPrevLoad] = useState(false);
  const [data, setData] = useState();
  const token = useSelector(state => state.authenticate.auth.access);

  const fetchDoctor = async () => {
    const response = await fetchApi(
      URL.getPractitionerByNumber(patient_details?.doc_phone),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      const jsonData = await response.json();
      setData(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchDoctor();
  }, []);
  const contact = `${name} ${phone}`;
  const createPDF = async () => {
    if (await PermmisionStorage()) {
      let options = {
        //Content to print
        html: `<!DOCTYPE html>
        <html>
        <head>
            <title>Doctor Referral</title>
        </head>
        <body>
            <header style="text-align: center; background-color: #4ba5fa; color: #fff; padding: 20px; margin: 0;">
                <h1 style="margin: 0;">Doctor Referral</h1>
            </header>
            
            <section id="referral-details" style="padding: 20px; margin: 0;">
                <h2 style="margin: 0;">Referral Details</h2>
                <p style="margin: 0;">Referring Doctor:${data?.doctor_name}</p>
                <p style="margin: 0;">Date: ${new Date().toString()}</p>
            </section>
            
            <section id="patient-details" style="padding: 20px; background-color: #f5f5f5; margin: 0;">
                <h2 style="margin: 0;">Patient Details</h2>
                <p style="margin: 0;">Patient Name: ${patient_details?.name}</p>
                <p style="margin: 0;">Age: ${patient_details?.age}</p>
                <p style="margin: 0;">Phone: ${
                  patient_details?.patient_phone
                }</p>
            </section>
            
            <section id="referred-doctor" style="padding: 20px; margin: 0;">
                <h2 style="margin: 0;">Referred Doctor</h2>
                <p style="margin: 0;">Referred Doctor: Dr. ${
                  selected === 'Clinic' || selected === 'Hospital'
                    ? dr_name
                    : name
                }</p>
                <p style="margin: 0;">Speciality:${speciality} </p>
                <p style="margin: 0;">Contact Information:${
                  selected === 'Clinic' || selected === 'Hospital'
                    ? `${name} , ${phone}`
                    : phone
                } </p>
            </section>
            
            <section id="additional-notes" style="padding: 20px; margin: 0;">
                <h2 style="margin: 0;">Referral Notes</h2>
                <p style="margin: 0;">${notes}</p>
            </section>
        
            <footer style="text-align: left; ; color: #000; padding: 10px; margin-top:140px;">
                
                
                <p style="text-align: center;margin: 36px;">For questions or more information, please contact Dr. ${
                  data?.doctor_name
                } ,  ${data?.doctor_phone_number}.</p>
                <p style="margin: 0;text-align: center">powered by</p>
                <div  style="display: flex; justify-content: center; align-items: center;">
                <img style="height: 50px;width:120px" src="${
                  CONSTANTS.pdf_footer
                }" style="float: center; margin-right: 10px;margin-top: 36px" alt="Image Description">
                </div>
            </footer>
        </body>
        </html>
        
        `,
        //File Name
        fileName: 'refer',
        //File directory
        directory: 'refer',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
      setFilePath(file.filePath);
      // handle();
    }
  };

  const postData = async url => {
    const formData = new FormData();
    formData.append('doctor_phone_number', `${data?.doctor_phone_number}`);
    formData.append(
      'patient_phone_number',
      `${patient_details?.patient_phone}`,
    );
    formData.append('clinic_id', `${patient_details?.clinic_id}`);
    formData.append('appointment_id', `${patient_details?.appointment_id}`);
    formData.append('file_referral', {
      uri: `file:///storage/emulated/0/Android/data/com.hattaidoc/files/refer/refer.pdf`,
      type: 'application/pdf',
      name: `${patient_details?.patient_phone}referal.pdf`,
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    try {
      setLoading(true);
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      if (responseData) {
        console.log('API Response:', responseData);
        handleAddDoctors();
        Alert.alert('', 'Successfully Shared to Patient');
        setLoading(false);
        nav.goBack();
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('', 'Something went Wrong');
      setLoading(false);
    }
  };
  const apiUrl = URL.refer_doc_pdf;

  const handleAddDoctors = () => {
    selected && name && speciality
      ? (dispatch(
          addDoctorRefer([
            ...doctor,
            {
              refer_to: selected,
              dr_name: dr_name ? dr_name : null,
              doctor_or_name: name,
              speciality: speciality,
              phone: phone,
              notes: notes,
            },
          ]),
        ),
        setName(''),
        setSpeciality(''),
        setPhone(''),
        setSelected(''),
        setNotes(''),
        setDr_Name(''))
      : null;
    // nav.goBack();
  };

  const handleSelect = val => {
    setSelected(val);
    setName('');
    setSpeciality('');
    setPhone('');
    // setSelected('');
    setNotes('');
    setDr_Name('');
  };
  const handleDelete = index => {
    if (doctor) {
      const updatedDoctor = doctor?.filter((item, ind) => ind !== index);

      dispatch(UpdateDoctorRefer(updatedDoctor));
    }
  };
  const onPress = () => {
    setModal(!modal);
  };
  const HandlePress = val => {
    setSpeciality(val);
    setShow(!show);
  };

  const handlePreview = async () => {
    handleAddDoctors();
    if (sug?.length === 0 || !sug) {
      StoreAsyncData('referals', [
        {
          refer_to: selected,
          dr_name: dr_name ? dr_name : null,
          doctor_or_name: name,
          speciality: speciality,
          phone: phone,
          notes: notes,
        },
      ]);
    } else {
      UpdateAsyncData('referals', {
        refer_to: selected,
        dr_name: dr_name ? dr_name : null,
        doctor_or_name: name,
        speciality: speciality,
        phone: phone,
        notes: notes,
      });
    }
    setPrevLoad(true);
    const doc_phone = data?.doctor_phone_number;
    const appointment_id = patient_details?.appointment_id;
    const patient_phone = patient_details?.patient_phone;
    const prevScreen = 'refer';
    const path =
      'file:///storage/emulated/0/Android/data/com.hattaidoc/files/refer/refer.pdf';
    createPDF();
    if (await PermmisionStorage()) {
      setTimeout(() => {
        nav.navigate('pdf', {
          path,
          doc_phone,
          appointment_id,
          patient_phone,
          prevScreen,
        });
        // handleAddDoctors();
        setPrevLoad(false);
      }, 1500);
    }
  };
  useEffect(() => {
    // clearStorage()
    RetriveAsyncData('referals')
      .then(array => {
        if (array?.length > 5) {
          array?.splice(5);
          setSug(array);
        } else {
          setSug(array);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log('======>sug', sug);
  const handlePress = value => {
    setSelected(value?.refer_to);
    setName(value?.doctor_or_name);
    setDr_Name(value?.dr_name);
    setSpeciality(value?.speciality);
    setPhone(value?.phone);
    setNotes(value?.notes);
  };
  return (
    <View style={styles.main}>
      <ScrollView>
        <PrescriptionHead head={{padding: 0}} heading="Referral" />

        <View style={styles.container}>
          <Text style={styles.head}>Refer To </Text>
          <View style={styles.child}>
            {CONSTANTS?.ReferTypes.map((item, index) => (
              <SelectorBtn
                key={index}
                input={item}
                onPress={() => handleSelect(item)}
                select={{
                  backgroundColor:
                    selected === item ? CUSTOMCOLOR.primary : CUSTOMCOLOR.white,
                }}
                inputstyle={{
                  color:
                    selected === item ? CUSTOMCOLOR.white : CUSTOMCOLOR.primary,
                }}
              />
            ))}
          </View>
          <InputText
            label={
              selected === 'Doctor'
                ? 'Dr.Name'
                : selected === 'Clinic'
                ? ' Clinic Name'
                : 'Hospital Name'
            }
            placeholder={
              selected === 'Doctor'
                ? 'Enter Dr.Name'
                : selected === 'Clinic'
                ? 'Enter Clinic Name'
                : 'Enter Hospital Name'
            }
            inputContainer={{paddingHorizontal: 0}}
            value={name}
            setValue={val => setName(val)}
          />
          {selected === 'Clinic' || selected === 'Hospital' ? (
            <InputText
              label={'Dr.Name'}
              placeholder="Dr.Name"
              inputContainer={{paddingHorizontal: 0}}
              value={dr_name}
              setValue={val => setDr_Name(val)}
            />
          ) : null}
          {/* <InputText
          label={'Speciality'}
          placeholder="Speciality"
          value={speciality}
          inputContainer={{paddingHorizontal: 0}}
          setValue={val => setSpeciality(val)}
        /> */}
          <View>
            <SelectorBtn
              onPress={() => setShow(!show)}
              label={'Specialization'}
              input={
                speciality?.length > 0 ? speciality : 'Select Specialization'
              }
              name={'chevron-down'}
            />
            {show && (
              <View
                style={[
                  styles.dropdownContainer,
                  // {
                  //   top:
                  //     selected === 'Clinic' || selected === 'Hospital'
                  //       ? verticalScale(360)
                  //       : verticalScale(270),
                  // },
                ]}>
                <ScrollView>
                  {CONSTANTS?.speciality?.map((val, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.touch}
                      onPress={() => HandlePress(val)}>
                      <Text
                        style={{
                          fontSize: CUSTOMFONTSIZE.h3,
                          padding: moderateScale(10),
                          color: CUSTOMCOLOR.black,
                        }}
                        key={index}>
                        {val}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <InputText
            label={'Phone Number'}
            placeholder="Phone number"
            value={phone}
            inputContainer={{paddingHorizontal: 0}}
            setValue={val => setPhone(val)}
            numeric={true}
          />
          <InputText
            label={'Referal Notes'}
            placeholder="Referal Notes"
            multiline={true}
            value={notes}
            inputContainer={{paddingHorizontal: 0}}
            setValue={val => setNotes(val)}
            textStyle={{
              height: moderateScale(150),
              textAlignVertical: 'top',
              color: CUSTOMCOLOR.black,
              fontWeight: '700',
            }}
          />
        </View>
        {sug?.length > 0 && (
          <View style={[styles.Modes, {flexWrap: 'wrap'}]}>
            {/* <ScrollView
              // horizontal={true}
              persistentScrollbar={true}
              contentContainerStyle={{gap: moderateScale(12)}}> */}
            {sug?.map((item, index) => (
              <SelectorBtn
                select={{
                  backgroundColor: CUSTOMCOLOR.recent,
                }}
                inputstyle={{
                  color: CUSTOMCOLOR.primary,
                  fontSize: moderateScale(14),
                  fontWeight: '700',
                }}
                key={index}
                onPress={() => handlePress(item)}
                input={item?.dr_name ? item?.dr_name : item?.doctor_or_name}
              />
            ))}
            {/* </ScrollView> */}
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginTop: verticalScale(64),
            justifyContent: 'flex-end',
          }}>
          {/* <HButton
            label="Preview"
            loading={prevLoad}
            loadColor={CUSTOMCOLOR.primary}
            onPress={handlePreview}
            // onPress={createPDF}
            btnstyles={{
              backgroundColor: CUSTOMCOLOR.white,
              borderWidth: 0.5,
              borderColor: CUSTOMCOLOR.borderColor,
            }}
            textStyle={{
              color: CUSTOMCOLOR.primary,
            }}
          /> */}
          <HButton
            btnstyles={{
              backgroundColor:
                selected && name && speciality
                  ? CUSTOMCOLOR.primary
                  : CUSTOMCOLOR.disable,
            }}
            icon="share"
            label="Share"
            type="addtype"
            size={moderateScale(24)}
            loading={prevLoad}
            onPress={selected && name && speciality ? handlePreview : null}
          />
        </View>
      </ScrollView>
      {/* <View
        style={{
          justifyContent: 'flex-end',
         
        }}>
        <HButton
          label={'Share'}
          btnstyles={{
            ...commonstyles.activebtn,
            backgroundColor:
              doctor?.length > 0 ? CUSTOMCOLOR.primary : CUSTOMCOLOR.disable,
          }}
          onPress={onPress}
        />
      </View> */}
      {modal && (
        <GalleryModel
          visible={modal}
          Close={setModal}
          share={true}
          Label1={'Doctor'}
          OnPress1={createPDF}
          Label2={'Patient'}
          IconName1={'doctor'}
          IconName2={'human-child'}
          // OnCamera={openCamera}
          // document={true}
          // onDocument={pickSingleFile}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  head: {
    color: CUSTOMCOLOR.black,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  container: {
    gap: verticalScale(16),
  },
  fields: {
    height: verticalScale(14),
    fontFamily: CUSTOMFONTFAMILY.opensans,
    fontSize: moderateScale(16),

    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(8),
    alignSelf: 'center',
  },
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    gap: verticalScale(16),
    flex: 1,
    backgroundColor: CUSTOMCOLOR.background,
  },
  child: {
    gap: moderateScale(16),
    flexDirection: 'row',
  },
  Modes: {
    paddingTop: verticalScale(16),
    // borderWidth: 1,
    flexDirection: 'row',
    gap: moderateScale(16),
  },
  dropdownContainer: {
    // position: 'absolute',
    // zIndex: 10,
    // left: 0,

    borderWidth: 1,
    width: '100%',
    height: verticalScale(300),
    backgroundColor: CUSTOMCOLOR.white,
    borderColor: CUSTOMCOLOR.borderColor,
  },
  touch: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
});
export default ReferToDoctor;

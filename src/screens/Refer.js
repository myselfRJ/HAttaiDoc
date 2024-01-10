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
import DropdownComponent from '../components/Dropdownbox';
import {showToast} from '../utility/const';

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
  const [newPhone, setNewPhone] = useState('');
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
  const doc_prof = useSelector(state => state?.doctor_profile?.doctor_profile);
  useEffect(() => {
    // fetchDoctor();
    setData(doc_prof);
  }, []);
  const contact = `${name} ${phone}`;
  const createPDF = async () => {
    if (await PermmisionStorage()) {
      let options = {
        //Content to print
        html: `<!DOCTYPE html>
        <html>
        <style>
        p{margin: 0;letter-spacing:1px}
        </style>
        <head>
            <title>Doctor Referral</title>
        </head>
        <body>
            <header style="text-align: center; background-color: #4ba5fa; color: #fff; padding: 20px; margin: 0;">
                <h1 style="margin: 0;">Doctor Referral</h1>
            </header>
            
            <section id="referral-details" style="padding: 20px; margin: 0;">
                <h2 style="margin: 0;">Referral Details</h2>
                <p>Referring Doctor:${'     '}${data?.doctor_name}</p>
                <p style="margin: 0;">Date:${'     '} ${new Date().toString()}</p>
            </section>
            
            <section id="patient-details" style="padding: 20px; background-color: #f5f5f5; margin: 0;">
                <h2 style="margin: 0;">Patient Details</h2>
                <p style="margin: 0;">Patient Name: ${'     '}${
          patient_details?.name
        }</p>
                <p style="margin: 0;">Age: ${'     '}${
          patient_details?.age
        }yrs</p>
                <p style="margin: 0;">Phone: ${'     '}${
          patient_details?.patient_phone
        }</p>
            </section>
            
            <section id="referred-doctor" style="padding: 20px; margin: 0;">
                <h2 style="margin: 0;">Referred Doctor</h2>
                <p style="margin: 0;">Referred Doctor: Dr. ${'     '}${
          selected === 'Clinic' || selected === 'Hospital' ? dr_name : name
        }</p>
                <p style="margin: 0;">Speciality:${'     '}${speciality} </p>
                <p style="margin: 0;">Contact Information:${'     '}${
          selected === 'Clinic' || selected === 'Hospital'
            ? `${name} , ${phone}`
            : phone
        } </p>
            </section>
            
            <section id="additional-notes" style="padding: 20px; margin: 0;">
                <h2 style="margin: 0;">Referral Notes</h2>
                <p style="margin: 0;">${'     '}${notes}</p>
            </section>
        
            <footer style="text-align: left; ; color: #000; padding: 10px; margin-top:140px;">
                
                
                <p style="text-align: center;margin: 36px;">For questions or more information, please contact Dr. ${
                  data?.doctor_name
                } ,  ${'     '}${data?.doctor_phone_number}.</p>
                
                <div  style="display: flex;flex-direction:column; justify-content: flex-start; align-items: flex-start;">
                <p style="margin: 2px;text-align: center;font-weight:300;font-size:12px;">powered by</p>
                <img style="height: 24px;width:28px;align-self:flex-start;margin-left: 10px" src="${
                  CONSTANTS.pdf_footer
                }"alt="Image Description">
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
        handleAddDoctors();
        // Alert.alert('', 'Successfully Shared to Patient');
        showToast('success', 'Successfully Shared to Patient');
        setLoading(false);
        nav.goBack();
      }
    } catch (error) {
      console.error('Error:', error);
      // Alert.alert('', 'Something went Wrong');
      showToast('error', 'Something went Wrong');
      setLoading(false);
    }
  };
  const apiUrl = URL.refer_doc_pdf;
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const handleAddDoctors = () => {
    selected && name && speciality
      ? dispatch(
          addDoctorRefer([
            ...doctor,
            {
              refer_to: selected,
              dr_name: dr_name ? dr_name : null,
              doctor_or_name: name,
              speciality: speciality,
              phone: phone,
              notes: notes,
              appointment_id: appointmentID,
            },
          ]),

          setName(''),
          setSpeciality(''),
          setPhone(''),
          setSelected(''),
          setNotes(''),
          setDr_Name(''),
          setNewPhone(''),
        )
      : null;
    // nav.goBack();
  };

  const handleSelect = val => {
    if (selected === val) {
      setSelected('');
    } else {
      setSelected(val);
    }
    // setSelected(val);
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
      StoreAsyncData(`referals${patient_details?.doc_phone}`, [
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
      UpdateAsyncData(`referals${patient_details?.doc_phone}`, {
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
    RetriveAsyncData(`referals${patient_details?.doc_phone}`)
      .then(array => {
        const uniqueArray = array?.filter((item, index) => {
          const name = item?.dr_name ? item?.dr_name : item?.doctor_or_name;
          const speciality = item?.speciality;
          const currentDocName = name.toLowerCase();
          const currentSpeciality = speciality.toLowerCase();
          return (
            index ===
            array.findIndex(obj => {
              const Currentname = obj?.dr_name
                ? obj?.dr_name
                : obj?.doctor_or_name;
              const CurrentSpeciality = obj?.speciality;

              return (
                Currentname.toLowerCase() === currentDocName &&
                CurrentSpeciality.toLowerCase() === currentSpeciality
              );
            })
          );
        });
        if (uniqueArray?.length > 5) {
          uniqueArray?.splice(5);
          setSug(uniqueArray);
        } else {
          setSug(uniqueArray);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePress = value => {
    setSelected(value?.refer_to);
    setName(value?.doctor_or_name);
    setDr_Name(value?.dr_name);
    setNewPhone(value?.newPhone);
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
          {selected && (
            <View style={{gap: verticalScale(16)}}>
              <InputText
                label={
                  selected === 'Doctor'
                    ? 'Dr.Name'
                    : selected === 'Clinic'
                    ? ' Clinic Name'
                    : selected === 'Hospital'
                    ? 'Hospital Name'
                    : 'Lab / Imaging Center Name'
                }
                placeholder={
                  selected === 'Doctor'
                    ? 'Enter Dr.Name'
                    : selected === 'Clinic'
                    ? 'Enter Clinic Name'
                    : selected === 'Hospital'
                    ? 'Enter Hospital Name'
                    : 'Enter lab / imaging center name'
                }
                inputContainer={{paddingHorizontal: 0}}
                value={name}
                setValue={val => setName(val)}
              />
              {selected === 'Clinic' ||
              selected === 'Hospital' ||
              selected === 'Lab / Imaging Center' ? (
                <InputText
                  label={
                    selected === 'Clinic'
                      ? ' Clinic Phone Number'
                      : selected === 'Hospital'
                      ? 'Hospital Phone Number'
                      : 'Center Phone Number'
                  }
                  placeholder={
                    selected === 'Clinic'
                      ? 'Enter Clinic Phone Number'
                      : selected === 'Hospital'
                      ? 'Enter Hospital Phone Number'
                      : 'Enter Center Phone Number'
                  }
                  inputContainer={{paddingHorizontal: 0}}
                  value={newPhone}
                  setValue={val => setNewPhone(val)}
                />
              ) : null}
              {selected === 'Clinic' ||
              selected === 'Hospital' ||
              selected === 'Lab / Imaging Center' ? (
                <InputText
                  label={'Dr.Name'}
                  placeholder="Dr.Name"
                  inputContainer={{paddingHorizontal: 0}}
                  value={dr_name}
                  setValue={val => setDr_Name(val)}
                />
              ) : null}
              <DropdownComponent
                searchPlaceholder={'Search Speciality.....'}
                label={Language[language]['specialization']}
                required={true}
                style={{paddingHorizontal: 0}}
                select={value => HandlePress(value)}
                placeholder="Select Specialization"
                value={
                  speciality?.length > 0 ? speciality : 'Select Specialization'
                }
                data={CONSTANTS.speciality}
              />
              <InputText
                label={'Phone Number'}
                placeholder="Phone number"
                value={phone}
                inputContainer={{paddingHorizontal: 0}}
                setValue={val => setPhone(val)}
                numeric={true}
              />
              <InputText
                label={'Referral Notes'}
                placeholder="Referral Notes"
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
              {sug?.length > 0 && (
                <View style={[styles.Modes, {flexWrap: 'wrap'}]}>
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
                      input={
                        item?.dr_name ? item?.dr_name : item?.doctor_or_name
                      }
                    />
                  ))}
                </View>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: verticalScale(64),
                  justifyContent: 'flex-end',
                }}>
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
                  onPress={
                    selected && name && speciality ? handlePreview : null
                  }
                />
              </View>
            </View>
          )}
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

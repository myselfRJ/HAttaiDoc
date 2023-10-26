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

const ReferToDoctor = () => {
  const route = useRoute();
  const {patient_details} = route.params;
  console.log('=========>details', patient_details);
  const nav = useNavigation();
  const doctor = useSelector(state => state?.prescription?.selectedDoctor);
  console.log('=======>doc', doctor);

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

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };
  const contact = `${name} ${phone}`;
  const createPDF = async () => {
    if (await isPermitted()) {
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
        
            <footer style="text-align: center; ; color: #000; padding: 10px; margin-top:140px;">
                <p style="margin: 0;">powered by</p>
                <img style="height: 100px;width:200px" src="${
                  CONSTANTS.pdf_footer
                }" style="float: left; margin-right: 10px;" alt="Image Description">
                <p style="margin: 0;">For questions or more information, please contact ${
                  data?.doctor_name
                } , ${data?.doctor_phone_number}.</p>
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
      handle();
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
      const response = await fetch(url, requestOptions);
      const responseData = await response.json();
      if (responseData) {
        console.log('API Response:', responseData);
        Alert.alert('', 'Successfully Send to Patient');
        nav.goBack();
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('', 'Something went Wrong');
    }
  };
  const apiUrl = URL.refer_doc_pdf;

  const handle = () => {
    postData(apiUrl);
  };

  const handleAddDoctors = () => {
    selected && phone && name && speciality
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
    nav.goBack();
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

  return (
    <View style={styles.main}>
      <ScrollView>
        <PrescriptionHead head={{padding: 0}} heading="Referral" />
        {/* {doctor?.map((item, ind) =>
          doctor.length > 0 ? (
            <ShowChip
              text={`Refer To: ${item?.refer_to},Name:${item?.doctor_name} ${
                item?.dr_name ? `Dr.Name : ${item?.dr_name}` : ''
              } Speciality: ${item?.speciality},  Phone: ${item?.phone}`}
              onPress={() => handleDelete(ind)}
              key={ind}
            />
          ) : null,
        )} */}

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
                {
                  top:
                    selected === 'Clinic' || selected === 'Hospital'
                      ? verticalScale(404)
                      : verticalScale(310),
                },
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
        <View style={{marginTop: verticalScale(64), alignSelf: 'flex-end'}}>
          <HButton
            btnstyles={{
              backgroundColor:
                selected && name && speciality && phone
                  ? CUSTOMCOLOR.primary
                  : CUSTOMCOLOR.disable,
            }}
            icon="share"
            label="Share"
            type="addtype"
            size={moderateScale(24)}
            onPress={() => {
              handleAddDoctors();
              // createPDF();
            }}
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
  dropdownContainer: {
    position: 'absolute',
    zIndex: 10,
    left: 0,

    borderWidth: 1,
    width: '100%',
    height: verticalScale(400),
    backgroundColor: CUSTOMCOLOR.white,
  },
  touch: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
});
export default ReferToDoctor;

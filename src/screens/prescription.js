import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
// import {Document, Page, Text, View, StyleSheet} from '@react-pdf/renderer';
// import {View, Text, StyleSheet} from '@react-pdf/renderer';
import {Language} from '../settings/customlanguage';
import {CUSTOMCOLOR, CUSTOMFONTFAMILY} from '../settings/styles';
import {language} from '../settings/userpreferences';
import Logo from '../components/logo';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {CONSTANT} from '../utility/const';
import {CONSTANTS} from '../utility/constant';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utility/scaleDimension';
import {WebView} from 'react-native-webview';

// import Pdf from 'react-native-pdf';

const Prescription = ({route}) => {
  const months = CONSTANTS.months;
  const doctor_profile = useSelector(state => state.doctor_profile);
  const patient = useSelector(state => state?.patient);
  const vitals = useSelector(state => state?.prescription?.vitalsData);
  console.log('vitals', vitals);
  const cheif_complaint = useSelector(
    state => state?.prescription?.selectedComplaint,
  );
  const symptom = useSelector(state => state?.symptoms?.symptom);
  console.log('symptom==', symptom);
  const symptomData = symptom.map(item => item.symptom);
  const prescribe_data = useSelector(state => state?.pres);
  console.log('pres==', prescribe_data);
  console.log(
    'frequencyyy===>',
    prescribe_data?.prescribeItems[0]?.frequency.split(','),
  );
  const notes = useSelector(state => state?.prescription?.note);
  const refer_doctor = useSelector(
    state => state?.prescription?.selectedDoctor,
  );
  const diagnosis = useSelector(state => state?.diagnosis?.DiagnosisItems);
  // console.log('>>>>>>>diagnosis',diagnosis[0].diagnosis)
  const followup = useSelector(state => state?.dateTime?.date);
  const clinic_name = useSelector(state => state?.clinicid?.clinic_name);
  console.log('name===', clinic_name);
  const clinic_Address = useSelector(state => state?.clinicid?.clinic_Address);
  console.log('address=', clinic_Address);
  const test = useSelector(state => state?.labreport?.labReport);
  console.log('test>>>>>>>>>>', test);
  const dateTimeRed = useSelector(state => state.valid?.valid);
  const {name, gender, patient_age, patient_phone_number} = route.params;
  const sign = useSelector(state => state?.sign);
  const logo = useSelector(state=>state?.clinicid?.clinic_logo)
  console.log('logooo',logo)
  console.log(
    'patient phone--',
    name,
    gender,
    patient_age,
    patient_phone_number,
  );

  const current = new Date();
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const handleEdd = selectedDate => {
    let startDate = new Date(selectedDate);

    let numberOfDaysToAdd = 280;
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + numberOfDaysToAdd);
    let formattedEndDate = endDate.toISOString().substring(0, 10);
    const day = formattedEndDate.split('-')[2];
    const year = formattedEndDate.split('-')[0];
    const month = months[`${formattedEndDate.split('-')[1]}`];
    const EDD = `${day}-${month}-${year}`;
    // usChange(EDD);
    return EDD;
  };
  const format = current.toLocaleDateString(undefined, options);
  const base64Image = sign?.sign;
  console.log('base==', base64Image);
  const [logostate,setLogo] = useState()
const handleLogo = () => {
  if (logo){
    setLogo('hi')
  }else{
    setLogo(null)
  }
}
useEffect(()=>{
  handleLogo()
},[logo])

  return (
    <ScrollView>
      <View style={styles.main}>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <Logo src={logostate} encodedBase64={logo}/>
            <View style={{paddingHorizontal: horizontalScale(16)}}>
              <Text style={styles.title}>
                {Language[language]['dr']}
                {doctor_profile?.doctor_profile?.doctor_name}
              </Text>
              <Text style={styles.speciality}>
                {doctor_profile?.doctor_profile?.specialization}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.speciality}>{clinic_name}</Text>
            <Text style={styles.address}>{clinic_Address}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image
            source={require('../assets/images/RX.png')}
            style={styles.img}
          />
          <Text style={styles.date}>{format}</Text>
        </View>
        <View>
          <Text style={styles.date}>
            {name} | {gender} | {patient_age} | {patient_phone_number}
          </Text>
        </View>
        <View>
          <Text style={styles.head}>{Language[language]['vitals']}:</Text>
          <View style={styles.commonstyle}>
            <Text style={styles.values}>
              {Language[language]['pulse_rate']}: {vitals.pulse_rate}
            </Text>
            <Text style={styles.values}>
              {Language[language]['weight']}: {vitals.weight}
            </Text>
            <Text style={styles.values}>
              {Language[language]['height']}: {vitals.height}
            </Text>
            <Text style={styles.values}>
              {Language[language]['temp']}:{vitals.body_temperature}
            </Text>
            <Text style={styles.values}>
              {Language[language]['rate']}: {vitals.rate}
            </Text>
            <Text style={styles.values}>
              {Language[language]['bmi']}: {vitals.bmi}
            </Text>
          </View>
        </View>
        <View>
          <Text style={styles.head}>
            {Language[language]['cheif_complaints']} :{' '}
            <Text style={styles.values}>{cheif_complaint}</Text>
          </Text>
        </View>
        <View>
          <Text style={styles.head}>
            {Language[language]['diagnosis']} :{' '}
            {diagnosis.map((item, index) => (
              <Text key={index} style={styles.values}>
                {item?.diagnosis}{' '}
              </Text>
            ))}
          </Text>
        </View>
        <View>
          <Text style={styles.head}>
            {Language[language]['symptoms']} :{' '}
            {symptom?.map((item, index) => (
              <Text key={index} style={styles.values}>
                {item?.symptom}{' '}
              </Text>
            ))}
          </Text>
        </View>
        <View>
          <Text style={styles.head}>{Language[language]['prescribe']} :</Text>
        </View>
        <View style={styles.presc}>
          <Text style={styles.prescMenu}>S.no</Text>
          <Text style={styles.prescMenu}>{Language[language]['mode']}</Text>
          <Text style={styles.prescMenu}>{Language[language]['medicine']}</Text>
          <Text style={styles.prescMenu}>{Language[language]['dose']}</Text>
          <Text style={styles.prescMenu}>{Language[language]['timing']}</Text>
          <Text style={styles.prescMenu}>
            {Language[language]['frequency']}
          </Text>
          <Text style={styles.prescMenu}>{Language[language]['duration']}</Text>
          <Text style={styles.prescMenu}>{Language[language]['quantity']}</Text>
        </View>
        {prescribe_data?.prescribeItems?.map((item, index) => (
          <View key={index} style={styles.precvalues}>
            <Text style={styles.prescMenu}>{parseInt(index) + 1}</Text>
            <Text style={styles.prescMenu}>{item.mode}</Text>
            <Text style={styles.prescMenu}>{item.medicine}</Text>
            <Text style={styles.prescMenu}>{item.dose_quantity}</Text>
            <Text style={styles.prescMenu}>{item.timing}</Text>
            <Text style={styles.prescMenu}>{item.frequency}</Text>
            <Text style={styles.prescMenu}>{item.duration}</Text>
            <Text style={styles.prescMenu}>{item.total_quantity}</Text>
          </View>
        ))}
        {notes && (
          <View>
            <Text style={styles.head}>
              {Language[language]['notes']} :{' '}
              <Text style={styles.values}>{notes}</Text>
            </Text>
          </View>
        )}
        {refer_doctor.doctor_name && (
          <View>
            <Text style={styles.head}>
              {Language[language]['refer_doctor']} :
            </Text>
            <View style={styles.refer}>
              <Text style={styles.values}>
                {Language[language]['name']} :{' '}
                <Text style={styles.values}>{refer_doctor.doctor_name}</Text>
              </Text>
              <Text style={styles.values}>
                {Language[language]['specialist']} :{' '}
                <Text style={styles.values}>{refer_doctor.speciality}</Text>
              </Text>
              <Text style={styles.values}>
                {Language[language]['ph']} :{' '}
                <Text style={styles.values}>{refer_doctor.phone}</Text>
              </Text>
            </View>
          </View>
        )}
        <View>
          <Text style={styles.head}>
            {Language[language]['test']} :{' '}
            {test.map((item, index) => (
              <Text style={styles.values}>{item?.lab_test} </Text>
            ))}
          </Text>
        </View>
        {followup && (
          <View>
            <Text style={styles.head}>
              {Language[language]['follow_up']} :{' '}
              <Text style={styles.values}>{followup}</Text>
            </Text>
          </View>
        )}
        <View style={styles.sign}>
          <Text style={styles.values}>Digital sign</Text>
          <View style={{}}>
            <Image
              source={{uri: `data:image/jpeg;base64,${base64Image}`}}
              style={{width: moderateScale(300), height: moderateScale(50)}}
            />
          </View>
        </View>
        <View>
          <Text style={styles.head}>
            Validity Upto : <Text style={styles.values}>{dateTimeRed}</Text>
          </Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.values}>Not valid for Medical Legal Purpose</Text>
          <Text style={styles.values}>
            In case of any drug interactions or side effects STOP all medicines{' '}
          </Text>
          <Text style={styles.values}>
            immediately and consult your doctor or nearest hospital
          </Text>
        </View>
        <View>
          <Image
            source={require('../assets/images/footer.png')}
            style={styles.footerimg}
          />
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
    backgroundColor: CUSTOMCOLOR.white,
  },
  title: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontWeight: '600',
    fontSize: moderateScale(20),
    color: CUSTOMCOLOR.primary,
  },
  speciality: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: '400',
    fontSize: moderateScale(18),
    color: CUSTOMCOLOR.primary,
    paddingHorizontal: horizontalScale(4),
  },
  address: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: '400',
    fontSize: moderateScale(12),
    color: CUSTOMCOLOR.primary,
    width: moderateScale(150),
    paddingLeft: moderateScale(4),
    //paddingHorizontal:8
  },
  img: {
    width: moderateScale(35),
    height: moderateScale(53),
  },
  date: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: '400',
    fontSize: moderateScale(16),
    color: CUSTOMCOLOR.black,
  },
  commonstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(8),
  },
  head: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontWeight: '400',
    fontSize: moderateScale(16),
    color: CUSTOMCOLOR.primary,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(4),
  },
  values: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: CUSTOMCOLOR.black,
    paddingHorizontal: horizontalScale(8),
    alignItems: 'center',
  },
  presc: {
    top: 8,
    //paddingHorizontal: 4,
    paddingVertical: verticalScale(8),
    backgroundColor: '#DFF0FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  precvalues: {
    //paddingHorizontal: 24,

    paddingVertical: verticalScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prescMenu: {
    width: verticalScale(80),
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontWeight: '400',
    fontSize: moderateScale(16),
    color: CUSTOMCOLOR.black,
  },
  refer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  sign: {
    alignSelf: 'flex-end',
    width: moderateScale(300),
    paddingVertical: verticalScale(64),
    // justifyContent:'flex-end'
  },
  description: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(32),
  },
  footerimg: {
    width: moderateScale(136),
    height: moderateScale(70),
    alignSelf: 'flex-start',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(24),
    paddingHorizontal: horizontalScale(8),
    borderBottomColor: CUSTOMCOLOR.primary,
    borderBottomWidth: 1,
    padding: moderateScale(12),
    backgroundColor: CUSTOMCOLOR.white,
  },
});

export default Prescription;

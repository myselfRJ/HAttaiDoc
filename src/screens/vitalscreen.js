import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addVitals} from '../redux/features/prescription/prescriptionSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import {HButton, InputText, SelectorBtn} from '../components';
import {CONSTANTS} from '../utility/constant';
import DatePicker from 'react-native-date-picker';
import PrescriptionHead from '../components/prescriptionHead';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {ScrollView} from 'react-native-gesture-handler';
import {mode} from '../redux/features/prescription/prescribeslice';
import VitalField from '../components/vitalFields';
import {validateInput} from '../utils/FormUtils/Validators';
import Seperator from '../components/seperator';
import {commonstyles} from '../styles/commonstyle';
const VitalScreen = ({route, props}) => {
  const months = CONSTANTS.months;
  const nav = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [edd, setEdd] = useState();
  const [show, setShow] = useState(false)
  const navigation = useNavigation();
  const { gende } = route.params;
  console.log('gender=', gende)
  const handleDate = () => {
      setOpen(!open);
  };

  const handleConfirm = selectedDate => {
      setDate(selectedDate);
      const updateLDD = selectedDate?.toISOString().split('T')[0];
      console.log('date formate', updateLDD);
      lmpChange(updateLDD);
  };
  const handleCancel = () => {
      setOpen(open);
  };

  const lmpdate = date.toISOString().split('T')[0];
  const lmpdates = `${lmpdate.split('-')[2]}-${months[lmpdate.split('-')[1]]}-${lmpdate.split('-')[0]
      }`;

  const [vitals, setVitals] = useState({
      pulse_rate: '',
      weight: '',
      height: '',
      body_temperature: '',
      rate: '',
      bmi: '',
      diastolic: '',
      systolic: '',
      LDD: '',
      EDD: '',
  });
  console.log('====>dias', vitals)

  const handlePress = () => {
      console.log('=vitals', vitals);
      dispatch(addVitals(vitals));
      nav.goBack();
  };
  const PulseChange = (text) => {
      const updatedVitals = { ...vitals, pulse_rate: text };
      setVitals(updatedVitals);
  };
  const weightChange = (text) => {
      const updatedVitals = { ...vitals, weight: text };
      setVitals(updatedVitals);
  };
  const heightChange = (text) => {
      const updatedVitals = { ...vitals, height: text };
      setVitals(updatedVitals);
  };
  const tempChange = (text) => {
      const updatedVitals = { ...vitals, body_temperature: text };
      setVitals(updatedVitals);
  };
  const rateChange = (text) => {
      const updatedVitals = { ...vitals, rate: text };
      setVitals(updatedVitals);
  };
  const handleBMI = () => {
      const height = (parseInt(vitals.height) / 100) ** 2;
      const weight = parseFloat(vitals.weight);
      const BMI = (weight / height).toString().slice(0, 5);

      if (BMI !== NaN) {
          bmiChange(BMI);
          setBmi(BMI);
      } else {
          bmiChange(null);
          setBmi(null);
      }
  };

  useEffect(() => {
      handleBMI();
  }, [vitals.height, vitals.weight]);

  const [bmi, setBmi] = useState();

  const bmiChange = bmi => {
      const updatedVitals = { ...vitals, bmi: bmi };
      setVitals(updatedVitals);
  };
  const diastolicChange = (text) => {
      const updatedVitals = { ...vitals, diastolic: text };
      setVitals(updatedVitals);
  };
  const systolicChange = (text) => {
      console.log('=========>textr', text);
      const updatedVitals = { ...vitals, systolic: text };
      setVitals(updatedVitals);
  };

  const lmpChange = lmpdate => {
      console.log('updatedLMMP', updatedVitals);
      const EDD = handleEdd(lmpdate);
      usChange(EDD);
      const updatedVitals = { ...vitals, LDD: lmpdate, EDD: EDD };
      setEdd(EDD);
      setVitals(updatedVitals);
  };
  const usChange = formatedDate => {
      const updatedVitals = { ...vitals, EDD: formatedDate };
      console.log('updateValues.......', updatedVitals);
      setVitals(updatedVitals);
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
      return EDD;
  };
  return (
      <View style={styles.main}>
          <PrescriptionHead heading='Vitals' />
          <ScrollView contentContainerStyle={{ paddingBottom: moderateScale(100) }}>
              <View style={styles.container}>
                  <Text style={commonstyles.subhead}>Basic</Text>
                  <Seperator />
                  <View style={styles.fields}>
                      <VitalField
                          name='Height'
                          placeholder='Cm'
                          setvalue={text => heightChange(text)}
                      />
                      <VitalField
                          name='Weight'
                          placeholder='Kg'
                          setvalue={text => weightChange(text)}
                      />
                      {bmi !== 'NaN' ? (
                          <VitalField
                              name='BMI'
                              value={bmi}
                          />) : (<VitalField
                              name='BMI'
                              value='00'
                          />)}
                      <VitalField
                          name='Pulse'
                          placeholder='bpm'
                          setvalue={text => PulseChange(text)}
                      />
                      <VitalField
                          name='Temp'
                          placeholder='°C'
                          setvalue={text => tempChange(text)}
                      />
                      <VitalField
                          name='SPO2'
                          placeholder='%'
                      />
                      <VitalField
                          name='Res_Rate'
                          placeholder='brpm'
                          setvalue={text => rateChange(text)}
                      />

                  </View>
                  <Text style={commonstyles.subhead}>Blood Pressure</Text>
                  <Seperator />
                  <View style={styles.fields}>
                      <VitalField
                          name='Systolic BP'
                          placeholder='mmhg'
                          setvalue={text => systolicChange(text)}
                      />
                      <VitalField
                          name='Diastolic BP'
                          placeholder='mmhg'
                          setvalue={text => diastolicChange(text)}
                      />
                  </View>
                  {(gende === 'Female' || gende === 'female') ? 
                  (<View style={{gap:moderateScale(8)}}>
                     <Text style={commonstyles.subhead}>Pregnancy</Text>
                  <Seperator />
                  <View style={styles.fields}>
                      <View style={styles.preg}>
                          <Text style={styles.name}>LMP</Text>
                          <SelectorBtn
                              size={20}
                              inputstyle={{ fontSize: 10 }}
                              onPress={() => {
                                  handleDate();
                              }}
                              name={'calendar'}
                              input={lmpdates}
                          />
                          {open && (
                              <DatePicker
                                  modal
                                  open={open}
                                  date={date}
                                  theme="auto"
                                  mode="date"
                                  onConfirm={handleConfirm}
                                  onCancel={handleCancel}
                              />
                          )}
                      </View> 
                 
                      <VitalField
                          name='EDD'
                          setvalue={vitals?.EDD}
                      />
                  </View>
                  </View>):null}
                  {show == true ? (
                      <View style={{gap:moderateScale(8)}}>
                          <Text style={commonstyles.subhead}>Others</Text>
                  <Seperator />
                  <VitalField
                      name='Vital name'
                      placeholder='Enter'
                      setValue={text => systolicChange(text)}
                  />
                      </View>
                  ): null}
                  <HButton
                      btnstyles={{ alignSelf: 'flex-end' }}
                      icon='plus'
                      label='Others'
                      onPress={()=> setShow(!show)}
                  />
              </View>
          </ScrollView>
          <HButton
                btnstyles={{width:moderateScale(380),borderRadius:moderateScale(16),alignSelf:'center'}}
                label={Language[language]['submit']}
                onPress={handlePress}
          />

      </View>
  )
};
const styles = StyleSheet.create({
  main: {
      flex: 1,
      paddingHorizontal: horizontalScale(24),
      paddingVertical: verticalScale(12),
      gap: moderateScale(8)
  },
  container: {
      gap: moderateScale(12),
  },
  fields: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap'
  },
  name: {
      width: moderateScale(70),
      fontWeight: '400',
      fontSize: CUSTOMFONTSIZE.h3,
      color: CUSTOMCOLOR.black,
      paddingHorizontal:horizontalScale(8)
  },
  preg: {
      // gap:moderateScale(2),
      alignItems:'center',
      flexDirection: 'row',
      marginHorizontal: horizontalScale(4)
  }
})

export default VitalScreen;

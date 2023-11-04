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
import {useState, useEffect, useRef} from 'react';
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
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const pulseRef = useRef(null);
  const tempRef = useRef(null);
  const spoRef = useRef(null);
  const rateRef = useRef(null);
  const sysRef = useRef(null);
  const diaoRef = useRef(null);

  const months = CONSTANTS.months;
  const nav = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [edd, setEdd] = useState();
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const {gende} = route.params;
  console.log('gender=', gende);
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
  const lmpdates = `${lmpdate.split('-')[2]}-${months[lmpdate.split('-')[1]]}-${
    lmpdate.split('-')[0]
  }`;
  const [othresKey, setOthersKey] = useState('');
  const [othersValue, setOthersValue] = useState('');
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
    oxygen_level: '',
    others: {},
  });
  console.log('====>dias', vitals);

  const handlePress = () => {
    updateOthersVitals();
    console.log('=vitals', vitals);
    setTimeout(() => {
      dispatch(addVitals(vitals));
      nav.goBack();
    }, 200);
  };
  const PulseChange = text => {
    const updatedVitals = {...vitals, pulse_rate: text};
    setVitals(updatedVitals);
  };
  const weightChange = text => {
    const updatedVitals = {...vitals, weight: text};
    setVitals(updatedVitals);
  };
  const heightChange = text => {
    const updatedVitals = {...vitals, height: text};
    setVitals(updatedVitals);
  };
  const tempChange = text => {
    const updatedVitals = {...vitals, body_temperature: text};
    setVitals(updatedVitals);
  };
  const spo2Change = text => {
    const updatedVitals = {...vitals, oxygen_level: text};
    setVitals(updatedVitals);
  };
  const rateChange = text => {
    const updatedVitals = {...vitals, rate: text};
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
    const updatedVitals = {...vitals, bmi: bmi};
    setVitals(updatedVitals);
  };
  const diastolicChange = text => {
    const updatedVitals = {...vitals, diastolic: text};
    setVitals(updatedVitals);
  };
  const systolicChange = text => {
    const updatedVitals = {...vitals, systolic: text};
    setVitals(updatedVitals);
  };

  const lmpChange = lmpdate => {
    console.log('updatedLMMP', updatedVitals);
    const EDD = handleEdd(lmpdate);
    usChange(EDD);
    const updatedVitals = {...vitals, LDD: lmpdate, EDD: EDD};
    setEdd(EDD);
    setVitals(updatedVitals);
  };
  const usChange = formatedDate => {
    const updatedVitals = {...vitals, EDD: formatedDate};
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
  const updateOthersVitals = () => {
    setVitals({
      ...vitals,
      others: {
        ...vitals.others,
        [othresKey]: othersValue,
      },
    });
  };

  return (
    <View style={styles.main}>
      <PrescriptionHead heading="Vitals" />
      <ScrollView contentContainerStyle={{paddingBottom: moderateScale(100)}}>
        <View style={styles.container}>
          <View style={styles.section}>
            <View>
              <Text style={commonstyles.subhead}>Basic</Text>
              <Seperator />
            </View>
            <View style={styles.fields}>
              <VitalField
                //   ref={heightRef}
                point={heightRef}
                re={weightRef}
                //   onSubmitEditing={() => weightRef.current && weightRef.current.focus()}
                name="Height"
                placeholder="Cm"
                setvalue={text => heightChange(text)}
              />
              <VitalField
                //   ref ={weightRef}
                point={weightRef}
                re={pulseRef}
                name="Weight"
                placeholder="Kg"
                setvalue={text => weightChange(text)}
              />
              {bmi !== 'NaN' ? (
                <VitalField name="BMI" value={bmi} />
              ) : (
                <VitalField name="BMI" value="00" />
              )}
              <VitalField
                point={pulseRef}
                re={tempRef}
                name="Pulse"
                placeholder="bpm"
                setvalue={text => PulseChange(text)}
              />
              <VitalField
                point={tempRef}
                re={spoRef}
                name="Temp"
                placeholder="°C"
                setvalue={text => tempChange(text)}
              />
              <VitalField
                point={spoRef}
                re={rateRef}
                name="SPO2"
                placeholder="%"
                setvalue={text => spo2Change(text)}
              />
              <VitalField
                point={rateRef}
                re={sysRef}
                name="Res_Rate"
                placeholder="brpm"
                setvalue={text => rateChange(text)}
              />
            </View>
          </View>

          <View style={styles.section}>
            <View>
              <Text style={commonstyles.subhead}>Blood Pressure</Text>
              <Seperator />
            </View>

            <View style={styles.fields}>
              <VitalField
                point={sysRef}
                re={diaoRef}
                name="Systolic BP"
                placeholder="mmhg"
                setvalue={text => systolicChange(text)}
              />
              <VitalField
                point={diaoRef}
                // re={pulseRef}
                name="Diastolic BP"
                placeholder="mmhg"
                setvalue={text => diastolicChange(text)}
              />
            </View>
          </View>
          {gende === 'Female' || gende === 'female' ? (
            <View style={styles.section}>
              <View>
                <Text style={commonstyles.subhead}>Pregnancy</Text>
                <Seperator />
              </View>

              <View style={styles.fields}>
                <View style={styles.preg}>
                  <Text style={styles.name}>LMP</Text>
                  <SelectorBtn
                    size={20}
                    inputstyle={{fontSize: CUSTOMFONTSIZE.h4}}
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

                  {/* <View style={{borderWidth:1,alignItems:'center'}}> */}
                  <VitalField name="EDD" value={vitals?.EDD} />
                  {/* </View> */}
                </View>
              </View>
            </View>
          ) : null}
          {show == true ? (
            <View style={styles.section}>
              <View>
                <Text style={commonstyles.subhead}>Others</Text>
                <Seperator />
              </View>

              <View style={styles.fields}>
                <VitalField
                  name="Vital name"
                  placeholder="Enter"
                  value={othresKey}
                  setvalue={text => setOthersKey(text)}
                />
                <VitalField
                  name="Value"
                  placeholder="Value,Unit"
                  value={othersValue}
                  setvalue={text => setOthersValue(text)}
                />
              </View>
            </View>
          ) : null}
          <HButton
            type="addtype"
            btnstyles={{alignSelf: 'flex-end'}}
            icon="plus"
            label="Others"
            onPress={() => setShow(!show)}
          />
        </View>
      </ScrollView>
      <HButton
        btnstyles={commonstyles.activebtn}
        label={Language[language]['submit']}
        onPress={handlePress}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    gap: moderateScale(8),
    backgroundColor: CUSTOMCOLOR.background,
  },
  container: {
    gap: verticalScale(16),
    //   paddingHorizontal:horizontalScale(12)
  },
  fields: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: horizontalScale(12),
  },
  name: {
    width: moderateScale(70),
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    //   paddingHorizontal:horizontalScale(8)
  },
  preg: {
    // gap:moderateScale(2),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(8),
  },
  section: {
    gap: verticalScale(4),
  },
});

export default VitalScreen;

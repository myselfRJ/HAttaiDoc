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
  const vitalsData = useSelector(state => state.prescription.vitalsData);
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
  const handleDate = () => {
    setOpen(!open);
  };

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    const updateLDD = selectedDate?.toISOString().split('T')[0];
    setLDD(updateLDD);
    const updateEDD = handleEdd(selectedDate);
    setEdd(updateEDD);
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

  const [pulse, setPulse] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setheight] = useState('');

  const [temp, setTemp] = useState('');
  const [bmi, setBmi] = useState();
  const [rate, setRate] = useState('');
  const [diastolic, setdiastolic] = useState('');
  const [systolic, setsystolic] = useState('');
  const [ldd, setLDD] = useState('');
  const [spo2, setSpo2] = useState('');

  const handleBMI = () => {
    const height = (parseInt(vitals.height) / 100) ** 2;
    const weight = parseFloat(vitals.weight);
    const BMI = (weight / height).toString().slice(0, 5);

    if (BMI !== NaN) {
      setBmi(BMI);
    } else {
      setBmi(null);
    }
  };

  useEffect(() => {
    handleBMI();
  }, [height, weight]);

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
  const vitals = {
    pulse_rate: pulse,
    weight: weight,
    height: height,
    body_temperature: temp,
    rate: rate,
    bmi: bmi,
    diastolic: diastolic,
    systolic: systolic,
    LDD: ldd,
    EDD: edd,
    oxygen_level: spo2,
    others: {[othresKey]: othersValue},
  };
  const handlePress = () => {
    setTimeout(() => {
      dispatch(addVitals(vitals));
      nav.goBack();
    }, 500);
  };
  useEffect(() => {
    if (vitalsData) {
      setheight(vitalsData?.height);
      setWeight(vitalsData?.weight);
      setBmi(vitalsData?.bmi);
      setPulse(vitalsData?.pulse_rate);
      setTemp(vitalsData?.body_temperature);
      setRate(vitalsData?.rate);
      setdiastolic(vitalsData?.diastolic);
      setsystolic(vitalsData?.systolic);
      setSpo2(vitalsData?.oxygen_level);
      setOthersKey(
        vitalsData?.others ? Object.keys(vitalsData?.others)[0] : null,
      );
      setOthersValue(
        vitalsData?.others ? Object.values(vitalsData?.others)[0] : null,
      );
      setEdd(vitalsData?.EDD);
      if (vitalsData?.others) {
        setShow(!show);
      }
    }
  }, []);

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
                value={height}
                point={heightRef}
                re={weightRef}
                //   onSubmitEditing={() => weightRef.current && weightRef.current.focus()}
                name="Height"
                placeholder="Cm"
                setvalue={text => setheight(text)}
              />
              <VitalField
                //   ref ={weightRef}
                point={weightRef}
                re={pulseRef}
                name="Weight"
                placeholder="Kg"
                value={weight}
                setvalue={text => setWeight(text)}
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
                value={pulse}
                setvalue={text => setPulse(text)}
              />
              <VitalField
                point={tempRef}
                re={spoRef}
                name="Temp"
                placeholder="°C"
                value={temp}
                setvalue={text => setTemp(text)}
              />
              <VitalField
                point={spoRef}
                re={rateRef}
                name="SPO2"
                placeholder="%"
                value={spo2}
                setvalue={text => setSpo2(text)}
              />
              <VitalField
                point={rateRef}
                re={sysRef}
                name="Resp.rate"
                placeholder="brpm"
                value={rate}
                setvalue={text => setRate(text)}
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
                value={systolic}
                placeholder="mmhg"
                setvalue={text => setsystolic(text)}
              />
              <VitalField
                point={diaoRef}
                // re={pulseRef}
                name="Diastolic BP"
                placeholder="mmhg"
                value={diastolic}
                setvalue={text => setdiastolic(text)}
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
                    input={vitalsData?.LDD ? vitalsData?.LDD : lmpdates}
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
                  <VitalField name="EDD" value={edd} />
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
                  placeholder="Enter name"
                  value={othresKey}
                  setvalue={text => setOthersKey(text)}
                  keypad={'default'}
                />
                <VitalField
                  name="Value"
                  placeholder="Value,Unit"
                  value={othersValue}
                  setvalue={text => setOthersValue(text)}
                  keypad={'default'}
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
        label={'Save'}
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

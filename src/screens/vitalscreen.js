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
import {
  HButton,
  InputText,
  Option,
  PlusButton,
  SelectorBtn,
} from '../components';
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
import ShowChip from '../components/showChip';
import {
  calculateWeeksAndDaysFromDate,
  formatdate,
  handleAddDates,
} from '../utility/const';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
const VitalScreen = ({route, props}) => {
  const token = useSelector(state => state.authenticate.auth.access);
  const {phone} = useSelector(state => state?.phone?.data);
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const vitalsDat = useSelector(state => state.prescription.vitalsData);
  const vitalsData =
    vitalsDat?.length > 0
      ? vitalsDat
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.vitals
      : {};
  // console.log(vitalsData?.vits);
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
  const [eddOpen, setEddopen] = useState(false);
  const [lddweek, setLddWeek] = useState('');
  const [edd, setEdd] = useState();
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const {gende, patient_phone} = route.params;
  // console.log(patient_phone);
  // console.log(gende, patient_phone);
  const handleEddConfirm = selectedDate => {
    setDate(selectedDate);
    const updateLDD = handleAddDates(
      selectedDate?.toISOString().split('T')[0],
      -280,
    );
    setLDD(updateLDD);
    const updateEDD = selectedDate?.toISOString().split('T')[0];
    setEdd(updateEDD);
    setEddopen(false);
  };
  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    const updateLDD = selectedDate?.toISOString().split('T')[0];
    setLDD(updateLDD);
    const updateEDD = handleAddDates(
      selectedDate?.toISOString().split('T')[0],
      280,
    );
    setEdd(updateEDD);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleEddCancel = () => {
    setEddopen(false);
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
  const [bp, setBP] = useState([]);
  const [indexbp, setIndexbp] = useState();
  const [vits, setVits] = useState([]);
  const [indexVit, setIndexVit] = useState();
  const [timeSys, setTimeSys] = useState('');

  const handleBp = () => {
    {
      indexbp >= 0 && indexbp !== undefined
        ? handleBpedit()
        : setBP([
            ...bp,
            {
              diastolic: diastolic,
              systolic: systolic,
              time: new Date().toString()?.split('G')[0],
            },
          ]);
      setdiastolic('');
      setsystolic('');
      setIndexbp();
    }
  };
  const handleDelBp = ind => {
    const updatedBp = bp?.filter((_, index) => index !== ind);
    setBP(updatedBp);
  };

  const handleBpedit = () => {
    let othersBp = [...bp];
    othersBp[indexbp] = {
      diastolic: diastolic,
      systolic: systolic,
      time: new Date().toString()?.split('G')[0],
    };
    setBP(othersBp);
  };

  const BPedit = (data, index) => {
    setIndexbp(index);
    setsystolic(data?.systolic);
    setdiastolic(data?.diastolic);
  };

  const handleVitedit = () => {
    let updating = [...vits];
    updating[indexVit] = {
      pulse: pulse,
      temp: temp,
      spo2: spo2,
      rate: rate,
      time: new Date().toString()?.split('G')[0],
    };
    setVits(updating);
  };

  const handleVit = () => {
    console.log(typeof indexVit, indexVit);
    {
      indexVit >= 0 && indexVit !== undefined
        ? handleVitedit()
        : setVits([
            ...vits,
            {
              pulse: pulse,
              temp: temp,
              spo2: spo2,
              rate: rate,
              time: new Date().toString()?.split('G')[0],
            },
          ]);
      setPulse('');
      setTemp('');
      setSpo2('');
      setRate('');
      setIndexVit();
    }
  };
  const handleDelVIT = ind => {
    const updatedvit = vits?.filter((_, index) => index !== ind);
    setVits(updatedvit);
  };
  const Vitedit = (data, index) => {
    setIndexVit(index);
    setPulse(data?.pulse);
    setTemp(data?.temp);
    setRate(data?.rate);
    setSpo2(data?.spo2);
    setdiastolic(data?.diastolic);
  };
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

  const fetchUpdatevitals = async () => {
    const response = await fetchApi(URL.getVitals(patient_phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsondata = await response.json();
      setheight(jsondata?.data?.height);
      // console.log(jsondata?.data);
    }
  };
  useEffect(() => {
    if (!vitalsData?.height) {
      fetchUpdatevitals();
    }
  }, []);

  useEffect(() => {
    handleBMI();
  }, [height, weight]);
  const vitals = {
    weight: weight,
    height: height,
    bmi: bmi,
    LDD: ldd,
    EDD: edd,
    bp: {bp: bp},
    vits: {vitals: vits},
    others: {[othresKey]: othersValue},
  };
  const handlePress = () => {
    if (vits?.length === 0 && bp?.length == 0) {
      dispatch(
        addVitals([
          ...vitalsDat,
          {
            vitals: {
              weight: weight,
              height: height,
              bmi: bmi,
              LDD: ldd,
              EDD: edd,
              bp: {
                bp: [
                  ...bp,
                  {
                    diastolic: diastolic,
                    systolic: systolic,
                    time: new Date().toString()?.split('G')[0],
                  },
                ],
              },
              vits: {
                vitals: [
                  ...vits,
                  {
                    pulse: pulse,
                    temp: temp,
                    spo2: spo2,
                    rate: rate,
                    time: new Date().toString()?.split('G')[0],
                  },
                ],
              },
              others: {[othresKey]: othersValue},
            },
            appointment_id: appointmentID,
          },
        ]),
      );
    } else {
      dispatch(
        addVitals([
          ...vitalsDat,
          {vitals: vitals, appointment_id: appointmentID},
        ]),
      );
    }
    nav.goBack();
  };
  useEffect(() => {
    const vital = vitalsDat;
    const vitalsData =
      vital?.length > 0
        ? vital
            ?.filter(item => item?.appointment_id === appointmentID)
            ?.slice(-1)?.[0]?.vitals
        : {};
    if (vitalsData) {
      setheight(vitalsData?.height);
      setWeight(vitalsData?.weight);
      setBmi(vitalsData?.bmi);
      // setPulse(vitalsData?.pulse_rate);
      // setTemp(vitalsData?.body_temperature);
      // setRate(vitalsData?.rate);
      // setdiastolic(vitalsData?.diastolic);
      // setsystolic(vitalsData?.systolic);
      // setSpo2(vitalsData?.oxygen_level);
      setBP(vitalsData?.bp?.bp ? vitalsData?.bp?.bp : []);
      setVits(vitalsData?.vits?.vitals ? vitalsData?.vits?.vitals : []);
      setOthersKey(
        vitalsData?.others ? Object.keys(vitalsData?.others)[0] : null,
      );
      setOthersValue(
        vitalsData?.others ? Object.values(vitalsData?.others)[0] : null,
      );
      setLDD(vitalsData?.LDD);
      setEdd(vitalsData?.EDD);
      if (vitalsData?.others) {
        setShow(!show);
      }
    }
  }, []);
  const week_days = calculateWeeksAndDaysFromDate(ldd);
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
                placeholder="cm"
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
            </View>
            <View style={styles.section}>
              <View>
                {/* <Text style={commonstyles.subhead}>Blood Pressure</Text> */}
                <Seperator />
              </View>
              {vits?.length > 0
                ? vits?.map((item, index) => (
                    <ShowChip
                      key={index}
                      text={`SPO2:${item?.spo2}%${'  '}Pulse: ${
                        item?.pulse
                      }bpm Temp: ${item?.temp}°F Time: ${item.time}`}
                      onPress={() => {
                        handleDelVIT(index);
                      }}
                      onEdit={() => {
                        Vitedit(item, index);
                      }}
                      color={
                        parseInt(indexVit) === index
                          ? CUSTOMCOLOR.success
                          : CUSTOMCOLOR.primary
                      }
                    />
                  ))
                : null}
              <View style={styles.fields}>
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
                  placeholder="°F"
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
                <SelectorBtn
                  input={
                    timeSys ? timeSys : new Date().toString()?.split('G')[0]
                  }
                  select={{
                    paddingHorizontal: moderateScale(8),
                    paddingVertical: moderateScale(6),
                    marginLeft: moderateScale(8),
                  }}
                />
                <PlusButton
                  icon={indexVit?.toString()?.length > 0 ? 'pencil' : 'plus'}
                  size={moderateScale(24)}
                  onPress={() => {
                    handleVit();
                  }}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View>
              <Text style={commonstyles.subhead}>Blood Pressure</Text>
              <Seperator />
            </View>
            {bp?.length > 0
              ? bp?.map((item, index) => (
                  <ShowChip
                    key={index}
                    text={`BP:${item?.systolic}/${
                      item?.diastolic
                    }${'  '} Time: ${item.time}`}
                    onPress={() => {
                      handleDelBp(index);
                    }}
                    onEdit={() => {
                      BPedit(item, index);
                    }}
                    color={
                      parseInt(indexbp) === index
                        ? CUSTOMCOLOR.success
                        : CUSTOMCOLOR.primary
                    }
                  />
                ))
              : null}

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
              <SelectorBtn
                input={timeSys ? timeSys : new Date().toString()?.split('G')[0]}
                select={{
                  paddingHorizontal: moderateScale(8),
                  paddingVertical: moderateScale(6),
                  marginLeft: moderateScale(8),
                }}
              />
              <PlusButton
                icon={indexbp?.toString()?.length > 0 ? 'pencil' : 'plus'}
                size={moderateScale(24)}
                onPress={() => {
                  handleBp();
                }}
              />
            </View>
          </View>
          {gende?.toLowerCase() === 'female' ? (
            <View style={styles.section}>
              <View>
                <Text style={commonstyles.subhead}>Pregnancy</Text>
                <Seperator />
              </View>

              <View style={styles.fields}>
                <View style={styles.preg}>
                  {/* <Text style={styles.name}>LMP</Text> */}
                  <SelectorBtn
                    label={'LMP'}
                    size={moderateScale(20)}
                    inputstyle={{fontSize: CUSTOMFONTSIZE.h4}}
                    onPress={() => {
                      setOpen(true);
                    }}
                    select={{
                      backgroundColor: ldd
                        ? CUSTOMCOLOR.selector
                        : CUSTOMCOLOR.white,
                    }}
                    name={'calendar'}
                    input={ldd ? formatdate(ldd) : 'Select Date'}
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

                  <SelectorBtn
                    selectContainer={{marginLeft: moderateScale(16)}}
                    label={'EDD'}
                    size={moderateScale(20)}
                    inputstyle={{fontSize: CUSTOMFONTSIZE.h4}}
                    onPress={() => {
                      setEddopen(true);
                    }}
                    select={{
                      backgroundColor: edd
                        ? CUSTOMCOLOR.selector
                        : CUSTOMCOLOR.white,
                    }}
                    name={'calendar'}
                    input={edd ? formatdate(edd) : 'Select Date'}
                  />
                  {eddOpen && (
                    <DatePicker
                      modal
                      open={eddOpen}
                      date={date}
                      theme="auto"
                      mode="date"
                      onConfirm={handleEddConfirm}
                      onCancel={handleEddCancel}
                    />
                  )}
                  <Text
                    style={{
                      color: CUSTOMCOLOR.black,
                      paddingHorizontal: horizontalScale(24),
                      paddingTop: verticalScale(24),
                    }}>
                    Week:{' '}
                    <Text style={styles.weeks}>
                      {isNaN(week_days?.weeks) ? '0' : week_days?.weeks}
                      {'  '}
                    </Text>
                    Days :{' '}
                    <Text style={styles.weeks}>
                      {isNaN(week_days?.days) ? '0' : week_days?.days}
                    </Text>
                  </Text>
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
  weeks: {color: CUSTOMCOLOR.black, fontWeight: '600'},
});

export default VitalScreen;

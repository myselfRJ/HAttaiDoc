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
import {useNavigation} from '@react-navigation/native';
import {HButton, InputText, SelectorBtn} from '../components';
import {CONSTANTS} from '../utility/constant';
import DatePicker from 'react-native-date-picker';
import PrescriptionHead from '../components/prescriptionHead';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
const VitalScreen = props => {
  const months = CONSTANTS.months;
  const nav = useNavigation();
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [edd, setEdd] = useState();

  const navigation = useNavigation();

  const handleDate = () => {
    setOpen(!open);
  };

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    const updateLDD = selectedDate?.toISOString().split('T')[0];
    console.log('date formate', updateLDD);
    lmpChange(updateLDD);
  };
  console.log(
    '-------------------',
    date.toISOString().split('T')[0],
    '------------------------',
  );

  const handleCancel = () => {
    setOpen(open);
  };

  const lmpdate = date.toISOString().split('T')[0];
  const lmpdates = `${lmpdate.split('-')[2]}-${months[lmpdate.split('-')[1]]}-${
    lmpdate.split('-')[0]
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

  console.log(
    '--------------ldd',
    vitals?.LDD,
    '---------------------edd',
    vitals?.EDD,
  );

  const handlePress = () => {
    console.log(vitals);
    dispatch(addVitals(vitals));
    nav.goBack();
  };
  const PulseChange = (text, index) => {
    const updatedVitals = {...vitals, pulse_rate: text};
    // console.log(updatedVitals);
    setVitals(updatedVitals);
    // dispatch(addVitals({ index, text }));
  };
  const weightChange = (text, index) => {
    const updatedVitals = {...vitals, weight: text};
    setVitals(updatedVitals);
    /// dispatch(addVitals({ index, text }));
  };
  const heightChange = (text, index) => {
    const updatedVitals = {...vitals, height: text};
    setVitals(updatedVitals);
    // dispatch(addVitals({ index, text }));
  };
  const tempChange = (text, index) => {
    const updatedVitals = {...vitals, body_temperature: text};
    setVitals(updatedVitals);
    // dispatch(addVitals({ index, text }));
  };
  const rateChange = (text, index) => {
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

    // return BMI;
  };

  useEffect(() => {
    handleBMI();
  }, [vitals.height, vitals.weight]);

  const [bmi, setBmi] = useState();

  const bmiChange = bmi => {
    const updatedVitals = {...vitals, bmi: bmi};
    setVitals(updatedVitals);
    // dispatch(addVitals({ index, text }));
  };
  const diastolicChange = (text, index) => {
    const updatedVitals = {...vitals, diastolic: text};
    setVitals(updatedVitals);
    // dispatch(addVitals({ index, text }));
  };
  const systolicChange = (text, index) => {
    const updatedVitals = {...vitals, systolic: text};
    setVitals(updatedVitals);
    // dispatch(addVitals({ index, text }));
  };

  const lmpChange = lmpdate => {
    console.log('updatedLMMP', updatedVitals);
    const EDD = handleEdd(lmpdate);
    usChange(EDD);
    const updatedVitals = {...vitals, LDD: lmpdate, EDD: EDD};
    setEdd(EDD);
    setVitals(updatedVitals);
    // dispatch(addVitals({ index, text }));
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
    // usChange(EDD);
    return EDD;
  };

  return (
    <>
      <View style={styles.main}>
        <PrescriptionHead heading={Language[language]['vitals']} />
        {/* <Text style={styles.h3}>{Language[language]['vitals']}</Text> */}
        <View>
          <View style={styles.vitalmain}>
            <View style={styles.basiccontainer}>
              <Text style={styles.basic}>Basic</Text>
              <View style={styles.basicFields}>
                <View style={styles.pulsecontainer}>
                  {/* <InputText 
                  textStyle={{paddingVertical:1verticalScale(2})}
                  //lbltext={{paddingVertical:4verticalScale(}})
                  label= {Language[language]['pulse_rate']} 
                  placeholder= {Language[language]['bpm']} 
                  setValue={text => PulseChange(text, props.index)}/> */}

                  <InputText
                    label="Pulse"
                    placeholder="bpm"
                    setValue={text => PulseChange(text, props.index)}
                  />
                </View>
                <View style={styles.weightcontainer}>
                  <InputText
                    label={Language[language]['weight']}
                    placeholder="kg"
                    setValue={text => weightChange(text, props.index)}
                  />
                </View>
                <View style={styles.heightcontainer}>
                  <InputText
                    label={Language[language]['height']}
                    placeholder="cm"
                    setValue={text => heightChange(text, props.index)}
                  />
                </View>
                {bmi !== 'NaN' ? (
                  <View style={styles.bmicontainer}>
                    <Text style={styles.bmi}>{Language[language]['bmi']}</Text>
                    <Text style={styles.bmitext}>{bmi}</Text>
                  </View>
                ) : (
                  <View style={styles.bmicontainer}>
                    <Text style={styles.bmi}>{Language[language]['bmi']}</Text>
                    <Text style={styles.bmitext}>{'00'}</Text>
                  </View>
                )}
                <View style={styles.tempcontainer}>
                  <InputText
                    label={Language[language]['temp']}
                    placeholder="°C"
                    setValue={text => tempChange(text, props.index)}
                  />
                  {/* <Text style={styles.temp}>{Language[language]['temp']}</Text> */}
                </View>
                <View style={styles.ratecontainer}>
                  <InputText
                    label={Language[language]['rate']}
                    placeholder="brpm"
                    setValue={text => rateChange(text, props.index)}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.bloodPres}>Blood Pressure</Text>
            <View style={styles.bloodPressureContainer}>
              <View style={styles.diascontainer}>
                <InputText
                  label={Language[language]['diastolic_bp']}
                  placeholder={Language[language]['diastolic_bp']}
                  setValue={text => diastolicChange(text, props.index)}
                />
              </View>

              <View style={styles.syscontainer}>
                <InputText
                  label={Language[language]['systolic_bp']}
                  placeholder={Language[language]['systolic_bp']}
                  setValue={text => systolicChange(text, props.index)}
                />
              </View>
            </View>
            <Text style={styles.pregText}>Pregnancy</Text>
            <View style={styles.pregnancyFields}>
              <View style={styles.lmpcontainer}>
                <Text style={styles.lmp}>{Language[language]['lmp_edd']}:</Text>
                <View style={styles.hardText}>
                  <SelectorBtn
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
                  {/* <Text
                    style={{padding: moderateScale(21), backgroundColor: CUSTOMCOLOR.white}}>
                    week
                  </Text> */}
                </View>
              </View>
              <View style={styles.uscontainer}>
                <Text style={styles.us}>{Language[language]['us_edd']}:</Text>
                {/* <View style={styles.hardText}> */}
                {/* <TextInput
                    value={handleedd}
                    onChangeText={usChange}
                    style={styles.ustext}
                    keyboardType="numeric"
                  /> */}
                {/* <Text></Text> */}
                <Text style={styles.EDD}>{vitals?.EDD}</Text>
                {/* </View> */}
              </View>
            </View>
          </View>
          <View style={{top: moderateScale(100), alignItems: 'center'}}>
            <HButton
              label={Language[language]['submit']}
              onPress={handlePress}
            />
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
  },
  EDD: {
    padding: moderateScale(12),
    backgroundColor: CUSTOMCOLOR.white,
    color: CUSTOMCOLOR.primary,
    fontSize: CUSTOMFONTSIZE.h4,
    width: moderateScale(100),
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(4),
  },
  inpcontainer: {
    flexDirection: 'row',
    width: '100%',
    //paddingHorizontal: horizontalScale(4),
    paddingVertical: verticalScale(8),
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '700',
    gap: moderateScale(4),
    borderRadius: moderateScale(4),
    paddingHorizontal: horizontalScale(8),
  },
  vitalmain: {
    width: '100%',
    // height: 309,
    gap: moderateScale(4),
    padding: moderateScale(8),
  },
  basiccontainer: {
    width: '100%',
  },
  basic: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: '600',
    paddingHorizontal: horizontalScale(8),
    color: CUSTOMCOLOR.black,
    //gap: 10,
    fontSize: CUSTOMFONTSIZE.h2,
  },
  basicFields: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    gap: moderateScale(16),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
  pulsecontainer: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
  pulse: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
  },
  pulsetext: {
    paddingVertical: verticalScale(16),
    gap: moderateScale(4),
    backgroundColor: CUSTOMCOLOR.white,
  },
  weightcontainer: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
  weight: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
  },
  hardText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // text: {
  //   fontSize: CUSTOMFONTSIZE.h4,
  //   color: CUSTOMCOLOR.black,
  //   backgroundColor: CUSTOMCOLOR.white,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  weighttext: {
    paddingVertical: verticalScale(16),
    gap: moderateScale(4),
    backgroundColor: CUSTOMCOLOR.white,
  },
  heightcontainer: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
  height: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
  },
  heighttext: {
    paddingVertical: verticalScale(16),
    gap: moderateScale(4),
    backgroundColor: CUSTOMCOLOR.white,
  },
  tempcontainer: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
  temp: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
  },
  temptext: {
    paddingVertical: verticalScale(16),
    gap: moderateScale(4),
    backgroundColor: CUSTOMCOLOR.white,
  },
  ratecontainer: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
  rate: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
  },
  ratetext: {
    paddingVertical: verticalScale(16),
    gap: moderateScale(4),
    backgroundColor: CUSTOMCOLOR.white,
  },
  bmicontainer: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
  bmi: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
  },
  bmitext: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(8),
    top: moderateScale(2),
    gap: moderateScale(8),
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(4),
    color: CUSTOMCOLOR.primary,
  },
  bloodPressureContainer: {
    paddingHorizontal: horizontalScale(8),
    // paddingVertical: verticalScale(4,)
    flexDirection: 'row',
    gap: moderateScale(4),
    top: moderateScale(8),
  },
  bloodPres: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    gap: moderateScale(10),
    color: CUSTOMCOLOR.black,
    top: moderateScale(16),
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: 600,
    fontSize: CUSTOMFONTSIZE.h2,
  },
  diascontainer: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
  diastolic: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
    lineHeight: 16.34,
  },
  diatext: {
    paddingVertical: verticalScale(16),
    gap: moderateScale(4),

    backgroundColor: CUSTOMCOLOR.white,
  },
  syscontainer: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
  systolic: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
  },
  systext: {
    paddingVertical: verticalScale(16),
    gap: moderateScale(4),
    backgroundColor: CUSTOMCOLOR.white,
  },
  pregText: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    //gap: 10,
    color: CUSTOMCOLOR.black,
    top: moderateScale(16),
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: 600,
    fontSize: CUSTOMFONTSIZE.h2,
  },
  pregnancyFields: {
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(4),
    flexDirection: 'row',
    gap: moderateScale(16),
    top: moderateScale(16),
  },
  lmpcontainer: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    gap: moderateScale(4),
    // paddingRight: '15%',
  },
  lmp: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
  },
  lmptext: {
    paddingVertical: verticalScale(16),
    gap: moderateScale(4),
    backgroundColor: CUSTOMCOLOR.white,
  },
  uscontainer: {
    // paddingHorizontal: horizontalScale(8),
    // paddingVertical: verticalScale(4,)
    gap: moderateScale(4),
  },
  us: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
  },
  ustext: {
    paddingVertical: verticalScale(16),
    gap: moderateScale(4),
    backgroundColor: CUSTOMCOLOR.white,
  },
  submitbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(8),
    alignSelf: 'center',
    margin: moderateScale(100),
    borderWidth: 1,
    borderColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(4),
  },
});

export default VitalScreen;

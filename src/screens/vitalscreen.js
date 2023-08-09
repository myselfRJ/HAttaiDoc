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
import {HButton} from '../components';
import {CONSTANTS} from '../utility/constant';
const VitalScreen = props => {
  const months = CONSTANTS.months;
  const nav = useNavigation();
  const dispatch = useDispatch();
  const [vitals, setVitals] = useState({
    pulse_rate: '',
    weight: '',
    height: '',
    body_temperature: '',
    rate: '',
    bmi: '',
    diastolic: '',
    systolic: '',
    LDD: new Date(),
    EDD: '',
  });

  const handlePress = () => {
    console.log(vitals);
    dispatch(addVitals(vitals));
    nav.goBack();
  };
  const PulseChange = (text, index) => {
    const updatedVitals = {...vitals, pulse_rate: text};
    console.log(updatedVitals);
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
    return BMI;
  };

  useEffect(() => {
    handleBMI();
  }, []);
  const bmiChange = (text, index) => {
    const updatedVitals = {...vitals, bmi: handleBMI()};
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

  const lmpChange = (text, index) => {
    const updatedVitals = {...vitals, LDD: text};
    setVitals(updatedVitals);
    // dispatch(addVitals({ index, text }));
  };

  const handleEdd = () => {
    var startDate = new Date(vitals?.LDD);
    var numberOfDaysToAdd = 280;
    var endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + numberOfDaysToAdd);
    var formattedEndDate = endDate.toISOString().substring(0, 10);
    const day = formattedEndDate.split('-')[2];
    const year = formattedEndDate.split('-')[0];
    const month = months[`${formattedEndDate.split('-')[1]}`];
    const EDD = `${day}-${month}-${year}`;
    return EDD;
  };
  useEffect(() => {
    handleEdd();
  }, []);

  const usChange = (text, index) => {
    const updatedVitals = {...vitals, EDD: handleEdd()};
    setVitals(updatedVitals);
    // dispatch(addVitals({ index, text }));
  };

  return (
    <>
      <View style={{paddingHorizontal: 24, paddingVertical: 24}}>
        <Text style={styles.h3}>{Language[language]['vitals']}</Text>
        <View>
          <View style={styles.vitalmain}>
            <View style={styles.basiccontainer}>
              <Text style={styles.basic}>Basic</Text>
              <View style={styles.basicFields}>
                <View style={styles.pulsecontainer}>
                  <Text style={styles.pulse}>
                    {Language[language]['pulse_rate']}:
                  </Text>

                  <TextInput
                    value={vitals.pulse_rate}
                    onChangeText={text => PulseChange(text, props.index)}
                    style={styles.pulsetext}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.weightcontainer}>
                  <Text style={styles.weight}>
                    {Language[language]['weight']}
                  </Text>
                  <View style={styles.hardText}>
                    <TextInput
                      value={vitals.weight}
                      onChangeText={text => weightChange(text, props.index)}
                      style={styles.weighttext}
                      keyboardType="numeric"
                    />
                    <Text
                      style={{padding: 21, backgroundColor: CUSTOMCOLOR.white}}>
                      kg
                    </Text>
                  </View>
                </View>
                <View style={styles.heightcontainer}>
                  <Text style={styles.height}>
                    {Language[language]['height']}
                  </Text>
                  <View style={styles.hardText}>
                    <TextInput
                      value={vitals.height}
                      onChangeText={text => heightChange(text, props.index)}
                      style={styles.heighttext}
                      keyboardType="numeric"
                    />
                    <Text
                      style={{padding: 21, backgroundColor: CUSTOMCOLOR.white}}>
                      cm
                    </Text>
                  </View>
                </View>
                <View style={styles.tempcontainer}>
                  <Text style={styles.temp}>{Language[language]['temp']}</Text>
                  <View style={styles.hardText}>
                    <TextInput
                      value={vitals.body_temperature}
                      onChangeText={text => tempChange(text, props.index)}
                      style={styles.temptext}
                      keyboardType="numeric"
                    />
                    <Text
                      style={{padding: 21, backgroundColor: CUSTOMCOLOR.white}}>
                      °C
                    </Text>
                  </View>
                </View>
                <View style={styles.ratecontainer}>
                  <Text style={styles.rate}>{Language[language]['rate']}</Text>
                  <TextInput
                    value={vitals.rate}
                    onChangeText={text => rateChange(text, props.index)}
                    style={styles.ratetext}
                  />
                </View>
                <View style={styles.bmicontainer}>
                  <Text style={styles.bmi}>{Language[language]['bmi']}</Text>
                  <TextInput
                    value={vitals.bmi}
                    onChangeText={text => bmiChange(text, props.index)}
                    style={styles.bmitext}
                  />
                </View>
              </View>
            </View>
            <Text style={styles.bloodPres}>Blood Pressure</Text>
            <View style={styles.bloodPressureContainer}>
              <View style={styles.diascontainer}>
                <Text style={styles.diastolic}>
                  {Language[language]['diastolic_bp']}:
                </Text>
                <View style={styles.hardText}>
                  <TextInput
                    value={vitals.diastolic}
                    onChangeText={text => diastolicChange(text, props.index)}
                    style={styles.diatext}
                    keyboardType="numeric"
                  />
                  <Text
                    style={{padding: 21, backgroundColor: CUSTOMCOLOR.white}}>
                    mmHg
                  </Text>
                </View>
              </View>

              <View style={styles.syscontainer}>
                <Text style={styles.systolic}>
                  {Language[language]['systolic_bp']}:
                </Text>
                <View style={styles.hardText}>
                  <TextInput
                    value={vitals.systolic_bp}
                    onChangeText={text => systolicChange(text, props.index)}
                    style={styles.systext}
                    keyboardType="numeric"
                  />
                  <Text
                    style={{padding: 21, backgroundColor: CUSTOMCOLOR.white}}>
                    mmHg
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.pregText}>Pregnancy</Text>
            <View style={styles.pregnancyFields}>
              <View style={styles.lmpcontainer}>
                <Text style={styles.lmp}>{Language[language]['lmp_edd']}:</Text>
                <View style={styles.hardText}>
                  <TextInput
                    value={vitals.LDD}
                    onChangeText={text => lmpChange(text, props.index)}
                    style={styles.lmptext}
                    keyboardType="numeric"
                  />
                  <Text
                    style={{padding: 21, backgroundColor: CUSTOMCOLOR.white}}>
                    week
                  </Text>
                </View>
              </View>
              <View style={styles.uscontainer}>
                <Text style={styles.us}>{Language[language]['us_edd']}:</Text>
                <View style={styles.hardText}>
                  <TextInput
                    value={vitals.EDD}
                    onChangeText={text => usChange(text, props.index)}
                    style={styles.ustext}
                    keyboardType="numeric"
                  />
                  <Text
                    style={{padding: 21, backgroundColor: CUSTOMCOLOR.white}}>
                    week
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{top: 100, alignItems: 'center'}}>
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
  inpcontainer: {
    flexDirection: 'row',
    width: '100%',
    //paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '700',
    gap: 4,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  text: {
    fontWeight: 500,
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
  },
  h2: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
    padding: 10,
  },
  h3: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
    padding: 10,
  },
  vitalmain: {
    width: '100%',
    // height: 309,
    gap: 4,
    padding: 8,
  },
  // basiccontainer: {
  //   width: '70%',
  //   height: 87,

  // },
  basic: {
    fontFamily: CUSTOMFONTFAMILY.opensans,
    paddingHorizontal: 8,
    color: CUSTOMCOLOR.black,
    gap: 10,
  },
  basicFields: {
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: 700,
    gap: 32,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pulsecontainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pulse: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
  },
  pulsetext: {
    paddingVertical: 16,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white,
  },
  weightcontainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  weight: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
  },
  hardText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
    backgroundColor: CUSTOMCOLOR.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weighttext: {
    paddingVertical: 16,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white,
  },
  heightcontainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  height: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
  },
  heighttext: {
    paddingVertical: 16,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white,
  },
  tempcontainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  temp: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
  },
  temptext: {
    paddingVertical: 16,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white,
  },
  ratecontainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  rate: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
  },
  ratetext: {
    paddingVertical: 16,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white,
  },
  bmicontainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 70,
  },
  bmi: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
  },
  bmitext: {
    paddingVertical: 16,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white,
  },
  bloodPressureContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    gap: 4,
    top: 16,
  },
  bloodPres: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 10,
    color: CUSTOMCOLOR.black,
    top: 16,
  },
  diascontainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  diastolic: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
    lineHeight: 16.34,
  },
  diatext: {
    paddingVertical: 16,
    gap: 4,

    backgroundColor: CUSTOMCOLOR.white,
  },
  syscontainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  systolic: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
  },
  systext: {
    paddingVertical: 16,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white,
  },
  pregText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 10,
    color: CUSTOMCOLOR.black,
    top: 16,
  },
  pregnancyFields: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    //gap: 32,
    top: 16,
  },
  lmpcontainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  lmp: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
  },
  lmptext: {
    paddingVertical: 16,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white,
  },
  uscontainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  us: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
  },
  ustext: {
    paddingVertical: 16,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white,
  },
  submitbtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    alignSelf: 'center',
    margin: 100,
    borderWidth: 1,
    borderColor: CUSTOMCOLOR.primary,
    borderRadius: 4,
  },
});

export default VitalScreen;

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
  
    if (BMI !==NaN){
      bmiChange(BMI);
      setBmi(BMI);

    }else{
      bmiChange(null);
      setBmi(null)
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
      <View style={{paddingHorizontal: 24, paddingVertical: 24}}>
        <PrescriptionHead heading={Language[language]['vitals']}/>
        {/* <Text style={styles.h3}>{Language[language]['vitals']}</Text> */}
        <View>
          <View style={styles.vitalmain}>
            <View style={styles.basiccontainer}>
              <Text style={styles.basic}>Basic</Text>
              <View style={styles.basicFields}>
                <View style={styles.pulsecontainer}>
                 

                  <InputText 
                  label= {Language[language]['pulse_rate']} 
                  placeholder= {Language[language]['pulse_rate']}
                  setValue={text => PulseChange(text, props.index)}/>
                
                </View>
                <View style={styles.weightcontainer}>
                
                <InputText 
                  label= {Language[language]['weight']} 
                  placeholder= {Language[language]['weight']}
                  setValue= {text => weightChange(text, props.index)}/>
                </View>
                <View style={styles.heightcontainer}>
                <InputText 
                  label= {Language[language]['height']} 
                  placeholder= {Language[language]['height']}
                  setValue= {text => heightChange(text, props.index)}/>
                
                </View>
                <View style={styles.tempcontainer}>
                <InputText 
                  label= {Language[language]['temp']} 
                  placeholder= {Language[language]['temp']}
                  setValue= {text => tempChange(text, props.index)}/>
                  {/* <Text style={styles.temp}>{Language[language]['temp']}</Text> */}
                </View>
                <View style={styles.ratecontainer}>
                <InputText 
                  label= {Language[language]['rate']} 
                  placeholder= {Language[language]['rate']}
                  setValue= {text => rateChange(text, props.index)}/>
            
                </View>
                {bmi!= NaN &&<View style={styles.bmicontainer}>
                  <Text style={styles.bmi}>{Language[language]['bmi']}</Text>
                  <Text style={styles.bmitext}>{bmi}</Text>
                </View>}
              </View>
            </View>
            <Text style={styles.bloodPres}>Blood Pressure</Text>
            <View style={styles.bloodPressureContainer}>
          
              <View style={styles.diascontainer}>
              <InputText 
                  label= {Language[language]['diastolic_bp']} 
                  placeholder= {Language[language]['diastolic_bp']}
                  setValue= {text => diastolicChange(text, props.index)}/>
           
                </View>
              

              <View style={styles.syscontainer}>
              <InputText 
                  label= {Language[language]['systolic_bp']} 
                  placeholder= {Language[language]['systolic_bp']}
                  setValue= {text => systolicChange(text, props.index)}/>
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
                    style={{padding: 21, backgroundColor: CUSTOMCOLOR.white}}>
                    week
                  </Text> */}
                </View>
              </View>
            {vitals.EDD &&  <View style={styles.uscontainer}>
                <Text style={styles.us}>{Language[language]['us_edd']}:</Text>
                <View style={styles.hardText}>
                  {/* <TextInput
                    value={handleedd}
                    onChangeText={usChange}
                    style={styles.ustext}
                    keyboardType="numeric"
                  /> */}
                  {/* <Text></Text> */}
                  <Text
                    style={{
                      padding: 16,
                      backgroundColor: CUSTOMCOLOR.white,
                      color: CUSTOMCOLOR.black,
                    }}>
                    {vitals?.EDD}
                  </Text>
                </View>
              </View>}
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
    fontSize: 14,
    fontWeight: '600',
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
  basiccontainer: {
    width: '70%',
  },
  basic: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight:600,
    paddingHorizontal: 8,
    color: CUSTOMCOLOR.black,
    gap: 10,
  },
  basicFields: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    gap: 16,
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
  },
  bmi: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
  },
  bmitext: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white,
  },
  bloodPressureContainer: {
    paddingHorizontal: 8,
    // paddingVertical: 4,
    flexDirection: 'row',
    gap: 4,
    top: 8,
  },
  bloodPres: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 10,
    color: CUSTOMCOLOR.black,
    top: 16,
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight:600,
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
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight:600,
  },
  pregnancyFields: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    gap: 36,
    top: 16,
  },
  lmpcontainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
    paddingRight: '15%',
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

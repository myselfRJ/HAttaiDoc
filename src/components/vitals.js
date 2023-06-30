import { View, StyleSheet, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMCOLOR, CUSTOMFONTSIZE, CUSTOMFONTFAMILY } from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import { useState, useEffect } from 'react';
const Vitals = props => {
  //props-> label, placeholder , action
  const [vitalsData, setVitalsData] = useState([
    { pulse_rate: '', weight: '', height: '', temp: '', rate: '', bmi: '', diastolic_bp: '', systolic_bp: '', lmp_edd: '', us_edd: '' }
  ]);
  const PulseChange = (text, index) => {
    const newData = [...vitalsData];
    newData[index].pulse_rate = text;
    setVitalsData(newData);
  };
  const weightChange = (text, index) => {
    const newData = [...vitalsData];
    newData[index].weight = text;
    setVitalsData(newData);
  };
  const heightChange = (text, index) => {
    const newData = [...vitalsData];
    newData[index].height = text;
    setVitalsData(newData);
  };
  const tempChange = (text, index) => {
    const newData = [...vitalsData];
    newData[index].temp = text;
    setVitalsData(newData);
  };
  const rateChange = (text, index) => {
    const newData = [...vitalsData];
    newData[index].rate = text;
    setVitalsData(newData);
  };
  const bmiChange = (text, index) => {
    const newData = [...vitalsData];
    newData[index].bmi = text;
    setVitalsData(newData);
  };
  const diastolicChange = (text, index) => {
    const newData = [...vitalsData];
    newData[index].diastolic_bp = text;
    setVitalsData(newData);
  };
  const systolicChange = (text, index) => {
    const newData = [...vitalsData];
    newData[index].systolic_bp = text;
    setVitalsData(newData);
  };
  const lmpChange = (text, index) => {
    const newData = [...vitalsData];
    newData[index].lmp_edd = text;
    setVitalsData(newData);
  };
  const usChange = (text, index) => {
    const newData = [...vitalsData];
    newData[index].us_edd = text;
    setVitalsData(newData);
  };

  return (
    <>
      <View>
        <Icon name={props.icon} color={CUSTOMCOLOR.primary} size={16} />
        <Text style={styles.h2}>{Language[language]['consultation']}</Text>
        <Text style={styles.h3}>{Language[language]['vitals']}</Text>
        <View>
          {vitalsData.map((data, index) => (

            <View key={index} style={styles.vitalmain}>
              <View style={styles.basiccontainer}>
                <Text style={styles.basic}>Basic</Text>
                <View style={styles.basicFields}>
                  <View style={styles.pulsecontainer}>
                    <Text style={styles.pulse}>{Language[language]['pulse_rate']}:</Text>

                    <TextInput value={data.pulse_rate} onChangeText={text => PulseChange(text, index)}
                      style={styles.pulsetext} keyboardType='numeric'/>


                  </View>
                  <View style={styles.weightcontainer}>
                    <Text style={styles.weight}>{Language[language]['weight']}</Text>
                    <View style={styles.hardText}>
                      <TextInput value={data.weight} onChangeText={text => weightChange(text, index)}
                        style={styles.weighttext} keyboardType='numeric'/>
                      <Text style={styles.weighttext}>kg</Text>
                    </View>
                  </View>
                  <View style={styles.heightcontainer}>
                    <Text style={styles.height}>{Language[language]['height']}</Text>
                    <View style={styles.hardText}>
                      <TextInput value={data.height} onChangeText={text => heightChange(text, index)}
                        style={styles.heighttext} keyboardType='numeric' />
                      <Text style={styles.text}>cm</Text>
                    </View>
                  </View>
                  <View style={styles.tempcontainer}>
                    <Text style={styles.temp}>{Language[language]['temp']}</Text>
                    <View style={styles.hardText}>
                      <TextInput value={data.temp} onChangeText={text => tempChange(text, index)}
                        style={styles.temptext} keyboardType='numeric'/>
                      <Text style={styles.text}>°C</Text>
                    </View>
                  </View>
                  <View style={styles.ratecontainer}>
                    <Text style={styles.rate}>{Language[language]['rate']}</Text>
                    <TextInput value={data.rate} onChangeText={text => rateChange(text, index)}
                      style={styles.ratetext} />
                  </View>
                  <View style={styles.bmicontainer}>
                    <Text style={styles.bmi}>{Language[language]['bmi']}</Text>
                    <TextInput value={data.bmi} onChangeText={text => bmiChange(text, index)}
                      style={styles.bmitext} />
                  </View>
                </View>
              </View>
              <Text style={styles.bloodPres}>Blood Pressure</Text>
              <View style={styles.bloodPressureContainer}>
                <View style={styles.diascontainer}>
                  <Text style={styles.diastolic}>{Language[language]['diastolic_bp']}:</Text>
                  <View style={styles.hardText}>
                    <TextInput value={data.diastolic_bp} onChangeText={text => diastolicChange(text, index)}
                      style={styles.diatext} keyboardType='numeric'/>
                    <Text style={styles.text}>mmHg</Text>
                  </View>
                </View>
              
              <View style={styles.syscontainer}>
                <Text style={styles.systolic}>{Language[language]['systolic_bp']}:</Text>
                <View style={styles.hardText}>
                  <TextInput value={data.systolic_bp} onChangeText={text => systolicChange(text, index)}
                    style={styles.systext} keyboardType='numeric'/>
                  <Text style={styles.text}>mmHg</Text>
                </View>
              </View>
            </View>
              <Text style={styles.basic}>Pregnancy</Text>
              <View style={styles.pregnancyFields}>
                <View style={styles.lmpcontainer}>
                  <Text style={styles.lmp}>{Language[language]['lmp_edd']}:</Text>
                  <View style={styles.hardText}>
                    <TextInput value={data.lmp_edd} onChangeText={text => lmpChange(text, index)}
                      style={styles.lmptext} keyboardType='numeric'/>
                      <Text style={styles.text}>week</Text>
                  </View>
                </View>
                <View style={styles.uscontainer}>
                  <Text style={styles.us}>{Language[language]['us_edd']}:</Text>
                  <View style={styles.hardText}>
                  <TextInput value={data.us_edd} onChangeText={text => usChange(text, index)}
                    style={styles.ustext} keyboardType='numeric'/>
                    <Text style={styles.text}>week</Text>
                  </View>
                </View>
              </View>
            </View>

          ))}


        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  inpcontainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '700',
    gap: 4,
    borderRadius: 4,
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
    padding: 10
  },
  h3: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
    padding: 10
  },
  vitalmain: {
    width: 651,
    height: 309,
    gap: 4,
    padding: 8,
    gap: 16
  },
  basiccontainer: {
    width: 443,
    height: 87

  },
  basic: {
    fontFamily: CUSTOMFONTFAMILY.opensans,
    padding: 4,
    color: CUSTOMCOLOR.black,
    gap: 10,
  },
  basicFields: {
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //justifyContent: 'space-between',
    alignItems: 'center',
    width: 700,
    height: 60,
    gap: 32,
    //borderWidth:1


  },
  pulsecontainer: {
    width: 70,
    height: 60,
    padding: 4,
    gap: 4
  },
  pulse: {
    fontSize: 12,
    color: CUSTOMCOLOR.black
  },
  pulsetext: {
    padding: 8,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white
  },
  weightcontainer: {
    width: 62,
    height: 62,
    padding: 8,
    gap: 4
  },
  weight: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
    //flexDirection: "row"
  },
  hardText: {
    flexDirection: "row"
  },
  text: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
    backgroundColor: CUSTOMCOLOR.white,
    alignSelf:"center"
  },
  weighttext: {
    padding: 8,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white

  },
  // changetext: {
  //   borderWidth: 1,
  //   height: 30,
  //   width: 70,
  //   borderRadius: 5,
  //   padding: 5,
  //   marginLeft: 5,
  //   margin: 5,
  //   borderColor: CUSTOMCOLOR.primary
  // },
  heightcontainer: {
    width: 70,
    height: 60,
    padding: 8,
    gap: 4
  },
  height: {
    fontSize: 12,
    color: CUSTOMCOLOR.black
  },
  heighttext: {
    padding: 8,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white
  },
  tempcontainer: {
    width: 59,
    height: 60,
    padding: 8,
    gap: 4
  },
  temp: {
    fontSize: 12,
    color: CUSTOMCOLOR.black
  },
  temptext: {
    padding: 8,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white
  },
  ratecontainer: {
    width: 88,
    height: 60,
    padding: 8,
    gap: 4
  },
  rate: {
    fontSize: 12,
    color: CUSTOMCOLOR.black

  },
  ratetext: {
    padding: 8,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white
  },
  bmicontainer: {
    width: 54,
    height: 60,
    padding: 8,
    gap: 4
  },
  bmi: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
    backgroundColor: CUSTOMCOLOR.white
  },
  bmitext: {
    padding: 8,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white
  },
  bloodPressureContainer: {
    width: 185,
    height: 87,
    flexDirection: 'row',
  },
  bloodPres: {
    padding: 8,
    gap: 10,
    color: CUSTOMCOLOR.black
  },
  diascontainer: {
    width: 94,
    height: 60,
    padding: 8,
    gap: 4
  },
  diastolic: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
    lineHeight: 16.34,
    
  },
  diatext: {
    padding: 8,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white
  },
  syscontainer: {
    width: 87,
    height: 60,
    padding: 8,
    gap: 4
  },
  systolic: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,

  },
  systext: {
    padding: 8,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white
  },
  pregnancyFields: {
    width: 152,
    height: 87,
    flexDirection: 'row',
    gap:16
  },
  lmpcontainer: {
    width: 72,
    height: 60,
    padding: 8,
    gap: 4
  },
  lmp: {
    fontSize: 12,
    color: CUSTOMCOLOR.black,
  },
  lmptext: {
    padding: 8,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white
  },
  uscontainer: {
    width: 72,
    height: 60,
    padding: 8,
    gap: 4
  },
  us: {
    fontSize: 12,
    color: CUSTOMCOLOR.black
  },
  ustext: {
    padding: 8,
    gap: 4,
    backgroundColor: CUSTOMCOLOR.white
  }

});

export default Vitals;

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Option from '../components/option';
// import {language} from '../settings/userpreferences';
// import {Language} from '../settings/customlanguage';
// import PlusButton from '../components/plusbtn';
// import Button from '../components/Button';
// import {useSelector, useDispatch} from 'react-redux';

// const Symptoms = () => {
//   const [symptomsData, setSymptomsData] = useState([
//     {symptom: '', days: '', severity: ''},
//   ]);
//   const [visible, setVisible] = useState(false);

//   const handleAddSymptoms = () => {
//     const newData = [...symptomsData];
//     newData.push({symptom: '', days: '', severity: ''});
//     setSymptomsData(newData);
//     setVisible(true);
//   };
//   const handleDeleteSymptom = index => {
//     const newData = [...symptomsData];
//     newData.splice(index, 1);
//     setSymptomsData(newData);
//   };

//   const SymptomChange = (text, index) => {
//     const newData = [...symptomsData];
//     newData[index].symptom = text;
//     setSymptomsData(newData);
//   };

//   const DaysChange = (text, index) => {
//     const newData = [...symptomsData];
//     newData[index].days = text;
//     setSymptomsData(newData);
//   };

//   const SeverityChange = (value, index) => {
//     const newData = [...symptomsData];
//     newData[index].severity = value;
//     setSymptomsData(newData);
//   };

//   return (
//     <ScrollView>
//       <View style={styles.mainContainer}>
//         <View style={{margin: 10}}>
//           <Text style={styles.mainHead}>{Language[language]['symptoms']}</Text>
//         </View>
//         <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
//           <View style={{flexDirection: 'column'}}>
//             {symptomsData.map((data, index) => (
//               <View
//                 key={index}
//                 style={{flexDirection: 'row', padding: 10, flexWrap: 'wrap'}}>
//                 <View style={styles.symptomInput}>
//                   <Text style={{padding: 10, fontWeight: 'bold'}}>
//                     {Language[language]['symptoms']}:
//                   </Text>

//                   <View
//                     style={{
//                       height: 40,
//                       width: 100,
//                       textAlignVertical: 'top',
//                     }}>
//                     <TextInput
//                       placeholder="enter Symptom"
//                       value={data?.symptom}
//                       onChangeText={text => SymptomChange(text, index)}
//                     />
//                   </View>
//                 </View>
//                 <View style={styles.DateInput}>
//                   <Text style={{padding: 10, fontWeight: 'bold'}}>
//                     {Language[language]['days']}:
//                   </Text>
//                   <View
//                     style={{
//                       height: 40,
//                       width: 100,
//                       textAlignVertical: 'top',
//                     }}>
//                     <TextInput
//                       placeholder="enter Days"
//                       value={symptomInput?.days}
//                       onChangeText={text => DaysChange(text, index)}
//                     />
//                   </View>
//                 </View>
//                 <View style={styles.radiogroup}>
//                   <Text style={{padding: 10, fontWeight: 'bold'}}>
//                     {Language[language]['severity']}:
//                   </Text>
//                   <View style={{flexDirection: 'row'}}>
//                     <Option
//                       label="Low"
//                       value="low"
//                       selected={symptomInput?.severity === 'low'}
//                       onPress={() => SeverityChange('low', index)}
//                     />
//                     <Option
//                       label="Medium"
//                       value="medium"
//                       selected={symptomInput?.severity === 'medium'}
//                       onPress={() => SeverityChange('medium', index)}
//                     />
//                     <Option
//                       label="High"
//                       value="high"
//                       selected={symptomInput?.severity === 'high'}
//                       onPress={() => SeverityChange('high', index)}
//                     />
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </View>
//           <TouchableOpacity onPress={handleAddSymptoms}>
//             <Icon name="plus" style={[styles.PlusText, styles.PlusButton]} />
//           </TouchableOpacity>
//           {visible && symptomsData?.length !== 1 && (
//             <TouchableOpacity onPress={handleDeleteSymptom}>
//               <Icon name="minus" style={[styles.PlusText, styles.PlusButton]} />
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//   },
//   mainHead: {
//     color: 'black',
//     fontSize: 20,
//     fontWeight: 'bold',
//     padding: 10,
//   },
//   symptomInput: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     padding: 8,
//   },
//   DateInput: {
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     padding: 8,
//   },
//   radiogroup: {
//     flexDirection: 'row',
//     padding: 8,
//     gap: 8,
//   },
//   PlusText: {
//     fontSize: 40,
//     color: '#fff',
//   },
//   PlusButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 50,
//     width: 50,
//     backgroundColor: '#4ba5fa',
//     borderColor: '#fff',
//     borderWidth: 2,
//     borderRadius: 100,
//     padding: 4,
//   },
//   line: {
//     margin: 8,
//     height: 0.5,
//     width: '100%',
//     backgroundColor: 'blue',
//   },
// });

// export default Symptoms;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Option from '../components/option';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {HButton, PlusButton} from '../components';
import {useSelector, useDispatch} from 'react-redux';
import {addSymptom} from '../redux/features/prescription/symptomslice';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';

const Symptoms = ({navigation}) => {
  const symptomsData = useSelector(state => state.symptoms.symptom);

  const dispatch = useDispatch();
  const [symptomInput, setSymptomInput] = useState(symptomsData);
  console.log(symptomInput, '=====', symptomsData);
  useEffect(() => {
    console.log(symptomInput.length);
  }, [symptomInput.length, symptomsData.length]);
  const handleAddSymptoms = () => {
    const uuid = Math.random() + 'tt';
    let symptomCopy = symptomInput;
    dispatch(addSymptom(symptomCopy));
    setSymptomInput(state => [...state, {symptom: '', days: '', severity: ''}]);

    console.log(uuid);
  };

  const handleSymptomSubmit = () => {
    setSymptomInput(state => [...state, {symptom: '', days: '', severity: ''}]);
  };

  const handleDeleteSymptom = () => {
    let symptomCopy = [...symptomInput];
    console.log(symptomCopy);
    symptomCopy.pop();
    dispatch(addSymptom(symptomCopy));
    setSymptomInput(symptomCopy);
  };

  const handleSymptomChange = (text, index, field) => {
    setSymptomInput(prevState => {
      const symptomCopy = [...prevState];
      symptomCopy[index][field] = text;
      return symptomCopy;
    });
  };
  //dispatch(updateSymptom({index, field: 'symptom', value: text}));

  // const handleDaysChange = (text, index) => {
  //   dispatch(updateSymptom({index, field: 'days', value: text}));
  // };

  // const handleSeverityChange = (value, index) => {
  //   dispatch(updateSymptom({index, field: 'severity', value}));
  // };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={{margin: 10}}>
          <Text style={styles.mainHead}>{Language[language]['symptoms']}</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
          <View style={{flexDirection: 'column'}}>
            {symptomInput?.map((data, index) => (
              <View
                key={data.uuid}
                style={{flexDirection: 'row', padding: 10, flexWrap: 'wrap'}}>
                <View style={styles.symptomInput}>
                  <Text style={{padding: 10, fontWeight: 'bold'}}>
                    {Language[language]['symptoms']}:
                  </Text>
                  <View
                    style={{
                      height: 40,
                      width: 100,
                      textAlignVertical: 'top',
                    }}>
                    <TextInput
                      placeholder="enter Symptom"
                      value={data?.symptom}
                      onChangeText={text =>
                        handleSymptomChange(text, index, 'symptom')
                      }
                    />
                  </View>
                </View>
                <View style={styles.DateInput}>
                  <Text style={{padding: 10, fontWeight: 'bold'}}>
                    {Language[language]['days']}:
                  </Text>
                  <View
                    style={{
                      height: 40,
                      width: 100,
                      textAlignVertical: 'top',
                    }}>
                    <TextInput
                      placeholder="enter Days"
                      value={data?.days}
                      onChangeText={text =>
                        handleSymptomChange(text, index, 'days')
                      }
                    />
                  </View>
                </View>
                <View style={styles.radiogroup}>
                  <Text style={{padding: 10, fontWeight: 'bold'}}>
                    {Language[language]['severity']}:
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Option
                      label="Low"
                      value="low"
                      selected={data?.severity === 'low'}
                      onPress={() =>
                        handleSymptomChange('low', index, 'severity')
                      }
                    />
                    <Option
                      label="Medium"
                      value="medium"
                      selected={data?.severity === 'medium'}
                      onPress={() =>
                        handleSymptomChange('medium', index, 'severity')
                      }
                    />
                    <Option
                      label="High"
                      value="high"
                      selected={data?.severity === 'high'}
                      onPress={() =>
                        handleSymptomChange('high', index, 'severity')
                      }
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
          <View>
            <TouchableOpacity onPress={handleAddSymptoms}>
              <Icon name="plus" style={[styles.PlusText, styles.PlusButton]} />
            </TouchableOpacity>
            {symptomInput.length > 1 && (
              <TouchableOpacity
                onPress={() => handleDeleteSymptom(symptomInput.length)}>
                <Icon
                  name="minus"
                  style={[styles.PlusText, styles.PlusButton]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <HButton
              label={'submit'}
              onPress={() => {
                handleSymptomSubmit;
                navigation.goBack();
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 8,
  },
  mainHead: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h1,
    fontWeight: 'bold',
    padding: 10,
  },
  symptomInput: {
    backgroundColor: CUSTOMCOLOR.white,
    flexDirection: 'row',
    padding: 8,
  },
  DateInput: {
    backgroundColor: CUSTOMCOLOR.white,
    flexDirection: 'row',
    padding: 8,
  },
  radiogroup: {
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  PlusText: {
    fontSize: 40,
    color: CUSTOMCOLOR.white,
  },
  PlusButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    backgroundColor: CUSTOMCOLOR.primary,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 100,
    padding: 4,
  },
  line: {
    margin: 8,
    height: 0.5,
    width: '100%',
    backgroundColor: 'blue',
  },
});

export default Symptoms;

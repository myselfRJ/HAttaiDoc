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
//                       value={data.symptom}
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
//                       value={data.days}
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
//                       selected={data.severity === 'low'}
//                       onPress={() => SeverityChange('low', index)}
//                     />
//                     <Option
//                       label="Medium"
//                       value="medium"
//                       selected={data.severity === 'medium'}
//                       onPress={() => SeverityChange('medium', index)}
//                     />
//                     <Option
//                       label="High"
//                       value="high"
//                       selected={data.severity === 'high'}
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

import React from 'react';
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
import PlusButton from '../components/plusbtn';
import Button from '../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {
  addSymptom,
  deleteSymptom,
  updateSymptom,
} from '../redux/features/prescription/symptomslice';

const Symptoms = () => {
  const symptomsData = useSelector(state => state.symptoms);
  const dispatch = useDispatch();

  const handleAddSymptoms = () => {
    dispatch(addSymptom());
  };

  const handleDeleteSymptom = index => {
    dispatch(deleteSymptom(index));
  };

  const handleSymptomChange = (text, index) => {
    dispatch(updateSymptom({index, field: 'symptom', value: text}));
  };

  const handleDaysChange = (text, index) => {
    dispatch(updateSymptom({index, field: 'days', value: text}));
  };

  const handleSeverityChange = (value, index) => {
    dispatch(updateSymptom({index, field: 'severity', value}));
  };

  console.log(symptomsData);

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={{margin: 10}}>
          <Text style={styles.mainHead}>{Language[language]['symptoms']}</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
          <View style={{flexDirection: 'column'}}>
            {symptomsData.map((data, index) => (
              <View
                key={index}
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
                      value={data.symptom}
                      onChangeText={text => handleSymptomChange(text, index)}
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
                      value={data.days}
                      onChangeText={text => handleDaysChange(text, index)}
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
                      selected={data.severity === 'low'}
                      onPress={() => handleSeverityChange('low', index)}
                    />
                    <Option
                      label="Medium"
                      value="medium"
                      selected={data.severity === 'medium'}
                      onPress={() => handleSeverityChange('medium', index)}
                    />
                    <Option
                      label="High"
                      value="high"
                      selected={data.severity === 'high'}
                      onPress={() => handleSeverityChange('high', index)}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={handleAddSymptoms}>
            <Icon name="plus" style={[styles.PlusText, styles.PlusButton]} />
          </TouchableOpacity>
          {symptomsData.length > 1 && (
            <TouchableOpacity
              onPress={() => handleDeleteSymptom(symptomsData.length - 1)}>
              <Icon name="minus" style={[styles.PlusText, styles.PlusButton]} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainHead: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  symptomInput: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 8,
  },
  DateInput: {
    backgroundColor: '#fff',
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
    color: '#fff',
  },
  PlusButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    backgroundColor: '#4ba5fa',
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

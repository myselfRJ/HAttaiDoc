import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Option from './option';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';

const Symptoms = () => {
  const [symptomsData, setSymptomsData] = useState([
    {symptom: '', days: '', severity: ''},
  ]);
  const [visible, setVisible] = useState(false);

  const handleAddSymptoms = () => {
    const newData = [...symptomsData];
    newData.push({symptom: '', days: '', severity: ''});
    setSymptomsData(newData);
    setVisible(true);
  };
  const handleDeleteSymptom = index => {
    const newData = [...symptomsData];
    newData.splice(index, 1);
    setSymptomsData(newData);
  };

  const SymptomChange = (text, index) => {
    const newData = [...symptomsData];
    newData[index].symptom = text;
    setSymptomsData(newData);
  };

  const DaysChange = (text, index) => {
    const newData = [...symptomsData];
    newData[index].days = text;
    setSymptomsData(newData);
  };

  const SeverityChange = (value, index) => {
    const newData = [...symptomsData];
    newData[index].severity = value;
    setSymptomsData(newData);
  };

  const handlePrintData = () => {
    console.log(symptomsData);
  };

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
                      onChangeText={text => SymptomChange(text, index)}
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
                      onChangeText={text => DaysChange(text, index)}
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
                      onPress={() => SeverityChange('low', index)}
                    />
                    <Option
                      label="Medium"
                      value="medium"
                      selected={data.severity === 'medium'}
                      onPress={() => SeverityChange('medium', index)}
                    />
                    <Option
                      label="High"
                      value="high"
                      selected={data.severity === 'high'}
                      onPress={() => SeverityChange('high', index)}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={handleAddSymptoms}>
            <View style={styles.PlusButton}>
              <Text style={styles.PlusText}>+</Text>
            </View>
          </TouchableOpacity>
          {visible && symptomsData?.length !== 1 && (
            <TouchableOpacity onPress={handleDeleteSymptom}>
              <View style={styles.PlusButton}>
                <Text style={styles.PlusText}>-</Text>
              </View>
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
    backgroundColor: '#0E86D4',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 100,
  },
  line: {
    margin: 8,
    height: 0.5,
    width: '100%',
    backgroundColor: 'blue',
  },
  dummy: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#555443',
    gap: 16,
  },
  dum2: {
    backgroundColor: '#5518a5',
    padding: 8,
  },
  dum3: {
    flexDirection: 'row',
    backgroundColor: '#5518a5',
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingVertical: 16,
    gap: 24,
    borderRadius: 8,
  },
  textsize: {
    fontSize: 24,
  },
});

export default Symptoms;

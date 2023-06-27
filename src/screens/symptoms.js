import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Option from '../components/option';
import InputText from '../components/inputext';
import PlusButton from '../components/plusbtn';

const Symptoms = () => {
  const [symptomsData, setSymptomsData] = useState([
    {symptom: '', days: '', severity: ''},
  ]);

  const handleAddSymptoms = () => {
    const newData = [...symptomsData];
    newData.push({symptom: '', days: '', severity: ''});
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
          <Text style={styles.mainHead}>Symptoms</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            {symptomsData.map((data, index) => (
              <View key={index} style={{flexDirection: 'row', padding: 10}}>
                <View style={styles.symptomInput}>
                  <Text style={{padding: 10, fontWeight: 'bold'}}>
                    Symptoms:
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
                  <Text style={{padding: 10, fontWeight: 'bold'}}>Days</Text>
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
                    Severity:{' '}
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
        </View>
      </View>
      <View style={styles.line}></View>
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
    width: 200,
    marginRight: 20,
  },
  DateInput: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: 190,
    marginRight: 20,
  },
  radiogroup: {
    flexDirection: 'row',
    width: 300,
  },
  PlusText: {
    fontSize: 40,
    color: '#fff',
  },
  PlusButton: {
    position: 'relative',
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
    marginTop: 10,
    height: 2,
    width: '100%',
    backgroundColor: 'blue',
  },
});

export default Symptoms;

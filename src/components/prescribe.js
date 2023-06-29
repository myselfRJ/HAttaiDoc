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

export default function Prescribe() {
  const [modes, setModes] = useState([
    'Injection',
    'Capsule',
    'Syrup',
    'Tablet',
  ]);
  const [medicine, setMedicine] = useState('');
  const [selectedMode, setSelectedMode] = useState();
  const [selectedMedicine, setSelectedMedicine] = useState();
  const [selectedMg, setSelectedMg] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedFrequency, setSelectedFrequency] = useState([]);
  const [tab, setTab] = useState('');
  const [recommdations, setRecommdations] = useState([
    'Avil',
    'Paracetmol',
    'Dolo650',
    'Citrizen',
  ]);
  const [mg, setMg] = useState(['500mg', '700mg', '800mg', '1000mg']);
  const [timing, setTiming] = useState(['AF', 'BF']);
  const [frequency, setFrequency] = useState([
    'Morning',
    'Nooon',
    'Evening',
    'Night',
  ]);
  const [quantity, setQuantity] = useState('100');
  const [duration, setDuration] = useState('');
  const setMode = index => {
    setSelectedMode(index);
  };
  const Medicine = index => {
    setSelectedMedicine(index);
  };
  const handleRecommdationPress = suggestion => {
    setMedicine(suggestion);
  };
  const setMG = index => {
    setSelectedMg(index);
  };
  const setTime = index => {
    setSelectedTime(index);
  };
  const FrequencySelection = index => {
    const isSelected = selectedFrequency.includes(index);
    if (isSelected) {
      setSelectedFrequency(selectedFrequency.filter(i => i !== index));
    } else {
      setSelectedFrequency([...selectedFrequency, index]);
    }
  };
  return (
    <ScrollView>
      <View style={styles.mainHead}>
        <Text style={styles.mainText}>{Language[language]['prescribe']}</Text>
      </View>
      <View style={styles.prescribeConatiner}>
        <View style={styles.ModeContainer}>
          <Text style={styles.ModeText}>{Language[language]['mode']}</Text>
          <View style={styles.Modes}>
            {modes.map((value, index) => (
              <TouchableOpacity key={index} onPress={() => setMode(index)}>
                <View
                  style={[
                    styles.ModesContainer,
                    {
                      backgroundColor:
                        selectedMode === index ? '#000000aa' : '#fff',
                    },
                  ]}>
                  <Text style={{color: '#4ba5fa'}}>{value}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.MedicineContainer}>
          <View style={styles.MedicineHead}>
            <Text style={styles.Medicinetext}>
              {Language[language]['medicine']}
            </Text>
            <TextInput
              style={styles.MedicineInput}
              placeholder="enter Medicine"
              multiline={true}
              value={medicine}
              onChangeText={val => setMedicine(val)}
            />
            <Icon name="magnify" size={24} style={styles.search} />
            <Text style={styles.RecommdationText}>
              {Language[language]['reccomedations']}
            </Text>
            <View style={styles.Modes}>
              {recommdations.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    Medicine(index);
                    handleRecommdationPress(value);
                  }}>
                  <View
                    style={[
                      styles.ModesContainer,
                      {
                        backgroundColor:
                          selectedMedicine === index ? '#000000aa' : '#fff',
                      },
                    ]}>
                    <Text style={{color: '#4ba5fa'}}>{value}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.DoseContainer}>
          <Text
            style={{
              padding: 8,
              color: 'black',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 19,
            }}>
            {Language[language]['dose']}
          </Text>
          <View style={styles.TabInput}>
            <Text style={styles.TextDose}>{Language[language]['number']}:</Text>
            <TextInput
              style={styles.tab}
              value={tab}
              onChangeText={val => setTab(val)}
            />
          </View>
          <View style={styles.Modes}>
            {mg.map((value, index) => (
              <TouchableOpacity key={index} onPress={() => setMG(index)}>
                <View
                  style={[
                    styles.ModesContainer,
                    {
                      backgroundColor:
                        selectedMg === index ? '#000000aa' : '#fff',
                    },
                  ]}>
                  <Text style={{color: '#4ba5fa'}}>{value}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{width: 635, gap: 8}}>
          <Text style={styles.textTime}>{Language[language]['timing']}</Text>
          <View style={styles.Modes}>
            {timing.map((value, index) => (
              <TouchableOpacity key={index} onPress={() => setTime(index)}>
                <View
                  style={[
                    styles.ModesContainer,
                    {
                      backgroundColor:
                        selectedTime === index ? '#000000aa' : '#fff',
                    },
                  ]}>
                  <Text style={{color: '#4ba5fa'}}>{value}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.frequency}>
          <Text style={styles.frequencyText}>
            {Language[language]['frequency']}
          </Text>
          <View style={styles.Modes}>
            {frequency.map((value, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => FrequencySelection(index)}>
                <View
                  style={[
                    styles.ModesContainer,
                    {
                      backgroundColor: selectedFrequency.includes(index)
                        ? '#000000aa'
                        : '#fff',
                    },
                  ]}>
                  <Text style={{color: '#4ba5fa'}}>{value}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.DurationContainer}>
          <Text style={styles.DurationText}>
            {Language[language]['duration']}
          </Text>
          <TextInput
            style={styles.durationInput}
            value={duration}
            onChangeText={val => setDuration(val)}
          />
        </View>
        <View style={styles.QuantityContainer}>
          <Text style={styles.quantityText}>
            {Language[language]['quantity']}
          </Text>
          <View style={{height: 40, width: 100}}>
            <Text style={styles.numText}>{quantity}</Text>
          </View>
        </View>
        <View style={styles.line}></View>
        <TouchableOpacity>
          <Icon name="plus" size={32} style={styles.PlusButton} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainHead: {
    width: 651,
    justifyContent: 'space-between',
    padding: 8,
  },
  mainText: {
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19,
    color: 'black',
  },
  prescribeConatiner: {
    width: 651,
    gap: 4,
  },
  ModeContainer: {
    width: 635,
    gap: 8,
    paddingLeft: 12,
  },
  ModeText: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 19,
    color: 'black',
  },
  ModesContainer: {
    gap: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  Modes: {
    flexDirection: 'row',
    gap: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
  MedicineContainer: {
    width: 635,
    gap: 12,
  },
  MedicineHead: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    gap: 10,
  },
  Medicinetext: {
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 19,
    color: 'black',
  },
  MedicineInput: {
    width: 635,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  RecommdationText: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 16,
    color: 'black',
  },
  Dose: {
    padding: 8,
  },
  DoseContainer: {
    width: 635,
    gap: 8,
  },
  TextDose: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 13.62,
    color: 'black',
    paddingTop: 12,
  },
  TabInput: {
    padding: 8,
    gap: 8,
    flexDirection: 'row',
    textAlign: 'center',
  },
  tab: {
    borderRadius: 4,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  textTime: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 19,
    color: 'black',
  },
  frequency: {
    width: 635,
    gap: 8,
  },
  DurationContainer: {
    width: 635,
    gap: 8,
  },
  DurationText: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 4,
    paddingRight: 4,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 19.07,
    color: 'black',
  },
  durationInput: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: '#FFF',
    width: 120,
  },
  QuantityContainer: {
    width: 635,
    gap: 8,
  },
  quantityText: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 19,
    color: 'black',
    gap: 10,
  },
  numText: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 13,
    color: '#4ba5fa',
    gap: 10,
    backgroundColor: '#fff',
  },
  line: {
    margin: 8,
    height: 0.5,
    width: '100%',
    backgroundColor: 'blue',
  },
  PlusButton: {
    backgroundColor: '#4ba5fa',
    padding: 16,
    borderRadius: 32,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  frequencyText: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 10,
    fontSize: 14,
    lineHeight: 19.07,
    color: 'black',
    fontWeight: '400',
  },
  search: {
    position: 'absolute',
    color: '#4ba5fa',
    padding: 40,
    paddingLeft: 560,
  },
});

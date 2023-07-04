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
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {useSelector, useDispatch} from 'react-redux';
import {
  setMode,
  setMedicine,
  setSelectedMedicine,
  setSelectedMg,
  setSelectedTime,
  toggleFrequency,
  setTab,
  setDuration,
} from '../redux/features/prescription/prescribeslice';

export default function Prescribe() {
  const dispatch = useDispatch();
  const prescribe = useSelector(state => state.prescribe);
  console.log(prescribe);

  const setSelectMode = index => {
    dispatch(setMode(index));
  };
  const Medicine = index => {
    dispatch(setSelectedMedicine(index));
  };
  const handleRecommdationPress = suggestion => {
    dispatch(setMedicine(suggestion));
  };
  const setMG = index => {
    dispatch(setSelectedMg(index));
  };
  const setTime = index => {
    dispatch(setSelectedTime(index));
  };
  const FrequencySelection = value => {
    dispatch(toggleFrequency(value));
  };
  return (
    <ScrollView style={{padding: 8}}>
      <View style={styles.mainHead}>
        <Text style={styles.mainText}>{Language[language]['prescribe']}</Text>
      </View>
      <View style={styles.prescribeConatiner}>
        <View style={styles.ModeContainer}>
          <Text style={styles.ModeText}>{Language[language]['mode']}</Text>
          <View style={styles.Modes}>
            {prescribe.modes.map((value, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectMode(value)}>
                <View
                  style={[
                    styles.ModesContainer,
                    {
                      backgroundColor:
                        prescribe.selectedMode === value ? '#000000aa' : '#fff',
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
              value={prescribe.medicine}
              onChangeText={val => dispatch(setMedicine(val))}
            />
            {/* <Icon name="magnify" size={24} style={styles.search} /> */}
            <Text style={styles.RecommdationText}>
              {Language[language]['reccomedations']}
            </Text>
            <View style={styles.Modes}>
              {prescribe.recommdations.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    Medicine(value);
                    handleRecommdationPress(value);
                  }}>
                  <View
                    style={[
                      styles.ModesContainer,
                      {
                        backgroundColor:
                          prescribe.selectedMedicine === value
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
              value={prescribe.tab}
              onChangeText={val => dispatch(setTab(val))}
            />
          </View>
          <View style={styles.Modes}>
            {prescribe.mg.map((value, index) => (
              <TouchableOpacity key={index} onPress={() => setMG(value)}>
                <View
                  style={[
                    styles.ModesContainer,
                    {
                      backgroundColor:
                        prescribe.selectedMg === value ? '#000000aa' : '#fff',
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
            {prescribe.timing.map((value, index) => (
              <TouchableOpacity key={index} onPress={() => setTime(value)}>
                <View
                  style={[
                    styles.ModesContainer,
                    {
                      backgroundColor:
                        prescribe.selectedTime === value ? '#000000aa' : '#fff',
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
            {prescribe.frequency.map((value, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => FrequencySelection(value)}>
                <View
                  style={[
                    styles.ModesContainer,
                    {
                      backgroundColor: prescribe.selectedFrequency.includes(
                        value,
                      )
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
            value={prescribe.duration}
            onChangeText={val => dispatch(setDuration(val))}
          />
        </View>
        <View style={styles.QuantityContainer}>
          <Text style={styles.quantityText}>
            {Language[language]['quantity']}
          </Text>
          <View style={{height: 40, width: 100}}>
            <Text style={styles.numText}>{prescribe.quantity}</Text>
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

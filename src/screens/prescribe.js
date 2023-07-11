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
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';

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
    <ScrollView>
      <View style={{padding: 24, gap: 24}}>
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
                          prescribe.selectedMode === value
                            ? CUSTOMCOLOR.primary
                            : CUSTOMCOLOR.white,
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          prescribe.selectedMode === value
                            ? CUSTOMCOLOR.white
                            : CUSTOMCOLOR.primary,
                      }}>
                      {value}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.MedicineContainer}>
            <View style={styles.MedicineHead}>
              <Text style={styles.ModeText}>
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
                              ? CUSTOMCOLOR.primary
                              : CUSTOMCOLOR.white,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            prescribe.selectedMedicine === value
                              ? CUSTOMCOLOR.white
                              : CUSTOMCOLOR.primary,
                        }}>
                        {value}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.ModeContainer}>
            <Text style={styles.ModeText}>{Language[language]['dose']}</Text>
            <View style={styles.TabInput}>
              <Text style={styles.TextDose}>
                {Language[language]['number']}:
              </Text>
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
                          prescribe.selectedMg === value
                            ? CUSTOMCOLOR.primary
                            : CUSTOMCOLOR.white,
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          prescribe.selectedMg === value
                            ? CUSTOMCOLOR.white
                            : CUSTOMCOLOR.primary,
                      }}>
                      {value}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{padding: 16, top: 8}}>
            <Text style={styles.ModeText}>{Language[language]['timing']}</Text>
            <View style={styles.Modes}>
              {prescribe.timing.map((value, index) => (
                <TouchableOpacity key={index} onPress={() => setTime(value)}>
                  <View
                    style={[
                      styles.ModesContainer,
                      {
                        backgroundColor:
                          prescribe.selectedTime === value
                            ? CUSTOMCOLOR.primary
                            : CUSTOMCOLOR.white,
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          prescribe.selectedTime === value
                            ? CUSTOMCOLOR.white
                            : CUSTOMCOLOR.primary,
                      }}>
                      {value}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{padding: 16, top: 8}}>
            <Text style={styles.ModeText}>
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
                          ? CUSTOMCOLOR.primary
                          : CUSTOMCOLOR.white,
                      },
                    ]}>
                    <Text
                      style={{
                        color: prescribe.selectedFrequency.includes(value)
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.primary,
                      }}>
                      {value}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.ModeContainer}>
            <Text style={styles.ModeText}>
              {Language[language]['duration']}
            </Text>
            <TextInput
              style={styles.durationInput}
              value={prescribe.duration}
              placeholder="Enter Duration"
              onChangeText={val => dispatch(setDuration(val))}
            />
          </View>
          <View style={styles.ModeContainer}>
            <Text style={styles.ModeText}>
              {Language[language]['quantity']}
            </Text>
            <View
              style={{
                height: 40,
                width: '15%',
                borderWidth: 1,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.numText}>{prescribe.quantity}</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <TouchableOpacity>
            <Icon name="plus" size={32} style={styles.PlusButton} />
          </TouchableOpacity>
        </View>
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
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 19,
    color: CUSTOMCOLOR.black,
  },
  prescribeConatiner: {
    width: '100%',
    gap: 4,
  },
  ModeContainer: {
    width: 635,
    gap: 8,
    paddingLeft: 16,
    top: 8,
  },
  ModeText: {
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '400',
    lineHeight: 19.07,
    color: CUSTOMCOLOR.black,
  },
  ModesContainer: {
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  Modes: {
    flexDirection: 'row',
    gap: 16,
    paddingLeft: 8,
    paddingRight: 8,
    top: 8,
  },
  MedicineContainer: {
    width: 635,
    gap: 12,
    top: 8,
  },
  MedicineHead: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    gap: 10,
  },
  MedicineInput: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: CUSTOMCOLOR.white,
    borderWidth: 1,
    borderRadius: 8,
  },
  RecommdationText: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: 600,
    fontSize: CUSTOMFONTSIZE.h4,
    lineHeight: 16,
    color: CUSTOMCOLOR.black,
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
    fontSize: CUSTOMFONTSIZE.h4,
    lineHeight: 13.62,
    color: CUSTOMCOLOR.black,
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
    backgroundColor: CUSTOMCOLOR.white,
  },
  frequency: {
    width: 635,
    gap: 8,
  },
  DurationContainer: {
    width: 635,
    gap: 8,
  },
  durationInput: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: CUSTOMCOLOR.white,
    width: '25%',
    borderWidth: 1,
    borderRadius: 8,
  },
  QuantityContainer: {
    width: '100%',
    gap: 8,
  },
  numText: {
    padding: 8,
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h4,
    lineHeight: 19.07,
    color: CUSTOMCOLOR.primary,
    gap: 10,
    backgroundColor: CUSTOMCOLOR.white,
  },
  line: {
    margin: 8,
    height: 0.5,
    width: '100%',
    backgroundColor: 'blue',
  },
  PlusButton: {
    backgroundColor: CUSTOMCOLOR.primary,
    padding: 16,
    borderRadius: 32,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  search: {
    position: 'absolute',
    color: CUSTOMCOLOR.primary,
    padding: 40,
    paddingLeft: 560,
  },
});

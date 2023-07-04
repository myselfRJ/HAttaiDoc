import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {CUSTOMCOLOR, CUSTOMFONTFAMILY} from '../settings/styles';
import VisitOpen from '../components/visitopen';
import HeaderAvatar from '../components/headeravatar';
import PlusButton from '../components/plusbtn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Language} from '../settings/customlanguage';
import {language} from '../settings/userpreferences';
import {useSelector} from 'react-redux';
import {getDate} from '../redux/features/prescription/Followupslice';

const Visit = ({navigation}) => {
  const date = useSelector(getDate);

  const dataObject = [
    {label: 'Symptoms', icon: 'chevron-right', navigate: 'symptoms'},
    {label: 'Prescribe', icon: 'chevron-right', navigate: 'prescribe'},
    {label: 'Follow-Up', icon: 'chevron-right', navigate: 'FollowUp'},
  ];
  const Symptom = useSelector(state => state.symptoms);
  const Prescribe = useSelector(state => state.prescribe);

  return (
    <View style={styles.main}>
      <View style={styles.select}>
        <HeaderAvatar />
      </View>

      <View style={styles.appointment}>
        <Text style={styles.h2}>Consultation</Text>
        {dataObject.map((value, index) => (
          <View key={index}>
            <View style={styles.visitOpenItem}>
              <VisitOpen
                label={value.label}
                icon={value.icon}
                navigate={() => navigation.navigate(value.navigate)}
              />
              {value.label === 'Symptoms' && (
                <View style={styles.basiccontainer}>
                  <View style={{flexWrap: 'wrap'}}>
                    {Symptom.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{flexDirection: 'row', gap: 10, padding: 8}}>
                          <Icon
                            name="emoticon-sick"
                            size={16}
                            color={CUSTOMCOLOR.primary}
                          />
                          <View>
                            <Text>
                              {item.symptom}|{item.days}|{item.severity}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              )}
              {value.label === 'Prescribe' && (
                <View style={styles.basiccontainer}>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <View
                      style={{
                        gap: 8,
                        left: 8,
                        flexDirection: 'row',
                        padding: 8,
                      }}>
                      <Icon
                        name="prescription"
                        size={16}
                        color={CUSTOMCOLOR.primary}
                      />
                      <View>
                        <Text>
                          {Prescribe.selectedMode}|{Prescribe.medicine}|
                          {Prescribe.selectedMg}|{Prescribe.selectedTime}|
                          {Prescribe.selectedFrequency}|{Prescribe.tab}|
                          {Prescribe.quantity}|{Prescribe.duration}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              {value.label === 'Follow-Up' && (
                <View style={styles.complaintcontainer}>
                  <Icon
                    name="file-document-edit"
                    color={CUSTOMCOLOR.primary}
                    size={16}
                  />
                  <Text style={styles.pulse}>{date.toString()}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <PlusButton
        icon="close"
        style={{position: 'absolute', left: 0, bottom: 0}}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  select: {
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    gap: 24,
  },
  appointment: {
    gap: 8,
    paddingHorizontal: 8,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
  visitOpenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderBottomWidth: 0.4,
    borderBottomColor: CUSTOMCOLOR.primary,
  },
  basiccontainer: {
    width: 635,
    padding: 8,
  },
  pulse: {
    fontFamily: CUSTOMFONTFAMILY.body,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 15.04,
    color: CUSTOMCOLOR.black,
  },
  complaintcontainer: {
    width: 635,
    borderRadius: 4,
    padding: 8,
    gap: 4,
    flexDirection: 'row',
  },
});

export default Visit;

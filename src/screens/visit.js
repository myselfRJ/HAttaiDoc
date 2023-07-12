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
  const vitalsData = useSelector(state => state.prescription.vitalsData);
  const note = useSelector(state => state.prescription.note);
  const selectedComplaint = useSelector(
    state => state.prescription.selectedComplaint,
  );
  const selectedDoctor = useSelector(
    state => state.prescription.selectedDoctor,
  );
  const Symptom = useSelector(state => state.symptoms.symptom);
  const Prescribe = useSelector(state => state.prescribe);
  const dataObject = [
    {label: 'Chief Complaints', icon: 'chevron-right', navigate: 'complaints'},
    {label: 'Vitals', icon: 'chevron-right', navigate: 'vitalscreen'},
    {label: 'Symptoms', icon: 'chevron-right', navigate: 'symptoms'},
    {label: 'Prescribe', icon: 'chevron-right', navigate: 'prescribe'},
    {label: 'Follow-Up', icon: 'chevron-right', navigate: 'FollowUp'},
    {label: 'Notes', icon: 'chevron-right', navigate: 'notescreen'},
    {
      label: 'Refer to Doctor',
      icon: 'chevron-right',
      navigate: 'referdoctorscreen',
    },
  ];

  return (
    <View style={styles.main}>
      <View style={styles.select}>
        <HeaderAvatar />
      </View>

      <View style={styles.appointment}>
        <Text style={styles.h2}>{Language[language]['consultation']}</Text>
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
                    {Symptom?.map((item, index) => {
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
              {value.label === 'Vitals' && (
                <View style={styles.basiccontainer}>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Icon
                      name="thermometer"
                      color={CUSTOMCOLOR.primary}
                      size={16}
                    />
                    <View
                      key={index}
                      style={{flexDirection: 'row', gap: 8, padding: 2}}>
                      {vitalsData?.pulse_rate && (
                        <Text style={styles.pulse}>
                          {Language[language]['pulse_rate']}:
                          {vitalsData.pulse_rate}
                        </Text>
                      )}
                      {vitalsData?.weight && (
                        <Text style={styles.pulse}>
                          {Language[language]['weight']}:{vitalsData.weight}kg
                        </Text>
                      )}
                      {vitalsData?.height && (
                        <Text style={styles.pulse}>
                          {Language[language]['height']}:{vitalsData.height}cm
                        </Text>
                      )}
                      {vitalsData?.temp && (
                        <Text style={styles.pulse}>
                          {Language[language]['temp']}:{vitalsData.temp}F
                        </Text>
                      )}
                      {vitalsData?.rate && (
                        <Text style={styles.pulse}>
                          {Language[language]['rate']}:{vitalsData.rate}F
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Icon
                      name="water-check"
                      color={CUSTOMCOLOR.primary}
                      size={16}
                    />
                    <View
                      key={index}
                      style={{flexDirection: 'row', gap: 8, padding: 2}}>
                      {vitalsData?.systolic_bp && (
                        <Text style={styles.pulse}>
                          {Language[language]['systolic_bp']}:
                          {vitalsData.systolic_bp}mmHg
                        </Text>
                      )}
                      {vitalsData?.diastolic_bp && (
                        <Text style={styles.pulse}>
                          {Language[language]['diastolic_bp']}:
                          {vitalsData.diastolic_bp}mmHg
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <Icon
                      name="calendar-range"
                      color={CUSTOMCOLOR.primary}
                      size={16}
                    />
                    <View
                      key={index}
                      style={{flexDirection: 'row', gap: 8, padding: 2}}>
                      {vitalsData?.lmp_edd && (
                        <Text style={styles.pulse}>
                          {Language[language]['lmp_edd']}:{vitalsData.lmp_edd}
                          week
                        </Text>
                      )}
                      {vitalsData?.us_edd && (
                        <Text style={styles.pulse}>
                          {Language[language]['us_edd']}:{vitalsData.us_edd}week
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              )}
              {value.label === 'Chief Complaints' && (
                <View style={styles.complaintcontainer}>
                  <Icon
                    name="file-document-edit"
                    color={CUSTOMCOLOR.primary}
                    size={16}
                  />
                  <Text style={styles.pulse}>{selectedComplaint}</Text>
                </View>
              )}
              {value.label === 'Notes' && (
                <View style={styles.complaintcontainer}>
                  <Icon
                    name="file-document-edit"
                    color={CUSTOMCOLOR.primary}
                    size={16}
                  />
                  <Text style={styles.pulse}>{note}</Text>
                </View>
              )}
              {value.label === 'Refer to Doctor' && (
                <View style={styles.complaintcontainer}>
                  <Icon name="doctor" color={CUSTOMCOLOR.primary} size={16} />

                  {selectedDoctor?.name && (
                    <Text style={styles.pulse}>
                      Refer to {selectedDoctor.name}{' '}
                    </Text>
                  )}
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
    // height:100
  },
  basiccontainer: {
    width: '100%',
    borderRadius: 4,
    padding: 8,
    gap: 16,
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
    height: 32,
    borderRadius: 4,
    padding: 4,
    gap: 4,
    flexDirection: 'row',
  },
});

export default Visit;

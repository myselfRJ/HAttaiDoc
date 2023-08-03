import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {CUSTOMCOLOR, CUSTOMFONTFAMILY} from '../settings/styles';
import VisitOpen from '../components/visitopen';
import HeaderAvatar from '../components/headeravatar';
import PlusButton from '../components/plusbtn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Language} from '../settings/customlanguage';
import {language} from '../settings/userpreferences';
import {useSelector} from 'react-redux';
import {getDate} from '../redux/features/prescription/Followupslice';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import {HButton} from '../components';
import {ScrollView} from 'react-native-gesture-handler';

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
  const Prescribe = useSelector(state => state.pres.prescribeItems);
  let prescribeCopy = Prescribe;
  const [prescribe, setPrescribe] = useState(prescribeCopy);

  console.log('=======================', prescribe);

  const token = useSelector(state => state.authenticate.auth.access);

  console.log('====================================');
  console.log(selectedDoctor);
  console.log('====================================');
  const [apiStatus, setApiStatus] = useState({});

  useEffect(() => {
    setPrescribe(Prescribe);
  }, [Prescribe]);

  const fetchData = async () => {
    const consultationData = {
      prescribe: Prescribe,

      symptoms: Symptom,

      chief_complaint: selectedComplaint,
      vitals: vitalsData,
      refer_to_doctor: selectedDoctor,
      follow_up: date,
      note: note,

      meta_data: {
        patient_phone_number: '9177468511',
        doctor_phone_number: '9490421037',
        clinic_id: '7',
        appointment_id: '2',
      },
    };
    try {
      const response = await fetchApi(URL.savePrescription, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(consultationData),
      });
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setApiStatus({status: 'success', message: 'Successfully created'});
        setTimeout(() => {
          navigation.navigate('adduser');
        }, 1000);
      } else {
        setApiStatus({status: 'warning', message: 'Enter all Values'});
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({status: 'error', message: 'Please try again'});
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dataObject = [
    {label: 'Chief Complaints', icon: 'chevron-right', navigate: 'complaints'},
    {label: 'Vitals', icon: 'chevron-right', navigate: 'vitalscreen'},
    {label: 'Symptoms', icon: 'chevron-right', navigate: 'symptoms'},
    {label: 'Prescribe', icon: 'chevron-right', navigate: 'pres'},
    {label: 'Follow-Up', icon: 'chevron-right', navigate: 'FollowUp'},
    {label: 'Notes', icon: 'chevron-right', navigate: 'notescreen'},
    {
      label: 'Refer to Doctor',
      icon: 'chevron-right',
      navigate: 'referdoctorscreen',
    },
  ];
  console.log('====================================');
  console.log('vitalsdata', '=====================', vitalsData);
  console.log('====================================');

  return (
    <ScrollView>
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
                              <Text style={{color: CUSTOMCOLOR.black}}>
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
                        <View>
                          {prescribe?.map((item, ind) => (
                            <View
                              key={ind}
                              style={{
                                flexDirection: 'row',
                                marginBottom: 5,
                              }}>
                              <Icon
                                name="prescription"
                                size={16}
                                color={CUSTOMCOLOR.primary}
                              />
                              <View>
                                <Text style={{color: CUSTOMCOLOR.black}}>
                                  {item.mode}|{item.medicine}|
                                  {item.dose_quantity}|{item.timing}|
                                  {item.frequency}|{item.dose_number}|
                                  {item.total_quantity}|{item.duration}
                                </Text>
                              </View>
                              {/* <TouchableOpacity
                              onPress={() => handleDelete(ind)}
                              style={{left: '500%'}}>
                              <Icon
                                name="delete"
                                size={24}
                                color={CUSTOMCOLOR.primary}
                              />
                            </TouchableOpacity> */}
                            </View>
                          ))}
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
                        {vitalsData?.boby_temparature && (
                          <Text style={styles.pulse}>
                            {Language[language]['temp']}:
                            {vitalsData.boby_temparature}F
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
                        {vitalsData?.systolic && (
                          <Text style={styles.pulse}>
                            {Language[language]['systolic_bp']}:
                            {vitalsData.systolic}mmHg
                          </Text>
                        )}
                        {vitalsData?.diastolic && (
                          <Text style={styles.pulse}>
                            {Language[language]['diastolic_bp']}:
                            {vitalsData.diastolic}mmHg
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
                        {vitalsData?.LDD && (
                          <Text style={styles.pulse}>
                            {Language[language]['lmp_edd']}:{vitalsData.LDD}
                            week
                          </Text>
                        )}
                        {vitalsData?.EDD && (
                          <Text style={styles.pulse}>
                            {Language[language]['us_edd']}:{vitalsData.EDD}
                            week
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
                        Refer to {selectedDoctor.doctor_name}{' '}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <PlusButton
            icon="close"
            style={{left: 0, bottom: 0}}
            onPress={() => navigation.goBack()}
          />
          <HButton label="save" onPress={() => fetchData()} />
        </View>
      </View>
    </ScrollView>
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

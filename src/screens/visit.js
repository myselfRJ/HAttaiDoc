import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import VisitOpen from '../components/visitopen';
import HeaderAvatar from '../components/headeravatar';
import PlusButton from '../components/plusbtn';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Language} from '../settings/customlanguage';
import {language} from '../settings/userpreferences';
import {useSelector, useDispatch} from 'react-redux';
import {getDate} from '../redux/features/prescription/Followupslice';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import HButton from '../components/button';
import {ScrollView} from 'react-native-gesture-handler';
import {BottomSheetView, StatusMessage} from '../components';
import {CONSTANT} from '../utility/const';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import Prescribe1 from './prescibe1';
import {updatePrescribe1} from '../redux/features/prescription/prescr';
import {updateSymptom} from '../redux/features/prescription/symptomslice';
import {updateDate} from '../redux/features/prescription/Followupslice';
import {updateCommorbities} from '../redux/features/prescription/commorbities';
import {updateDiagnosis} from '../redux/features/prescription/diagnosis';
import {updatepastHistory} from '../redux/features/prescription/pastHistory';
import {updateLabReport} from '../redux/features/prescription/labreport';
import {updateAllergies} from '../redux/features/prescription/allergies';
import {updateValid} from '../redux/features/prescription/valid';
import {
  UpdateNote,
  UpdateDoctorRefer,
  UpadteVitals,
  UpadateCheifComplaint,
  addCheifComplaint,
} from '../redux/features/prescription/prescriptionSlice';

const Visit = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const date = useSelector(state => state?.dateTime?.date);
  //console.log('date=======', typeof date);
  const diagnosis = useSelector(state => state?.diagnosis?.DiagnosisItems);

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

  const token = useSelector(state => state.authenticate.auth.access);
  const {phone} = useSelector(state => state?.phone?.data);
  const [apiStatus, setApiStatus] = useState({});

  const commorbities = useSelector(
    state => state?.commorbities?.commorbitiesItems,
  );

  const pasthistory = useSelector(state => state?.pasthistory?.pasthistory);
  const allergies = useSelector(state => state?.allergies?.allergies);
  const labreport = useSelector(state => state?.labreport?.labReport);
  const dateTimeRed = useSelector(state => state.valid?.valid);

  useEffect(() => {
    setPrescribe(Prescribe);
  }, [Prescribe]);

  const [submit, setSubmit] = useState(false);

  const habdlePrescribe = () => {
    setSubmit(true);
  };

  const {name, gende, age, patient_phone, appointment_id, complaint} =
    route.params;

  useEffect(() => {
    dispatch(addCheifComplaint(complaint));
  }, []);

  const Clinic_id = useSelector(state => state?.clinicid?.clinic_id);

  const ResetRuduxState = () => {
    const newPrescribe = [];
    const newSymptoms = [];
    const newDiagnosis = [];
    const newLabhistory = [];
    const newCommorbities = [];
    const newAllregies = [];
    const newPastHistory = [];
    const newDate = {
      date: '',
    };
    const newValid = {
      valid: '',
    };
    const newVitals = {};
    const newDoctor = {};
    const newComplaint = '';
    const newNote = '';
    dispatch(updatePrescribe1(newPrescribe));
    dispatch(updateAllergies(newAllregies));
    dispatch(updateCommorbities(newCommorbities));
    dispatch(updateDiagnosis(newDiagnosis));
    dispatch(updateLabReport(newLabhistory));
    dispatch(updateSymptom(newSymptoms));
    dispatch(updatepastHistory(newPastHistory));
    dispatch(updateDate(newDate?.date));
    dispatch(updateValid(newValid?.valid));
    dispatch(UpadteVitals(newVitals));
    dispatch(UpdateNote(newNote));
    dispatch(UpdateDoctorRefer(newDoctor));
    dispatch(UpadateCheifComplaint(newComplaint));
  };

  const fetchData = async () => {
    const consultationData = {
      prescribe: Prescribe,

      symptoms: Symptom,

      chief_complaint: selectedComplaint,
      vitals: vitalsData,
      refer_to_doctor: selectedDoctor,
      // ?selectedDoctor:JSON.stringify( {"doctor_name": "", "phone": "", "speciality": ""}),
      follow_up: date,
      note: note,
      diagnosis: diagnosis,
      labReports: labreport,
      commoribities: commorbities,
      allergies: allergies,
      pastHistory: pasthistory,

      meta_data: {
        patient_phone_number: patient_phone,
        doctor_phone_number: phone,
        clinic_id: Clinic_id,
        appointment_id: appointment_id,
      },
    };
    try {
      setLoading(true);
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
        if (jsonData?.status === 'success') {
          setApiStatus({status: 'success', message: 'Successfully created'});
          SuccesRef?.current?.snapToIndex(1);
          // Prescribe.splice(0,Prescribe.length)
          setTimeout(() => {
            navigation.navigate('tab');
          }, 1000);
          ResetRuduxState();
          setLoading(false);
        } else {
          setApiStatus({status: 'warning', message: 'Enter all Values'});
          console.error('API call failed:', response.status, response);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({status: 'error', message: 'Please try again'});
      setLoading(false);
    }
  };

  const SuccesRef = useRef(null);

  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);

  const [data, setData] = useState();

  const fetchDoctor = async () => {
    const response = await fetchApi(URL.getPractitionerByNumber(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log('practitioner response====', response);
    if (response.ok) {
      const jsonData = await response.json();
      //console.log(jsonData);
      setData(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchDoctor();
  }, []);

  const handlePreview = () => {
    const patient_phone_number = patient_phone;
    const patient_name = patient_name;
    const gender = gende;
    const patient_age = age;
    navigation.navigate('prescription', {
      name,
      gender,
      patient_age,
      patient_phone_number,
    });
  };

  // console.log("Symptom....",Symptom)

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.main}>
          {/* <View style={styles.select}>
          <HeaderAvatar />
        </View> */}
          {/* <View style={{alignSelf: 'flex-end',position:'absolute',padding:16}}> */}
          {/* <PlusButton
            icon="close"
            style={{
              zIndex: 4,
              backgroundColor: 'transparent',
              position: 'absolute',
              alignSelf: 'flex-end',
              padding: 16,
            }}
            color="#000000aa"
            size={moderateScale(32)}
            onPress={() => navigation.goBack()}
          /> */}
          {/* </View> */}

          <View style={styles.appointment}>
            <Text style={styles.h2}>{Language[language]['consultation']}</Text>
            {CONSTANT.ConsultationList.map((value, index) => (
              <View key={index}>
                <View style={styles.visitOpenItem}>
                  <VisitOpen
                    label={value.label}
                    icon={value.icon}
                    navigate={() =>
                      navigation.navigate(
                        value.navigate,
                        value.navigate === 'complaints' ? {complaint} : null,
                        value.navigate === 'FollowUp' ? {date} : null,
                      )
                    }
                  />
                  {value.label === 'Symptoms' && Symptom.length > 0 && (
                    <View style={styles.basiccontainer}>
                      <View style={{flexWrap: 'wrap'}}>
                        {Symptom?.map((item, index) => {
                          return (
                            item.symptom != '' && (
                              <View key={index} style={styles.symptomicon}>
                                <Icon
                                  name="emoticon-sick"
                                  size={moderateScale(16)}
                                  color={CUSTOMCOLOR.primary}
                                />
                                <View>
                                  <Text style={styles.pulse}>
                                    {item.symptom} | {item.days} |{' '}
                                    {item.severity}
                                  </Text>
                                </View>
                              </View>
                              // </View>
                            )
                          );
                        })}
                      </View>
                    </View>
                  )}
                  {value.label === 'Prescribe' && prescribe.length > 0 && (
                    <View style={styles.basiccontainer}>
                      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style={styles.pres}>
                          <View>
                            {prescribe?.map((item, ind) => (
                              <View key={ind} style={styles.pres1}>
                                <Icon
                                  name="prescription"
                                  size={moderateScale(16)}
                                  color={CUSTOMCOLOR.primary}
                                />
                                <View>
                                  <Text style={styles.pulse}>
                                    {item.mode} | {item.medicine} |
                                    {item.dose_quantity} | {item.timing} |
                                    {item.frequency} | {item.duration} |{' '}
                                    {item.total_quantity}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                  {value.label === 'Follow-Up' && date !== '' && (
                    <View style={styles.FollowUpcontainer}>
                      <>
                        <Icon
                          name="file-document-edit"
                          color={CUSTOMCOLOR.primary}
                          size={moderateScale(16)}
                        />
                        <Text style={styles.pulse}>{date}</Text>
                      </>
                    </View>
                  )}
                  {value.label === 'Validity' && dateTimeRed !== '' && (
                    <View style={styles.FollowUpcontainer}>
                      <>
                        <Icon
                          name="file-document-edit"
                          color={CUSTOMCOLOR.primary}
                          size={moderateScale(16)}
                        />
                        <Text style={styles.pulse}>{dateTimeRed}</Text>
                      </>
                    </View>
                  )}
                  {value.label === 'Vitals' &&
                    (vitalsData?.LDD ||
                      vitalsData?.EDD ||
                      vitalsData?.weight ||
                      vitalsData?.height ||
                      vitalsData?.pulse_rate ||
                      vitalsData?.bmi ||
                      vitalsData?.boby_temparature ||
                      vitalsData?.diastolic ||
                      vitalsData?.systolic ||
                      vitalsData?.rate) && (
                      <View style={styles.basiccontainer}>
                        {(vitalsData?.systolic ||
                          vitalsData?.pulse_rate ||
                          vitalsData?.diastolic) && (
                          <View style={styles.vitals}>
                            <View key={index} style={styles.vitals1}>
                              {vitalsData?.pulse_rate && (
                                <>
                                  <Icon
                                    name="water-check"
                                    color={CUSTOMCOLOR.primary}
                                    size={moderateScale(16)}
                                  />
                                  <Text style={styles.pulse}>
                                    pulse rate:
                                    {vitalsData?.pulse_rate}bpm
                                  </Text>
                                </>
                              )}
                              {vitalsData?.height && (
                                <Text style={styles.pulse}>
                                  {Language[language]['height']}:
                                  {vitalsData.height}cm
                                </Text>
                              )}
                              {vitalsData?.weight && (
                                <Text style={styles.pulse}>
                                  {Language[language]['weight']}:
                                  {vitalsData.weight}kg
                                </Text>
                              )}
                              {vitalsData?.bmi && (
                                <Text style={styles.pulse}>
                                  {Language[language]['bmi']}:{vitalsData.bmi}cm
                                </Text>
                              )}
                              {vitalsData?.body_temperature && (
                                <Text style={styles.pulse}>
                                  {Language[language]['temp']}:
                                  {vitalsData?.body_temperature}
                                </Text>
                              )}
                              {vitalsData?.rate && (
                                <Text style={styles.pulse}>
                                  {Language[language]['rate']}:{vitalsData.rate}
                                  cm
                                </Text>
                              )}
                            </View>
                            <View key={index} style={styles.common}>
                              {vitalsData?.systolic && (
                                <>
                                  <Icon
                                    name="water-check"
                                    color={CUSTOMCOLOR.primary}
                                    size={moderateScale(16)}
                                  />
                                  <Text style={styles.pulse}>
                                    {Language[language]['systolic_bp']}:
                                    {vitalsData.systolic}mmHg
                                  </Text>
                                </>
                              )}
                              {vitalsData?.diastolic && (
                                <Text style={styles.pulse}>
                                  {Language[language]['diastolic_bp']}:
                                  {vitalsData.diastolic}mmHg
                                </Text>
                              )}
                            </View>
                          </View>
                        )}
                        {vitalsData?.LDD && (
                          <View
                            style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                            <View key={index} style={styles.common}>
                              {vitalsData?.LDD && (
                                <>
                                  <Icon
                                    name="calendar-range"
                                    color={CUSTOMCOLOR.primary}
                                    size={moderateScale(16)}
                                  />
                                  <Text style={styles.pulse}>
                                    {Language[language]['lmp_edd']}:
                                    {vitalsData.LDD}
                                    week
                                  </Text>
                                </>
                              )}
                              {vitalsData?.EDD && (
                                <Text style={styles.pulse}>
                                  {Language[language]['us_edd']}:
                                  {vitalsData.EDD}
                                  week
                                </Text>
                              )}
                            </View>
                          </View>
                        )}
                      </View>
                    )}
                  {value.label === 'Chief Complaints' && (
                    <View style={styles.complaintcontainer}>
                      <Icon
                        name="file-document-edit"
                        color={CUSTOMCOLOR.primary}
                        size={moderateScale(16)}
                      />
                      <Text style={styles.pulse}>{selectedComplaint}</Text>
                    </View>
                  )}
                  {value.label === 'Notes' && note !== '' && (
                    <View style={styles.complaintcontainer}>
                      <Icon
                        name="file-document-edit"
                        color={CUSTOMCOLOR.primary}
                        size={moderateScale(16)}
                      />
                      <Text style={styles.pulse}>{note}</Text>
                    </View>
                  )}
                  {/* {value.label === 'Diagnosis' && diagnosis !== '' && 
                    
                     {diagnosis.map((item,index)=>{
                      <View style={styles.complaintcontainer}>
                       <Icon
                       name="prescription"
                       color={CUSTOMCOLOR.primary}
                       size={moderateScale(16)}
                     />
                     <Text style={styles.pulse}>{diagnosis}</Text>
                        
                    </View>
                     })} } */}
                  {value.label === 'Diagnosis' && diagnosis.length > 0 && (
                    <View style={styles.basiccontainer}>
                      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style={styles.common}>
                          <View>
                            {diagnosis?.map((item, ind) => (
                              <View key={ind} style={styles.common}>
                                <Icon
                                  name="prescription"
                                  size={moderateScale(16)}
                                  color={CUSTOMCOLOR.primary}
                                />
                                <View>
                                  <Text
                                    style={{
                                      color: CUSTOMCOLOR.black,
                                      fontFamily: CUSTOMFONTFAMILY.body,
                                      fontSize: CUSTOMFONTSIZE.h4,
                                    }}>
                                    {item?.diagnosis}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                  )}

                  {value.label === 'Comorbidities' &&
                    commorbities.length > 0 && (
                      <View style={styles.basiccontainer}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                          <View style={styles.common}>
                            <View>
                              {commorbities?.map((item, ind) => (
                                <View key={ind} style={styles.common}>
                                  <Icon
                                    name="prescription"
                                    size={moderateScale(16)}
                                    color={CUSTOMCOLOR.primary}
                                  />
                                  <View>
                                    <Text style={styles.pulse}>
                                      {item?.commoribities}
                                    </Text>
                                  </View>
                                </View>
                              ))}
                            </View>
                          </View>
                        </View>
                      </View>
                    )}

                  {value.label === 'Past Hospitalization' &&
                    pasthistory.length > 0 && (
                      <View style={styles.basiccontainer}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                          <View style={styles.common}>
                            <View>
                              {pasthistory?.map((item, ind) => (
                                <View key={ind} style={styles.common}>
                                  <Icon
                                    name="prescription"
                                    size={moderateScale(16)}
                                    color={CUSTOMCOLOR.primary}
                                  />
                                  <View>
                                    <Text style={styles.pulse}>
                                      {item?.past_history}
                                    </Text>
                                  </View>
                                </View>
                              ))}
                            </View>
                          </View>
                        </View>
                      </View>
                    )}

                  {value.label === 'Allergies' && allergies?.length > 0 && (
                    <View style={styles.basiccontainer}>
                      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style={styles.common}>
                          <View>
                            {allergies?.map((item, ind) => (
                              <View key={ind} style={styles.common}>
                                <Icon
                                  name="prescription"
                                  size={moderateScale(16)}
                                  color={CUSTOMCOLOR.primary}
                                />
                                <View>
                                  <Text style={styles.pulse}>
                                    {item?.allergies}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                  )}

                  {value.label === 'Test Prescribe' && labreport.length > 0 && (
                    <View style={styles.basiccontainer}>
                      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                        <View style={styles.common}>
                          <View>
                            {labreport?.map((item, ind) => (
                              <View key={ind} style={styles.common}>
                                <Icon
                                  name="prescription"
                                  size={moderateScale(16)}
                                  color={CUSTOMCOLOR.primary}
                                />
                                <View>
                                  <Text style={styles.pulse}>
                                    {item?.lab_test}
                                  </Text>
                                </View>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>
                  )}

                  {value.label === 'Refer to Doctor' && (
                    <View style={styles.basiccontainer}>
                      {selectedDoctor?.doctor_name && (
                        <>
                          <Icon
                            name="doctor"
                            color={CUSTOMCOLOR.primary}
                            size={moderateScale(16)}
                          />
                          <Text style={styles.pulse}>
                            Refer to {selectedDoctor?.doctor_name}{' '}
                          </Text>
                        </>
                      )}
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: horizontalScale(24),
            }}>
            <HButton
              label="Preview"
              onPress={handlePreview}
              btnstyles={{
                backgroundColor: CUSTOMCOLOR.white,
              }}
              textStyle={{
                color: CUSTOMCOLOR.primary,
              }}
            />
            <HButton
              label="Save"
              onPress={() => fetchData()}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
      <BottomSheetView
        bottomSheetRef={SuccesRef}
        snapPoints={'50%'}
        backgroundStyle={CUSTOMCOLOR.white}>
        <StatusMessage status={apiStatus.status} message={apiStatus.message} />
      </BottomSheetView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: moderateScale(24),
    gap: moderateScale(16),
  },
  select: {
    gap: moderateScale(8),
  },
  tab: {
    flexDirection: 'row',
    gap: moderateScale(24),
  },
  appointment: {
    gap: moderateScale(8),
    paddingHorizontal: horizontalScale(8),
  },
  h2: {
    fontSize: moderateScale(24),
    fontWeight: '600',
    fontFamily: CUSTOMFONTFAMILY.heading,
    lineHeight: moderateScale(20 * 2),
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
    //flexDirection:'row',
    width: '100%',
    borderRadius: moderateScale(4),
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(16),
    gap: moderateScale(16),
  },
  FollowUpcontainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: moderateScale(4),
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(16),
    gap: moderateScale(16),
  },
  pulse: {
    fontFamily: CUSTOMFONTFAMILY.body,
    // fontWeight: 400,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(15.04),
    color: CUSTOMCOLOR.black,
  },
  complaintcontainer: {
    // width: 635,
    // height: 32,
    borderRadius: moderateScale(4),
    padding: moderateScale(16),
    gap: moderateScale(8),
    flexDirection: 'row',
  },
  symptomicon: {
    flexDirection: 'row',
    gap: moderateScale(10),
    padding: moderateScale(8),
    alignItems: 'center',
  },
  pres: {
    gap: moderateScale(8),
    flexDirection: 'row',
  },
  pres1: {
    flexDirection: 'row',
    padding: moderateScale(8),
    gap: moderateScale(8),
  },
  vitals: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  vitals1: {
    flexDirection: 'row',
    gap: moderateScale(8),
    padding: moderateScale(2),
    marginBottom: moderateScale(18),
  },
  common: {
    flexDirection: 'row',
    padding: moderateScale(4),
    gap: moderateScale(4),
  },
});
export default Visit;

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ShowChip from '../components/showChip';
import {
  addcommorbiditis,
  updatecommorbidities,
  addfamilyHistory,
  updatefamilyHistory,
  addsocialHistory,
  updatesocialHistory,
  addmedicationHistory,
  addobstericHistory,
  addpastHospitalization,
  addmenstrualHistory,
  addmartialHistory,
  addProcedures,
  addRedFalg,
  addCheck_field,
} from '../redux/features/prescription/pastHistory';
// import {
//   addCommorbities,
//   updateCommorbities,
// } from '../redux/features/prescription/commorbities';
// import { ,updatecommorbidities } from '../redux/features/prescription/pastHistory';
import {CONSTANTS} from '../utility/constant';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import InputText from '../components/inputext';
import HButton from '../components/button';
import {ScrollView} from 'react-native-gesture-handler';
import {
  StoreAsyncData,
  UpdateAsyncData,
  RetriveAsyncData,
  clearStorage,
} from '../utility/AsyncStorage';
import {commonstyles} from '../styles/commonstyle';
import {addpastHistory} from '../redux/features/prescription/pastHistory';
import ChipInput from '../components/ChipInput';
import {VisitOpen} from '../components';
import {updateDate} from '../redux/features/prescription/Followupslice';
import VitalField from '../components/vitalFields';
// import ShowChip from '../components/showChip';
// import {StoreAsyncData, UpdateAsyncData} from '../utility/AsyncStorage';
import SelectorBtn from '../components/selector';
import {calculateWeeksAndDaysFromDate, formatdate} from '../utility/const';

const MedicalHistory = ({navigation, route}) => {
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const medication = useRef(null);
  const pasthospital = useRef(null);
  const procedureref = useRef(null);
  const redflagref = useRef(null);
  const doc_phone = useSelector(state => state?.phone?.data);
  const {medicaldata} = route.params;
  const phone = medicaldata?.phone;
  const token = useSelector(state => state.authenticate.auth.access);
  const patient_phone = medicaldata?.patient_phone;
  const Age = medicaldata?.Age;
  // console.log('phone', phone, patient_phone, Age);

  const data = useSelector(state => state?.pasthistory?.pasthistory);

  const commor = useSelector(state => state?.pasthistory?.commorbidities);
  const commotData = commor?.filter(
    item => item?.appointment_id === appointmentID,
  );
  const socialHistory = useSelector(state => state?.pasthistory?.socialHistory);
  const SocHstry = socialHistory?.filter(
    item => item?.appointment_id === appointmentID,
  );
  const check_field = useSelector(
    state => state?.pasthistory.check_field,
  )?.filter(item => item?.appointment_id === appointmentID);
  const familyHistory = useSelector(state => state?.pasthistory?.familyHistory);
  const Fhstry = familyHistory?.filter(
    item => item?.appointment_id === appointmentID,
  );
  const dispatch = useDispatch();
  const nav = useNavigation();
  const [comorbidities, setComorbidities] = useState('');
  const [updatedate, setUpdatedate] = useState('');
  const [commor_sug, setCommor_Sug] = useState([]);
  const [past, setPast] = useState('');
  const [social, setSocial] = useState('');
  const [social_sug, setSocial_Sug] = useState([...CONSTANTS.social]);
  const [family, setFamily] = useState('');
  const [family_sug, setFamily_Sug] = useState([]);
  const [medical, setMedical] = useState('');
  const [select, setSelect] = useState('');
  const [red_flag, setRed_Flag] = useState('');
  const [procedures, setprocedures] = useState('');
  const rel = ['Father', 'Mother', 'Others'];
  const [relation, setRelation] = useState('');
  const [othersrelation, setOthersRelation] = useState('');
  const handleSelectComorbidities = value => {
    setSelect(value);
    setComorbidities(value);
    dispatch(
      addcommorbiditis([
        ...commor,
        {commorbities: value, appointment_id: appointmentID},
      ]),
    );
    UpdateAsyncData(`commorbidities${doc_phone?.phone}`, {commorbities: value});
    setComorbidities('');
  };
  const handleSelectSocial = value => {
    setSelect(value);
    setSocial(value);
    dispatch(
      addsocialHistory([
        ...socialHistory,
        {social: value, appointment_id: appointmentID},
      ]),
    );
    UpdateAsyncData(`socialHistory${doc_phone?.phone}`, {social: value});
    setSocial('');
  };
  const handleSelectFamily = value => {
    setSelect(value);
    setFamily(value);
    dispatch(
      addfamilyHistory([
        ...familyHistory,
        {
          family: value,
          relation: relation ? relation : othersrelation,
          appointment_id: appointmentID,
        },
      ]),
    );
    UpdateAsyncData(`familyHistory${doc_phone?.phone}`, {family: value});
    setFamily('');
  };
  const handleSelectMedical = val => {
    setSelect(val);
    setMedical(val);
  };

  const handleDeleteCommorbities = index => {
    if (commor) {
      const updatedcommor = commor?.filter((item, ind) => ind !== index);

      dispatch(updatecommorbidities(updatedcommor));
    }
  };
  const medicationHistory = useSelector(
    state => state?.pasthistory?.medicationHistory,
  );

  const menstrualHistory = useSelector(
    state => state?.pasthistory?.menstrualHistory,
  );
  const mesntrual =
    menstrualHistory?.length > 0
      ? menstrualHistory
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.mens
      : {};
  const obstericHistory = useSelector(
    state => state?.pasthistory?.obstericHistory,
  );
  const obes =
    obstericHistory?.length > 0
      ? obstericHistory
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.mens
      : {};
  const marital = useSelector(state => state?.pasthistory?.martialHistory);
  const mar =
    marital?.length > 0
      ? marital
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.mens
      : {};
  const procedure = useSelector(state => state.pasthistory.procedures);

  const redflag = useSelector(state => state.pasthistory.red_flag);
  const hospitalization = useSelector(
    state => state?.pasthistory?.hospitalization,
  );
  const vital = useSelector(state => state.prescription.vitalsData);
  const vitalsData =
    vital?.length > 0
      ? vital
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)?.[0]?.vitals
      : {};
  useEffect(() => {
    if (vitalsData && vitalsData?.LDD !== '') {
      dispatch(
        addmenstrualHistory([
          ...menstrualHistory,
          {
            mens: {
              age: '',
              status: '',
              flowdays: '',
              cycledays: '',
              pregnant: {
                lmp: vitalsData?.LDD,
                edd: vitalsData?.EDD,
              },
              menopause: '',
              others: '',
            },
            appointment_id: appointmentID,
          },
        ]),
      );
    }
  }, []);
  const handleDeleteSocial = index => {
    if (socialHistory) {
      const updatedSocial = socialHistory?.filter((item, ind) => ind !== index);
      dispatch(updatesocialHistory(updatedSocial));
    }
  };
  const handleDeleteFamliy = index => {
    if (familyHistory) {
      const updatedfamilyHistory = familyHistory?.filter(
        (item, ind) => item !== index,
      );
      dispatch(updatefamilyHistory(updatedfamilyHistory));
    }
  };
  const handleAddReceiver = () => {
    if (comorbidities.trim() !== '') {
      dispatch(
        addcommorbiditis([
          ...commor,
          {commorbities: comorbidities, appointment_id: appointmentID},
        ]),
      );
      UpdateAsyncData(`commorbidities${doc_phone?.phone}`, {
        commorbities: comorbidities,
      });
      console.log(comorbidities);
      setComorbidities('');
    }
  };
  const handleSocial = () => {
    if (social.trim() !== '') {
      dispatch(
        addsocialHistory([
          ...socialHistory,
          {social: social, appointment_id: appointmentID},
        ]),
      );
      UpdateAsyncData(`socialHistory${doc_phone?.phone}`, {social: social});
      setSocial('');
    }
  };
  const handleFamily = () => {
    if (family.trim() !== '') {
      dispatch(
        addfamilyHistory([
          ...familyHistory,
          {
            family: family,
            relation: relation ? relation : othersrelation,
            appointment_id: appointmentID,
          },
        ]),
      );
      UpdateAsyncData(`familyHistory${doc_phone?.phone}`, {family: family});
      setFamily('');
    }
  };
  const handleAsyncStorage = () => {
    RetriveAsyncData(`commorbidities${doc_phone?.phone}`).then(array => {
      const uniqueArray = array?.filter((item, index) => {
        return (
          index ===
          array?.findIndex(obj => obj.commorbities === item?.commorbities)
        );
      });
      uniqueArray.splice(10);
      setCommor_Sug(uniqueArray);
    });
    // RetriveAsyncData(`socialHistory${doc_phone?.phone}`).then(array => {
    //   if (array) {
    //     const uniqueArray = array?.filter((item, index) => {
    //       return index === array?.findIndex(obj => obj.social === item?.social);
    //     });
    //     setSocial_Sug(uniqueArray);
    //   }
    // });
    RetriveAsyncData(`familyHistory${doc_phone?.phone}`).then(array => {
      const uniqueArray = array?.filter((item, index) => {
        return index === array?.findIndex(obj => obj.family === item?.family);
      });
      uniqueArray.splice(10);
      setFamily_Sug(uniqueArray);
    });
  };
  useEffect(() => {
    handleAsyncStorage();
    StoreAsyncData(`commorbidities${doc_phone?.phone}`, []);
    StoreAsyncData(`familyHistory${doc_phone?.phone}`, []);
  }, []);

  useEffect(() => {
    if (commor_sug?.length === 0 || commor_sug == undefined) {
      StoreAsyncData(`commorbidities${doc_phone?.phone}`, commor);
    }
    if (social_sug?.length === 0 || social_sug == undefined) {
      StoreAsyncData(`socialHistory${doc_phone?.phone}`, socialHistory);
    }
    if (family_sug?.length === 0 || family_sug == undefined) {
      StoreAsyncData(`familyHistory${doc_phone?.phone}`, familyHistory);
    }
  }, []);

  const handledata = () => {
    dispatch(
      addpastHospitalization([
        ...hospitalization,
        {hospitalization: past, appointment_id: appointmentID},
      ]),
    );
    dispatch(
      addmedicationHistory([
        ...medicationHistory,
        {medicationHistory: medical, appointment_id: appointmentID},
      ]),
    );
    dispatch(
      addProcedures([
        ...procedure,
        {procedure: procedures, appointment_id: appointmentID},
      ]),
    );
    dispatch(
      addRedFalg([
        ...redflag,
        {redflag: red_flag, appointment_id: appointmentID},
      ]),
    );
    nav.goBack();
  };
  useEffect(() => {
    setRed_Flag(
      redflag?.length > 0
        ? redflag
            ?.filter(item => item?.appointment_id === appointmentID)
            ?.slice(-1)?.[0]?.redflag
        : '',
    );
    setprocedures(
      procedure?.length > 0
        ? procedure
            ?.filter(item => item?.appointment_id === appointmentID)
            ?.slice(-1)?.[0]?.procedure
        : '',
    );
    setMedical(
      medicationHistory?.length > 0
        ? medicationHistory
            ?.filter(item => item?.appointment_id === appointmentID)
            ?.slice(-1)?.[0]?.medicationHistory
        : '',
    );
    setPast(
      hospitalization?.length > 0
        ? hospitalization
            ?.filter(item => item?.appointment_id === appointmentID)
            ?.slice(-1)?.[0]?.hospitalization
        : '',
    );
  }, []);
  const fetchMedicalData = async () => {
    try {
      const response = await fetchApi(URL.getMedical(phone, patient_phone), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setUpdatedate(
          jsonData?.data[0]?.updated_at
            ? jsonData?.data[0]?.updated_at?.split('T')[0]
            : '',
        );
        if (jsonData?.data[0]?.commoribities) {
          const commo = JSON.parse(jsonData.data[0].commoribities);
          const mapdata = commo?.map(item => ({
            ...item,
            appointment_id: appointmentID,
          }));
          dispatch(addcommorbiditis([...commor, ...mapdata]));
        }
        if (jsonData?.data[0]?.family_history) {
          const family = JSON.parse(jsonData.data[0].family_history);
          const mapdata = family?.map(item => ({
            ...item,
            appointment_id: appointmentID,
          }));
          dispatch(addfamilyHistory([...familyHistory, ...mapdata]));
        }
        if (jsonData?.data[0]?.social_history) {
          const social = JSON.parse(jsonData.data[0].social_history);
          const mapdata = social?.map(item => ({
            ...item,
            appointment_id: appointmentID,
          }));
          dispatch(addsocialHistory([...mapdata, ...socialHistory]));
        }
        if (jsonData?.data[0]?.medication_history) {
          const medication = JSON.parse(jsonData.data[0].medication_history);
          setMedical(medication);
          dispatch(
            addmedicationHistory([
              ...medicationHistory,
              {
                medicationHistory: medication,
                appointment_id: appointmentID,
              },
            ]),
          );
        }
        if (jsonData?.data[0]?.past_history) {
          const hospitalizatio = JSON.parse(jsonData.data[0].past_history);
          setPast(hospitalizatio);
          dispatch(
            addpastHospitalization([
              ...hospitalization,
              {
                hospitalization: hospitalizatio,
                appointment_id: appointmentID,
              },
            ]),
          );
        }
        if (jsonData?.data[0]?.mensutral_history) {
          const mens = JSON.parse(jsonData.data[0].mensutral_history);
          if (vitalsData) {
            if (vitalsData?.LDD !== '') {
              dispatch(
                addmenstrualHistory([
                  ...menstrualHistory,
                  {
                    mens: {
                      ...mens,
                      ...{
                        pregnant: {
                          lmp: vitalsData?.LDD,
                          edd: vitalsData?.EDD,
                        },
                      },
                    },
                    appointment_id: appointmentID,
                  },
                ]),
              );
            }
          } else {
            dispatch(
              addmenstrualHistory([
                ...menstrualHistory,
                {
                  mens: mens,
                  appointment_id: appointmentID,
                },
              ]),
            );
          }
        }
        if (jsonData?.data[0]?.obsteric_history) {
          const mens = JSON.parse(jsonData.data[0].obsteric_history);
          dispatch(
            addobstericHistory([
              ...obstericHistory,
              {mens: mens, appointment_id: appointmentID},
            ]),
          );
        }
        if (jsonData?.data[0]?.martial_history) {
          const mens = JSON.parse(jsonData.data[0].martial_history);
          dispatch(
            addmartialHistory([
              ...marital,
              {mens: mens, appointment_id: appointmentID},
            ]),
          );
        }
        if (jsonData?.data[0]?.procedures) {
          setprocedures(jsonData?.data[0]?.procedures);
          dispatch(
            addProcedures([
              ...procedure,
              {procedure: jsonData?.data[0]?.procedures},
            ]),
          );
        }
        if (jsonData?.data[0]?.red_flag) {
          setRed_Flag(jsonData?.data[0]?.red_flag);
          dispatch(
            addRedFalg([...redflag, {red_flag: jsonData?.data[0]?.red_flag}]),
          );
        }
      } else {
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.error('Error in fetchMedicalData:', error);
    }
  };
  useEffect(() => {
    dispatch(addCheck_field([{appointment_id: appointmentID}]));
  }, []);
  const [snomedCommor, setSnomedCommor] = useState([]);
  const [snomedFamily, setSnomedFamily] = useState([]);
  const fetchCommor_family = async value => {
    const response = await fetchApi(
      URL.snomed(value ? value : '1', 'disorder'),
      {
        method: 'GET',
        headers: {},
      },
    );
    if (response.ok) {
      const jsonData = await response.json();
      const snomed_data = jsonData?.map(item => ({term: item}));
      snomed_data?.splice(10);
      if (comorbidities) {
        setSnomedCommor(snomed_data);
      }
      if (family) {
        setSnomedFamily(snomed_data);
      }
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    if (comorbidities) {
      fetchCommor_family(comorbidities);
    }
    if (family) {
      fetchCommor_family(family);
    }
  }, [comorbidities, family]);
  useEffect(() => {
    if (check_field?.length === 0) {
      fetchMedicalData();
    }
  }, []);
  const lmp_week = mesntrual?.pregnant?.lmp
    ? calculateWeeksAndDaysFromDate(mesntrual?.pregnant?.lmp)
    : {};
  const motherHis = Fhstry?.filter(
    item => item?.relation?.toLowerCase() === 'mother',
  );
  const fatherHis = Fhstry?.filter(
    item => item?.relation?.toLowerCase() === 'father',
  );
  const othersHis = Fhstry?.filter(
    item =>
      item?.relation?.toLowerCase() !== 'father' &&
      item?.relation?.toLowerCase() !== 'mother',
  );
  return (
    <View style={styles.main}>
      <PrescriptionHead heading="Medical History" />

      <ScrollView>
        <View style={styles.input}>
          {(medicaldata?.gende == 'Female' ||
            medicaldata?.gende == 'female') && (
            <View style={styles.visitOpenItem}>
              <VisitOpen
                label={'Marital History'}
                icon={mar !== '' ? 'pencil' : 'menu-right'}
                iconstyle={{
                  borderWidth: mar !== '' ? 0.5 : 0,
                }}
                size={mar !== '' ? moderateScale(16) : moderateScale(32)}
                textstyle={styles.text}
                navigate={() => {
                  navigation.navigate('marital', {phone, patient_phone});
                }}
              />
              {JSON.stringify(mar) !== '{}' && (
                <View style={styles.basiccontainer}>
                  {/* <View style={{flexWrap: 'wrap'}}> */}
                  {mar != '' && (
                    <View style={styles.symptomicon}>
                      <Text style={styles.pulse}>
                        {`Marital Status: ${mar?.maritalstatus}`}
                        {mar?.married
                          ? `,${' '}Maried Since: ${mar?.married}`
                          : null}

                        {mar?.cons
                          ? `,${' '}Consanguinity: ${mar?.cons}`
                          : null}
                      </Text>
                    </View>
                  )}
                  {/* </View> */}
                </View>
              )}
            </View>
          )}
          {(medicaldata?.gende == 'Female' ||
            medicaldata?.gende == 'female') && (
            <View style={styles.visitOpenItem}>
              <VisitOpen
                label={'Menstrual History'}
                icon={mesntrual !== '' ? 'pencil' : 'menu-right'}
                iconstyle={{
                  borderWidth: mesntrual !== '' ? 0.5 : 0,
                }}
                size={mesntrual !== '' ? moderateScale(16) : moderateScale(32)}
                textstyle={styles.text}
                navigate={() =>
                  navigation.navigate('menstrual', {phone, patient_phone})
                }
                date={mesntrual != '' && updatedate !== '' ? updatedate : null}
              />
              {JSON.stringify(mesntrual) !== '{}' &&
                mesntrual?.pregnant?.lmp !== '' && (
                  <View style={styles.basiccontainer}>
                    {/* <View style={{flexWrap: 'wrap'}}> */}
                    {JSON.stringify(mesntrual) != '' && (
                      <View style={styles.symptomicon}>
                        <Text style={styles.pulse}>
                          Menarche:{' '}
                          <Text style={{fontWeight: '700'}}>
                            {mesntrual?.age}
                          </Text>{' '}
                          Yrs,{' '}
                          <Text style={{fontWeight: '700'}}>
                            {mesntrual?.status}
                          </Text>
                          , Flow:{' '}
                          <Text style={{fontWeight: '700'}}>
                            {mesntrual?.flowdays}
                          </Text>{' '}
                          days, Cycle:{' '}
                          <Text style={{fontWeight: '700'}}>
                            {mesntrual?.cycledays}
                          </Text>{' '}
                          days
                          <Text>
                            ,{' '}
                            {mesntrual?.pregnant !== '' ? (
                              <Text>
                                Pregnant (Yes): LMP :{' '}
                                <Text style={{fontWeight: '700'}}>
                                  {mesntrual?.pregnant?.lmp
                                    ? formatdate(mesntrual?.pregnant?.lmp)
                                    : ''}
                                </Text>{' '}
                                EDD :{' '}
                                <Text style={{fontWeight: '700'}}>
                                  {mesntrual?.pregnant?.edd
                                    ? formatdate(mesntrual?.pregnant?.edd)
                                    : ''}
                                </Text>{' '}
                                Week:{' '}
                                <Text style={{fontWeight: '700'}}>
                                  {lmp_week?.weeks}
                                </Text>{' '}
                                Days:{' '}
                                <Text style={{fontWeight: '700'}}>
                                  {lmp_week?.days}
                                </Text>
                              </Text>
                            ) : (
                              'Pregnant (No)'
                            )}
                          </Text>
                          <Text>
                            {' '}
                            {mesntrual?.menopause !== ''
                              ? `Menopause (Yes): LMP ${
                                  mesntrual?.menopause?.split('T')[0]
                                }`
                              : ''}
                          </Text>
                        </Text>
                      </View>
                    )}
                  </View>
                )}
            </View>
          )}

          {(medicaldata?.gende == 'Female' ||
            medicaldata?.gende == 'female') && (
            <View style={styles.visitOpenItem}>
              <VisitOpen
                label={'Obstetric History'}
                icon={obes !== undefined ? 'pencil' : 'menu-right'}
                iconstyle={{
                  borderWidth: obes !== undefined ? 0.5 : 0,
                }}
                size={
                  obes !== undefined ? moderateScale(16) : moderateScale(32)
                }
                textstyle={styles.text}
                navigate={() =>
                  navigation.navigate('obstetric', {phone, patient_phone})
                }
              />
              {JSON.stringify(obes) !== '{}' && (
                <View style={styles.basiccontainer}>
                  {obes != '' && (
                    <>
                      <View style={styles.symptomicon}>
                        <Text style={styles.pulse}>
                          G: {obes?.gravidity?.value}, T: {obes?.term?.value},
                          P: {obes?.premature?.value}, A:{' '}
                          {obes?.abortions?.value}, L:{' '}
                          {obes?.living?.map(item => item?.living)}
                        </Text>
                      </View>
                      <View style={styles.symptomicon}>
                        {obes?.living?.slice(0, -1)?.map(item => (
                          <Text style={styles.pulse}>
                            {item?.name} {': '}
                            {item?.age} | {item?.gender}
                          </Text>
                        ))}
                      </View>
                      <View style={styles.symptomicon}>
                        <Text style={styles.pulse}>
                          {/* {obes?.gravidity?.desc ||
                            obes?.term?.desc ||
                            obes?.premature?.desc ||
                            (obes?.abortions?.desc && (
                              
                            ))} */}
                          <Text>Description : </Text>
                          {obes?.gravidity?.desc &&
                            `G - ${obes?.gravidity?.desc}`}
                          {obes?.term?.desc && `,${' '}T - ${obes?.term?.desc}`}
                          {obes?.premature?.desc &&
                            `,${' '}P - ${obes?.premature?.desc}`}
                          {obes?.abortions?.desc &&
                            `,${' '}A - ${obes?.abortions?.desc}`}
                        </Text>
                      </View>
                    </>
                  )}
                  {/* </View> */}
                </View>
              )}
            </View>
          )}
          {Age <= 18 ? (
            <View style={styles.visitOpenItem}>
              <VisitOpen
                label={'Immunization Chart for Kids'}
                icon={'menu-right'}
                iconstyle={{
                  borderWidth: 0,
                }}
                size={moderateScale(32)}
                textstyle={styles.text}
                navigate={() =>
                  navigation.navigate('kids', {phone, patient_phone})
                }
                // date={
                //   menstrualHistory != '' && updatedate !== '' ? updatedate : null
                // }
              />
            </View>
          ) : (
            <View style={styles.visitOpenItem}>
              <VisitOpen
                label={'Adult Vaccination Details'}
                icon={'menu-right'}
                iconstyle={{
                  borderWidth: 0,
                }}
                size={moderateScale(32)}
                textstyle={styles.text}
                navigate={() =>
                  navigation.navigate('adult', {
                    type: 'Adult',
                    phone: patient_phone,
                  })
                }
                // date={
                //   menstrualHistory != '' && updatedate !== '' ? updatedate : null
                // }
              />
            </View>
          )}

          <ChipInput
            placeholder={'Enter new comorbidities'}
            item={'commorbities'}
            label={'Comorbidities'}
            data={commotData}
            value={comorbidities}
            setValue={setComorbidities}
            onSubmit={handleAddReceiver}
            delete={handleDeleteCommorbities}
          />
          {comorbidities?.length > 0 && (
            <>
              {snomedCommor?.length > 0 ? (
                <View style={styles.suggestion}>
                  {snomedCommor?.map((item, ind) => (
                    <SelectorBtn
                      select={{
                        paddingHorizontal: horizontalScale(4),
                        paddingVertical: verticalScale(8),
                        borderWidth: 1,
                        backgroundColor: CUSTOMCOLOR.white,
                      }}
                      onPress={() => handleSelectComorbidities(item?.term)}
                      key={ind}
                      inputstyle={{
                        color: CUSTOMCOLOR.primary,
                        fontSize: moderateScale(14),
                        fontWeight: '400',
                      }}
                      input={item?.term}></SelectorBtn>
                  ))}
                </View>
              ) : null}
            </>
          )}
          {commor_sug?.length > 0 ? (
            <View style={styles.suggestion}>
              {commor_sug?.map((item, ind) => (
                <SelectorBtn
                  select={{
                    paddingHorizontal: horizontalScale(4),
                    paddingVertical: verticalScale(8),
                    borderWidth: 1,
                    backgroundColor: CUSTOMCOLOR.recent,
                  }}
                  onPress={() => handleSelectComorbidities(item?.commorbities)}
                  key={ind}
                  inputstyle={{
                    color: CUSTOMCOLOR.primary,
                    fontSize: moderateScale(14),
                    fontWeight: '400',
                  }}
                  input={item?.commorbities}></SelectorBtn>
              ))}
            </View>
          ) : null}

          <View style={{gap: 4}}>
            <Text style={{color: CUSTOMCOLOR.black, fontWeight: '600'}}>
              Family history
            </Text>
            {motherHis?.length > 0 && (
              <>
                <Text style={{color: CUSTOMCOLOR.black}}>Mother</Text>
                <View style={styles.his}>
                  {motherHis?.map((value, index) => (
                    <ShowChip
                      key={index}
                      text={`${value?.family}`}
                      onPress={() => handleDeleteFamliy(value)}
                    />
                  ))}
                </View>
              </>
            )}
            {fatherHis?.length > 0 && (
              <>
                <Text style={{color: CUSTOMCOLOR.black}}>Father</Text>
                <View style={styles.his}>
                  {fatherHis?.map((value, index) => (
                    <ShowChip
                      key={index}
                      text={`${value?.family}`}
                      onPress={() => handleDeleteFamliy(value)}
                    />
                  ))}
                </View>
              </>
            )}
            {othersHis?.length > 0 && (
              <>
                <Text style={{color: CUSTOMCOLOR.black}}>Others</Text>
                <View style={styles.his}>
                  {othersHis?.map((value, index) => (
                    <ShowChip
                      key={index}
                      text={`${value?.family}`}
                      onPress={() => handleDeleteFamliy(value)}
                    />
                  ))}
                </View>
              </>
            )}
            <View style={{flexDirection: 'row', gap: moderateScale(16)}}>
              {rel?.map((item, index) => (
                <SelectorBtn
                  key={index}
                  input={item}
                  onPress={() => {
                    if (relation === item) {
                      setRelation('');
                    } else {
                      setRelation(item);
                    }
                  }}
                  select={{
                    backgroundColor:
                      relation === item
                        ? CUSTOMCOLOR.primary
                        : CUSTOMCOLOR.white,
                  }}
                  inputstyle={{
                    color:
                      relation === item ? CUSTOMCOLOR.white : CUSTOMCOLOR.black,
                  }}
                />
              ))}
              {relation === 'Others' && (
                <InputText
                  // ={{paddingVertical: verticalScale(44)}}
                  textStyle={{
                    paddingHorizontal: 0,
                    paddingVertical: 54,
                    width: '30%',
                  }}
                  value={othersrelation}
                  setValue={setOthersRelation}
                  placeholder={'Enter Relation.....'}
                />
              )}
            </View>

            <InputText
              value={family}
              inputContainer={{paddingHorizontal: 0, paddingVertical: 0}}
              setValue={setFamily}
              onSubmit={handleFamily}
              delete={handleDeleteFamliy}
              placeholder={'Eg : Heart diseases, sugar'}
            />
          </View>

          {/* <ChipInput
            placeholder={'Eg : Heart diseases, sugar'}
            item={'family'}
            label={'Family History'}
            data={Fhstry}
            value={family}
            setValue={setFamily}
            onSubmit={handleFamily}
            delete={handleDeleteFamliy}
            input={true}>
            <Text style={{color: CUSTOMCOLOR.black}}>indra</Text>
          </ChipInput> */}
          {family?.length > 0 && (
            <>
              {snomedFamily?.length > 0 ? (
                <View style={styles.suggestion}>
                  {snomedFamily?.map((item, ind) => (
                    <SelectorBtn
                      select={{
                        paddingHorizontal: horizontalScale(4),
                        paddingVertical: verticalScale(8),
                        borderWidth: 1,
                        backgroundColor: CUSTOMCOLOR.white,
                      }}
                      onPress={() => handleSelectFamily(item?.term)}
                      key={ind}
                      inputstyle={{
                        color: CUSTOMCOLOR.primary,
                        fontSize: moderateScale(14),
                        fontWeight: '400',
                      }}
                      input={item?.term}></SelectorBtn>
                  ))}
                </View>
              ) : null}
            </>
          )}
          {family_sug?.length > 0 ? (
            <View style={styles.suggestion}>
              {family_sug?.map((item, ind) => (
                <SelectorBtn
                  select={{
                    paddingHorizontal: horizontalScale(4),
                    paddingVertical: verticalScale(8),
                    borderWidth: 1,
                    backgroundColor: CUSTOMCOLOR.recent,
                  }}
                  onPress={() => handleSelectFamily(item?.family)}
                  key={ind}
                  inputstyle={{
                    color: CUSTOMCOLOR.primary,
                    fontSize: moderateScale(14),
                    fontWeight: '400',
                  }}
                  input={item?.family}></SelectorBtn>
              ))}
            </View>
          ) : null}

          <ChipInput
            placeholder={'Eg : smoking, drinking'}
            item={'social'}
            label={'Social History'}
            data={SocHstry}
            value={social}
            setValue={setSocial}
            onSubmit={handleSocial}
            delete={handleDeleteSocial}
          />
          {social_sug?.length > 0 ? (
            <View style={styles.suggestion}>
              {social_sug?.map((item, ind) => (
                <TouchableOpacity
                  key={ind}
                  style={[
                    styles.sug,
                    item?.social == select,
                    // ? {backgroundColor: CUSTOMCOLOR.primary}
                    // : {backgroundColor: CUSTOMCOLOR.white},
                  ]}
                  onPress={() => handleSelectSocial(item?.social)}>
                  <Text
                    style={[
                      styles.sugtxt,
                      item?.social == select,
                      // ? {color: CUSTOMCOLOR.white}
                      // : {color: CUSTOMCOLOR.primary},
                    ]}>
                    {item?.social}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          <InputText
            inputContainer={styles.inputtext}
            point={medication}
            re={pasthospital}
            next={'next'}
            label="Medication History"
            placeholder="medicine name, dose, quantity, days,reason for medication"
            value={medical}
            setValue={txt => setMedical(txt)}
            blur={false}
            lbltext={{fontWeight: '700'}}
          />
          {data?.length > 0 ? (
            <View style={styles.suggestion}>
              {data?.map((item, ind) => (
                <TouchableOpacity
                  key={ind}
                  style={[
                    styles.sug,
                    item?.medical == select
                      ? {backgroundColor: CUSTOMCOLOR.primary}
                      : {backgroundColor: CUSTOMCOLOR.white},
                  ]}
                  onPress={() => handleSelectMedical(item?.medical)}>
                  <Text
                    style={[
                      styles.sugtxt,
                      item?.medical == select
                        ? {color: CUSTOMCOLOR.white}
                        : {color: CUSTOMCOLOR.primary},
                    ]}>
                    {item?.medical}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          <InputText
            point={pasthospital}
            re={procedureref}
            inputContainer={styles.inputtext}
            label="Past Hospitalization"
            placeholder="Reason for hospitalization"
            value={past}
            setValue={txt => setPast(txt)}
            blur={false}
            lbltext={{fontWeight: '700'}}
          />
          <InputText
            point={procedureref}
            re={redflagref}
            inputContainer={styles.inputtext}
            label="Procedures"
            placeholder="Enter Procedures"
            value={procedures}
            setValue={txt => setprocedures(txt)}
            blur={false}
            lbltext={{fontWeight: '700'}}
          />
          <InputText
            point={redflagref}
            inputContainer={styles.inputtext}
            label="Red Flag 🚩"
            placeholder="Enter Red Flags"
            value={red_flag}
            setValue={txt => setRed_Flag(txt)}
            blur={false}
            lbltext={{fontWeight: '700'}}
          />
          {/* {(medicaldata?.gende == 'Female' ||
            medicaldata?.gende == 'female') && (
            <InputText
              inputContainer={styles.inputtext}
              label="Menstrual History"
              placeholder="Menstrual history"
              value={menstrual}
              setValue={txt => setMenstrual(txt)}
              blur={false}
            />
          )}
          {(medicaldata?.gende == 'Female' ||
            medicaldata?.gende == 'female') && (
            <InputText
              inputContainer={styles.inputtext}
              label="Obstetric History"
              placeholder="Obstetric history"
              value={obstetric}
              setValue={txt => setObstetric(txt)}
              blur={false}
            />
          )} */}
        </View>
      </ScrollView>
      <View style={{justifyContent: 'flex-end'}}>
        <HButton
          btnstyles={commonstyles.activebtn}
          label={'Save'}
          onPress={() => {
            handledata();
          }}
        />
      </View>
    </View>
    // </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    gap: moderateScale(16),
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    backgroundColor: CUSTOMCOLOR.background,
  },
  recomend: {
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
    paddingHorizontal: horizontalScale(16),
  },
  dropdownContainer: {
    height: moderateScale(300),
    backgroundColor: CUSTOMCOLOR.white,
    marginHorizontal: horizontalScale(8),
  },
  visitOpenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderColor: CUSTOMCOLOR.borderColor,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
  },
  text: {
    fontWeight: '700',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  inputtext: {
    paddingVertical: verticalScale(0),
  },
  input: {
    // paddingHorizontal:horizontalScale(8),
    gap: moderateScale(12),
  },
  touch: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
  prev: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h3,
    marginHorizontal: horizontalScale(8),
  },
  sug: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    borderWidth: 0.5,
    borderRadius: moderateScale(4),
    alignItems: 'center',
    borderColor: CUSTOMCOLOR.primary,
  },
  sugtxt: {
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: '400',
    color: CUSTOMCOLOR.primary,
  },
  suggestion: {
    flexDirection: 'row',
    gap: moderateScale(8),
    marginHorizontal: horizontalScale(8),
    flexWrap: 'wrap',
  },
  chipText: {
    color: CUSTOMCOLOR.primary,
    fontSize: CUSTOMFONTSIZE.h4,
  },
  basiccontainer: {
    width: '100%',
    borderRadius: moderateScale(4),
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
    gap: moderateScale(16),
  },
  pulse: {
    fontFamily: CUSTOMFONTFAMILY.body,
    // fontWeight: 400,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(15.04),
    color: CUSTOMCOLOR.black,
  },
  symptomicon: {
    flexDirection: 'row',
    gap: moderateScale(10),
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  his: {flexDirection: 'row', flexWrap: 'wrap', gap: moderateScale(8)},
});
export default MedicalHistory;

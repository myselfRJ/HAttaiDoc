import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import {useState, useEffect} from 'react';
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
  addmenstrualHistory,
  addobstericHistory,
  addpastHospitalization,
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
// import {StoreAsyncData, UpdateAsyncData} from '../utility/AsyncStorage';

const MedicalHistory = ({navigation, route}) => {
  const {medicaldata} = route.params;
  const phone = medicaldata?.phone;
  const token = useSelector(state => state.authenticate.auth.access);
  const patient_phone = medicaldata?.patient_phone;
  console.log('phone', phone, patient_phone);

  const data = useSelector(state => state?.pasthistory?.pasthistory);

  const commor = useSelector(state => state?.pasthistory?.commorbidities);

  const socialHistory = useSelector(state => state?.pasthistory?.socialHistory);

  const familyHistory = useSelector(state => state?.pasthistory?.familyHistory);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const [comorbidities, setComorbidities] = useState('');
  const [commor_sug, setCommor_Sug] = useState([...CONSTANTS.commoribities]);
  const [past, setPast] = useState('');
  const [social, setSocial] = useState('');
  const [social_sug, setSocial_Sug] = useState([...CONSTANTS.social]);
  const [family, setFamily] = useState('');
  const [family_sug, setFamily_Sug] = useState([...CONSTANTS.family]);
  const [medical, setMedical] = useState('');
  const [menstrual, setMenstrual] = useState('');
  const [obstetric, setObstetric] = useState('');
  const [select, setSelect] = useState('');
  console.log('med==', medical);
  const handleSelectComorbidities = value => {
    setSelect(value);
    setComorbidities(value);
    dispatch(addcommorbiditis([...commor, {commorbities: value}]));
    // UpdateAsyncData('commorbidities', {commorbities: value});
    setComorbidities('');
  };
  const handleSelectSocial = value => {
    setSelect(value);
    setSocial(value);
    dispatch(addsocialHistory([...socialHistory, {social: value}]));
    // UpdateAsyncData('socialHistory', {social: value});
    setSocial('');
  };
  const handleSelectFamily = value => {
    setSelect(value);
    setFamily(value);
    dispatch(addfamilyHistory([...familyHistory, {family: value}]));
    // UpdateAsyncData('familyHistory', {family: value});
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
  const hospitalization = useSelector(
    state => state?.pasthistory?.hospitalization,
  );
  const medicationHistory = useSelector(
    state => state?.pasthistory?.medicationHistory,
  );
  console.log('medical=His', medicationHistory);
  const menstrualHistory = useSelector(
    state => state?.pasthistory?.menstrualHistory,
  );
  const obstericHistory = useSelector(
    state => state?.pasthistory?.obstericHistory,
  );

  const handleDeleteSocial = index => {
    if (socialHistory) {
      const updatedSocial = socialHistory?.filter((item, ind) => ind !== index);

      dispatch(updatesocialHistory(updatedSocial));
    }
  };
  const handleDeleteFamliy = index => {
    if (familyHistory) {
      const updatedfamilyHistory = familyHistory?.filter(
        (item, ind) => ind !== index,
      );

      dispatch(updatefamilyHistory(updatedfamilyHistory));
    }
  };
  const handleAddReceiver = () => {
    if (comorbidities.trim() !== '') {
      dispatch(addcommorbiditis([...commor, {commorbities: comorbidities}]));
      // if (commor?.length === 0 || commor == undefined) {
      //   StoreAsyncData('commorbidities', commor);
      // } else {
      UpdateAsyncData('commorbidities', {commorbities: comorbidities});
      // }
      setComorbidities('');
    }
  };
  const handleSocial = () => {
    if (social.trim() !== '') {
      dispatch(addsocialHistory([...socialHistory, {social: social}]));
      // if (socialHistory?.length === 0 || socialHistory == undefined) {
      //   StoreAsyncData('socialHistory', socialHistory);
      // } else {
      UpdateAsyncData('socialHistory', {social: social});
      // }
      setSocial('');
    }
  };
  const handleFamily = () => {
    if (family.trim() !== '') {
      dispatch(addfamilyHistory([...familyHistory, {family: family}]));
      // if (familyHistory?.length === 0 || familyHistory == undefined) {
      //   StoreAsyncData('familyHistory', familyHistory);
      // } else {
      UpdateAsyncData('familyHistory', {family: family});
      // }
      setFamily('');
    }
  };
  const handleAsyncStorage = () => {
    RetriveAsyncData('commorbidities').then(array => {
      const uniqueArray = [...commor_sug, ...array]?.filter((item, index) => {
        return (
          index ===
          array?.findIndex(obj => obj.commorbities === item?.commorbities)
        );
      });
      setCommor_Sug([...commor_sug, ...uniqueArray]);
    });
    RetriveAsyncData('socialHistory').then(array => {
      const uniqueArray = [...social_sug, ...array]?.filter((item, index) => {
        return index === array?.findIndex(obj => obj.social === item?.social);
      });
      setSocial_Sug([...social_sug, ...uniqueArray]);
    });
    RetriveAsyncData('familyHistory').then(array => {
      const uniqueArray = [...family_sug, ...array]?.filter((item, index) => {
        return index === array?.findIndex(obj => obj.family === item?.family);
      });
      setFamily_Sug([...family_sug, ...uniqueArray]);
    });
  };
  useEffect(() => {
    // clearStorage();
    handleAsyncStorage();
  }, []);

  useEffect(() => {
    if (commor_sug?.length === 0 || commor_sug == undefined) {
      StoreAsyncData('commorbidities', commor);
    }
    if (social_sug?.length === 0 || social_sug == undefined) {
      StoreAsyncData('socialHistory', socialHistory);
    }
    if (family_sug?.length === 0 || family_sug == undefined) {
      StoreAsyncData('familyHistory', familyHistory);
    }
  }, []);

  const handledata = () => {
    dispatch(addpastHospitalization({...hospitalization, past}));
    dispatch(addmedicationHistory({...medicationHistory, medical}));
    dispatch(addmenstrualHistory({...menstrualHistory, menstrual}));
    dispatch(addobstericHistory({...obstericHistory, obstetric}));
    nav.goBack();
  };

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
        console.log('medication', jsonData?.data[0]);
        console.log('', jsonData?.data[0]?.mensutral_history);
        if (jsonData?.data[0]?.commoribities) {
          const commo = JSON.parse(jsonData.data[0].commoribities);
          dispatch(addcommorbiditis(commo));
        }
        if (jsonData?.data[0]?.family_history) {
          const family = JSON.parse(jsonData.data[0].family_history);
          dispatch(addfamilyHistory(family));
        }
        if (jsonData?.data[0]?.social_history) {
          const social = JSON.parse(jsonData.data[0].social_history);
          dispatch(addsocialHistory(social));
        }
        if (jsonData?.data[0]?.medication_history) {
          const medication = JSON.parse(jsonData.data[0].medication_history);
          setMedical(medication?.medical);
          dispatch(addmedicationHistory(medication?.medical));
        }
        if (jsonData?.data[0]?.past_history) {
          const hospitalization = JSON.parse(jsonData.data[0].past_history);
          setPast(hospitalization?.past);
          dispatch(addpastHospitalization(hospitalization?.past));
        }
        if (jsonData?.data[0]?.mensutral_history) {
          const mens = JSON.parse(jsonData.data[0].mensutral_history);
          setMenstrual(mens?.menstrual);
          dispatch(addmenstrualHistory(mens?.menstural));
        }
        if (jsonData?.data[0]?.obsteric_history) {
          const mens = JSON.parse(jsonData.data[0].obsteric_history);
          setObstetric(mens?.obstetric);
          dispatch(addobstericHistory(mens?.obstetric));
        }
      } else {
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.error('Error in fetchMedicalData:', error);
    }
  };

  useEffect(() => {
    fetchMedicalData();
  }, []);
  return (
    <View style={styles.main}>
      <PrescriptionHead heading="Medical History" />

      <ScrollView>
        <View style={styles.input}>
          <ChipInput
            placeholder={'Enter new comorbidities'}
            item={'commorbities'}
            label={'Comorbidities'}
            data={commor}
            value={comorbidities}
            setValue={setComorbidities}
            onSubmit={handleAddReceiver}
            delete={handleDeleteCommorbities}
          />
          {commor_sug?.length > 0 ? (
            <View style={styles.suggestion}>
              {commor_sug?.map((item, ind) => (
                <TouchableOpacity
                  key={ind}
                  style={[
                    styles.sug,
                    // item?.commorbities == select
                    //   ? {backgroundColor: CUSTOMCOLOR.primary}
                    //   : {backgroundColor: CUSTOMCOLOR.white},
                  ]}
                  onPress={() => handleSelectComorbidities(item?.commorbities)}>
                  <Text
                    style={[
                      styles.sugtxt,
                      // item?.commorbities == select
                      //   ? {color: CUSTOMCOLOR.white}
                      //   : {color: CUSTOMCOLOR.primary},
                    ]}>
                    {item?.commorbities}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}
          <ChipInput
            placeholder={'Eg : Heart diseases, sugar'}
            item={'family'}
            label={'Family History'}
            data={familyHistory}
            value={family}
            setValue={setFamily}
            onSubmit={handleFamily}
            delete={handleDeleteFamliy}
          />
          {family_sug?.length > 0 ? (
            <View style={styles.suggestion}>
              {family_sug?.map((item, ind) => (
                <TouchableOpacity
                  key={ind}
                  style={[
                    styles.sug,
                    // item?.family == select
                    //   ? {backgroundColor: CUSTOMCOLOR.primary}
                    //   : {backgroundColor: CUSTOMCOLOR.white},
                  ]}
                  onPress={() => handleSelectFamily(item?.family)}>
                  <Text
                    style={[
                      styles.sugtxt,
                      item?.family == select,
                      // ? {color: CUSTOMCOLOR.white}
                      // : {color: CUSTOMCOLOR.primary},
                    ]}>
                    {item?.family}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : null}

          <ChipInput
            placeholder={'Eg : smoking, drinking'}
            item={'social'}
            label={'Social History'}
            data={socialHistory}
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
            label="Medication History"
            placeholder="medicine name, dose, quantity, days,reason for medication"
            value={medical}
            setValue={txt => setMedical(txt)}
            blur={false}
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
            inputContainer={styles.inputtext}
            label="Past Hospitalization"
            placeholder="Reason for hospitalization"
            value={past}
            setValue={txt => setPast(txt)}
            blur={false}
          />
          {(medicaldata?.gende == 'Female' ||
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
          )}
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
  inputtext: {
    paddingVertical: verticalScale(0),
  },
  input: {
    // paddingHorizontal:horizontalScale(8),
    gap: moderateScale(16),
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
});
export default MedicalHistory;

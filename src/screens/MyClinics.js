import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {
  HButton,
  StatusMessage,
  BottomSheetView,
  SelectorBtn,
} from '../components';
import {URL} from '../utility/urls';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchApi} from '../api/fetchApi';
import {useDispatch, useSelector} from 'react-redux';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import PrescriptionHead from '../components/prescriptionHead';
import ClinicCard from '../components/ClinicCard';
import {
  deleteclinics,
  updateclinics,
} from '../redux/features/profiles/clinicData';
import {useRoute} from '@react-navigation/native';
import {HttpStatusCode} from 'axios';
import {headerStatus} from '../redux/features/headerProgress/headerProgress';
import ProgresHeader from '../components/progressheader';
import {useFocusEffect} from '@react-navigation/native';
import {addclinic_data} from '../redux/features/profiles/clinicData';
import {LoadingElement} from '../components/LoadingElement';
import {
  addclinic_Address,
  addclinic_id,
  addclinic_name,
  addPharmaPhone,
  addclinic_logo,
  addclinic_phone,
} from '../redux/features/profiles/clinicId';

const MyClinics = ({navigation}) => {
  const prevScrn1 = 'undefineed';
  const token = useSelector(state => state.authenticate.auth.access);
  const dispatch = useDispatch();

  const route = useRoute();
  const {prevScrn} = route.params;
  const clinics = useSelector(state => state.clinic?.clinics);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState({});
  const [pending, setpending] = useState(false);
  const SuccesRef = useRef(null);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);
  const ResetClinicRedux = () => {
    const ResetClinic = [];
    dispatch(deleteclinics(ResetClinic));
  };
  const handleDeleteSlotChip = index => {
    const newClinics = clinics?.filter((_, i) => i !== index);
    dispatch(deleteclinics(newClinics));
  };
  const [visible, setVisible] = useState(false);
  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetchApi(URL.addclinic, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //         Accept: 'application/json',
  //       },
  //       body: JSON.stringify(clinics),
  //     });
  //     if (response.status === HttpStatusCode.Ok) {
  //       const jsonData = await response.json();
  //       if (jsonData.status === 'success') {
  //         setApiStatus({status: 'success', message: 'Successfully created'});
  //         SuccesRef?.current?.snapToIndex(1);
  //         dispatch(headerStatus({index: 1, status: true}));
  //         {
  //           prevScrn === 'account'
  //             ? setTimeout(() => {
  //                 navigation.navigate('tab');
  //               }, 1000)
  //             : setTimeout(() => {
  //                 navigation.navigate('userdisplay', {prevScrn1});
  //               }, 1000);
  //         }
  //         setTimeout(() => {
  //           SuccesRef?.current?.snapToIndex(0);
  //         }, 5000);
  //         setLoading(false);
  //         ResetClinicRedux();
  //         // SuccesRef?.current?.snapToIndex(0);
  //       } else {
  //         setApiStatus({status: 'warning', message: jsonData.message});
  //         SuccesRef?.current?.snapToIndex(1);
  //         console.error('API call failed:', response.status, response);
  //         setLoading(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error occurred:', error);
  //     setApiStatus({status: 'error', message: 'Please try again'});
  //     SuccesRef?.current?.snapToIndex(1);
  //     setLoading(false);
  //   }
  // };
  const handleNav = () => {
    prevScrn === 'account'
      ? setTimeout(() => {
          navigation.navigate('tab');
        }, 10)
      : setTimeout(() => {
          navigation.navigate('userdisplay', {prevScrn1});
        }, 10);
  };
  const [del_id, setDel_id] = useState();
  const progressData = useSelector(state => state.progress?.status);
  const {phone} = useSelector(state => state?.phone?.data);
  const [clinicData, setClinicData] = useState([]);
  const fetchClinics = async () => {
    try {
      const response = await fetchApi(URL.get_clinics_slots(phone), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const jsonData = await response.json();
        setClinicData(jsonData?.data);
        setpending(true);
        dispatch(addclinic_data(jsonData?.data));
        dispatch(addclinic_id(jsonData.data[0]?.id));
        dispatch(addclinic_name(jsonData.data[0]?.clinic_name));
        dispatch(addclinic_Address(jsonData.data[0]?.clinic_Address));
        dispatch(addclinic_logo(jsonData?.data[0]?.clinic_logo_url));
        dispatch(addclinic_phone(jsonData?.data[0]?.clinic_phone_number));
        dispatch(addPharmaPhone(jsonData?.data[0]?.pharmacyPhone));
      } else {
        setpending(true);
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteClinic = async id => {
    try {
      const response = await fetch(URL.delete_clinic_slot(id), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          setVisible(!visible);
        }
      } else {
        console.log('Error Occured', response.status);
      }
    } catch (error) {
      console.error('Error deleting clinic:', error);
    }
  };

  navigation.setOptions({
    headerLeft: () => <></>,
  });

  useEffect(() => {
    setTimeout(() => {
      fetchClinics();
    }, 1000);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        fetchClinics();
      }, 1000);
    }, [phone]),
  );
  const handleDelete = value => {
    setVisible(!visible);
    setDel_id(value);
  };
  useEffect(() => {
    setTimeout(() => {
      fetchClinics();
    }, 1000);
  }, [visible]);

  return (
    <>
      <View style={styles.Main}>
        {prevScrn !== 'account' && (
          <View>
            <ProgresHeader progressData={progressData} />
          </View>
        )}
        <PrescriptionHead heading={'My Clinics'} />

        <View
          style={{
            alignSelf: clinicData?.length > 0 ? 'flex-end' : 'center',
            alignItems: 'center',
            marginBottom: moderateScale(12),
          }}>
          <HButton
            // btnstyles={styles.btn}
            // inputstyle={styles.input}
            type={'addtype'}
            label={clinicData?.length > 0 ? 'Add Another Clinic' : 'Add Clinic'}
            icon={'plus'}
            onPress={() => {
              navigation.navigate('addclinic', {prevScrn});
            }}
          />
        </View>
        {!pending ? (
          <LoadingElement />
        ) : (
          <ScrollView>
            {clinicData?.map((item, index) => (
              <View key={index} style={{marginBottom: moderateScale(8)}}>
                <ClinicCard
                  key={item.id}
                  index={item.id}
                  data={item}
                  cancel={() => handleDelete(item?.id)}
                />
              </View>
            ))}
          </ScrollView>
        )}
        {clinicData?.length > 0 ? (
          <HButton
            btnstyles={styles.btnNext}
            textStyle={styles.input}
            label={prevScrn === 'account' ? 'back' : 'Next'}
            onPress={handleNav}
            loading={loading}
          />
        ) : null}
      </View>
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
        transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000aa',
            width: '100%',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setVisible(!visible);
            }}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <View
            style={{
              backgroundColor: CUSTOMCOLOR.white,
              padding: moderateScale(40),
              borderRadius: moderateScale(16),
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: CUSTOMCOLOR.black,
                fontWeight: '700',
                fontSize: CUSTOMFONTSIZE.h2,
              }}>
              Are You sure Want To Delete
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: moderateScale(16),
                padding: moderateScale(16),
                borderRadius: moderateScale(16),
              }}>
              <HButton label={'No'} onPress={() => setVisible(!visible)} />
              <HButton
                textStyle={{color: CUSTOMCOLOR.primary}}
                label={'Yes'}
                btnstyles={{
                  backgroundColor: CUSTOMCOLOR.white,
                  borderWidth: moderateScale(2),
                  borderColor: CUSTOMCOLOR.borderColor,
                }}
                onPress={() => deleteClinic(del_id)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  Main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    flex: 1,
    backgroundColor: CUSTOMCOLOR.white,
  },
  input: {
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.white,
    paddingLeft: moderateScale(8),
  },
  btn: {
    backgroundColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(10),
  },
  btnNext: {
    backgroundColor: CUSTOMCOLOR.primary,
    justifyContent: 'center',
    alignSelf: 'center',
    // marginHorizontal: moderateScale(56),
    borderRadius: moderateScale(10),
  },
  modalOverlay: {
    position: 'absolute',
    // width:'100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // borderWidth:1
    // backgroundColor: 'rgba(0,0,0,0.5)'
  },
});
export default MyClinics;

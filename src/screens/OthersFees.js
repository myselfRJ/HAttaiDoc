import React from 'react';
import {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';

import PrescriptionHead from '../components/prescriptionHead';
import {
  BottomSheetView,
  HButton,
  InputText,
  SelectorBtn,
  StatusMessage,
} from '../components';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import Seperator from '../components/seperator';
import {Screen} from 'react-native-screens';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {commonstyles} from '../styles/commonstyle';
import {
  addfees,
  updatefees,
} from '../redux/features/prescription/prescriptionSlice';
import ShowChip from '../components/showChip';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';

// import {Icon} from 'react-native-vector-icons/MaterialCommunityIcons';

const OthersFees = ({navigation}) => {
  // const token = useSelector(state => state.authenticate.auth.access);
  const token = useSelector(state => state?.authenticate.auth.access);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const service_fees = useSelector(state => state.prescription.fees);
  const route = useRoute();
  const {consultation_fees} = route.params;
  const [submittedFees, setSubmiitedFees] = useState([]);
  const [name, setName] = useState('');
  const [fees, setFees] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bottom, setBottom] = useState(false);
  const {feesDetails} = route.params;
  const id = feesDetails?.appointment_id;
  let totalFees = 0;

  submittedFees?.forEach(item => {
    totalFees += parseInt(item.charge);
  });
  useEffect(() => {
    setSubmiitedFees([
      ...submittedFees,
      {
        service_name: `Consultation Fees`,
        charge: parseInt(consultation_fees),
      },
    ]);
  }, []);
  const handleAdd = () => {
    setSubmiitedFees([
      ...submittedFees,

      {service_name: name, charge: parseInt(fees)},
    ]);
    setName('');
    setFees('');
  };
  const handleDispatch = () => {
    dispatch(
      updatefees([
        // {
        //   service_name: `Consultation Fees`,
        //   charge: parseInt(consultation_fees),
        // },
        ...submittedFees,
        {totalFees: totalFees},
      ]),
    );
    if (data) {
      if (data?.length > 0) {
        UpdateFees();
      } else {
        SaveFees();

        Alert.alert('Success', 'Fees details added successfully');
      }
    } else {
      Alert.alert('Warning', 'Please Enter Correct Details');
    }
  };
  const [apiStatus, setApiStatus] = useState({});

  const handleDelete = ind => {
    const updatefee = submittedFees?.filter((_, index) => index !== ind);
    // if(service_fees?.length>0){
    //   const updatedfess = service_fees?.filter(((_, index) => index !== ind))
    // dispatch(updatefees(updatedfess))
    // }
    setSubmiitedFees(updatefee);
  };

  const GetFees = async () => {
    const response = await fetchApi(URL.updateFees(id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      if (jsonData?.data?.fees) {
        const fees = JSON.parse(jsonData?.data?.fees);
        const filtering = fees?.filter(
          item => item?.service_name === 'Consultation Fees',
        );
        if (consultation_fees !== null) {
          if (filtering?.length === 1) {
            fees?.shift();
          }
        }
        fees?.pop();
        setSubmiitedFees(fees);
        setData(JSON.parse(jsonData?.data?.fees));
      }
      // dispatch(addfees([jsonData?.data?.fees,...submittedFees]))
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    GetFees();
  }, []);

  const UpdateFees = async () => {
    const updateFees = {
      fees: JSON.stringify([...submittedFees, {totalFees: totalFees}]),
      patient_phone_number: feesDetails?.patient_phone,
      doctor_phone_number: feesDetails?.doctor_phone_number,
      clinic_id: feesDetails?.clinic_id,
      appointment_id: feesDetails?.appointment_id,
    };
    try {
      const response = await fetchApi(URL.updateFees(id), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(updateFees),
      });
      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData.status === 'success') {
          Alert.alert('Success', jsonData?.message);
          navigation.goBack();
        } else {
          Alert.alert('warn', jsonData?.message);
        }
      } else {
        console.error('API call failed:', response.status);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const SaveFees = async () => {
    const feeDetails = JSON.stringify([
      ...submittedFees,
      {totalFees: totalFees},
    ]);
    const FeesSaving = {
      fees: feeDetails,
      patient_phone_number: feesDetails?.patient_phone,
      doctor_phone_number: feesDetails?.doctor_phone_number,
      clinic_id: feesDetails?.clinic_id,
      appointment_id: feesDetails?.appointment_id,
    };
    setLoading(true);
    try {
      const response = await fetchApi(URL.savefees, {
        method: 'POST',
        headers: {
          Prefer: '',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, application/xml',
        },
        body: JSON.stringify(FeesSaving),
      });
      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData) {
          setApiStatus({status: 'success', message: 'Successfully created'});
          setBottom(true);
          setTimeout(() => {
            nav?.goBack();
          }, 1000);
          setLoading(false);
        } else {
          setApiStatus({status: 'warning', message: 'Enter all Values'});
          setBottom(true);
          console.error('API call failed:', response.status, response);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setApiStatus({status: 'error', message: 'Please try again'});
      setBottom(true);
      console.error('Error occurred:', error);
      setLoading(false);
    }
  };
  const rupeeSymbol = '\u20B9';
  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={{gap: moderateScale(16)}}>
        <PrescriptionHead
          heading={'Fees'}
          head={{paddingHorizontal: 0}}
          headtext={{fontWeight: 'bold'}}
        />
        {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.text}>Consultation Fees</Text>
          <Text style={styles.text}>{consultation_fees}</Text>
        </View> */}
        {submittedFees?.length > 0 && (
          <View style={{flexDirection: 'row', gap: horizontalScale(8)}}>
            {/* <Text style={{fontWeight: '400', color: CUSTOMCOLOR.primary}}>
              Service Fees
            </Text> */}
            {/* <Icon
              size={moderateScale(24)}
              color={CUSTOMCOLOR.primary}
              name={'pencil'}
            /> */}
          </View>
        )}
        {submittedFees?.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: moderateScale(12),
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: horizontalScale(16),
                alignItems: 'center',
              }}>
              <Text style={styles.text}>{item?.service_name}</Text>
              <TouchableOpacity
                onPress={() => handleDelete(index)}
                style={{
                  backgroundColor: '#F8F8FF',
                  borderRadius: moderateScale(100),
                  // borderWidth:0.25,
                  alignItems: 'center',
                  // borderColor:CUSTOMCOLOR.delete,
                  padding: moderateScale(4),
                }}>
                <Icon
                  name={'close'}
                  size={moderateScale(16)}
                  color={CUSTOMCOLOR.error}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>{item?.charge} </Text>
          </View>
        ))}
        <Seperator />
        <Text
          style={{
            alignSelf: 'flex-end',
            fontWeight: '700',
            // fontFamily: CUSTOMFONTFAMILY.heading,
            color: CUSTOMCOLOR.primary,
            fontSize: CUSTOMFONTSIZE.h3,
          }}>
          Total :{' '}
          <Text style={{fontSize: CUSTOMFONTSIZE.h1, color: CUSTOMCOLOR.black}}>
            {`${rupeeSymbol}${totalFees}`}
          </Text>
        </Text>
        <View
          style={{gap: verticalScale(16), paddingVertical: verticalScale(48)}}>
          <Text style={styles.text}>Service Charge</Text>
          <InputText
            value={name}
            label={'Sevice Name'}
            placeholder={'Enter Service Name'}
            setValue={setName}
          />
          <InputText
            value={fees}
            label={'Fees'}
            placeholder={'Enter Fees'}
            required={true}
            setValue={setFees}
            keypad="numeric"
          />
          <HButton
            type="addtype"
            btnstyles={{alignSelf: 'flex-end'}}
            label={'Add'}
            icon="plus"
            onPress={handleAdd}
            // onPress={handleDispatch}
          />
        </View>
      </ScrollView>
      <HButton
        label={'Save'}
        onPress={handleDispatch}
        btnstyles={commonstyles.activebtn}
      />
      <BottomSheetView
        visible={bottom}
        setVisible={setBottom}
        status={apiStatus.status}
        message={apiStatus.message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    backgroundColor: CUSTOMCOLOR.background,
  },
  text: {
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontWeight: '400',
    // alignItems: 'center',
    // gap:horizontalScale(8)
  },
});

export default OthersFees;

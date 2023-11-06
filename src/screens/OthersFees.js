import React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import PrescriptionHead from '../components/prescriptionHead';
import {HButton, InputText, SelectorBtn} from '../components';
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
import {useRoute} from '@react-navigation/native';
import {commonstyles} from '../styles/commonstyle';
import {
  addfees,
  updatefees,
} from '../redux/features/prescription/prescriptionSlice';
import ShowChip from '../components/showChip';
// import {Icon} from 'react-native-vector-icons/MaterialCommunityIcons';

const OthersFees = () => {
  const dispatch = useDispatch();
  const service_fees = useSelector(state => state.prescription.fees);
  const route = useRoute();
  const {consultation_fees} = route.params;
  const [submittedFees, setSubmiitedFees] = useState([]);
  const [name, setName] = useState('');
  const [fees, setFees] = useState('');

  let totalFees = parseInt(consultation_fees);

  submittedFees?.forEach(item => {
    totalFees += parseInt(item.charge);
  });

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
      addfees([
        ...submittedFees,
        {
          service_name: `Consultation Fees`,
          charge: parseInt(consultation_fees),
        },
        {totalFees: totalFees},
      ]),
    );
  };

  const handleDelete = ind => {
    const updatefees = submittedFees?.filter((_, index) => index !== ind);
    setSubmiitedFees(updatefees);
  };
  console.log('=========fees', service_fees);
  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={{gap: moderateScale(16)}}>
        <PrescriptionHead
          heading={'Fees'}
          head={{paddingHorizontal: 0}}
          headtext={{fontWeight: 'bold'}}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.text}>Consultation Fees</Text>
          <Text style={styles.text}>{consultation_fees}</Text>
        </View>
        {submittedFees?.length > 0 && (
          <View style={{flexDirection: 'row', gap: horizontalScale(8)}}>
            <Text style={{fontWeight: '400', color: CUSTOMCOLOR.primary}}>
              Service Fees
            </Text>
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
              <View style={{flexDirection:'row',gap:horizontalScale(16),alignItems:'center'}}>
            <Text style={styles.text}>{item?.service_name}</Text>
            <TouchableOpacity onPress={() => handleDelete(index)} style={{backgroundColor:'#F8F8FF',borderRadius:moderateScale(100),
            // borderWidth:0.25,
            alignItems:'center',
            // borderColor:CUSTOMCOLOR.delete,
            padding:moderateScale(4)}}>
                <Icon
                  name={'close'}
                  size={moderateScale(16)}
                  color={CUSTOMCOLOR.error}
                />
              </TouchableOpacity>
            
            </View>
            <Text style={styles.text}>
              {item?.charge}{' '}
              
            </Text>
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
            {totalFees}
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
          />
        </View>
      </ScrollView>
      <HButton
        label={'Save'}
        onPress={handleDispatch}
        btnstyles={commonstyles.activebtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    backgroundColor:CUSTOMCOLOR.background
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

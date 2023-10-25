import React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, Text} from 'react-native';

import PrescriptionHead from '../components/prescriptionHead';
import {HButton, InputText} from '../components';
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
import { commonstyles } from '../styles/commonstyle';

const OthersFees = () => {
  const route = useRoute();
  const {consultation_fees} = route.params;
  const [submittedFees, setSubmiitedFees] = useState([
    {service_name: 'Consultation Fees', charge: parseInt(consultation_fees)},
  ]);
  const [name, setName] = useState('');
  const [fees, setFees] = useState('');

  let totalFees = 0;

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
            <Icon
              size={moderateScale(24)}
              color={CUSTOMCOLOR.primary}
              name={'pencil'}
            />
          </View>
        )}
        {submittedFees?.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: moderateScale(12),
            }}>
            <Text style={styles.text}>{item?.service_name}</Text>
            <Text style={styles.text}>{item?.charge}</Text>
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
          />
          <HButton
            type='addtype'
            btnstyles={{alignSelf: 'flex-end'}}
            label={'Add'}
            icon="plus"
            onPress={handleAdd}
          />
        </View>
      </ScrollView>
      <HButton label={'Paid'} btnstyles={commonstyles.activebtn} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
  },
  text: {
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontWeight: '400',
  },
});

export default OthersFees;

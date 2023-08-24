import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from '../components/Icon';
import {useSelector, useDispatch} from 'react-redux';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {CONSTANTS} from '../utility/constant';
import {addValid} from '../redux/features/prescription/valid';
import {HButton, SelectorBtn, Option} from '../components';
import {useNavigation} from '@react-navigation/native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';

import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import Prescribe from './prescribe';
import PrescriptionHead from '../components/prescriptionHead';

export default function Valid() {
  const months = CONSTANTS.months;

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('0');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleOptions = value => {
    setSelected(value);
  };

  const handleDate = () => {
    setOpen(!open);
  };

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
  };

  const dateTimeRed = useSelector(state => state.valid?.date);
  console.log('----------', dateTimeRed);

  const handleCancel = () => {
    setOpen(open);
  };

  const day = date?.toString()?.split(' ')[2];
  const month = date?.toString().split(' ')[1];
  const year = date?.toString().split(' ')[3];
  const follow_upTime = date?.toString().split(' ')[4].substring(0, 5);

  const follow_upDateTime = `${day} ${month} ${year} at ${follow_upTime}`;

  //   console.log(follow_upDateTime);

  const handleDates = selectedDate => {
    let startDate = new Date(selectedDate);

    let numberOfDaysToAdd = parseInt(selected);
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + numberOfDaysToAdd);
    let formattedEndDate = endDate.toISOString().substring(0, 10);
    const day = formattedEndDate.split('-')[2];
    const year = formattedEndDate.split('-')[0];
    const month = months[`${formattedEndDate.split('-')[1]}`];
    const Follow_UP = `${day}-${month}-${year}`;
    return Follow_UP;
  };
  const handlePress = () => {
    dispatch(addValid(handleDates(date)));
    navigation.goBack();
  };

  return (
    <View style={styles.MainContainer}>
      <PrescriptionHead heading={'Validity Up To'} />
      {/* <Text style={styles.FUP}>{Language[language]['follow_up']}</Text> */}
      <View style={styles.DateContainer}>
        <SelectorBtn
          onPress={handleDate}
          name={'calendar'}
          input={handleDates(date)}
        />

        {open && (
          <DatePicker
            modal
            open={open}
            date={date}
            theme="auto"
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </View>
      <Text
        style={{
          top: moderateScale(12),
          fontFamily: CUSTOMFONTFAMILY.body,
          color: CUSTOMCOLOR.black,
          fontSize: CUSTOMFONTSIZE.h4,
          fontWeight: '400',
        }}>
        Days:
      </Text>
      <View style={styles.radiogroup}>
        <Option
          label="3 Days"
          value="3"
          selected={selected === '3'}
          onPress={() => handleOptions('3')}
        />
        <Option
          label="7 Days"
          value="7"
          selected={selected === '7'}
          onPress={() => handleOptions('7')}
        />
        <Option
          label="15 Days"
          value="15"
          selected={selected === '15'}
          onPress={() => handleOptions('15')}
        />
        <Option
          label="30 Days"
          value="30"
          selected={selected === '30'}
          onPress={() => handleOptions('30')}
        />
        <Option
          label="60 Days"
          value="60"
          selected={selected === '60'}
          onPress={() => handleOptions('60')}
        />
        <Option
          label="90 Days"
          value="90"
          selected={selected === '90'}
          onPress={() => handleOptions('90')}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          top: '24%',
        }}>
        <HButton
          label={'submit'}
          onPress={() => {
            handlePress();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    //justifyContent: 'space-between',
    // flexWrap: 'wrap',
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
  },
  FUP: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h2,
    fontWeight: '600',
    lineHeight: 19.07,
    color: CUSTOMCOLOR.black,
  },
  DateContainer: {
    // width: '100%',
    borderRadius: 4,
    paddingHorizontal: 16,
    backgroundColor: CUSTOMCOLOR.white,
    justifyContent: 'space-between',
    // flexDirection: 'row',
  },
  DateText: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h4,
    lineHeight: 19.07,
    color: CUSTOMCOLOR.black,
  },
  radiogroup: {
    padding: moderateScale(8),
    flexDirection: 'row',
    gap: 48,

    justifyContent: 'flex-start',
  },
  alignchild: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 8,
  },
});

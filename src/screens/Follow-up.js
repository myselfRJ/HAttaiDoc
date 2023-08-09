import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from '../components/Icon';
import {useSelector, useDispatch} from 'react-redux';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {CONSTANTS} from '../utility/constant';
import {addDate} from '../redux/features/prescription/Followupslice';
import {HButton, SelectorBtn} from '../components';
import {useNavigation} from '@react-navigation/native';

import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';

export default function DateTime() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDate = () => {
    setOpen(!open);
  };

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
  };

  const dateTimeRed = useSelector(state => state.dateTime?.date);
  console.log('-------------------', dateTimeRed, '------------------------');

  const handleCancel = () => {
    setOpen(open);
  };

  const handlePress = () => {
    dispatch(addDate(follow_upDateTime));
    navigation.goBack();
  };

  const day = date?.toString()?.split(' ')[2];
  const month = date?.toString().split(' ')[1];
  const year = date?.toString().split(' ')[3];
  const follow_upTime = date?.toString().split(' ')[4].substring(0, 5);

  const follow_upDateTime = `${day} ${month} ${year} at ${follow_upTime}`;

  console.log(follow_upDateTime);

  return (
    <View style={styles.MainContainer}>
      <Text style={styles.FUP}>{Language[language]['follow_up']}</Text>
      <View style={styles.DateContainer}>
        <SelectorBtn
          onPress={handleDate}
          name={'calendar'}
          input={follow_upDateTime}
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
      <View
        style={{
          width: '100%',
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
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  FUP: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontSize: CUSTOMFONTSIZE.h2,
    fontWeight: '600',
    lineHeight: 19.07,
    color: CUSTOMCOLOR.black,
  },
  DateContainer: {
    width: '100%',
    borderRadius: 4,
    padding: 8,
    backgroundColor: CUSTOMCOLOR.white,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  DateText: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h4,
    lineHeight: 19.07,
    color: CUSTOMCOLOR.black,
  },
});

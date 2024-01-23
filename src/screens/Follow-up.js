import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from '../components/Icon';
import {useSelector, useDispatch} from 'react-redux';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {CONSTANTS} from '../utility/constant';
import {addDate} from '../redux/features/prescription/Followupslice';
import {HButton, SelectorBtn, Option, InputText} from '../components';
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
import PrescriptionHead from '../components/prescriptionHead';
import {commonstyles} from '../styles/commonstyle';
import {formatdate, handleAddDates} from '../utility/const';

export default function DateTime() {
  const months = CONSTANTS.months;
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [customDays, setCustomDays] = useState('');
  const [selected, setSelected] = useState('3');
  const [returnDate, setReturnDate] = useState(
    formatdate(handleAddDates(date, selected)),
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleOptions = value => {
    setSelected(value);
    setReturnDate(formatdate(handleAddDates(date, value)));
  };

  const handleDate = () => {
    setOpen(true);
  };

  const handleConfirm = selectedDate => {
    setDate(selectedDate);
    const date = selectedDate?.toISOString()?.split('T')[0];
    setReturnDate(formatdate(date));
    setOpen(false);
  };

  const dateTimeRed = useSelector(state => state.dateTime?.date);
  const follow_up_date =
    dateTimeRed?.length > 0
      ? dateTimeRed
          ?.filter(item => item?.appointment_id === appointmentID)
          ?.slice(-1)[0]?.date
      : '';

  const handleCancel = () => {
    setOpen(false);
  };

  const handlePress = () => {
    dispatch(
      addDate([
        ...dateTimeRed,
        {
          date: returnDate,
          appointment_id: appointmentID,
        },
      ]),
    );
    navigation.goBack();
  };
  useEffect(() => {
    setReturnDate(
      follow_up_date !== undefined && follow_up_date
        ? follow_up_date
        : returnDate,
    );
  }, []);

  return (
    <View style={styles.MainContainer}>
      <PrescriptionHead heading={Language[language]['follow_up']} />
      {/* <Text style={styles.FUP}>{Language[language]['follow_up']}</Text> */}
      <View style={styles.DateContainer}>
        <SelectorBtn
          onPress={handleDate}
          name={'calendar'}
          input={returnDate}
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
      <Text style={styles.dateText}>Days:</Text>
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
        <View style={{width: moderateScale(100)}}>
          <InputText
            value={customDays}
            placeholder={'Enter Days'}
            setValue={val => {
              setCustomDays(val);
              setReturnDate(formatdate(handleAddDates(date, val ? val : 0)));
            }}
            keypad="numeric"
          />
        </View>
      </View>
      <View style={styles.submit}>
        <HButton
          btnstyles={commonstyles.activebtn}
          label={'Save'}
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
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    gap: moderateScale(12),
    backgroundColor: CUSTOMCOLOR.background,
  },
  DateContainer: {
    borderRadius: moderateScale(4),

    justifyContent: 'space-between',
  },
  radiogroup: {
    padding: moderateScale(8),
    flexDirection: 'row',
    gap: moderateScale(48),

    // justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  dateText: {
    top: moderateScale(12),
    fontFamily: CUSTOMFONTFAMILY.body,
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '400',
  },
  submit: {
    justifyContent: 'flex-end',
    flex: 1,
  },
});

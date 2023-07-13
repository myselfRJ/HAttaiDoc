import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from '../components/Icon';
import {useSelector, useDispatch} from 'react-redux';
import {setDate, setOpen} from '../redux/features/prescription/Followupslice';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';

export default function DateTime() {
  const date = useSelector(state => state.dateTime.date);
  const open = useSelector(state => state.dateTime.open);
  const dispatch = useDispatch();

  const handleDate = () => {
    dispatch(setOpen(!open));
  };
  console.log(date, 'date');
  const formattedDate = date.toString();

  const handleConfirm = selectedDate => {
    dispatch(setOpen(false));
    dispatch(setDate(selectedDate.toString()));
  };

  const handleCancel = () => {
    dispatch(setOpen(false));
  };

  console.log(date);
  return (
    <View style={styles.MainContainer}>
      <Text style={styles.FUP}>{Language[language]['follow_up']}</Text>
      <View style={styles.DateContainer}>
        <Text style={styles.DateText}>{formattedDate}</Text>
        <TouchableOpacity onPress={handleDate}>
          <Icon name="calendar" size={24} color={CUSTOMCOLOR.primary} />
        </TouchableOpacity>
        {open && (
          <DatePicker
            modal
            open={open}
            date={new Date(date)}
            theme="auto"
            mode="date"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 32,
    gap: 8,
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
    padding: 16,
    backgroundColor: CUSTOMCOLOR.white,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  DateText: {
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h4,
    lineHeight: 19.07,
  },
});

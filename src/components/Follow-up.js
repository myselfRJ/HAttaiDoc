import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from './Icon';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';

export default function DateTime() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleDate = () => {
    setOpen(!open);
  };

  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

  return (
    <View style={styles.MainContainer}>
      <Text style={styles.FUP}>{Language[language]['follow_up']}</Text>
      <View style={styles.DateContainer}>
        <Text style={styles.DateText}>{formattedDate}</Text>
        <TouchableOpacity onPress={handleDate}>
          <Icon name="calendar" size={24} color={'#4ba5fa'} />
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={date}
          theme="auto"
          mode="datetime"
          onConfirm={date => {
            setOpen(open);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(open);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    width: 651,
    padding: 8,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  FUP: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19.07,
    color: '#000000',
  },
  DateContainer: {
    width: 635,
    borderRadius: 4,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  DateText: {
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: 19.07,
  },
});

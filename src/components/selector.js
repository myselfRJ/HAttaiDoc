import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';

const SelectorBtn = props => {
  return (
    <View style={{flex: 1}}>
      {props.label && <Text style={styles.h3}>{props.label}</Text>}
      <Pressable style={styles.select} onPress={props.onPress}>
        <Text style={styles.h3}>{props.input}</Text>
        <Icon name={props.name} size={24} color={CUSTOMCOLOR.primary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CUSTOMCOLOR.white,
    minWidth: 160,
  },
  h3: {
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.opensan,
    lineHeight: CUSTOMFONTSIZE.h3 * 2,
  },
});

export default SelectorBtn;

// const handleDate = () => {
//   setOpen(!open);
// };

// const formattedDate = date.toLocaleDateString('en-US', {
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   hour: 'numeric',
//   minute: 'numeric',
//   timeZone: 'Asia/Kolkata',
// });

// return (
//   <View style={styles.MainContainer}>
//     <Text style={styles.FUP}>{Language[language]['follow_up']}</Text>
//     <View style={styles.DateContainer}>
//       <Text style={styles.DateText}>{formattedDate}</Text>
//       <TouchableOpacity onPress={handleDate}>
//         <Icon name="calendar" size={24} color={'#4ba5fa'} />
//       </TouchableOpacity>
//       <DatePicker
//         modal
//         open={open}
//         date={date}
//         theme="auto"
//         mode="datetime"
//         onConfirm={date => {
//           setOpen(open);
//           setDate(date);
//         }}
//         onCancel={() => {
//           setOpen(open);
//         }}
//       />
//     </View>
//   </View>
// );

import {View, Text, StyleSheet, TextInput} from 'react-native';
import SelectionTab from './selectiontab';
import InputText from './inputext';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utility/scaleDimension';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import {mode} from '../redux/features/prescription/prescribeslice';
import Option from './option';
import {useEffect, useState} from 'react';

const Examination_Fields = props => {
  const handleRemoveString = str => {
    const inputString = str;
    const extractedNumbers =
      str !== undefined && str ? inputString.match(/[\d.]+/g) : '';
    if (extractedNumbers) {
      const numbers = extractedNumbers.map(str => parseFloat(str));
      return numbers[0];
    } else {
      return 'No';
    }
  };
  const buildWeigth = handleRemoveString(props.value);
  const check = props.check !== undefined ? props.check : false;
  return (
    <View
      style={{
        ...styles.main,
        flexDirection: props.label === 'Build' ? 'row' : 'column',
        justifyContent: props.label !== 'Build' ? 'center' : 'flex-start',
      }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>{props.label}</Text>
        </View>
        {props.label !== 'Build' && (
          <View style={{flexDirection: 'row', gap: moderateScale(16)}}>
            <Option
              // style={{width: horizontalScale(32)}}
              label={
                check === 'yes'
                  ? 'No'
                  : check === 'present'
                  ? props.label === 'Nutrition'
                    ? 'Well nourished'
                    : 'Absent'
                  : 'N'
              }
              selected={
                props.option ===
                (check === 'yes'
                  ? 'No'
                  : check === 'present'
                  ? props.label === 'Nutrition'
                    ? 'Well nourished'
                    : 'Absent'
                  : 'N')
              }
              onPress={() =>
                props.setOption(
                  check === 'yes'
                    ? 'No'
                    : check === 'present'
                    ? props.label === 'Nutrition'
                      ? 'Well nourished'
                      : 'Absent'
                    : 'N',
                )
              }
            />
            <Option
              // style={{width: horizontalScale(32)}}
              label={
                check === 'yes'
                  ? 'Yes'
                  : check === 'present'
                  ? props.label === 'Nutrition'
                    ? 'Malnourished'
                    : 'Present'
                  : 'A'
              }
              selected={
                props.option ===
                (check === 'yes'
                  ? 'Yes'
                  : check === 'present'
                  ? props.label === 'Nutrition'
                    ? 'Malnourished'
                    : 'Present'
                  : 'A')
              }
              onPress={() =>
                props.setOption(
                  check === 'yes'
                    ? 'Yes'
                    : check === 'present'
                    ? props.label === 'Nutrition'
                      ? 'Malnourished'
                      : 'Present'
                    : 'A',
                )
              }
            />
          </View>
        )}
      </View>
      {check === 'present' || !check
        ? (props.option !== '' || props.label === 'Build') && (
            <TextInput
              placeholderTextColor={CUSTOMCOLOR.disable}
              style={{
                ...styles.textinput,
                borderWidth: props.label === 'Build' ? 0 : 1,
                color:
                  props.label === 'Build' && parseInt(buildWeigth) < 18
                    ? '#f93'
                    : props.label === 'Build' &&
                      parseInt(buildWeigth) >= 18 &&
                      parseInt(buildWeigth) <= 25
                    ? CUSTOMCOLOR.success
                    : props.label === 'Build' && parseInt(buildWeigth) > 25
                    ? CUSTOMCOLOR.delete
                    : CUSTOMCOLOR.black,
              }}
              placeholder="Description"
              value={props.value}
              multiline={true}
              onChangeText={props.setvalue}></TextInput>
          )
        : null}
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
    gap: verticalScale(8),
    width: '48%',
    // borderWidth: 1,
  },
  container: {
    // paddingHorizontal: horizontalScale(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: moderateScale(24),
    // borderWidth: 1,
    // width: '40%',
  },
  text: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '500',
  },
  textinput: {
    backgroundColor: CUSTOMCOLOR.white,
    borderColor: CUSTOMCOLOR.primary,
    borderWidth: 1,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(6),
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h3,
    // color: CUSTOMCOLOR.black,
    borderRadius: 4,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
});
export default Examination_Fields;

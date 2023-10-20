import React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {
  addFindings,
  UpadteFindings,
} from '../redux/features/prescription/prescriptionSlice';
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

const ExaminationFindings = () => {
  const [value, setValue] = useState('');
  const [describe, setDescribe] = useState('');
  const dispatch = useDispatch();
  const exam_findings = {
    value: value,
    describe: describe,
  };

  const handlePress = () => {
    dispatch(addFindings(exam_findings));
    setValue('');
    setDescribe('');
  };
  return (
    <View style={styles.main}>
      <PrescriptionHead
        heading={'Examination Findings'}
        headtext={{fontWeight: 'bold'}}
        head={{paddingHorizontal: 0}}
      />
      <InputText
        value={value}
        label={'Examination Finding'}
        setValue={setValue}
        multiline={true}
        placeholder={'Write Your Notes.......'}
        textStyle={{
          //   height: moderateScale(200),
          //   textAlignVertical: 'top',

          color: CUSTOMCOLOR.black,
          fontWeight: '700',
        }}
        lbltext={{
          fontSize: CUSTOMFONTSIZE.h3,
        }}
      />
      <InputText
        value={describe}
        label={'Description'}
        setValue={setDescribe}
        multiline={true}
        placeholder={'Write Your Notes.......'}
        textStyle={{
          height: moderateScale(200),
          textAlignVertical: 'top',
          color: CUSTOMCOLOR.black,
          fontWeight: '700',
        }}
        lbltext={{
          fontSize: CUSTOMFONTSIZE.h3,
        }}
      />
      <View
        style={{
          justifyContent: 'flex-end',
          flex: 1,
          marginHorizontal: horizontalScale(80),
        }}>
        <HButton
          onPress={handlePress}
          btnstyles={{borderRadius: moderateScale(16)}}
          label={'Save'}
        />
      </View>
    </View>
  );
};

export default ExaminationFindings;

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    flex: 1,
    gap: verticalScale(16),
  },
});

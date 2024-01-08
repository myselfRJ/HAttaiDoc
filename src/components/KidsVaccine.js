import React, {useState, version} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import InputText from './inputext';
import DatePicker from 'react-native-date-picker';
import SelectorBtn from './selector';
import Option from './option';

const KidsVaccine = props => {
  const [open, setOpen] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: CUSTOMCOLOR.white,
        paddingHorizontal: horizontalScale(8),
        paddingVertical: verticalScale(12),
        borderRadius: moderateScale(8),
        borderColor: '#C0DFFC',
        borderWidth: moderateScale(2),
        // height: moderateScale(112),
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <View>
          <Text style={styles.VaccineName}>{props.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: moderateScale(10),
              gap: moderateScale(10),
            }}>
            {/* <Text style={styles.Options}>Yes</Text> */}
            {/* <Text style={styles.Options}>No</Text> */}
            <Option
              label="Yes"
              selected={props.option === 'Yes'}
              onPress={() => props.setOption('Yes')}
            />
            <Option
              label="No"
              selected={props.option === 'No'}
              onPress={() => props.setOption('No')}
            />
          </View>
        </View>
        {props.option === 'Yes' && (
          <View
            style={{
              // borderWidth: 1,
              gap: moderateScale(6),
              paddingHorizontal: horizontalScale(12),
              // paddingVertical: verticalScale(4),
            }}>
            <SelectorBtn
              select={{
                borderWidth: moderateScale(0.5),
                borderColor: CUSTOMCOLOR.primary,
                paddingLeft: 0,
                // width: moderateScale(120),
                // marginRight: moderateScale(15),
                paddingHorizontal: horizontalScale(16),
                // paddingVertical: verticalScale(8),
                // height: moderateScale(38),
              }}
              input={
                typeof props.date === 'string'
                  ? props.date?.split('T')[0]
                  : props.date?.toISOString().split('T')[0] || 'Date'
              }
              setValue={props.setDate}
              name={'calendar'}
              size={18}
              inputstyle={{
                paddingHorizontal: moderateScale(5),
                fontSize: moderateScale(14),
              }}
              onPress={() => setOpen(true)}
              style={{padding: moderateScale(0), margin: 0}}
            />
            <DatePicker
              modal
              open={open}
              date={
                typeof props.date === 'string'
                  ? new Date(props.date)
                  : props.date
              }
              mode="date"
              onConfirm={date => {
                setOpen(false);
                props.setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <InputText
              placeholder={'Batch No:'}
              lbltext={{display: 'none'}}
              // inputContainer={{paddingVertical: -1}}
              value={props.value}
              setValue={props.setValue}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  VaccineName: {
    fontSize: CUSTOMFONTSIZE.h1,
    fontFamily: CUSTOMFONTFAMILY.body,
    color: CUSTOMCOLOR.black,
    fontWeight: '500',
  },
  Options: {
    fontSize: CUSTOMFONTSIZE.h2,
    fontFamily: CUSTOMFONTFAMILY.body,
    color: CUSTOMCOLOR.background,
    paddingRight: moderateScale(20),
  },
});

export default KidsVaccine;

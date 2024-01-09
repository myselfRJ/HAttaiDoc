import React, {useState, useEffect, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
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
import SignatureCapture from 'react-native-signature-capture';

import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import PrescriptionHead from '../components/prescriptionHead';
import {addSign} from '../redux/features/prescription/sign';
import {commonstyles} from '../styles/commonstyle';

export default function Valid() {
  const months = CONSTANTS.months;
  const signature = useSelector(state => state?.sign);
  const [saveSelected, setIsSaveSelected] = useState(false);
  const [resetSelected, setIsResetSelected] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('0');
  const [doctorSign, setSign] = useState(false);
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

  const sign = createRef();

  const saveSign = () => {
    sign.current.saveImage();
    // console.log('save====',sign.current.saveImage())
  };
  // useEffect(()=>{
  //   saveSign();
  // },[])

  const resetSign = () => {
    sign.current.resetImage();
    setSign(false);
  };

  const _onSaveEvent = result => {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name

    alert('Signature Captured Successfully');
    dispatch(addSign(result.encoded));
    setSign(result.encoded);
  };

  const _onDragEvent = () => {
    setSign(!doctorSign);
  };

  return (
    <View style={styles.MainContainer}>
      <PrescriptionHead heading={'Validity Up To'} />
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
          fontSize: CUSTOMFONTSIZE.h3,
          fontWeight: '700',
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
      <View style={{gap: verticalScale(8)}}>
        <Text
          style={{
            fontWeight: 600,
            fontSize: CUSTOMFONTSIZE.h1,
            color: CUSTOMCOLOR.black,
            fontFamily: CUSTOMFONTFAMILY.heading,
            paddingBottom: moderateScale(16),
          }}>
          Doctor Signature
        </Text>
        <View
          style={{
            height: moderateScale(200),
            width: '100%',
            alignSelf: 'center',
            borderWidth: 0.5,
            borderColor: CUSTOMCOLOR.primary,
          }}>
          <SignatureCapture
            style={styles.signature}
            ref={sign}
            onSaveEvent={_onSaveEvent}
            onDragEvent={_onDragEvent}
            showNativeButtons={false}
            showTitleLabel={false}
            viewMode={'portrait'}
            minStrokeWidth={4}
            maxStrokeWidth={4}
            backgroundColor={'#FFFFFF'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            // width: moderateScale(235),
            alignSelf: 'center',
            top: moderateScale(24),
          }}>
          <TouchableHighlight
            style={[
              styles.buttonStyle,
              doctorSign == true
                ? {backgroundColor: CUSTOMCOLOR.primary}
                : {backgroundColor: CUSTOMCOLOR.white},
            ]}
            onPress={() => {
              saveSign();
              setIsSaveSelected(true);
              setIsResetSelected(false);
            }}>
            <Text
              style={
                doctorSign == true
                  ? {color: CUSTOMCOLOR.white}
                  : {color: CUSTOMCOLOR.primary}
              }>
              Save
            </Text>
          </TouchableHighlight>
          {/* <HButton label='Save'
          type='addtype'
          btnstyles={[{...commonstyles.activebtn,
            alignSelf:'center'},
            saveSelected ? {backgroundColor:CUSTOMCOLOR.primary}:{backgroundColor:CUSTOMCOLOR.disable}
 
          ]}
          onPress={() => {
            saveSign();
            setIsSaveSelected(true);
            setIsResetSelected(false);
          }}
          /> */}
          <TouchableHighlight
            style={[
              styles.buttonStyle,
              // resetSelected ? {backgroundColor: CUSTOMCOLOR.delete} : null,
            ]}
            onPress={() => {
              resetSign();
              setIsResetSelected(true);
              setIsSaveSelected(false);
            }}>
            <Text style={{color: CUSTOMCOLOR.primary}}>Reset</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        <HButton
          btnstyles={commonstyles.activebtn}
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
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
    gap: moderateScale(8),
    backgroundColor: CUSTOMCOLOR.background,
  },
  DateContainer: {
    borderRadius: moderateScale(4),
    // paddingHorizontal: horizontalScale(16),
    // backgroundColor: CUSTOMCOLOR.white,
    justifyContent: 'space-between',
  },
  radiogroup: {
    padding: moderateScale(8),
    flexDirection: 'row',
    gap: moderateScale(24),

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
    justifyContent: 'center',
    alignItems: 'center',
    top: '24%',
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
    // height:100,
    // width:100
  },
  buttonStyle: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 50,
    borderColor: CUSTOMCOLOR.primary,
    borderWidth: 1,
    borderRadius: 4,
    margin: 10,
    width: 100,
    paddingVertical: verticalScale(8),
  },
});

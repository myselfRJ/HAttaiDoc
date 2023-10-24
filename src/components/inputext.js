import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../utility/scaleDimension';

import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const InputText = props => {
  //props-> check, label, placeholder , action, secure, padtype
  const [visible, setVisible] = React.useState(props.secure || true);
  const [errorStyles, setErrorStyle] = React.useState({borderColor:CUSTOMCOLOR.primary});
  const toggleVisible = () => {
    setVisible(!visible);
  };

  const passtoParent = e => {
    props.setValue(e);
    if (props?.doubleCheck?.[0]) {
      !props?.check(e)
        ? setErrorStyle({borderColor: CUSTOMCOLOR.error, borderWidth: 1})
        : setErrorStyle({borderColor: CUSTOMCOLOR.primary, borderWidth: 1});
    }
    if (props?.doubleCheck?.[1]) {
      !props?.check2?.[0](props?.check2[1], e)
        ? setErrorStyle({borderColor: CUSTOMCOLOR.error, borderWidth: 1})
        : setErrorStyle({});
    }
  };

  const handleNumericInput = input => {
    // (/[^a-zA-Z]/g, '') for only strings
    const numericValue = input.replace(/[^0-9]/g, '');
    passtoParent(numericValue);
  };
  const numeric = props.numeric;
  // console.log('-----------numric',numeric);

  return (
    <>
      <View style={[styles.inpcontainer, props.inputContainer]}>
        {props.label ? (
          <Text style={[styles.labeltext, props.lbltext]}>
            {props.label}{' '}
            {props.required ? (
              <Text
                style={[
                  styles.indicator,
                  props.required && visible && styles.required,
                ]}>
                *
              </Text>
            ) : null}
          </Text>
        ) : null}
        <View>
          <TextInput
            style={[
              styles.textinput,
              errorStyles,
              props.textStyle,
              props.search ? styles.bottom : styles.textinput,
              // (props.doubleCheck && props.check) ? styles.numStyle : styles.textinput
            ]}
            textAlign={props.textAlign ?? 'left'}
            // underlineColorAndroid="transparent"
            placeholder={props.placeholder}
            secureTextEntry={props.secure ? visible : false}
            inputMode={props.keypad ?? 'none'}
            maxLength={props.maxLength ?? 1000}
            onChangeText={numeric ? handleNumericInput : passtoParent}
            value={props.value}
            multiline={props.multiline}
          />
          {props.secure !== undefined ? (
            visible ? (
              <TouchableOpacity style={{...styles.eye}} onPress={toggleVisible}>
                <Icon name={'eye-off'} color={CUSTOMCOLOR.primary} size={16} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.eye} onPress={toggleVisible}>
                <Icon name={'eye'} color={CUSTOMCOLOR.primary} size={16} />
              </TouchableOpacity>
            )
          ) : (
            <></>
          )}

          {props.search !== undefined && (
            <TouchableOpacity
              style={[styles.search, props.searchtxt]}
              onPress={props.onPress}>
              <Icon
                name={props.IconName}
                color={CUSTOMCOLOR.primary}
                size={moderateScale(24)}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  inpcontainer: {
    width: '100%',
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '400',
    gap: verticalScale(4),
    // backgroundColor: CUSTOMCOLOR.white,
    borderRadius: 4,
  },
  labeltext: {
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  textinput: {
    backgroundColor: CUSTOMCOLOR.white,
    // borderColor: CUSTOMCOLOR.primary,
    borderWidth: 0.5,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(9.5),
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h3,
    // outlinedStyle: "none",
    borderRadius: 4,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  numStyle: {
    backgroundColor: CUSTOMCOLOR.white,
    // borderColor: CUSTOMCOLOR.primary,
    borderWidth: 0.5,
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h3,
    // outlinedStyle: "none",
    borderRadius: 4,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  eye: {
    position: 'absolute',
    top: moderateScale(19), //12+fontsize.h3/2
    right: moderateScale(10),
  },
  search: {
    position: 'absolute',
    top: moderateScale(12), //12+fontsize.h3/2
    right: moderateScale(10),
  },
  indicator: {
    fontSize: CUSTOMFONTSIZE.h4,
    marginRight: 5,
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    flex: 1,
  },
  bottom: {
    borderBottomWidth: 0.8,

    borderBottomColor: '#A9A9A9',
  },
});

export default InputText;

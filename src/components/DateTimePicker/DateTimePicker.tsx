import * as React from 'react';
import {FC, useState} from 'react';
import {Button, Text} from '../index';
import {IconX, ICON_TYPE} from '../Icon/IconX';
import {styles} from './styles';
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import dayjs from 'dayjs';
import {validateInput} from '../../utils/FormUtils/Validators';
import {FormValidators} from '../Form/Form';

type OwnProps = {
  type?: 'datetime' | 'date' | 'time';
  hasMargin?: boolean;
  field?: string;
  label?: string;
  placeholder?: string;
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  btnStyle?: StyleProp<ViewStyle>;
  hasError?: boolean;
  fieldError?: string;
  date?: string;
  maximumDate?: Date | null;
  validators?: FormValidators[];
  handleText?: (
    value: string,
    field: string,
    error?: {error: boolean; message: string},
  ) => void;
  disabled?: boolean;
  height?: number;
};

type DateTimePickerProps = OwnProps & DatePickerProps;

const DateTimePicker: FC<DateTimePickerProps> = ({
  type,
  label,
  field,
  labelStyle,
  containerStyle,
  minuteInterval = 1,
  hasError,
  fieldError,
  btnStyle,
  validators,
  handleText,
  placeholder = '',
  maximumDate,
  disabled,
  height,
  date,
  ...rest
}) => {
  const theme = useColorScheme();
  const {card, text, primary, background, gray} = {card:"white",text:'black',primary:'black',background:'white',gray:'grey'};
  const [error, setError] = useState<{error: boolean; message: string} | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const placeHolderTextColor = date === '' || date === null ? gray : text;
  // console.log('date', date);

  const handleChange = (value: string) => {
    if (validators) {
      const inputError = validateInput(validators, value);
      setError(inputError);
      if (handleText) {
        handleText(value, field as string, inputError);
      }
    } else {
      if (handleText) {
        handleText(value, field as string, {error: false, message: ''});
      }
    }
  };
  return (
    <View style={[themeStyles.flex1, themeStyles.mb10]}>
      {!!label && label !== '' && (
        <Text isSecondary style={[labelStyle]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.container,
          {
            backgroundColor: card,
            height: height,
          },
          containerStyle,
        ]}>
        <Button
          style={[styles.container, styles.border, btnStyle]}
          backgroundColor={card}
          borderColor={primary}
          disabled={disabled}
          onPress={() => setOpen(true)}>
          <View style={[themeStyles.flexRow]}>
            <View style={themeStyles.flex4}>
              <Text
                isSecondary
                style={{fontSize: 14, color: placeHolderTextColor}}>
                {date
                  ? date?.toString()
                    ? type && type === 'date'
                      ? dayjs(new Date(date.toString())).format('DD/MM/YYYY') ||
                        null
                      : dayjs(new Date(date.toString())).format('hh:mm A')
                    : type && type === 'date'
                    ? dayjs(new Date()).format('DD/MM/YYYY')
                    : dayjs(new Date()).format('hh:mm A')
                  : placeholder}
              </Text>
            </View>
            {!disabled && (
              <View style={[themeStyles.flex1, themeStyles.alignItemsFlexEnd]}>
                <IconX
                  origin={ICON_TYPE.MATERIAL_ICONS}
                  name={'keyboard-arrow-down'}
                  // style={themeStyles.mt5}
                  color={primary}
                  size={20}
                />
              </View>
            )}
          </View>
        </Button>
        <DatePicker
          {...rest}
          modal
          maximumDate={maximumDate}
          mode={type}
          open={open}
          date={date ? date : new Date()}
          onConfirm={value => {
            setOpen(false);
            handleChange(value.toString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
          textColor={theme === 'light' ? text : background}
          minuteInterval={minuteInterval}
          androidVariant={'nativeAndroid'}
        />
      </View>
      {error && error.error && (
        <Text hasMargin style={themeStyles.textDanger}>
          {error.message}
        </Text>
      )}
      {!error && hasError && fieldError && (
        <Text hasMargin style={themeStyles.textDanger}>
          This field is required
        </Text>
      )}
    </View>
  );
};

export default DateTimePicker;

import React, {FC, useState} from 'react';
import {StyleProp, TextStyle, View, ViewStyle, Keyboard} from 'react-native';
import {FormValidators} from '../Form/Form';
import Text from '../Text';
import {ICON_TYPE, IconX} from '../Icon/IconX';
import {styles} from './styles';
import {validateInput} from '../../utils/FormUtils/Validators';
import {Dropdown as DropdownElement} from 'react-native-element-dropdown';
// import SelectDropdown from 'react-native-select-dropdown';
// import {Icon} from '../index';

interface OwnProps {
  options: {label: string; value: string}[];
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  hasMargin?: boolean;
  field?: string;
  handleText?: (
    value: string,
    field: string,
    error?: {error: boolean; message: string},
  ) => void;
  validators?: FormValidators[];
  hasError?: boolean;
  fieldError?: string | boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  labelIsBold?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  placeholderStyle?: StyleProp<TextStyle>;
  rightIcon?: () => React.ReactElement | null | undefined;
  leftIcon?: () => React.ReactElement | null | undefined;
  showsVerticalScrollIndicator?: boolean;
}

type DropdownProps = OwnProps;

const Dropdown: FC<DropdownProps> = ({
  options,
  containerStyle,
  hasMargin,
  field,
  handleText,
  validators,
  hasError,
  fieldError,
  label,
  labelStyle,
  labelIsBold,
  disabled,
  defaultValue,
  rightIcon,
  placeholder,
  placeholderStyle,
  style,
  leftIcon,
  showsVerticalScrollIndicator,
}) => {
  const {card, border, primary, text, gray} = {
    card: 'white',
    border: 'black',
    primary: 'black',
    text: 'black',
    gray: 'grey',
  };
  //const ref = useRef(null);
  const [error, setError] = useState<{error: boolean; message: string} | null>(
    null,
  );

  let margin = 0;

  if (hasMargin) {
    margin = 5;
  }

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

  const renderItem = (item: {label: string; value: string}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={themeStyles.flex1}>
      {!!label && label !== '' && (
        <Text isSecondary isBold={labelIsBold} style={labelStyle}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.container,
          {
            marginTop: margin,
            marginBottom: margin,
          },
          containerStyle,
        ]}>
        <DropdownElement
          // ref={ref}
          maxHeight={150}
          autoScroll
          selectedTextProps={{numberOfLines: 1}}
          showsVerticalScrollIndicator={true}
          style={[
            styles.dropdown,
            {borderColor: border, backgroundColor: card},
            style,
          ]}
          data={options}
          placeholder={placeholder}
          placeholderStyle={[
            {color: gray},
            themeStyles.fontMedium,
            placeholderStyle,
          ]}
          searchPlaceholder="Search"
          selectedTextStyle={[themeStyles.fontNormal, {color: text}]}
          labelField="label"
          valueField="value"
          value={defaultValue}
          disable={disabled}
          onFocus={() => {
            Keyboard.dismiss();
          }}
          onChange={item => {
            handleChange(item.value);
          }}
          renderRightIcon={
            rightIcon
              ? rightIcon
              : () => (
                  <IconX
                    origin={ICON_TYPE.MATERIAL_ICONS}
                    name="keyboard-arrow-down"
                    size={25}
                    color={primary}
                  />
                )
          }
          // iconStyle={{}}
          renderLeftIcon={() => {
            return (
              <>
                {(field === 'gender' && defaultValue === 'male') ||
                defaultValue === 'female' ? (
                  <IconX
                    origin={ICON_TYPE.MATERIAL_COMMUNITY}
                    name={
                      defaultValue === 'male' ? 'gender-male' : 'gender-female'
                    }
                    size={18}
                    color={defaultValue === 'male' ? primary : '#FE58B2'}
                    style={{paddingRight: 5}}
                  />
                ) : null}
              </>
            );
          }}
          iconColor={primary}
          renderItem={(item: any) => renderItem(item)}
        />
        {/*<SelectDropdown*/}
        {/*  rowTextStyle={styles.rowText}*/}
        {/*  data={options}*/}
        {/*  onSelect={selectedItem => {*/}
        {/*    handleChange(selectedItem.value);*/}
        {/*  }}*/}
        {/*  buttonTextAfterSelection={selectedItem => {*/}
        {/*    // text represented after item is selected*/}
        {/*    // if data array is an array of objects then return selectedItem.property to render after item is selected*/}
        {/*    return selectedItem.label;*/}
        {/*  }}*/}
        {/*  rowTextForSelection={selection => {*/}
        {/*    // text represented for each item in dropdown*/}
        {/*    // if data array is an array of objects then return item.property to represent item in dropdown*/}
        {/*    return selection.label;*/}
        {/*  }}*/}
        {/*  buttonStyle={[*/}
        {/*    styles.dropdownStyle,*/}
        {/*    {backgroundColor: card, borderColor: border},*/}
        {/*  ]}*/}
        {/*  buttonTextStyle={[styles.dropdownTextStyle, {color: text}]}*/}
        {/*  renderDropdownIcon={isOpened => {*/}
        {/*    return (*/}
        {/*      <Icon*/}
        {/*        name={isOpened ? 'chevron-up' : 'chevron-down'}*/}
        {/*        color={primary}*/}
        {/*        size={14}*/}
        {/*      />*/}
        {/*    );*/}
        {/*  }}*/}
        {/*  defaultValueByIndex={defaultValue}*/}
        {/*  disabled={disabled}*/}
        {/*/>*/}
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

export default Dropdown;

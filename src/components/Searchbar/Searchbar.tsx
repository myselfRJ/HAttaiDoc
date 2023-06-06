import React, {FC} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import {IconX} from '../Icon/IconX';
import styles from './style';

interface OwnProps {
  leftIcon?: boolean;
  leftIconOrigin?: string;
  leftIconName?: string;
  leftIconSize?: number;
  leftIconColor?: string;
  isLeftIconPressable?: boolean;
  onPressLeftIcon?: () => void;
  rightIcon?: boolean;
  rightIconOrigin?: string;
  rightIconName?: string;
  rightIconSize?: number;
  rightIconColor?: string;
  isRightIconPressable?: boolean;
  onPressRightIcon?: () => void;
  height?: number | string;
  width?: number | string;
  containerstyle?: StyleProp<ViewStyle>;
  isUnderline?: boolean;
  underlineColor?: string;
  underlineWidth?: number;
  placeholder?: string;
  placeholderTextColor?: string;
  multiline?: boolean;
  onChangeText?: (value: string) => void;
}

type SearchbarProps = OwnProps & TextInputProps;
const Searchbar: FC<SearchbarProps> = ({
  leftIcon,
  leftIconName,
  leftIconOrigin,
  leftIconSize,
  leftIconColor,
  isLeftIconPressable = true,
  onPressLeftIcon,
  rightIcon,
  rightIconColor,
  rightIconName,
  rightIconOrigin,
  rightIconSize,
  isRightIconPressable = true,
  onPressRightIcon,
  height = 50,
  width,
  containerstyle,
  isUnderline,
  underlineColor,
  underlineWidth,
  placeholder,
  placeholderTextColor,
  multiline,
  onChangeText,
  ...rest
}) => {
  const {primary} = {primary:'black'};
  let borderWidth = isUnderline ? (underlineWidth ? underlineWidth : 1) : 0;
  let bottomBorderColor = underlineColor || primary;
  return (
    <View
      style={[
        styles.container,
        containerstyle,
        {borderBottomWidth: borderWidth, borderBottomColor: bottomBorderColor},
      ]}>
      {leftIcon && (
        <TouchableOpacity
          disabled={isLeftIconPressable}
          onPress={onPressLeftIcon}>
          <IconX
            origin={leftIconOrigin}
            name={leftIconName}
            size={leftIconSize}
            color={leftIconColor}
          />
        </TouchableOpacity>
      )}
      <TextInput
        style={[{height: height, width: width}, styles.textInputStyle]}
        selectionColor={primary}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        multiline={multiline}
        onChangeText={onChangeText}
        {...rest}
      />
      {rightIcon && (
        <TouchableOpacity
          disabled={isRightIconPressable}
          onPress={onPressRightIcon}>
          <IconX
            origin={rightIconOrigin}
            name={rightIconName}
            size={rightIconSize}
            color={rightIconColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Searchbar;

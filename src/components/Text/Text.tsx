import * as React from 'react';
import {Text as BaseText, TextProps as BaseTextProps} from 'react-native';

interface TextProps extends BaseTextProps {
  children?: React.ReactNode;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isBold?: boolean;
  isSemiBold?: boolean;
  isMedium?: boolean;
  isHeadingTitle?: boolean;
  isCenter?: boolean;
  isWhite?: boolean;
  isDanger?: boolean;
  isSuccess?: boolean;
  hasMargin?: boolean;
  fontSmall?: boolean;
  fontLarge?: boolean;
}

const Text: React.FC<TextProps> = ({
  children,
  isPrimary,
  isSecondary,
  isWhite,
  isBold,
  isSemiBold,
  isMedium,
  isHeadingTitle,
  isCenter,
  hasMargin,
  isDanger,
  isSuccess,
  style,
  fontSmall,
  fontLarge,
  ...rest
}) => {
  const {primary, secondary, text, success, danger, white} = {
    primary: 'black',
    secondary: 'grey',
    text: 'black',
    success: 'green',
    danger: 'red',
    white: 'white',
  };
  let color = text;
  let fontSize = 14;
  let marginTop = 0;
  let textAlign: 'auto' | 'center' | 'left' | 'right' | 'justify' | undefined;

  if (isSecondary) {
    color = secondary;
    fontSize = 13;
  }

  if (isHeadingTitle) {
    fontSize = 20;
  }

  if (fontSmall) {
    fontSize = 12;
  }

  if (fontLarge) {
    fontSize = 16;
  }

  if (isPrimary) {
    color = primary;
  }

  if (isWhite && white) {
    color = white;
  }

  if (isDanger && danger) {
    color = danger;
  }

  if (isSuccess && success) {
    color = success;
  }

  if (isCenter) {
    textAlign = 'center';
  }

  if (hasMargin) {
    marginTop = 10;
  }
  // const fontWeight = isBold ? 'bold' : isMedium ? '500' : 'normal';

  const fontFamily = isBold
    ? 'Montserrat-Bold'
    : isMedium
    ? 'Montserrat-Medium'
    : isSemiBold
    ? 'Montserrat-SemiBold'
    : 'Montserrat-Regular';

  return (
    <BaseText
      {...rest}
      style={[
        {
          color,
          // fontWeight,
          fontSize,
          textAlign,
          marginTop,
          fontFamily,
        },
        style,
      ]}>
      {children}
    </BaseText>
  );
};

export default Text;

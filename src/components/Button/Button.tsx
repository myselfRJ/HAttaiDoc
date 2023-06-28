import * as React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';


interface ButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
  icon?: React.ReactElement;
  isTransparent?: boolean;
  isFullWidth?: boolean;
  isBorder?: boolean;
  isChildrenCentered?: boolean;
  isLoading?: boolean;
  childrenContainerStyle?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  children,
  icon,
  backgroundColor,
  borderColor,
  isTransparent,
  isFullWidth,
  isBorder,
  isChildrenCentered = true,
  isLoading,
  style,
  childrenContainerStyle,
  ...rest
}) => {

  let buttonBackgroundColor = backgroundColor ;
  let buttonBorderColor = borderColor ;
  let buttonBorderWidth = 1;
  let padding = 15;
  let width = 'auto';
  let align:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined = 'flex-start';

  if (isTransparent) {
    buttonBackgroundColor = 'transparent';
    buttonBorderWidth = 0;
    padding = 0;
  }
  if (isBorder) {
    buttonBorderWidth = 1;
  }
  if (isFullWidth) {
    width = '100%';
  }
  if (isChildrenCentered) {
    align = 'center';
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: buttonBackgroundColor,
          borderColor: buttonBorderColor,
          borderWidth: buttonBorderWidth,
          padding: padding,
          width,
        },
        style,
        styles.shadowProp,
      ]}
      {...rest}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View
        style={[
          styles.buttonChildrenContainer,
          {
            width,
            justifyContent: align,
          },
          childrenContainerStyle,
        ]}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          children
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

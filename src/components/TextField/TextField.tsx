import * as React from 'react';
import {useState} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import Icon from '../Icon';
import { validateInput } from '../../utils/FormUtils/Validators';
import {FormValidators} from '../Form/Form';
import {Text} from '../index';


interface OwnProps {
  leftIcon?: string;
  inputValue?: any;
  leftIconSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  hasMargin?: boolean;
  field?: string;
  handleText?: (
    value: string,
    field: string,
    error?: {error: boolean; message: string},
  ) => void;
  validators?: FormValidators[];
  isPassword?: boolean;
  customError?: string;
  hasError?: boolean;
  fieldError?: string | boolean;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  borderWidth?: number;
  showClose?: boolean;
  borderRadius?: number;
  onCloseClick?: () => void;
}

type TextFieldProps = OwnProps & TextInputProps;

const TextField: React.FC<TextFieldProps> = ({
  leftIcon,
  leftIconSize,
  style,
  containerStyle,
  hasMargin,
  field,
  handleText,
  inputValue,
  validators,
  secureTextEntry,
  isPassword,
  customError,
  hasError,
  fieldError,
  label,
  labelStyle,
  borderWidth = 1,
  borderRadius = 5,
  showClose,
  onCloseClick,
  ...rest
}) => {
  const {text, border, card, gray, primary} = useThemeColors();

  const [error, setError] = useState<{error: boolean; message: string} | null>(
    null,
  );
  const [hidePass, setHidePass] = useState(true);

  let margin = 0;

  if (hasMargin) {
    margin = 10;
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

  return (
    <View>
      {!!label && label !== '' && (
        <Text
          isMedium
          isSecondary
          hasMargin={hasMargin}
          style={[
            {fontSize: 14, color: lightTheme.colors.black, fontWeight: '100'},
            labelStyle,
          ]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.container,
          {
            backgroundColor: card,
            marginTop: margin,
            marginBottom: margin,
          },
          containerStyle,
          themeStyles.relative,
        ]}>
        {leftIcon && (
          <Icon style={styles.leftIcon} name={leftIcon} size={leftIconSize} />
        )}
        <TextInput
          value={inputValue}
          style={[
            {color: text, borderColor: primary},
            {borderWidth, borderRadius},
            styles.textField,
            style,
          ]}
          placeholderTextColor={gray}
          underlineColorAndroid="transparent"
          onChangeText={handleChange}
          secureTextEntry={hidePass ? secureTextEntry : false}
          autoComplete="off"
          allowFontScaling={false}
          {...rest}
        />
        <TouchableOpacity
          onPress={
            () => {
              if (isPassword) {
                setHidePass(!hidePass);
              }
              if (showClose && onCloseClick) {
                onCloseClick();
              }
            }
            // isPassword
            //   ? setHidePass(!hidePass)
            //   : showClose
            //   ? input.blur()
            //   : null
          }
          style={styles.password}>
          {isPassword && (
            <Icon
              name={hidePass ? 'eye-slash' : 'eye'}
              size={15}
              color={text}
            />
          )}
          {showClose && <Icon name={'times-circle'} size={15} color={text} />}
        </TouchableOpacity>
      </View>
      {error && error.error && <Text isDanger>{error.message}</Text>}
      {!error && hasError && fieldError && (
        <Text isDanger>This field is required</Text>
      )}
      {customError && <Text isDanger>{customError}</Text>}
    </View>
  );
};

TextField.defaultProps = {
  leftIconSize: 14,
};

export default TextField;

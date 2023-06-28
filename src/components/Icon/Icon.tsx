import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import IconFontAwesome5, {
  FontAwesome5IconProps,
} from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface OwnProps {
  isPrimary?: boolean;
  useIonicons?: boolean;
}

type IconProps = OwnProps & FontAwesome5IconProps;

const Icon: React.FC<IconProps> = ({
  isPrimary,
  useIonicons,
  color,
  ...rest
}) => {
  const {
    colors: {text, primary},
  } = useTheme();
  let iconColor = isPrimary ? primary : text;
  if (color) {
    iconColor = color as string;
  }

  return useIonicons ? (
    <Ionicons {...rest} color={iconColor} />
  ) : (
    <IconFontAwesome5 {...rest} color={iconColor} />
  );
};

export default Icon;

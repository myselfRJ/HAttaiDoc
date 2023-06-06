import * as React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import styles from './styles';


type DividerProps = {
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const Divider: React.FC<DividerProps> = ({style, color}) => {
  const {primary} = {primary:'black'};
  const borderColor = color ? color : primary;
  return (
    <View style={[styles.divider, {backgroundColor: borderColor}, style]} />
  );
};

export default Divider;

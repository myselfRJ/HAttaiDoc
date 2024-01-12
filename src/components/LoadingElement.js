import {ActivityIndicator} from 'react-native';
import {CUSTOMCOLOR} from '../settings/styles';

export const LoadingElement = () => {
  return <ActivityIndicator size={'large'} color={CUSTOMCOLOR.primary} />;
};

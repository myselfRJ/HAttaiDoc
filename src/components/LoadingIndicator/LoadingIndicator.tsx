import * as React from 'react';
import {ActivityIndicator, ActivityIndicatorProps, View} from 'react-native';
import styles from './styles';
type LoadingIndicatorProps = {
  hasMargin?: boolean;
} & ActivityIndicatorProps;

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  hasMargin,
  ...rest
}) => {
  const {primary} = {primary:'black'};
  let margin = 0;
  if (hasMargin) {
    margin = 15;
  }
  return (
    <View style={styles.loader_container}>
      <View style={styles.inner_wrapper}>
        <ActivityIndicator
          color={primary}
          {...rest}
          style={{
            margin,
          }}
        />
      </View>
    </View>
  );
};
export default LoadingIndicator;

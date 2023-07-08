import {View, Text, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';
import {IMAGES} from '../utility/images';
import {CONSTANTS} from '../utility/constant';
import {CUSTOMCOLOR} from '../settings/styles';

const StatusMessage = ({status, message = ''}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Lottie source={IMAGES[status]} autoPlay loop />
      </View>
      <View style={{flex: 1}}>
        <Text
          style={[
            styles.Message,
            status === CONSTANTS.success && {color: CUSTOMCOLOR.primary},
            status === CONSTANTS.warning && {color: CUSTOMCOLOR.warn},
            status === CONSTANTS.error && {color: CUSTOMCOLOR.error},
          ]}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Message: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default StatusMessage;

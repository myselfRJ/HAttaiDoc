import {Text, View} from 'react-native';
import {CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import Lottie from 'lottie-react-native';
const AfterAuthLoadingScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('protected', {screen: 'profilecreate'});
  }, 5000);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Lottie
          source={require('../assets/lottiejson/welcome.json')}
          autoPlay
          loop
        />
      </View>
      <View style={{flex: 1, backgroundColor: '#4BA5FA'}}>
        <Lottie
          source={require('../assets/lottiejson/clinicsetup.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

export default AfterAuthLoadingScreen;

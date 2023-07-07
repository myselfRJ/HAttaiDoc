import {Text, View} from 'react-native';
import {CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {HButton, Icon} from '../components';
const Success = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="check-circle" size={40} color={'#32BF40'} />
      <Text
        style={{
          fontWeight: '400',
          fontSize: 16,
          color: '#000',
          lineHeight: 21.79,
          top: 10,
        }}>
        {Language[language]['successfully_abha_created']}
      </Text>
      <View style={{top: 20}}>
        <HButton
          style={{top: 10}}
          label="Book Appointment"
          onPress={() => navigation.navigate('bookslot')}
        />
      </View>
    </View>
  );
};

export default Success;

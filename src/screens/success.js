import {Text, View} from 'react-native';
import {CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';

import {useRef, useEffect} from 'react';
import {BottomSheetView, StatusMessage, HButton, Icon} from '../components';

const Success = ({navigation, route}) => {
  // const SuccesRef = useRef(null);
  // useEffect(() => {
  //   SuccesRef?.current?.snapToIndex(1);
  // }, []);

  const {patient_phone_number} = route.params;
  const handleSubmit = () => {
    const patient_phone = patient_phone_number;
    navigation.navigate('bookslot', {patient_phone});
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <Icon name="check-circle" size={40} color={'#32BF40'} />
      <Text
        style={{
          fontWeight: '400',
          fontSize: 16,
          color: '#000',
          lineHeight: 21.79,
          top: 10,
        }}>
        {Language[language]['successfully_abha_created']}
      </Text> */}
      <View style={{top: 20}}>
        <HButton
          style={{top: 10}}
          label="Book Appointment"
          onPress={handleSubmit}
        />
      </View>
      {/* <BottomSheetView bottomSheetRef={SuccesRef} snapPoints={'50%'}>
        <StatusMessage
          status={'warning'}
          message="Sucessfully Created Abha ID"
        />
      </BottomSheetView> */}
    </View>
  );
};

export default Success;

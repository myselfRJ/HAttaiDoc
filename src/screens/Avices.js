import {View} from 'react-native';
import {HButton, InputText} from '../components';
import {CUSTOMCOLOR} from '../settings/styles';
import {useEffect, useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {commonstyles} from '../styles/commonstyle';
import {Language} from '../settings/customlanguage';
import {language} from '../settings/userpreferences';
import {useDispatch, useSelector} from 'react-redux';
import {addAdvice} from '../redux/features/prescription/pastHistory';
export const Advices = ({navigation}) => {
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const dispatch = useDispatch();
  const advices = useSelector(state => state?.pasthistory?.advice);
  const [advice, SetAdvice] = useState('');
  const onPress = () => {
    dispatch(
      addAdvice([...advices, {advice: advice, appointment_id: appointmentID}]),
    );
    navigation.goBack();
  };
  useEffect(() => {
    SetAdvice(advices);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: CUSTOMCOLOR.white,
        paddingHorizontal: horizontalScale(24),
        paddingVertical: verticalScale(16),
      }}>
      <InputText
        label={'Advice'}
        placeholder={'Enter Advice'}
        value={advice}
        setValue={txt => SetAdvice(txt)}
        required={true}
      />
      <View
        style={{
          padding: moderateScale(16),
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        <HButton
          btnstyles={commonstyles.activebtn}
          label={Language[language]['save']}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

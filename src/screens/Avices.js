import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {HButton, InputText, PlusButton, SelectionTab} from '../components';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
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
import {
  addAdvice,
  updateAdvice,
} from '../redux/features/prescription/pastHistory';
import {mode} from '../redux/features/prescription/prescribeslice';
import ShowChip from '../components/showChip';
import style from '../components/Searchbar/style';

export const Advices = ({navigation}) => {
  const status = ['Normal', 'Emergency'];
  const appointmentID = useSelector(state => state?.address?.appointment_id);
  const dispatch = useDispatch();
  const adv = useSelector(state => state?.pasthistory?.advice);
  const advices =
    adv?.length > 0
      ? adv?.filter(item => item?.appointment_id === appointmentID)
      : [];
  const [advice, SetAdvice] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const handleSelect = val => {
    setSelectedStatus(val);
  };
  const onPress = () => {
    // dispatch(
    //   addAdvice([
    //     ...advices,
    //     {advice: advice, status: selectedStatus, appointment_id: appointmentID},
    //   ]),
    // );
    navigation.goBack();
  };
  const handlePlus = () => {
    if (advice) {
      dispatch(
        addAdvice([
          ...advices,
          {
            advice: advice,
            status: selectedStatus,
            appointment_id: appointmentID,
          },
        ]),
      );
    }
    setSelectedStatus('');
    SetAdvice('');
  };
  // console.log(advice);
  // useEffect(() => {
  //   const adv =
  //     advices?.length > 0
  //       ? advices
  //           ?.filter(item => item?.appointment_id === appointmentID)
  //           ?.slice(-1)?.[0]?.advice
  //       : '';
  //   SetAdvice(adv);
  //   const sts =
  //     advices?.length > 0
  //       ? advices
  //           ?.filter(item => item?.appointment_id === appointmentID)
  //           ?.slice(-1)?.[0]?.status
  //       : '';
  //   setSelectedStatus(sts);
  // }, []);

  const handleDelete = index => {
    if (advices) {
      const updated = advices?.filter((item, ind) => ind !== index);

      dispatch(updateAdvice(updated));
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          backgroundColor: CUSTOMCOLOR.white,
          paddingHorizontal: horizontalScale(24),
          paddingVertical: verticalScale(16),
          gap: moderateScale(16),
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: moderateScale(16),
          }}>
          {status?.map(item => (
            <SelectionTab
              selectContainer={{
                backgroundColor:
                  selectedStatus == item
                    ? CUSTOMCOLOR.primary
                    : CUSTOMCOLOR.white,
              }}
              text={{
                color:
                  selectedStatus == item
                    ? CUSTOMCOLOR.white
                    : CUSTOMCOLOR.primary,
              }}
              label={item}
              onPress={() => setSelectedStatus(item)}
            />
          ))}
        </View>

        <InputText
          label={'Advice'}
          placeholder={'Enter Advice'}
          value={advice}
          setValue={txt => SetAdvice(txt)}
          required={true}
          onSubmit={Keyboard.dismiss}
        />
        <PlusButton
          type={'add'}
          icon={'plus'}
          size={moderateScale(24)}
          style={{alignSelf: 'flex-end'}}
          onPress={handlePlus}
        />

        {advices?.length > 0 &&
          advices?.filter(item => item?.status === 'Normal').length > 0 && (
            <View style={{gap: horizontalScale(4)}}>
              <Text style={styles.subhead}>Normal</Text>

              <View
                style={{
                  flexDirection: 'row',
                  gap: horizontalScale(12),
                  flexWrap: 'wrap',
                }}>
                {advices?.map(
                  (item, ind) =>
                    item?.status === 'Normal' && (
                      <ShowChip
                        text={item?.advice}
                        main={{marginHorizontal: 0}}
                        onPress={() => handleDelete(ind)}
                        ind={ind}
                      />
                    ),
                )}
              </View>
            </View>
          )}

        {advices?.filter(item => item?.status === 'Emergency').length > 0 && (
          <View style={{gap: horizontalScale(4)}}>
            <Text style={styles.subhead}>Emergency</Text>

            <View
              style={{
                flexDirection: 'row',
                gap: horizontalScale(12),
                flexWrap: 'wrap',
              }}>
              {advices?.map(
                (item, ind) =>
                  item?.status === 'Emergency' && (
                    <ShowChip
                      text={item?.advice}
                      main={{marginHorizontal: 0}}
                      onPress={() => handleDelete(ind)}
                      ind={ind}
                    />
                  ),
              )}
            </View>
          </View>
        )}

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
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  subhead: {
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: 400,
    color: CUSTOMCOLOR.black,
  },
});

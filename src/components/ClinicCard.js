import {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import {checkNumber, checkOtp, checkPassword} from '../utility/checks';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {
  HButton,
  StatusMessage,
  BottomSheetView,
  SelectorBtn,
} from '../components';
import {URL} from '../utility/urls';
import {useNavigation} from '@react-navigation/native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchApi} from '../api/fetchApi';
import {useDispatch, useSelector} from 'react-redux';
import {authenticateActions} from '../redux/features/authenticate/authenticateSlice';
import {addLogin_phone} from '../redux/features/phoneNumber/LoginPhoneNumber';
// import {updateauthenticate} from '../redux/features/authenticate/authenticateSlice';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {Validators} from '../utils/FormUtils/Validators';
import PrescriptionHead from '../components/prescriptionHead';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ClinicCard = props => {
  const [show, setShow] = useState(false);
  const Clinic_details = props.data;
  const navigation = useNavigation();
  const index = props.index;

  return (
    <View style={styles.Main}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', gap: moderateScale(12)}}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${Clinic_details?.clinic_photo_url}`,
            }}
            style={{
              height: moderateScale(65),
              width: moderateScale(65),
              borderRadius: 65 / 2,
            }}
          />
          <View>
            <Text
              style={{
                color: CUSTOMCOLOR.black,
                fontSize: CUSTOMFONTSIZE.h2,
                fontWeight: '600',
              }}>
              {Clinic_details?.clinic_name}
            </Text>
            <Text style={styles.text}>{Clinic_details?.clinic_Address}</Text>
            <Text style={styles.text}>
              {Clinic_details?.clinic_phone_number}
            </Text>
          </View>
        </View>
        <View style={{gap: moderateScale(16)}}>
          <View style={{flexDirection: 'row', gap: moderateScale(8)}}>
            <Pressable
              style={styles.gap}
              onPress={() => navigation.navigate('addclinic', {index})}>
              <Icon
                name={'square-edit-outline'}
                size={24}
                color={CUSTOMCOLOR.primary}
              />
            </Pressable>
            <Pressable style={styles.gap} onPress={props.cancel}>
              <Icon name={'close'} size={24} color={CUSTOMCOLOR.error} />
            </Pressable>
            <Pressable
              style={styles.gap}
              onPress={() => {
                setShow(!show);
              }}>
              <Icon
                name={show ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={CUSTOMCOLOR.primary}
              />
            </Pressable>
          </View>
          <Text
            style={{
              fontSize: CUSTOMFONTSIZE.h4,
              color: CUSTOMCOLOR.black,
              fontWeight: '400',
            }}>
            Visiting Hrs : 9:00-5:00
          </Text>
        </View>
      </View>
      {show && (
        <View
          style={{
            paddingTop: moderateScale(24),
            paddingHorizontal: horizontalScale(144),
          }}>
          <View style={styles.slot}>
            <Text
              style={{
                color: CUSTOMCOLOR.primary,
                fontSize: CUSTOMFONTSIZE.h3,
                fontWeight: '700',
              }}>
              Slots
            </Text>
            <Text
              style={{
                color: CUSTOMCOLOR.black,
                fontSize: CUSTOMFONTSIZE.h4,
                fontWeight: '400',
              }}>
              s m t w th f s
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Main: {
    paddingHorizontal: horizontalScale(32),
    paddingVertical: verticalScale(24),
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(2),
    borderColor: CUSTOMCOLOR.borderColor,
  },
  text: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '400',
  },
  gap: {
    padding: moderateScale(4),
    borderWidth: moderateScale(1),
    borderColor: '#C0DFFC',
    borderRadius: moderateScale(2),
  },
  slot: {
    padding: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: moderateScale(2),
    borderColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(10),
    backgroundColor: '#ECF6FF',
  },
});

export default ClinicCard;

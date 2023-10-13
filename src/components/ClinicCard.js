import {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
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
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import PrescriptionHead from '../components/prescriptionHead';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const ClinicCard = props => {
  const [show, setShow] = useState(false);
  const Clinic_details = props.data;
  const navigation = useNavigation();
  const id = Clinic_details?.id;
  const [slots] = useState(JSON.parse(Clinic_details?.slot_data?.slot));

  const token = useSelector(state => state.authenticate.auth.access);

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
        <View
          style={{
            position: 'absolute',
            right: -16,
            top: -8,
            gap: moderateScale(16),
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: moderateScale(8),
            }}>
            <Pressable
              style={styles.gap}
              onPress={() => navigation.navigate('addclinic', {id})}>
              <Icon
                name={'pencil'}
                size={moderateScale(24)}
                color={CUSTOMCOLOR.primary}
              />
            </Pressable>
            <Pressable style={styles.gap} onPress={props.cancel}>
              <Icon
                name={'close'}
                size={moderateScale(24)}
                color={CUSTOMCOLOR.error}
              />
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
            // paddingHorizontal: horizontalScale(144),
          }}>
          <View style={styles.slot}>
            <Text
              style={{
                color: CUSTOMCOLOR.primary,
                fontSize: CUSTOMFONTSIZE.h3,
                fontWeight: '700',
              }}>
              Slots :
            </Text>
            <View>
              <Text style={styles.slotTime}>S</Text>
              {slots?.Su?.map((item, ind) => (
                <Text style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))}
            </View>
            <View>
              <Text style={styles.slotTime}>M</Text>
              {slots?.M?.map((item, ind) => (
                <Text style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))}
            </View>
            <View>
              <Text style={styles.slotTime}>T</Text>
              {slots?.T?.map((item, ind) => (
                <Text style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))}
            </View>
            <View>
              <Text style={styles.slotTime}>W</Text>
              {slots?.W?.map((item, ind) => (
                <Text style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))}
            </View>
            <View>
              <Text style={styles.slotTime}>Th</Text>
              {slots?.TH?.map((item, ind) => (
                <Text style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))}
            </View>
            <View>
              <Text style={styles.slotTime}>F</Text>
              {slots?.F?.map((item, ind) => (
                <Text style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))}
            </View>
            <View>
              <Text style={styles.slotTime}>Sa</Text>
              {slots?.Sa?.map((item, ind) => (
                <Text style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))}
            </View>
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
    borderWidth: moderateScale(2),
    borderColor: '#C0DFFC',
    borderRadius: moderateScale(100),
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
  slotTime: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: '400',
    alignSelf: 'center',
  },
});

export default ClinicCard;

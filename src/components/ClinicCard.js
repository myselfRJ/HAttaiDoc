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
  let slots = JSON.parse(Clinic_details?.slot_data?.slot);

  const token = useSelector(state => state.authenticate.auth.access);

  return (
    <View style={styles.shadowBox}>
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
            <View style={{width: '70%'}}>
              <Text
                style={{
                  color: CUSTOMCOLOR.black,
                  fontSize: CUSTOMFONTSIZE.h2,
                  fontFamily: CUSTOMFONTFAMILY.body,
                  fontWeight: '700',
                }}>
                {Clinic_details?.clinic_name}
              </Text>
              <Text style={styles.text}>{Clinic_details?.clinic_Address}</Text>
              <Text style={styles.text}>
                {Clinic_details?.clinic_phone_number}
              </Text>
              {Clinic_details?.pharmacyPhone && (
                <Text style={styles.text}>
                  Pharmacy PhoneNumber:{Clinic_details?.pharmacyPhone}
                </Text>
              )}
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              right: horizontalScale(-16),
              top: verticalScale(-8),
              gap: moderateScale(16),
              justifyContent: 'center',
              alignItems: 'center',
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
                  size={moderateScale(16)}
                  color={CUSTOMCOLOR.primary}
                />
              </Pressable>
              <Pressable style={styles.gap} onPress={props.cancel}>
                <Icon
                  name={'close'}
                  size={moderateScale(16)}
                  color={CUSTOMCOLOR.error}
                />
              </Pressable>
              {/* <Pressable
                style={styles.gap}
                onPress={() => {
                  setShow(!show);
                }}>
                <Icon
                  name={show ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={CUSTOMCOLOR.primary}
                />
              </Pressable> */}
            </View>
            {/* <Text
              style={{
                fontSize: CUSTOMFONTSIZE.h4,
                color: CUSTOMCOLOR.black,
                fontWeight: '400',
              }}>
              Visiting Hrs : 9:00-5:00
            </Text> */}
          </View>
        </View>
        <Text
          style={{
            color: CUSTOMCOLOR.primary,
            fontSize: CUSTOMFONTSIZE.h3,
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          Slots
        </Text>

        <View style={styles.slot}>
          <View>
            <Text style={styles.daytime}>M</Text>
            {slots?.M?.length > 0 ? (
              slots?.M?.map((item, ind) => (
                <Text key={ind} style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))
            ) : (
              <Text style={styles.slotTime}>-</Text>
            )}
          </View>
          <View>
            <Text style={styles.daytime}>T</Text>
            {slots?.T?.length > 0 ? (
              slots?.T?.map((item, ind) => (
                <Text key={ind} style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))
            ) : (
              <Text style={styles.slotTime}>-</Text>
            )}
          </View>
          <View>
            <Text style={styles.daytime}>W</Text>
            {slots?.W?.length > 0 ? (
              slots?.W?.map((item, ind) => (
                <Text key={ind} style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))
            ) : (
              <Text style={styles.slotTime}>-</Text>
            )}
          </View>
          <View>
            <Text style={styles.daytime}>Th</Text>
            {slots?.TH?.length > 0 ? (
              slots?.TH?.map((item, ind) => (
                <Text key={ind} style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))
            ) : (
              <Text style={styles.slotTime}>-</Text>
            )}
          </View>
          <View>
            <Text style={styles.daytime}>F</Text>
            {slots?.F?.length > 0 ? (
              slots?.F?.map((item, ind) => (
                <Text key={ind} style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))
            ) : (
              <Text style={styles.slotTime}>-</Text>
            )}
          </View>
          <View>
            <Text style={styles.daytime}>Sa</Text>
            {slots?.Sa?.length > 0 ? (
              slots?.Sa?.map((item, ind) => (
                <Text key={ind} style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))
            ) : (
              <Text key={ind} style={styles.slotTime}>
                -
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.daytime}>S</Text>
            {slots?.Su?.length > 0 ? (
              slots?.Su?.map((item, ind) => (
                <Text key={ind} style={styles.slotTime}>
                  {item?.fromTime}-{item?.toTime}
                </Text>
              ))
            ) : (
              <Text style={styles.slotTime}>-</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowBox: {
    // width: 160,
    // height: 170,
    borderColor: CUSTOMCOLOR.borderColor,
    borderWidth: 0.75,
    borderRadius: 4,
  },
  Main: {
    marginHorizontal: horizontalScale(32),
    marginVertical: verticalScale(24),
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(8),
    zIndex: 2,

    // borderWidth: moderateScale(2),
    shadowColor: CUSTOMCOLOR.primary,

    shadowOffset: {width: 4, height: 4},
    // borderColor: CUSTOMCOLOR.borderColor,
  },
  text: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h4,
  },
  gap: {
    height: moderateScale(40),

    width: moderateScale(40),

    borderWidth: moderateScale(1),
    justifyContent: 'center',
    alignItems: 'center',

    borderColor: '#C0DFFC',
    borderRadius: moderateScale(24),
  },
  slot: {
    padding: moderateScale(12),
    marginTop: verticalScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: moderateScale(1),
    borderColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(10),
    backgroundColor: '#ECF6FF',
  },
  slotTime: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h5,
    fontWeight: '400',
    alignSelf: 'center',
  },
  daytime: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h4,
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontWeight: '400',
    alignSelf: 'center',
  },
});

export default ClinicCard;

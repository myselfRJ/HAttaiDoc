import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
} from 'react-native';
import BottomSheetView from './bottomSheet';
import {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTSIZE,
  CUSTOMFONTFAMILY,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import SelectionTab from '../components/selectiontab';
import {useNavigation} from '@react-navigation/native';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import AddImage from './addimage';
import PlusButton from './plusbtn';

import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import HButton from './button';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const ConsultationCard = ({data}) => {
  const [visible, setVisible] = useState(false);
  const patientSearchRef = useRef(null);
  const navigation = useNavigation();

  const id = data?.chief_complaint?.appointment_id;
  const rep_id = data?.reports?.id;

  const handleOnpress = () => {
    patientSearchRef?.current?.snapToIndex(0);
    const patient_phone_number = data?.chief_complaint?.patient_phone_number;
    const doctor_phone_number = data?.chief_complaint?.doctor_phone_number;
    const clinic_id = data?.chief_complaint?.clinic_id;
    const appointment_id = data?.chief_complaint?.appointment_id;
    navigation.navigate('upload-record', {
      patient_phone_number,
      doctor_phone_number,
      clinic_id,
      appointment_id,
    });
  };

  const handleOnBook = () => {
    const appointment_id = data?.chief_complaint?.appointment_id;
    patientSearchRef?.current?.snapToIndex(0);
    navigation.navigate('pdfhistory', {appointment_id});
  };
  const date = data
    ? data?.chief_complaint?.created_at?.split('T')[0]?.split('-')
    : null;
  return (
    <>
      <View style={styles.main}>
        <View style={{flexDirection: 'row', gap: moderateScale(8)}}>
          <Image
            style={styles.img}
            source={require('../assets/images/RX.png')}
          />
          <View style={styles.patientinfo}>
            <Text style={styles?.contact}>
              Date: {date ? `${date[2]}/${date[1]}/${date[0]}` : null}
            </Text>
            <Text style={styles.name}>
              {data?.chief_complaint?.complaint_message}
              {/* |{' '}
              {data?.chief_complaint?.appointment_id} */}
            </Text>
            <Text style={styles.age}>{}</Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            position: 'absolute',
            right: moderateScale(16),
            top: moderateScale(8),
            gap: moderateScale(12),
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: moderateScale(4),
              padding: moderateScale(4),
            }}>
            <Pressable style={styles.icon}>
              <Icon
                name={'download'}
                size={moderateScale(16)}
                color={CUSTOMCOLOR.primary}
              />
            </Pressable>
            <Pressable>
              <Icon
                name={'share-variant'}
                size={moderateScale(16)}
                color={CUSTOMCOLOR.primary}
                style={styles.icon}
              />
            </Pressable>
          </View>
          <View style={{flexDirection: 'row', gap: moderateScale(8)}}>
            <HButton
              onPress={handleOnBook}
              label={'View'}
              btnstyles={{
                backgroundColor: CUSTOMCOLOR.white,
                borderWidth: moderateScale(0.5),
                borderColor: CUSTOMCOLOR.borderColor,
                paddingHorizontal: horizontalScale(24),
                paddingVertical: verticalScale(8),
              }}
              textStyle={{
                color: CUSTOMCOLOR.primary,
                fontSize: CUSTOMFONTFAMILY.h3,
              }}
            />
            <HButton
              onPress={handleOnpress}
              label={'Upload Record'}
              btnstyles={{
                paddingHorizontal: horizontalScale(24),
                paddingVertical: verticalScale(8),
              }}
              textStyle={{
                color: CUSTOMCOLOR.white,
                fontSize: CUSTOMFONTFAMILY.h3,
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  main: {
    // flexDirection: 'row',
    paddingHorizontal: moderateScale(24),
    paddingVertical: verticalScale(20),
    // paddingVertical: verticalScale(24),
    // fontSize: CUSTOMFONTSIZE.h3,
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(4),
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
  },
  name: {
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h4,
    // lineHeight: 20,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  age: {
    fontWeight: 400,
    fontSize: moderateScale(10),
    // lineHeight: 20,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  contact: {
    fontWeight: '400',
    fontSize: moderateScale(16),
    // lineHeight: 12.5,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  img: {
    width: moderateScale(56),
    height: moderateScale(56),
    borderRadius: moderateScale(8),
    // aspectRatio: 0.95,
    // borderWidth: 1,
    // borderColor: '#000',
  },
  patientinfo: {
    // borderWidth:1,
    justifyContent: 'center',
    gap: verticalScale(4),
  },
  icon: {
    borderWidth: moderateScale(1),
    padding: moderateScale(4),
    borderRadius: moderateScale(100),
    borderColor: CUSTOMCOLOR.borderColor,
  },
  option: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bottomView: {
    widthhorizontalScaleeight: verticalScale(500),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalView: {
    height: verticalScale(250),
    backgroundColor: 'white',
    borderRadius: moderateScale(20),
    borderWidth: 2,
    borderColor: '#00BFFF',
    shadowColor: '#ffff',
    shadowOffset: {
      width: horizontalScale(0),
      height: verticalScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  content: {
    fontSize: 15,
    color: 'black',
  },
  tab: {
    flexDirection: 'row',
    gap: moderateScale(16),
    paddingHorizontal: horizontalScale(8),
    alignSelf: 'center',
    fontFamily: CUSTOMFONTFAMILY.body,
  },
});

export default ConsultationCard;

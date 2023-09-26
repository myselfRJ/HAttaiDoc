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
    patientSearchRef?.current?.snapToIndex(0);
    navigation.navigate('patienthistory', {id});
  };

  return (
    <>
      <View style={styles.main}>
        <Image style={styles.img} source={require('../assets/images/RX.png')} />
        <View style={styles.patientinfo}>
          <Text style={styles?.contact}>
            {data?.chief_complaint?.appointment_id}
          </Text>
          <Text style={styles.name}>
            {data?.chief_complaint?.complaint_message} |{' '}
            {data?.chief_complaint?.appointment_id}
          </Text>
          <Text style={styles.age}>{}</Text>
          {/* <Text style={styles?.contact}>
            {data?.chief_complaint?.appointment_id}
          </Text> */}
        </View>
        <Pressable
          style={styles.icon}
          onPress={() => {
            patientSearchRef?.current?.snapToIndex(1);
          }}>
          <View>
            <Icon
              style={styles.icon}
              name="dots-horizontal"
              color={CUSTOMCOLOR.primary}
              size={24}
            />
          </View>
        </Pressable>
        <BottomSheetView
          bottomSheetRef={patientSearchRef}
          snapPoints={'100%'}
          backgroundStyle="#000000aa">
          <View style={styles.tab}>
            <SelectionTab
              label={'View'}
              selected={true}
              onPress={handleOnBook}
            />
            {/* <SelectionTab
                label={Language[language]['delete']}
                selected={true}
              /> */}
            <SelectionTab
              label={'Upload Report'}
              selected={true}
              onPress={handleOnpress}
            />
          </View>
          <View
            style={{alignSelf: 'flex-end', paddingHorizontal: 8, bottom: 38}}>
            <PlusButton
              icon="close"
              size={20}
              style={{
                backgroundColor: '#000000aa',
              }}
              onPress={() => {
                patientSearchRef?.current?.snapToIndex(0);
              }}
            />
          </View>
        </BottomSheetView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    widthhorizontalScalelignItems: 'center',
    padding: moderateScale(12),
    fontSize: CUSTOMFONTSIZE.h3,
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(4),
    gap: moderateScale(8),
  },
  name: {
    fontWeight: 600,
    fontSize: moderateScale(14),
    lineHeight: 20,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  age: {
    fontWeight: 400,
    fontSize: moderateScale(10),
    lineHeight: 20,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  contact: {
    fontWeight: 600,
    fontSize: 10,
    lineHeight: 12.5,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30 / 2,
  },
  patientinfo: {},
  icon: {
    position: 'absolute',
    right: moderateScale(8),
    top: moderateScale(8),
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

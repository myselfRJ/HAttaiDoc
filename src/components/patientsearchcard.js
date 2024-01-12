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
import {HButton} from '.';

const PatientSearchCard = patient_data => {
  const [visible, setVisible] = useState(false);
  const patientSearchRef = useRef(null);
  const navigation = useNavigation();
  const patient_name = patient_data?.patient_data?.patient_name;
  const patient_age = patient_data?.patient_data?.birth_date;
  const patient_pic = patient_data?.patient_data?.patient_pic_url;

  const presentYear = new Date().toISOString().split('-')[0];
  const birthYear = patient_data?.patient_data?.birth_date.split('-')[0];
  const gender = patient_data?.patient_data?.gender;

  const patient_phone_number = patient_data?.patient_data?.patient_phone_number;

  const handleOnpress = () => {
    const patient_phone = patient_phone_number;
    navigation.navigate('patientrecord', {
      patient_phone,
      birthYea: birthYear,
      patient_pic,
      patient_age,
      patient_name,
      gender,
    });
    patientSearchRef?.current?.snapToIndex(0);
  };

  const handleOnBook = () => {
    const patient_phone = patient_phone_number;
    navigation.navigate('bookslot', {patient_phone});
    patientSearchRef?.current?.snapToIndex(0);
  };
  const meta_data = patient_data.meta;
  const doctor = patient_data.doctor;
  return (
    <>
      <View style={styles.main}>
        <View style={styles.patientinfo}>
          <Image
            style={styles.img}
            source={{
              uri: `data:image/jpeg;base64,${patient_data?.patient_data?.patient_pic_url}`,
            }}
          />
          <View>
            <Text style={styles.name}>
              {patient_data?.patient_data?.patient_name}
            </Text>
            <Text style={styles.age}>
              {parseInt(presentYear) - parseInt(birthYear)} |{' '}
              {patient_data?.patient_data?.gender}
            </Text>
            <Text style={styles?.contact}>
              {Language[language]['contact']}:{' '}
              {patient_data?.patient_data?.patient_phone_number}
            </Text>
          </View>
        </View>
        {/* <Pressable
          style={styles.icon}
          onPress={() => {
            patientSearchRef?.current?.snapToIndex(1);
          }}>
          <View style={{width: moderateScale(40), height: moderateScale(40)}}>
            <Icon
              style={styles.icon}
              name="dots-horizontal"
              color={CUSTOMCOLOR.primary}
              size={24}
            />
          </View>
        </Pressable> */}
        <View style={styles.tab}>
          {/* {meta_data && ( */}
          {doctor ? (
            <HButton
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
              label="Rx History"
              selected={true}
              onPress={handleOnpress}
            />
          ) : null}
          {/* )} */}
          <HButton
            btnstyles={{
              // backgroundColor: CUSTOMCOLOR.white,
              // borderWidth: moderateScale(0.5),
              // borderColor: CUSTOMCOLOR.borderColor,
              paddingHorizontal: horizontalScale(24),
              paddingVertical: verticalScale(8),
            }}
            textStyle={{
              color: CUSTOMCOLOR.white,
              fontSize: CUSTOMFONTFAMILY.h3,
            }}
            label={Language[language]['book_appointment']}
            selected={true}
            onPress={handleOnBook}
          />
        </View>
        {/* <BottomSheetView
          bottomSheetRef={patientSearchRef}
          snapPoints={'100%'}
          backgroundStyle="#000000aa">
          <View style={styles.tab}>
            <SelectionTab
              label={Language[language]['book_appointment']}
              selected={true}
              onPress={handleOnBook}
            />
            {meta_data && (
              <SelectionTab
                label={Language[language]['history']}
                selected={true}
                onPress={handleOnpress}
              />
            )}
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

        </BottomSheetView> */}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  main: {
    borderWidth: 0.75,
    borderColor: CUSTOMCOLOR.borderColor,
    flexDirection: 'row',
    widthhorizontalScalelignItems: 'center',
    padding: moderateScale(12),
    fontSize: CUSTOMFONTSIZE.h3,
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(4),
    gap: moderateScale(8),
    justifyContent: 'space-between',
    marginBottom: moderateScale(8),
  },
  name: {
    // borderWidth: 1,
    fontWeight: 600,
    fontSize: CUSTOMFONTSIZE.h3,
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
    width: 64,
    height: 64,
    borderRadius: moderateScale(8),
  },
  patientinfo: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
  icon: {
    position: 'absolute',
    right: moderateScale(8),
    // left: moderateScale(8),
    top: moderateScale(8),
    // width: moderateScale(50),
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
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
    alignItems: 'center',
    gap: moderateScale(16),
    paddingHorizontal: horizontalScale(8),
    fontFamily: CUSTOMFONTFAMILY.body,
    // height: moderateScale(37),
    alignSelf: 'flex-end',
  },
});

export default PatientSearchCard;

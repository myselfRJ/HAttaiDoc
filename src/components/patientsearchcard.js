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
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import SelectionTab from '../components/selectiontab';
import {useNavigation} from '@react-navigation/native';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import AddImage from './addimage';

import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';

const PatientSearchCard = patient_data => {
  const [visible, setVisible] = useState(false);
  const patientSearchRef = useRef(null);
  const navigation = useNavigation();
  console.log('====================================');
  console.log(patient_data?.patient_data?.patient_name);
  console.log('====================================');
  const patient_name = patient_data?.patient_data?.patient_name;
  const patient_age = patient_data?.patient_data?.birth_date;
  const patient_phone = patient_data?.patient_data?.patient_phone_number;
  const patient_pic = patient_data?.patient_data?.patient_pic_url;

  const presentYear = new Date().toISOString().split('-')[0];
  const birthYear = patient_data?.patient_data?.birth_date.split('-')[2];

  const patient_phone_number = patient_data?.patient_data?.patient_phone_number;

  const handleOnpress = () => {
    const patient_phone = patient_phone_number;
    console.log(patient_data.data);
    navigation.navigate('patientrecord', {patient_phone});
    patientSearchRef?.current?.snapToIndex(0);
  };

  const handleOnBook = () => {
    const patient_phone = patient_phone_number;
    console.log(patient_data.data);
    navigation.navigate('bookslot', {patient_phone});
    patientSearchRef?.current?.snapToIndex(0);
  };

  return (
    <>
      <View style={styles.main}>
        <Image
          style={styles.img}
          source={{
            uri: `data:image/jpeg;base64,${patient_data?.patient_data?.patient_pic_url}`,
          }}
        />
        <View style={styles.patientinfo}>
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
              label={Language[language]['book_appointment']}
              selected={true}
              onPress={handleOnBook}
            />
            {/* <SelectionTab
              label={Language[language]['delete']}
              selected={true}
            /> */}
            <SelectionTab
              label={Language[language]['history']}
              selected={true}
              onPress={handleOnpress}
            />
            <SelectionTab
              label={Language[language]['cancel']}
              selected={true}
              onPress={() => {
                patientSearchRef?.current?.snapToIndex(0);
              }}
            />
          </View>
          {/* <View style={styles.bottomView}>
            <TouchableOpacity>
              <Text style={styles.content}>{Language[language]['update']}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.content}>{Language[language]['delete']}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('patientrecord')}>
              <Text style={styles.content}>
                {Language[language]['view_more']}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                patientSearchRef?.current?.snapToIndex(0);
              }}>
              <Text style={styles.content}>{Language[language]['cancel']}</Text>
            </TouchableOpacity>
          </View> */}
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
  },
  age: {
    fontWeight: 400,
    fontSize: moderateScale(10),
    lineHeight: 20,
    color: CUSTOMCOLOR.black,
  },
  contact: {
    fontWeight: 600,
    fontSize: 10,
    lineHeight: 12.5,
    color: CUSTOMCOLOR.black,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
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
  },
});

export default PatientSearchCard;

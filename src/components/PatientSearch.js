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

const PatientSearch = patient => {
  const [visible, setVisible] = useState(false);
  const patientSearchRef = useRef(null);
  const navigation = useNavigation();
  console.log('------------------patient', patient);

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
            {patient_data?.patient_data?.birth_date}
          </Text>
          <Text style={styles?.contact}>
            {Language[language]['contact']}:{' '}
            {patient_data?.patient_data?.patient_phone_number}
          </Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 12,
    fontSize: CUSTOMFONTSIZE.h3,
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: 4,
    gap: 8,
  },
  name: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 20,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  age: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 20,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  contact: {
    fontWeight: 600,
    fontSize: 10,
    lineHeight: 12.5,
    padding: 0,
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
    right: 8,
    top: 8,
  },
  option: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  bottomView: {
    width: '100%',
    height: 500,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalView: {
    height: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00BFFF',
    shadowColor: '#ffff',
    shadowOffset: {
      width: 0,
      height: 2,
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
    gap: 16,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
});

export default PatientSearch;
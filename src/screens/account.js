import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import moment from 'moment';
// import {CUSTOMCOLOR} from '../settings/styles';
import {useNavigation} from '@react-navigation/native';
import ManageCard from '../components/ManageCard';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import {authenticateActions} from '../redux/features/authenticate/authenticateSlice';
import {updateheaderStatus} from '../redux/features/headerProgress/headerProgress';
import ShowChip from '../components/showChip';

const Account = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [clinic, setClinics] = useState([]);
  const [cliniId, setClinicId] = useState();
  const [users, setUsers] = useState([]);
  const {phone} = useSelector(state => state?.phone?.data);
  const token = useSelector(state => state.authenticate.auth.access);
  const rtoken = useSelector(state => state.authenticate.auth.refresh);
  const fetchDoctor = async () => {
    const response = await fetchApi(URL.getPractitionerByNumber(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('practitioner response====', response);
    if (response.ok) {
      const jsonData = await response.json();
      // console.log('----------------------------', jsonData);
      setData(jsonData.data);
      // dispatch(addDoctor_profile.addDoctor_profile(jsonData?.data));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchDoctor();
  }, []);
  const fetchData = async () => {
    const response = await fetchApi(URL.getClinic(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      // console.log('--------------clinics', jsonData);
      setClinics(jsonData?.data);
      setClinicId(jsonData?.data[0]?.id);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchUsers = async () => {
    const response = await fetchApi(URL.getUsers(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      // console.log('--------------clinics', jsonData);
      setUsers(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [phone]);

  const today = moment().toISOString().split('-')[0];
  const BirthYear = data?.DOB.split('-')[0];

  const age = parseInt(today) - parseInt(BirthYear);
  const DateOfBirth = `${data?.DOB.split('-')[2]}-${data?.DOB.split('-')[1]}-${
    data?.DOB.split('-')[0]
  }`;
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      fetchDoctor();
      fetchUsers();
    }, [cliniId]),
  );

  const userLogout = () => {
    const newTokens = {
      access: null,
      refresh: null,
      lastLogin: null,
    };
    const updateStatus = [
      {progressname: 'Profile', status: false},
      {progressname: 'Add Clinic', status: false},
      {progressname: 'Add User', status: false},
    ];
    dispatch(authenticateActions.updateauthenticate(newTokens));
    dispatch(updateheaderStatus(updateStatus));
    Alert.alert('Logout Sucessfull ');
    navigation.navigate('entry');
  };
 
  const handlePrescription = () => {
    const path = `data:application/pdf;base64,${data?.medical_doc_url}`;

    navigation.navigate('pdfhistory', {path,prevScrn});
  };
  // console.log('===============>',data?.medical_doc_url);
  const prevScrn = 'account';
  return (
    <View style={styles.main}>
      <View>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text style={styles.PersonalInf}>Personal Information</Text>
          <TouchableOpacity onPress={userLogout}>
            <Text>LOGOUT</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pI}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${data?.profile_pic_url}`,
            }}
            style={styles.doctorImg}
          />
          <View style={styles.card}>
            <View>
              <Text style={styles.docname}>{data?.doctor_name}</Text>
              <Text style={styles.subinfo}>
                Age:{age} | {data?.gender}
              </Text>
              <Text style={styles.subinfo}>DOB: {DateOfBirth}</Text>
              <Text style={styles.subinfo}>
                Specialization:{data?.specialization}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('updateprofile')}>
              <View style={styles.editBtn}>
                <Icon name="pen" size={16} color={CUSTOMCOLOR.primary} />
                <Text style={styles.edit}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.Professional}>Professional</Text>
        <View style={styles.ProfView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <View style={styles.profCard}>
                <Icon
                  name="google-circles-communities"
                  size={16}
                  color={CUSTOMCOLOR.primary}
                />
                <Text style={styles.subhead}>Registration Council</Text>
                <Text style={styles.subvalue}>Medical Registration</Text>
              </View>
              <View style={styles.profCard}>
                <Icon
                  name="medical-bag"
                  size={16}
                  color={CUSTOMCOLOR.primary}
                />
                <Text style={styles.subhead}>Medical Number</Text>
                <Text style={styles.subvalue}>{data?.medical_number}</Text>
              </View>
              <View style={styles.profCard}>
                <Icon
                  name="map-marker-multiple"
                  size={16}
                  color={CUSTOMCOLOR.primary}
                />
                <Text style={styles.subhead}>State</Text>
                <Text style={styles.subvalue}>{data?.state}</Text>
              </View>
              <View style={styles.profCard}>
                <Icon
                  name="phone"
                  size={16}
                  color={CUSTOMCOLOR.primary}
                />
                <Text style={styles.subhead}>Phone</Text>
                <Text style={styles.subvalue}>{data?.doctor_phone_number}</Text>
              </View>
            </View>
            {/* <TouchableOpacity>
              <View style={styles.editBtn}>
                <Icon name="pen" size={16} color={CUSTOMCOLOR.primary} />
                <Text style={styles.edit}>Edit</Text>
              </View>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
      {/* <View style={styles.HPID}>
        <Text style={styles.HPIDText}>Healthcare Professional ID</Text>
        <Text style={styles.HPIDcontent}>
          The Healthcare Professional ID allows healthcare profession to connect
          to India's digital health ecosystem and access a host of service
          through the Healthcare Professional Registry.
        </Text>
        <TouchableOpacity>
          <View style={styles.generateBtn}>
            <Text style={{color: CUSTOMCOLOR.primary}}>
              Generate Via Aadhar
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}
      <View>
        <View style={styles.clinicCard}>
          <ManageCard
            // style={{marginBottom: 8}}
            data={clinic}
            dta={'clinic_name'}
            nameIcon={'hospital'}
            Dataname={'Clinics'}
            name={'pencil'}
            onPress={() => {
              // navigation.navigate('addclinic', {prevScrn});
              navigation.navigate('clinic', {prevScrn});
            }}
          />
          <ManageCard
            // label={'Manage'}
            data={users}
            dta={'clinic_user_name'}
            nameIcon={'account-group'}
            Dataname={'Admins'}
            name={'pencil'}
            onPress={() => navigation.navigate('userdisplay', {prevScrn})}
          />
        </View>
      </View>
      <TouchableOpacity onPress={handlePrescription} style={{marginTop:verticalScale(8)}}>
            <ShowChip
              text={
                <>
                  <Icon
                    color={CUSTOMCOLOR.error}
                    size={moderateScale(20)}
                    name={'file-pdf-box'}
                  />
                  {<Text>Registration Document.pdf</Text>}
                </>
              }
              main={{marginHorizontal: 0}}
            />
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: moderateScale(1),
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
  },
  doctorImg: {
    height: moderateScale(70),
    width: moderateScale(70),
    borderRadius: moderateScale(100),
  },
  card: {
    left: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '87%',
  },
  docname: {
    fontSize: moderateScale(16),
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  subinfo: {
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  edit: {
    color: CUSTOMCOLOR.edit,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  profCard: {
    flexDirection: 'row',
    padding: moderateScale(8),
    gap: moderateScale(8),
  },
  subhead: {
    fontWeight: '600',
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  subvalue: {
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  clinicCard: {
    gap: moderateScale(8),
    marginTop: moderateScale(32),
  },
  PersonalInf: {
    color: CUSTOMCOLOR.black,
    fontWeight: '500',
    fontSize: CUSTOMFONTSIZE.h1,
    lineHeight: moderateScale(48),
    bottom: moderateScale(8),
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  pI: {
    width: '100%',
    Top: moderateScale(32),
    borderRadius: moderateScale(8),
    justifyContent: 'space-between',
    padding: moderateScale(16),
    backgroundColor: CUSTOMCOLOR.white,
    flexDirection: 'row',
  },
  editBtn: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
    gap: moderateScale(8),
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    backgroundColor: '#E3E3E3',
    right: moderateScale(8),
  },
  Professional: {
    color: '#000000',
    fontWeight: '500',
    fontSize: moderateScale(20),
    lineHeight: moderateScale(56),
    //bottom: 4,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  ProfView: {
    width: '100%',
    Top: moderateScale(32),
    borderRadius: moderateScale(8),
    justifyContent: 'space-between',
    padding: moderateScale(16),
    backgroundColor: CUSTOMCOLOR.white,
  },
  HPID: {
    width: '100%',
    top: moderateScale(16),
    // left: 47,
    padding: moderateScale(16),
    borderRadius: moderateScale(8),
    gap: moderateScale(8),
    backgroundColor: CUSTOMCOLOR.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HPIDText: {
    padding: moderateScale(8),
    fontWeight: '600',
    fontSize: moderateScale(20),
    lineHeight: moderateScale(27),
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  HPIDcontent: {
    gap: moderateScale(8),
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE.h2,
    lineHeight: moderateScale(24),
    color: CUSTOMCOLOR.white,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  generateBtn: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(24),
    gap: moderateScale(10),
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: moderateScale(8),
    top: moderateScale(10),
  },
  manageText: {
    top: moderateScale(16),
    color: CUSTOMCOLOR.black,
    fontWeight: '500',
    fontSize: CUSTOMFONTSIZE.h1,
    lineHeight: moderateScale(64),
    bottom: moderateScale(8),
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  manageView: {
    width: '100%',
    marginTop: moderateScale(12),
    gap: moderateScale(8),
    borderRadius: moderateScale(8),
    justifyContent: 'space-between',
    padding: moderateScale(16),
    backgroundColor: CUSTOMCOLOR.white,
  },
});

export default Account;

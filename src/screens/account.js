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
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import moment from 'moment';
// import {CUSTOMCOLOR} from '../settings/styles';
import {useNavigation} from '@react-navigation/native';
import ManageCard from '../components/ManageCard';
import {CUSTOMCOLOR, CUSTOMFONTFAMILY} from '../settings/styles';

const Account = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [clinic, setClinics] = useState([]);
  const [cliniId, setClinicId] = useState();
  const [users, setUsers] = useState([]);
  const {phone} = useSelector(state => state?.phone?.data);
  const token = useSelector(state => state.authenticate.auth.access);
  const fetchDoctor = async () => {
    const response = await fetchApi(URL.getPractitionerByNumber(phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('practitioner response====', response);
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
      console.log('--------------clinics', jsonData);
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
      console.log('--------------clinics', jsonData);
      setUsers(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [phone]);

  const today = moment().toISOString().split('-')[0];

  console.log('====================================', clinic);
  console.log(
    '---------------------',
    data?.DOB.split(' ')[1] + data?.DOB.split(' ')[2] + data?.DOB.split(' ')[3],
  );
  const BirthYear = data?.DOB.split(' ')[3];

  const age = parseInt(today) - parseInt(BirthYear);
  const DateOfBirth = `${data?.DOB.split(' ')[2]}-${data?.DOB.split(' ')[1]}-${
    data?.DOB.split(' ')[3]
  }`;
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [cliniId]),
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [cliniId]),
  );

  return (
    <View style={{flex: 1, paddingHorizontal: 24, paddingVertical: 24}}>
      <View>
        <Text style={styles.PersonalInf}>Personal Information</Text>
        <View style={styles.pI}>
          <Image
            source={{
              uri: `data:image/jpeg;base64,${data?.profile_pic_url}`,
            }}
            style={{height: 70, width: 70, borderRadius: 100}}
          />
          <View
            style={{
              left: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '87%',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: CUSTOMCOLOR.black,
                  fontFamily: CUSTOMFONTFAMILY.heading,
                }}>
                {data?.doctor_name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: CUSTOMCOLOR.black,
                  fontFamily: CUSTOMFONTFAMILY.body,
                }}>
                Age:{age} | {data?.gender}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: CUSTOMCOLOR.black,
                  fontFamily: CUSTOMFONTFAMILY.body,
                }}>
                DOB: {DateOfBirth}
              </Text>
            </View>
            <TouchableOpacity>
              <View style={styles.editBtn}>
                <Icon name="pen" size={16} color={'#4ba5fa'} />
                <Text
                  style={{color: '#4ba5fa', fontFamily: CUSTOMFONTFAMILY.body}}>
                  Edit
                </Text>
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
              <View style={{flexDirection: 'row', padding: 8, gap: 8}}>
                <Icon
                  name="google-circles-communities"
                  size={16}
                  color={'#4ba5fa'}
                />
                <Text
                  style={{
                    fontWeight: 600,
                    color: CUSTOMCOLOR.black,
                    fontFamily: CUSTOMFONTFAMILY.heading,
                  }}>
                  Registration Council
                </Text>
                <Text
                  style={{
                    color: CUSTOMCOLOR.black,
                    fontFamily: CUSTOMFONTFAMILY.body,
                  }}>
                  Medical Registration
                </Text>
              </View>
              <View style={{flexDirection: 'row', padding: 8, gap: 8}}>
                <Icon name="medical-bag" size={16} color={'#4ba5fa'} />
                <Text
                  style={{
                    fontWeight: 600,
                    color: CUSTOMCOLOR.black,
                    fontFamily: CUSTOMFONTFAMILY.heading,
                  }}>
                  Medical Number
                </Text>
                <Text
                  style={{
                    color: CUSTOMCOLOR.black,
                    fontFamily: CUSTOMFONTFAMILY.body,
                  }}>
                  {data?.medical_number}
                </Text>
              </View>
            </View>
            <TouchableOpacity>
              <View style={styles.editBtn}>
                <Icon name="pen" size={16} color={'#4ba5fa'} />
                <Text
                  style={{color: '#4ba5fa', fontFamily: CUSTOMFONTFAMILY.body}}>
                  Edit
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.HPID}>
        <Text style={styles.HPIDText}>Healthcare Professional ID</Text>
        <Text style={styles.HPIDcontent}>
          The Healthcare Professional ID allows healthcare profession to connect
          to India's digital health ecosystem and access a host of service
          through the Healthcare Professional Registry.
        </Text>
        <TouchableOpacity>
          <View style={styles.generateBtn}>
            <Text style={{color: '#4ba5fa'}}>Generate Via Aadhar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{top: 140, left: 47}}>
        {/* <Text style={styles.manageText}>Manage</Text> */}
        {/* <View style={styles.manageView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <View style={{flexDirection: 'row', padding: 8, gap: 8}}>
                <Icon name="hospital" size={16} color={'#4ba5fa'} />
                <Text style={{fontWeight: 600, color: CUSTOMCOLOR.black,fontFamily:CUSTOMFONTFAMILY.heading}}>
                  Clinics:
                </Text>
                {clinic?.map((val, ind) => (
                  <Text style={{color: CUSTOMCOLOR.black,fontFamily:CUSTOMFONTFAMILY.body}} key={ind}>
                    {val?.clinic_name}
                  </Text>
                ))}
              </View>
              <View style={{flexDirection: 'row', padding: 8, gap: 8}}>
                <Icon name="account-group" size={16} color={'#4ba5fa'} />
                <Text style={{fontWeight: 600, color: CUSTOMCOLOR.black,fontFamily:CUSTOMFONTFAMILY.heading}}>
                  Staff
                </Text>
                <Text style={{color: CUSTOMCOLOR.black,fontFamily:CUSTOMFONTFAMILY.body}}>Medical Number</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('addclinic');
              }}>
              <View style={styles.editBtn}>
                <Icon name="plus" size={16} color={'#4ba5fa'} />
                <Text style={{color: '#4ba5fa'}}>Add</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
        <View style={{width: 600}}>
          <ManageCard
            // style={{marginBottom: 8}}
            data={clinic}
            dta={'clinic_name'}
            nameIcon={'hospital'}
            Dataname={'Clinics'}
            name={'plus'}
            onPress={() => {
              navigation.navigate('addclinic');
            }}
          />
          <ManageCard
            // label={'Manage'}
            data={users}
            dta={'clinic_user_name'}
            nameIcon={'account-group'}
            Dataname={'Users'}
            name={'plus'}
            onPress={() => console.log('users')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainHeadContainer: {
    paddingHorizontal: 24,

    //paddingHorizontal:24,
    width: '100%',
    height: 88,
    backgroundColor: '#4ba5fa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  MainText: {
    color: '#fff',
    top: 43,
    left: 37,
    gap: 33,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21.79,
  },
  PersonalInf: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 48,
    bottom: 8,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  pI: {
    width: '100%',
    Top: 32,
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  editBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#E3E3E3',
    right: 8,
  },
  Professional: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 56,
    //bottom: 4,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  ProfView: {
    width: '100%',
    Top: 32,
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  HPID: {
    width: '100%',
    top: 16,
    // left: 47,
    padding: 16,
    borderRadius: 8,
    gap: 8,
    backgroundColor: '#4ba5fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HPIDText: {
    padding: 8,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 27.24,
    color: 'black',
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  HPIDcontent: {
    gap: 8,
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 24,
    color: '#fff',
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  generateBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    top: 10,
  },
  manageText: {
    top: 16,
    color: '#000000',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 64,
    bottom: 8,
    fontFamily: CUSTOMFONTFAMILY.heading,
  },
  manageView: {
    width: '100%',
    marginTop: 12,
    gap: 8,
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default Account;

import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ProgresHeader from '../components/progressheader';
import {useSelector, dispatch, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {commonstyles} from '../styles/commonstyle';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utility/scaleDimension';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {HButton, SelectorBtn} from '../components';
import UserCard from '../components/userCard';
import ClinicCreate from './cliniccreate';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {HttpStatusCode} from 'axios';
import {headerStatus} from '../redux/features/headerProgress/headerProgress';
import {updateclinic_users} from '../redux/features/profiles/ClinicUsers';
import PrescriptionHead from '../components/prescriptionHead';
import {useFocusEffect} from '@react-navigation/native';

const UserDisplay = ({navigation}) => {
  const prevScrn1 = 'undefineed';
  const SuccesRef = useRef(null);
  useEffect(() => {
    SuccesRef?.current?.snapToIndex(1);
  }, []);
  const dispatch = useDispatch();
  const {phone} = useSelector(state => state?.phone?.data);
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.authenticate.auth.access);
  const progressData = useSelector(state => state.progress?.status);
  const route = useRoute();
  const {prevScrn} = route.params;
  const [apiStatus, setApiStatus] = useState({});
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  // const route = useRoute();
  const clinic_users = useSelector(state => state.clinic_users?.clinic_users);
  const ResetClinic_Users_Redux = () => {
    const ResetClinic_users = [];
    dispatch(updateclinic_users(ResetClinic_users));
  };
  const handleDelete = index => {
    const newUser = clinic_users?.filter((_, i) => i !== index);
    dispatch(updateclinic_users(newUser));
    Alert.alert('Success', 'User data deleted');
  };
  const handleNavigation = () => {
    prevScrn === 'account'
      ? setTimeout(() => {
          navigation.navigate('tab');
        }, 10)
      : setTimeout(() => {
          navigation.navigate('userdisplay', {prevScrn1});
        }, 10);
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchApi(URL.adduser, {
        method: 'POST',
        headers: {
          Prefer: '',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: 'application/json, application/xml',
        },
        body: JSON.stringify(clinic_users),
      });
      if (response.status === HttpStatusCode.Ok) {
        const jsonData = await response.json();
        // console.log(jsonData);
        if (jsonData.status === 'success') {
          setApiStatus({status: 'success', message: jsonData.message});
          SuccesRef?.current?.snapToIndex(1);
          // dispatch(headerStatus({index: 2, status: true}));
          setTimeout(() => {
            navigation.navigate('tab');
          }, 1000);
          setTimeout(() => {
            SuccesRef?.current?.snapToIndex(0);
          }, 2000);
          // setSelectedClinic(jsonData.data[0]?.clinic_name);
          setLoading(false);
          ResetClinic_Users_Redux();
          SuccesRef?.current?.snapToIndex(0);
        } else {
          setApiStatus({status: 'warning', message: 'Enter all Values'});
          SuccesRef?.current?.snapToIndex(1);
          console.error('API call failed:', response.status, response);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error Occured', error);
    }
  };

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
      setUsers(() => jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [visible]),
  );
  const [del_id, setDel_id] = useState();
  // useEffect(() => {
  //   fetchUsers();
  // }, [visible]);
  const handleDeleteuser = value => {
    setVisible(!visible);
    setDel_id(value);
  };

  const deleteUser = async id => {
    try {
      const response = await fetch(URL.delete_clinic_user(id), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          setVisible(!visible);
        }
      } else {
        console.log('Error Occured', response.status);
      }
    } catch (error) {
      console.error('Error deleting clinic:', error);
    }
  };

  return (
    <View style={styles.Main}>
      {prevScrn !== 'account' && (
        <View>
          <ProgresHeader progressData={progressData} />
        </View>
      )}
      <PrescriptionHead heading={'My Admin'} />

      <View
        style={{
          alignSelf: users?.length > 0 ? 'flex-end' : 'center',
          alignItems: 'center',
          marginBottom: moderateScale(12),
          gap: moderateScale(16),
        }}>
        <HButton
          label={users?.length > 0 ? 'Add more Admins' : 'Add Admin'}
          icon={'plus'}
          onPress={() => {
            navigation.navigate('adduser', {prevScrn});
          }}
          type={'addtype'}
        />
        {users?.length > 0 ? null : (
          <HButton
            rightIcon="chevron-right"
            color={CUSTOMCOLOR.primary}
            label="Skip"
            onPress={() => navigation.navigate('tab')}
            btnstyles={{
              backgroundColor: CUSTOMCOLOR.white,
              borderWidth: 0.5,
              borderColor: CUSTOMCOLOR.primary,
            }}
            textStyle={{
              color: CUSTOMCOLOR.primary,
            }}
          />
        )}
      </View>
      <ScrollView>
        {users?.map((item, index) => (
          <View key={index} style={{marginBottom: moderateScale(8)}}>
            <UserCard
              index={item.id}
              data={item}
              cancel={() => {
                // setVisible(!visible);
                handleDeleteuser(item?.id);
              }}
            />
          </View>
        ))}
      </ScrollView>
      {users?.length > 0 ? (
        <HButton
          btnstyles={styles.btnNext}
          textStyle={styles.input}
          label={'Next'}
          onPress={() => navigation.navigate('tab')}
          loading={loading}
        />
      ) : null}
      <Modal
        animationType="slide"
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
        transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000aa',
            width: '100%',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setVisible(!visible);
            }}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <View
            style={{
              backgroundColor: CUSTOMCOLOR.white,
              padding: moderateScale(40),
              borderRadius: moderateScale(16),
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: CUSTOMCOLOR.black,
                fontWeight: '700',
                fontSize: CUSTOMFONTSIZE.h2,
              }}>
              Are You sure Want To Delete
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                gap: moderateScale(16),
                padding: moderateScale(16),
                borderRadius: moderateScale(16),
              }}>
              <HButton label={'No'} onPress={() => setVisible(!visible)} />
              <HButton
                textStyle={{color: CUSTOMCOLOR.primary}}
                label={'Yes'}
                btnstyles={{
                  backgroundColor: CUSTOMCOLOR.white,
                  borderWidth: moderateScale(2),
                  borderColor: CUSTOMCOLOR.borderColor,
                }}
                onPress={() => deleteUser(del_id)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  Main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    flex: 1,
    backgroundColor: CUSTOMCOLOR.background,
  },
  input: {
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.white,
    paddingLeft: moderateScale(8),
  },
  btn: {
    backgroundColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(10),
  },
  btnNext: {
    backgroundColor: CUSTOMCOLOR.primary,
    justifyContent: 'center',
    // marginHorizontal: moderateScale(56),
    alignSelf: 'center',
    borderRadius: moderateScale(10),
  },
});
export default UserDisplay;

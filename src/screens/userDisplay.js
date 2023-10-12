import {View, Text, StyleSheet} from 'react-native';
import {useState, useEffect, useRef} from 'react';
import ProgresHeader from '../components/progressheader';
import {useSelector, dispatch} from 'react-redux';
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
import {HButton} from '../components';
import UserCard from '../components/userCard';
import ClinicCreate from './cliniccreate';
import {ScrollView} from 'react-native-gesture-handler';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {HttpStatusCode} from 'axios';
import {headerStatus} from '../redux/features/headerProgress/headerProgress';
import {updateclinic_users} from '../redux/features/profiles/ClinicUsers';
const UserDisplay = ({navigation, route}) => {
  const SuccesRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.authenticate.auth.access);
  // const progressData = useSelector(state => state.progress?.status);
  const {prevScrn} = route.params;
  const [apiStatus, setApiStatus] = useState({});
  const clinic_users = useSelector(state => state.clinic_users?.clinic_users);
  // console.log('users===>',clinic_users)
  const ResetClinic_Users_Redux = () => {
    const ResetClinic_users = [];
    dispatch(updateclinic_users(ResetClinic_users));
  };
  // const handleDelete = (user, index) => {
  //   setAllSlots(prevAllSlots =>
  //     clinic_users.filter(slot => slot.index !== index),
  //   }
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
        console.log(jsonData);
        if (jsonData.status === 'success') {
          setApiStatus({status: 'success', message: jsonData.message});
          SuccesRef?.current?.snapToIndex(1);
          dispatch(headerStatus({index: 2, status: true}));
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
      console.error('Error occurred:', error);
      setApiStatus({status: 'error', message: 'Please try again'});
      SuccesRef?.current?.snapToIndex(1);
      console.error('Error occurred:', error);
      setLoading(false);
    }
  };
  const progressData = useSelector(state => state.progress?.status);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: horizontalScale(24),
        paddingVertical: verticalScale(24),
      }}>
      {prevScrn !== 'account' && (
        <View>
          <ProgresHeader progressData={progressData} />
        </View>
      )}
      <View style={styles.alignchild}>
        <Text style={commonstyles.h1}>Add User</Text>
      </View>
      <View style={styles.btn}>
        <HButton
          icon="plus"
          label="Add User"
          onPress={() => navigation.navigate('adduser', {prevScrn})}
        />
        {clinic_users ? null : (
          <HButton
            label="Skip"
            onPress={() => navigation.navigate('tab')}
            btnstyles={{
              backgroundColor: CUSTOMCOLOR.white,
              borderWidth: 1,
              borderColor: CUSTOMCOLOR.primary,
            }}
            textStyle={{
              color: CUSTOMCOLOR.primary,
            }}
          />
        )}
      </View>
      <ScrollView
        style={styles.appointmentcard}
        contentContainerStyle={{gap: moderateScale(8), top: moderateScale(64)}}>
        {/* <View style={{top:moderateScale(64)}}> */}
        {clinic_users?.map((value, index) => {
          return <UserCard key={index} userdata={value} />;
        })}

        {/* </View> */}
      </ScrollView>
      {clinic_users && (
        <View>
          <HButton
            label="Next"
            onPress={() => {
              if (clinic_users.length > 0) {
                fetchData();
              } else {
                Alert.alert('Please Add Atleast One User');
              }
            }}
            loading={loading}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  alignchild: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: horizontalScale(8),
  },
  btn: {
    alignItems: 'center',
    top: moderateScale(32),
    gap: moderateScale(16),
  },
  appointmentcard: {
    height: moderateScale(300),
    paddingHorizontal: horizontalScale(8),
    gap: moderateScale(16),
  },
});
export default UserDisplay;

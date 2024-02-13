import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import React, {useEffect, useState} from 'react';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const NotificationCard = ({
  age,
  data,
  name,
  gende,
  complaint,
  consultation_fees,
  patient_pic_url,
}) => {
  const navigation = useNavigation();
  const token = useSelector(state => state.authenticate.auth.access);
  const [doc_name, SetDoc_name] = useState({});
  const fetchDoctor = async () => {
    const response = await fetchApi(
      URL.getUserByNumber(data?.user_phone_number?.split('.')[0]),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.ok) {
      const jsonData = await response.json();
      SetDoc_name(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  // useEffect(() => {
  //   fetchDoctor();
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchDoctor();
    }, []),
  );
  const VisibleOfNotification = async id => {
    try {
      const response = await fetchApi(URL.visibility_notification(id), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({seen: true}),
      });
      if (response.ok) {
      } else {
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleData = () => {
    const patient_phone = data?.patient_phone_number;
    const doctor_phone_number = data?.doctor_phone_number?.includes('sent')
      ? data?.doctor_phone_number?.split('.')[0]
      : data?.doctor_phone_number;
    const appointment_id = data?.appointment_id;
    const clinic_id = data?.clinic_id;

    if (!data?.seen) {
      navigation.navigate(data?.notification_data, {
        name,
        gende,
        age,
        complaint,
        consultation_fees,
        patient_phone,
        doctor_phone_number,
        appointment_id,
        clinic_id,
        patient_profile_pic: patient_pic_url,
      });
    }
    VisibleOfNotification(data?.id);
  };
  return (
    <Pressable
      style={{
        ...styles.main,
        backgroundColor: !data?.seen
          ? CUSTOMCOLOR.borderColor
          : CUSTOMCOLOR.white,
      }}
      onPress={handleData}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={styles.img}
          source={{
            uri: `data:image/jpeg;base64,${doc_name?.user_profile_pic_url}`,
          }}
        />
        <View style={styles.msg}>
          <Text style={styles.msgText}>{data?.message}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', gap: horizontalScale(8)}}>
        <Text style={styles.text}>{doc_name?.clinic_user_name}</Text>
        <Text style={styles.text}>
          {data?.created_at?.split('T')[0]},
          {`${data?.created_at?.split('T')[1]?.split(':')[0]}:${
            data?.created_at?.split('T')[1]?.split(':')[1]
          }`}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'space-between',
    marginBottom: moderateScale(8),
    borderRadius: moderateScale(8),
    borderColor: CUSTOMCOLOR.borderColor,
  },
  img: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(16),
  },
  msg: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(16),
  },
  msgText: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h2,
    fontWeight: '600',
  },
  text: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h5,
    fontWeight: '400',
  },
});
export default NotificationCard;

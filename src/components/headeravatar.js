import {View, Image, StyleSheet, Text} from 'react-native';
import {CUSTOMFONTFAMILY, CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {useEffect, useState} from 'react';
const HeaderAvatar = props => {
  //props->name, speciality, img url
  const [data, setData] = useState();

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwODg1NDgwLCJpYXQiOjE2OTA3OTkwODAsImp0aSI6Ijc4OTZhZmMyYTBhODQ4NTM5MjdjMzhmYmNmODcyMDE3IiwidXNlcl9pZCI6IjkxNzc0Njg1MTEifQ.Gr0WOtTxVqay8QmfxeT7T1wQFTcs2AIUyeQc19DxJC4';

  const fetchClinic = async () => {
    // const response = await fetchApi(URL.get_all_appointments_of_clinic);
    // const jsonData = await response.json();
    // setData(jsonData);
    const response = await fetchApi(URL.getPractitionerByNumber('9177468511'), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // params :{
      //   doctor_phone_number :'9003092186'
      // }
    });
    if (response.ok) {
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData.data);
      // console.log('====================================');
      // console.log(clinics);
      // console.log('====================================');
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchClinic();
  }, []);

  console.log('====================================');
  console.log(data?.profile_pic_url);
  console.log('====================================');
  return (
    <>
      <View style={styles.avatarmain}>
        <Image
          style={styles.img}
          source={{
            uri: data?.profile_pic_url,
          }}
        />
        <View>
          <Text style={styles.name}>{data?.doctor_name}</Text>
          <Text style={styles.speciality}>{data?.specialization}</Text>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  avatarmain: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    // backgroundColor: "#454544",
    borderRadius: 4,
    gap: 8,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  name: {
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    fontWeight: 500,
    fontSize: CUSTOMFONTSIZE.h4,
    color: '#000000',
  },
  speciality: {
    fontStyle: 'normal',
    fontFamily: 'Open Sans',
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h5,
    color: '#a1a1a1',
  },
});

export default HeaderAvatar;

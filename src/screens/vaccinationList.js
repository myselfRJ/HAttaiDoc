import {View, Text, ImageBackground} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import VaccinationCard from '../components/VaccinationCard';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utility/scaleDimension';
import {CUSTOMCOLOR} from '../settings/styles';
import {useRoute} from '@react-navigation/native';
import {URL} from '../utility/urls';
import {useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';

const Vaccination_List = ({navigation}) => {
  const route = useRoute();
  const patient_phone = route.params?.patient_phone;
  const token = useSelector(state => state.authenticate.auth.access);
  const [ages, setAges] = useState([]);
  const [Vaccinedata, setVaccinedata] = useState([]);
  const fetchImmunization = async () => {
    const response = await fetch(URL.getImmunizationPatient(patient_phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    const jsonAges = jsonData?.data?.map(item => item?.age);
    setAges(jsonAges);
    setVaccinedata(jsonData?.data);
  };
  useEffect(() => {
    fetchImmunization();
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchImmunization();
    }, [patient_phone]),
  );
  const vaccinationData = [
    {
      id: 1,
      label: 'At Birth',
      image: require('../assets/images/Hpad/Group259.png'),
    },
    {
      id: 2,
      label: '6 Weeks',
      image: require('../assets/images/Hpad/Group260.png'),
    },
    {
      id: 3,
      label: '10 Weeks',
      image: require('../assets/images/Hpad/Group261.png'),
    },
    {
      id: 4,
      label: '14 Weeks',
      image: require('../assets/images/Hpad/Group262.png'),
    },
    {
      id: 5,
      label: '6 months',
      image: require('../assets/images/Hpad/Group263.png'),
    },
    {
      id: 6,
      label: '7 months',
      image: require('../assets/images/Hpad/Group264.png'),
    },
    {
      id: 7,
      label: '6-9 months',
      image: require('../assets/images/Hpad/Group265.png'),
    },
    {
      id: 8,
      label: '9 months',
      image: require('../assets/images/Hpad/Group266.png'),
    },
    {
      id: 9,
      label: '12 months',
      image: require('../assets/images/Hpad/Group267.png'),
    },
    {
      id: 10,
      label: '15 months',
      image: require('../assets/images/Hpad/Group268.png'),
    },
    {
      id: 11,
      label: '16-18 months',
      image: require('../assets/images/Hpad/Group269.png'),
    },
    {
      id: 12,
      label: '18-19 months',
      image: require('../assets/images/Hpad/Group270.png'),
    },
    {
      id: 13,
      label: '18 months-5 years',
      image: require('../assets/images/Hpad/Group271.png'),
    },
    {
      id: 14,
      label: '4-6 years',
      image: require('../assets/images/Hpad/Group272.png'),
    },
    {
      id: 15,
      label: '6-17 years',
      image: require('../assets/images/Hpad/Group273.png'),
    },
  ];

  return (
    <ImageBackground
      source={require('../assets/images/imbg.png')}
      resizeMode={'contain'}
      style={{
        flex: 1,
      }}>
      <ScrollView style={{}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: horizontalScale(15),
            paddingVertical: verticalScale(24),
            rowGap: moderateScale(15),
          }}>
          {vaccinationData.map(item => (
            <VaccinationCard
              key={item.id}
              label={item.label}
              image={item.image}
              navigation={navigation}
              Vaccinedata={Vaccinedata}
              patient_phone={patient_phone}
              lbl={{
                backgroundColor: ages.includes(item?.label)
                  ? CUSTOMCOLOR.fadeGreen
                  : CUSTOMCOLOR.fadeYellow,
              }}
              lbltxt={{
                color: ages.includes(item?.label)
                  ? CUSTOMCOLOR.success
                  : CUSTOMCOLOR.warn,
              }}
            />
          ))}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default Vaccination_List;

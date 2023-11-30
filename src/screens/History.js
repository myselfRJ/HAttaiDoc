import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ShowChip from '../components/showChip';

// import {
//   addCommorbities,
//   updateCommorbities,
// } from '../redux/features/prescription/commorbities';
// import { ,updatecommorbidities } from '../redux/features/prescription/pastHistory';
import {CONSTANTS} from '../utility/constant';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import InputText from '../components/inputext';
import HButton from '../components/button';
import {ScrollView} from 'react-native-gesture-handler';
import {
  StoreAsyncData,
  UpdateAsyncData,
  RetriveAsyncData,
  clearStorage,
} from '../utility/AsyncStorage';
import {commonstyles} from '../styles/commonstyle';
import ChipInput from '../components/ChipInput';
import {SelectorBtn} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
import CustomIcon from '../components/icon';
import {fileurl} from '../utility/urls';

const History = ({route, navigation}) => {
  const token = useSelector(state => state.authenticate.auth.access);
  const {appointment_id} = route.params;
  const [prescription, setPrescription] = useState();
  const [referral, setReferral] = useState([]);
  const [reports, setReports] = useState({});
  const [physical, setPhysical] = useState({});
  const [selectedType, setSelectedType] = useState();
  const images_path = [
    {image: require('../assets/images/rxhistory.png'), text: 'Prescription'},
    {image: require('../assets/images/report.png'), text: 'Referral'},
    {image: require('../assets/images/refr.png'), text: 'Report finding'},
    {
      image: require('../assets/images/physical.png'),
      text: 'Physical Examinations',
    },
  ];
  const fetchConsultation = async () => {
    const response = await fetchApi(URL.get_consultationPDF(appointment_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setPrescription(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  const fetchRefferal = async () => {
    const response = await fetchApi(URL.get_refer_pdf(appointment_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setReferral(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  const fetchreports = async () => {
    const response = await fetchApi(URL.get_reports(appointment_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setReports(jsonData?.data);
      console.log('======>rep', jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  const fetchExamination = async () => {
    const response = await fetchApi(URL.get_physical(appointment_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setPhysical(jsonData?.data);
      console.log('======>data', jsonData?.data?.notes);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchRefferal();
    fetchConsultation();
    fetchreports();
    fetchExamination();
  }, []);
  console.log('====================================');
  console.log(physical?.notes);
  console.log('====================================');
  const handlePrescription = () => {
    const filepath = prescription?.file_url;
    const path = `${fileurl}${filepath}`;
    navigation.navigate('pdfhistory', {path});
  };
  const handleReferral = filepath => {
    const path = `${fileurl}${filepath}`;
    navigation.navigate('pdfhistory', {path});
  };
  const reports_finding = [
    reports?.file1 ? reports?.file1 : null,
    reports?.file2 ? reports?.file2 : null,
    reports?.file3 ? reports?.file3 : null,
    reports?.file4 ? reports?.file4 : null,
    reports?.file5 ? reports?.file5 : null,
  ];
  const physical_reports = [
    physical?.file1 ? physical?.file1 : null,
    physical?.file2 ? physical?.file2 : null,
    physical?.file3 ? physical?.file3 : null,
    physical?.file4 ? physical?.file4 : null,
    physical?.file5 ? physical?.file5 : null,
  ];
  const handleReports_Physical = filepath => {
    const path = `${fileurl}${filepath}`;
    if (filepath?.includes('pdf')) {
      navigation.navigate('pdfhistory', {path});
    } else {
      navigation.navigate('img', {path});
    }
  };
  // console.log(physical_reports);
  useFocusEffect(
    React.useCallback(() => {
      fetchRefferal();
      fetchConsultation();
      fetchreports();
      fetchExamination();
    }, [selectedType]),
  );
  return (
    <View style={styles.main}>
      <PrescriptionHead heading={'Rx History'} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {images_path?.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedType(item?.text)}>
            <Image
              source={item?.image}
              style={{
                height: moderateScale(100),
                width: moderateScale(100),
                alignSelf: 'center',
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                color:
                  selectedType === item?.text
                    ? CUSTOMCOLOR.primary
                    : CUSTOMCOLOR.black,
                fontSize: CUSTOMFONTSIZE.h3,
              }}>
              {item?.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedType === 'Prescription' && (
        <>
          <Text style={styles.subhead}>{selectedType}</Text>
          <TouchableOpacity onPress={handlePrescription}>
            <ShowChip
              text={
                <>
                  <Icon
                    color={CUSTOMCOLOR.error}
                    size={moderateScale(20)}
                    name={'file-pdf-box'}
                  />
                  {<Text>{prescription?.file_url?.split('/')[4]}</Text>}
                </>
              }
              main={{marginHorizontal: 0}}
            />
          </TouchableOpacity>
        </>
      )}
      {selectedType === 'Referral' && (
        <>
          <Text style={styles.subhead}>{selectedType}</Text>
          {referral?.length > 0 ? (
            referral?.map((item, index) => (
              <TouchableOpacity
                onPress={() => handleReferral(item?.file_referral)}
                key={index}>
                <ShowChip
                  key={index}
                  text={
                    <>
                      <Icon
                        color={CUSTOMCOLOR.error}
                        size={moderateScale(20)}
                        name={'file-pdf-box'}
                      />
                      {<Text>{item?.file_referral?.split('/')[4]}</Text>}
                    </>
                  }
                  main={{marginHorizontal: 0}}
                />
              </TouchableOpacity>
            ))
          ) : (
            <CustomIcon label={'No Referrals avaiable'} />
          )}
        </>
      )}
      {selectedType === 'Report finding' && (
        <>
          <Text style={styles.subhead}>{selectedType}</Text>
          {reports?.description && (
            <View>
              <Text style={styles.head}>
                Description:
                <Text style={styles.notes}>{reports?.description}</Text>
              </Text>
            </View>
          )}
          {reports_finding[0] !== null || reports?.description ? (
            reports_finding?.map(
              (item, index) =>
                item !== null && (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleReports_Physical(item)}>
                    <ShowChip
                      text={
                        <>
                          <Icon
                            color={CUSTOMCOLOR.error}
                            size={moderateScale(20)}
                            name={
                              item?.includes('pdf') ? 'file-pdf-box' : 'image'
                            }
                          />
                          {<Text>{item?.split('/')[4]}</Text>}
                        </>
                      }
                      main={{marginHorizontal: 0}}
                    />
                  </TouchableOpacity>
                ),
            )
          ) : (
            <CustomIcon label={'No Reports Avaialble'} />
          )}
        </>
      )}
      {selectedType === 'Physical Examinations' && (
        <>
          <Text style={styles.subhead}>{selectedType}</Text>
          {physical?.notes && (
            <View>
              <Text style={styles.head}>
                Description:
                <Text style={styles.notes}>{physical?.notes}</Text>
              </Text>
            </View>
          )}
          {physical_reports[0] !== null || physical?.notes ? (
            physical_reports?.map(
              (item, index) =>
                item !== null && (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleReports_Physical(item)}>
                    <ShowChip
                      text={
                        <>
                          <Icon
                            color={CUSTOMCOLOR.error}
                            size={moderateScale(20)}
                            name={
                              item?.includes('pdf') ? 'file-pdf-box' : 'image'
                            }
                          />
                          {<Text>{item?.split('/')[4]}</Text>}
                        </>
                      }
                      main={{marginHorizontal: 0}}
                    />
                  </TouchableOpacity>
                ),
            )
          ) : (
            <CustomIcon label={'No Physicals Avaialble'} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    backgroundColor: CUSTOMCOLOR.white,
    flex: 1,
  },
  subhead: {
    paddingVertical: horizontalScale(12),
    fontSize: CUSTOMFONTSIZE.h2,
    color: CUSTOMCOLOR.black,
    fontWeight: '400',
    alignSelf: 'center',
  },
  head: {color: CUSTOMCOLOR.black, fontSize: CUSTOMFONTSIZE.h4},
  notes: {color: CUSTOMCOLOR.black, fontSize: CUSTOMFONTSIZE.h3},
});

export default History;

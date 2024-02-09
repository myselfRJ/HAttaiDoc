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
  const {appointment_id, patient_phone} = route.params;
  const {phone} = useSelector(state => state?.phone?.data);
  const [prescription, setPrescription] = useState();
  const [referral, setReferral] = useState([]);
  const [reports, setReports] = useState({});
  const [reportText, setReportText] = useState([]);
  const [reportText1, setReportText1] = useState([]);
  const [physical, setPhysical] = useState({});
  const [selectedType, setSelectedType] = useState();
  const [reportspatient, setReportsPatient] = useState([]);
  const [physicalExamination, setPhysicalExamination] = useState({
    body_parts: '',
    general: '',
    piccle: '',
  });
  const images_path = [
    {image: require('../assets/images/rxhistory.png'), text: 'Prescription'},
    {image: require('../assets/images/report.png'), text: 'Referral'},
    {image: require('../assets/images/refr.png'), text: 'Report finding'},
    {
      image: require('../assets/images/physical.png'),
      text: 'Physical Examinations',
    },
    {
      image: require('../assets/images/medical.png'),
      text: 'Medical History',
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
  const fetchReports = async () => {
    const response = await fetchApi(URL.getReportsbyId(appointment_id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      if (jsonData?.data?.length > 0) {
        jsonData?.data?.map((item, index) => {
          const report = item?.report_url;
          setReportsPatient(previousReport => [
            ...previousReport,
            {report_url: report},
          ]);
        });
      }
      const reporttext =
        jsonData?.data?.length > 0
          ? jsonData?.data?.map(item => ({
              type: item?.type_report,
              date: item?.issued_date,
              describe: item?.record_description,
            }))
          : [];
      setReportText1(reporttext);
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
      try {
        const parsed = JSON.parse(jsonData?.data?.description);
        setReportText(parsed);
      } catch (err) {
        console.log(err);
      }
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
      const data = jsonData?.data;
      try {
        const body_parts = JSON.parse(
          data?.body_parts_examination &&
            data?.body_parts_examination !== undefined
            ? data?.body_parts_examination
            : [],
        );
        const general = JSON.parse(
          data?.generalExamination && data?.generalExamination !== undefined
            ? data?.generalExamination
            : [],
        );
        const piccle = JSON.parse(
          data?.piccle && data?.piccle !== undefined ? data?.piccle : [],
        );
        setPhysicalExamination({
          body_parts: body_parts,
          general: general,
          piccle: piccle,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('API call failed:', response.status, response);
    }
  };

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
    reports?.file1 ? {report_url: reports?.file1} : null,
    reports?.file2 ? {report_url: reports?.file2} : null,
    reports?.file3 ? {report_url: reports?.file3} : null,
    reports?.file4 ? {report_url: reports?.file4} : null,
    reports?.file5 ? {report_url: reports?.file5} : null,
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

  const physicalFilter = [
    ...physicalExamination?.body_parts,
    ...physicalExamination?.general,
    ...physicalExamination?.piccle,
  ]?.filter(item => item?.status !== '');
  const [medical, setMedical] = useState();
  const [past, setPast] = useState();
  const [procedure, setProcedure] = useState();
  const [red_flag, setRed_Flag] = useState();
  const [commor, setCommor] = useState([]);
  const [family, setFamily] = useState([]);
  const [social, setSocial] = useState([]);
  const [menstrual, setmenstrual] = useState({});
  const [martial, setMartial] = useState({});
  const [obsteric, setObsteric] = useState({});
  const fetchMedicalData = async () => {
    try {
      const response = await fetchApi(URL.getMedical(phone, patient_phone), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        const filter_data = jsonData?.data?.filter(
          item => item?.appointment_id === appointment_id,
        );
        if (filter_data?.[0]?.commoribities) {
          const commo = JSON.parse(jsonData.data[0].commoribities);
          const mapdata = commo?.map(item => item?.commorbities);
          setCommor(mapdata?.join(', '));
        }
        if (filter_data?.[0]?.family_history) {
          const family = JSON.parse(jsonData.data[0].family_history);
          const mapdata = family?.map(item => item);
          setFamily(mapdata);
        }
        if (filter_data?.[0]?.social_history) {
          const social = JSON.parse(jsonData.data[0].social_history);
          const mapdata = social?.map(item => item?.social);
          setSocial(mapdata?.join(', '));
        }
        if (filter_data?.[0]?.medication_history) {
          const medication = JSON.parse(jsonData.data[0].medication_history);
          setMedical(medication);
        }
        if (filter_data?.[0]?.past_history) {
          const hospitalizatio = JSON.parse(jsonData.data[0].past_history);
          setPast(hospitalizatio);
        }
        if (filter_data?.[0]?.mensutral_history) {
          const mens = JSON.parse(jsonData.data[0].mensutral_history);
          setmenstrual(mens);
        }
        if (filter_data?.[0]?.obsteric_history) {
          const mens = JSON.parse(jsonData.data[0].obsteric_history);
          setObsteric(mens);
        }
        if (filter_data?.[0]?.martial_history) {
          const mens = JSON.parse(jsonData.data[0].martial_history);
          setMartial(mens);
        }
        if (filter_data?.[0]?.procedures) {
          setProcedure(filter_data?.[0]?.procedures);
        }
        if (filter_data?.[0]?.red_flag) {
          setRed_Flag(filter_data?.[0]?.red_flag);
        }
      } else {
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.error('Error in fetchMedicalData:', error);
    }
  };
  useEffect(() => {
    fetchRefferal();
    fetchConsultation();
    fetchreports();
    fetchExamination();
    fetchReports();
    fetchMedicalData();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchRefferal();
      fetchConsultation();
      fetchreports();
      fetchExamination();
      fetchMedicalData();
    }, [selectedType]),
  );
  const fatherFamily = family
    ?.filter(item => item?.relation === 'Father')
    ?.map(val => val?.family);
  const motherfamily = family
    ?.filter(item => item?.relation === 'Mother')
    ?.map(val => val?.family);
  const othersfamily = family
    ?.filter(
      item => item?.relation === 'Others' || item?.relation === undefined,
    )
    ?.map(val => val?.family);
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
                height: moderateScale(64),
                width: moderateScale(64),
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
                flexWrap: 'wrap',
                textAlign: 'center',
                width: moderateScale(100),
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
              <ShowChip
                onNav={() => handleReferral(item?.file_referral)}
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
              {reportText?.length > 0 ? (
                <>
                  <Text style={styles.head}>Description</Text>
                  {[...reportText, ...reportText1]?.map(item => (
                    <ShowChip
                      text={`Type: ${item?.type} Date: ${item?.date} Describe: ${item?.describe}`}
                    />
                  ))}
                </>
              ) : (
                <Text style={styles.notes}>
                  Description: {reports?.description}
                </Text>
              )}
              {/* </Text> */}
            </View>
          )}
          {reports_finding?.[0]?.report_url !== null ||
          reports?.description ||
          reportspatient?.length > 0 ? (
            [...reports_finding, ...reportspatient]?.map(
              (item, index) =>
                item?.report_url !== null &&
                item !== null && (
                  <TouchableOpacity
                    style={{marginTop: moderateScale(15)}}
                    key={index}
                    onPress={() => handleReports_Physical(item?.report_url)}>
                    <ShowChip
                      text={
                        <>
                          <Icon
                            color={CUSTOMCOLOR.error}
                            size={moderateScale(20)}
                            name={
                              item?.report_url?.includes('pdf')
                                ? 'file-pdf-box'
                                : 'image'
                            }
                          />
                          {<Text>{item?.report_url?.split('/')[4]}</Text>}
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
          <View></View>
        </>
      )}
      {selectedType === 'Physical Examinations' && (
        <>
          <Text style={styles.subhead}>{selectedType}</Text>
          {physicalExamination?.body_parts !== '' &&
            physicalExamination?.general !== '' &&
            physicalExamination?.piccle !== '' && (
              <View>
                <Text style={styles.head}>
                  Examinations:{'  '}
                  {physicalFilter?.map((item, index) => {
                    if (physicalFilter[physicalFilter?.length - 1] === item) {
                      return (
                        <Text key={index} style={styles.notes}>
                          {`${item?.label}-${item?.status}`}{' '}
                          {item?.desc !== '' ? item?.desc : ''}
                          {'    '}
                        </Text>
                      );
                    } else {
                      return (
                        <Text key={index} style={styles.notes}>
                          {`${item?.label}-${item?.status}`}{' '}
                          {item?.desc !== '' ? item?.desc : ''}
                          {' , '}
                        </Text>
                      );
                    }
                  })}
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
      {selectedType === 'Medical History' && (
        <View style={{gap: moderateScale(8)}}>
          <Text
            style={{
              fontSize: moderateScale(16),
              color: CUSTOMCOLOR.black,
              fontWeight: '600',
            }}>
            Medical History Summary:
          </Text>
          <View style={{gap: moderateScale(6)}}>
            <Text style={styles.mens}>
              Menstrual History:{' '}
              <Text style={styles.textHis}>
                Menarche: <Text style={styles.textDat}>{menstrual?.age}</Text>,
                Mensturation Status:{' '}
                <Text style={styles.textDat}> {menstrual?.status}, </Text>Flow
                days:
                <Text style={styles.textDat}>{menstrual?.flowdays}</Text> Cycle
                days:
                <Text style={styles.textDat}>
                  {menstrual?.cycledays},{' '}
                </Text>{' '}
                Pregnant:
                <Text style={styles.textDat}>
                  {menstrual?.pregnant?.lmp !== '' ? 'Yes' : 'No'},{' '}
                </Text>
                Lmp:
                <Text style={styles.textDat}>{menstrual?.pregnant?.lmp}, </Text>
                Edd:{' '}
                <Text style={styles.textDat}>{menstrual?.pregnant?.edd}</Text>
              </Text>
            </Text>
            <Text style={styles.mens}>
              Obstetric History:{' '}
              <Text style={styles.textHis}>
                G:{' '}
                <Text style={styles.textDat}>{obsteric?.gravidity?.value}</Text>{' '}
                T: <Text style={styles.textDat}>{obsteric?.term?.value},</Text>{' '}
                P:{' '}
                <Text style={styles.textDat}>
                  {obsteric?.premature?.value},
                </Text>{' '}
                A:{' '}
                <Text style={styles.textDat}>
                  {obsteric?.abortions?.value},
                </Text>{' '}
                L:{' '}
                <Text style={styles.textDat}>{obsteric?.living?.length},</Text>
              </Text>
            </Text>
            <Text style={styles.mens}>
              Martial History:{' '}
              <Text style={styles.textHis}>
                Married Since:
                <Text style={styles.textDat}> {martial?.married}, </Text>
                Consanguinity:{' '}
                <Text style={styles.textDat}>{martial?.cons},</Text> Others:
                <Text style={styles.textDat}> {martial?.others}</Text>
              </Text>
            </Text>
            <Text style={styles.mens}>
              Comorbidities: <Text style={styles.textDat}>{commor}</Text>
            </Text>
            <Text style={styles.mens}>
              Past Hospitalization: <Text style={styles.textDat}>{past}</Text>
            </Text>
            <Text style={styles.mens}>
              Social History: <Text style={styles.textDat}>{social}</Text>
            </Text>
            <Text style={styles.mens}>
              Family History:{' '}
              <Text style={styles.textHis}>
                Father:{' '}
                <Text style={styles.textDat}>{fatherFamily?.join(', ')},</Text>{' '}
                Mother:{' '}
                <Text style={styles.textDat}>{motherfamily?.join(', ')},</Text>{' '}
                Others:{' '}
                <Text style={styles.textDat}>{othersfamily?.join(', ')}</Text>
              </Text>
            </Text>
            <Text style={styles.mens}>
              Medication History: <Text style={styles.textDat}>{medical}</Text>
            </Text>
          </View>
        </View>
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
  notes: {
    color: CUSTOMCOLOR.black,
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: '600',
  },
  mens: {
    fontSize: CUSTOMFONTSIZE.h3,
    color: CUSTOMCOLOR.primary,
    fontWeight: '600',
  },
  textHis: {
    fontWeight: '400',
    fontSize: CUSTOMFONTSIZE?.h3,
    color: CUSTOMCOLOR?.black,
  },
  textDat: {
    fontWeight: '600',
    fontSize: CUSTOMFONTSIZE?.h3,
    color: CUSTOMCOLOR?.black,
  },
});

export default History;

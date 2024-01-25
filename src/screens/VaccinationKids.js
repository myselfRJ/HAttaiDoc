import React, {useEffect, useState} from 'react';
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import KidsVaccine from '../components/KidsVaccine';
import HButton from '../components/button';
import {useRoute} from '@react-navigation/native';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';
import {useSelector} from 'react-redux';
import ShowChip from '../components/showChip';
import {showToast} from '../utility/const';

const VaccinationKids = ({navigation}) => {
  const route = useRoute();
  const token = useSelector(state => state.authenticate.auth.access);
  const selectedStatus = route.params.label;
  const [data, setData] = useState();
  const patient_phone = route.params?.patient_phone;
  const {vacdata} = route.params;
  const vaccinatiofilleddata = vacdata?.filter(
    item => item?.age === selectedStatus,
  )[0];

  const handlevaccination = async () => {
    try {
      const data = await JSON.parse(vaccinatiofilleddata?.vaccineDetails);
      setVaccineState(selectedStatus, data?.vaccineDetails);
    } catch (error) {
      console.error();
    }
  };
  useEffect(() => {
    handlevaccination();
  }, []);
  // console.log(vaccinatiofilleddata);
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const [vaccine, setvaccine] = useState([
    {
      age: 'At Birth',
      vaccineDetails: [
        {
          type: 'BCG',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'OPV',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Hepatisis B -1',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '6 Weeks',
      vaccineDetails: [
        {
          type: 'DPwp/DTap -1',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'IPV -1',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Hib -1',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Hep B -2',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'PCV -1',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Rotavirus -1',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '10 Weeks',
      vaccineDetails: [
        {
          type: 'DPwp/DTap -2',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'IPV -2',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Hib -2',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Hep B -3',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'PCV -2',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Rotavirus -2',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '14 Weeks',
      vaccineDetails: [
        {
          type: 'DPwp/DTap -3',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'IPV -3',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Hib -3',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Hep B -4',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'PCV -3',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Rotavirus -3',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '6 months',
      vaccineDetails: [
        {
          type: 'Influenca(IIV) -1',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '7 months',
      vaccineDetails: [
        {
          type: 'Influenca(IIV) -2',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '6-9 months',
      vaccineDetails: [
        {
          type: 'Typhoidcconjugate vaccine',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '9 months',
      vaccineDetails: [
        {
          type: 'MMR -1',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Meningococcal Vaccine',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '12 months',
      vaccineDetails: [
        {
          type: 'Hepatisis -A',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Meningococcal Vaccine -2',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '15 months',
      vaccineDetails: [
        {
          type: 'PCV Booster',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'MMR -2',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Varicella -1',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '16-18 months',
      vaccineDetails: [
        {
          type: 'DTwp/DTap -B1',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Hib -B1',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'IPV -B1',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '18-19 months',
      vaccineDetails: [
        {
          type: 'Hep A-2',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Varicella -2',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '18 months-5 years',
      vaccineDetails: [
        {
          type: 'PCV',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '4-6 years',
      vaccineDetails: [
        {
          type: 'DTwp/DTap -B2',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'IPV-B2',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'MMR-3',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
    {
      age: '6-17 years',
      vaccineDetails: [
        {
          type: 'PCV',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: 'Tdap',
          status: '',
          date: new Date(),
          batch: '',
        },
        {
          type: '',
          status: '',
          date: new Date(),
          batch: '',
        },
      ],
    },
  ]);
  const setVaccineState = (age, newData) => {
    let newVac = vaccine.map((value, index) => {
      if (value.age === age) {
        value.vaccineDetails = newData;
      }
      return value;
    });
    setvaccine(newVac);
  };
  const updateVaccineDetails = (age, type, status, date, batch) => {
    setvaccine(prevVaccine => {
      return prevVaccine.map(group => {
        if (group.age === age) {
          return {
            ...group,
            vaccineDetails: group.vaccineDetails.map(detail => {
              if (detail.type === type) {
                return {
                  ...detail,
                  status,
                  date,
                  batch,
                };
              }
              return detail;
            }),
          };
        }
        return group;
      });
    });
  };
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const ageStatus = vaccine?.filter(item => item?.age === selectedStatus);
      const response = await fetchApi(URL.uploadImmunizationKids, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          age: selectedStatus,
          vaccineDetails: JSON.stringify(ageStatus[0]),
          patient_phone_number: patient_phone,
        }),
      });
      if (response?.ok) {
        const jsonData = await response.json();
        if (jsonData?.status === 'success') {
          showToast('success', jsonData?.message);
          navigation.goBack();
          setLoading(false);
        }
      } else {
        console.error('API call failed:', response?.status);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error occurred:', error);
      setLoading(false);
    }
  };
  const getData = async () => {
    try {
      const response = await fetchApi(
        URL.getImmunization(selectedStatus, patient_phone),
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const jsonData = await response.json();
        if (jsonData?.data[0]?.vaccineDetails) {
          const data = JSON.parse(jsonData?.data[0]?.vaccineDetails);
          setData(data?.vaccineDetails);
          setVaccineState(selectedStatus, data?.vaccineDetails);
        }
      } else {
        console.error('API call failed:', response.status, response);
      }
    } catch (error) {
      console.error('Error fetching or updating data:', error);
    }
  };
  // useEffect(() => {
  //   getData();
  // }, [selectedStatus]);
  return (
    <ImageBackground
      source={require('../assets/images/imbg.png')}
      resizeMode={'contain'}
      style={{flex: 1}}>
      <View>
        <ScrollView
          style={{
            paddingHorizontal: horizontalScale(12),
            paddingVertical: verticalScale(12),
          }}>
          <Text
            style={{
              color: CUSTOMCOLOR.black,
              fontSize: moderateScale(20),
              fontWeight: '500',
              paddingTop: moderateScale(10),
              paddingHorizontal: horizontalScale(12),
            }}>
            {selectedStatus}
          </Text>

          <Text style={styles.head}>Vaccines</Text>

          {selectedStatus === 'At Birth' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '6 Weeks' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '10 Weeks' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '14 Weeks' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '6 months' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '7 months' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '6-9 months' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '9 months' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '12 months' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '15 months' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '16-18 months' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '18-19 months' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '18 months-5 years' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '4-6 years' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}
          {selectedStatus === '6-17 years' && (
            <View style={styles.vaccine}>
              {vaccine?.map(
                (item, index) =>
                  item?.age === selectedStatus &&
                  item?.vaccineDetails?.map((item, index) => (
                    <KidsVaccine
                      name={item?.type}
                      option={item?.status}
                      setOption={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          value,
                          item?.date,
                          item?.batch,
                        )
                      }
                      date={item?.date}
                      setDate={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          value,
                          item?.batch,
                        )
                      }
                      value={item?.batch}
                      setValue={value =>
                        updateVaccineDetails(
                          selectedStatus,
                          item?.type,
                          item?.status,
                          item?.date,
                          value,
                        )
                      }
                    />
                  )),
              )}
            </View>
          )}

          {expanded && (
            <View>
              <Text style={styles.head}>Others</Text>
              {/* <KidsVaccine /> */}
            </View>
          )}
          {/*   
          <View style={{alignItems: 'flex-end', marginTop: moderateScale(30)}}>
            <HButton label="Other" icon={'plus'} onPress={toggleExpand} />
          </View> */}
        </ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: verticalScale(20),
          }}>
          <HButton
            label="Save"
            btnstyles={{
              height: moderateScale(55),
              borderRadius: moderateScale(4),
            }}
            textStyle={{fontSize: CUSTOMFONTSIZE.h2}}
            loading={loading}
            onPress={() => fetchData()}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  txt: {
    fontSize: moderateScale(24),
    fontWeight: '500',
    color: CUSTOMCOLOR.black,
    paddingBottom: moderateScale(30),
  },
  head: {
    fontSize: CUSTOMFONTSIZE.h2,
    paddingVertical: verticalScale(20),
    fontWeight: '400',
    color: CUSTOMCOLOR.black,
    paddingHorizontal: horizontalScale(12),
  },
  head2: {
    fontSize: CUSTOMFONTSIZE.h2,
    paddingTop: moderateScale(5),
    fontWeight: '400',
    color: CUSTOMCOLOR.black,
  },
  vaccine: {
    gap: moderateScale(10),
    // backgroundColor:'#F1F8FF',
    padding: moderateScale(15),
  },
});

export default VaccinationKids;

import {StyleSheet, Text, TouchableOpacity, View,Pressable} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {SvgXml} from 'react-native-svg';
import {hattailogo} from '../assets/svgs/svg';
import { CONSTANTS } from '../utility/constant';
import {
  ChartCard,
  AppointmentCard,
  HeaderAvatar,
  SelectorBtn,
  BottomSheetView,
} from '../components';
import store from '../redux/stores/store';
import {Language} from '../settings/customlanguage';
import {CUSTOMCOLOR, CUSTOMFONTFAMILY} from '../settings/styles';
import {language} from '../settings/userpreferences';
import DatePicker from 'react-native-date-picker';
import SlotCreate from './slotcreate';
import {URL} from '../utility/urls';
import {ScrollView} from 'react-native-gesture-handler';
const Dashboard = ({navigation}) => {
  const ClinicRef = useState(null);
  const [selectedClinic, setSelectedClinic] = useState('');
  const [clinic,setClinic]=useState('')
  const handleChangeValue=(e)=>{
    setClinic(e)
  }
  const [DOB, setDOB] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formattedDate = DOB.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const handleConfirm = date => {
    setDOB(date);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const fetchData = async () => {
    const response = await fetch(URL.get_all_appointments_of_clinic);
    const jsonData = await response.json();
    setData(jsonData);
  };
  console.log(store.getState());
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [90, 45, 28, 80, 99, 43],
      },
    ],
  };

  const [Appdata, setData] = useState([]);

  useEffect(() => {
    {
      fetchData();
    }
  }, [data.length]);
  const handleClinicSelection = clinic => {
    setSelectedClinic(clinic);
    handleChangeValue('clinic', clinic);
    ClinicRef?.current?.snapToIndex(0);
  };
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 24,
              paddingHorizontal: 8,
            }}>
            <View>
              <SvgXml xml={hattailogo} />
              <Text style={styles.title}>
                {Language[language]['welcome']},{Language[language]['dr']}
                RamaMurthi
              </Text>
            </View>
            <HeaderAvatar />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 8,
              paddingHorizontal: 8,
              paddingBottom: 8,
            }}>
            <ChartCard
              data={data}
              title={Language[language]['total_patient']}
            />
            <ChartCard
              data={data}
              title={Language[language]['earnings']}
              label="₹ "
            />
          </View>
          <View style={styles.select}>
          <SelectorBtn
                //label={Language[language]['clinic']}
                name="chevron-down"
                onPress={() => {
                  ClinicRef?.current?.snapToIndex(1);
                }}
                input={selectedClinic}
              />
          <SelectorBtn
            //label={Language[language]['dob']}
            name="calendar"
            onPress={() => setOpen('to')}
              input={formattedDate}
              style={styles.DOBselect}
          />
        <DatePicker
              modal
              open={open !== false}
              date={DOB}
              theme="auto"
              mode="date"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
            
            {/* <SearchBox label='Patient name/phone number' action={()=>console.log('clicked')}/> */}
          </View>
          <View style={styles.appointment}>
            <Text style={styles.h2}>{Language[language]['appointments']}</Text>
            {Appdata
              ? Appdata?.map((value, index) => {
                  return (
                    <AppointmentCard
                      key={index}
                      appointment={value}
                      openVisit={() => navigation.navigate('visit')}
                    />
                  );
                })
              : null}
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingHorizontal: 8,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('createslot')}
              style={{
                borderWidth: 0.5,
                borderRadius: 4,
                borderColor: CUSTOMCOLOR.primary,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}>
              <Text style={{color: CUSTOMCOLOR.primary}}>
                {Language[language]['view_more']}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingHorizontal: 8,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('aadharverify')}
              style={{
                borderWidth: 0.5,
                borderRadius: 4,
                borderColor: CUSTOMCOLOR.primary,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}>
              <Text style={{color: CUSTOMCOLOR.primary}}>
                {/* {Language[language]['view_more']} */}
                AbhaVerify
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomSheetView
              bottomSheetRef={ClinicRef}
              snapPoints={'50%'}>
                 <View style={styles.modalContainer}>
                  <Text
                    style={{
                      fontFamily: CUSTOMFONTFAMILY.heading,
                      fontSize: 18,
                      color: CUSTOMCOLOR.black,
                    }}>
                    {Language[language]['clinic']}
                  </Text>
                  {CONSTANTS.clinic.map((clinic, index) => (
                    <Pressable key={index} onPress={() => handleClinicSelection(clinic)}>
                      <Text style={styles.modalfields}>{clinic}</Text>
                    </Pressable>
                  ))}
                </View>

              </BottomSheetView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },

  title: {
    color: CUSTOMCOLOR.black,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },
  select: {
    gap: 8,
    paddingHorizontal: 8,
  },
  appointment: {
    gap: 2,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
  modalContainer: {
    height: 400,
    width: '100%',
    //justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: CUSTOMCOLOR.white,
    alignSelf: 'center',
    borderRadius: 10,
    padding: 16,
  },
  modalfields: {
    color: CUSTOMCOLOR.primary,
    fontSize: 14,
    fontWeight: 400,
    fontFamily: CUSTOMFONTFAMILY.body,
    padding: 4,
  },
  DOBselect: {
    width:"100%",
    gap: 8,
    //paddingHorizontal: 2,
  },
});
export default Dashboard;

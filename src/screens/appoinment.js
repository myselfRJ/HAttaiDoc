import React, {useEffect, useState,useRef} from 'react';
import {Text, View, StyleSheet,Pressable,Image} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import PlusButton from '../components/plusbtn';
import SelectionTab from '../components/selectiontab';
import SelectorBtn from '../components/selector';
import {AppointmentCard} from '../components';
import {URL} from '../utility/urls';
import {ScrollView} from 'react-native-gesture-handler';
import { Icon, InputText } from '../components';
import DatePicker from 'react-native-date-picker';
import BottomSheetView from '../components/bottomSheet';
import { CONSTANTS } from '../utility/constant';
import { CONSTANT } from '../utility/const';
import {
  ChartCard,
  HeaderAvatar,
} from '../components';


const Appointment = ({navigation}) => {
  const [name,setName]=useState('')
  const ClinicRef = useRef(null);
  const [selectedClinic, setSelectedClinic] = useState(CONSTANTS.clinic[0]);
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
  const handleClinicSelection = clinic => {
    setSelectedClinic(clinic);
    handleChangeValue('clinic', clinic);
    ClinicRef?.current?.snapToIndex(0);
  };
  const ChangeNameValue=(e)=>{
    setName(e);
  }
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await fetch(URL.get_all_appointments_of_clinic);
    const jsonData = await response.json();
    jsonData && setData(jsonData);
  };
  useEffect(() => {
    {
      fetchData();
    }
  }, []);
  return (
    <View style={styles.main}>
      <ScrollView>

      <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 24,
              paddingHorizontal: 8,
            }}>
            <View>
            <Image 
            style={{width:35,height:32}}
            source={require('../assets/images/logo.jpeg')}
            />
              <Text style={styles.title}>
                {Language[language]['welcome']},{Language[language]['dr']}
                RamaMurthi
              </Text>
            </View>
            <HeaderAvatar />
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
        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',bottom:24,width:'103%'}}>
            <InputText 
            placeholder='Search name'
            value={name}
            setValue={ChangeNameValue}
            textStyle={styles.input}
            keypad="numeric"
            />
            <Icon name='search' size={20} style={styles.searchIcon}/>
            </View>
      <View style={styles.tab}>
        <SelectionTab label="All" selected={true} />
        <SelectionTab label="New" />
        <SelectionTab label="Follow Up" />
        <SelectionTab label="Review Report" />
        <SelectionTab label="Routine" />
      </View>
      </View>
      <View style={styles.appointment}>
        <Text style={styles.h2}>Appointments</Text>

        {data.length > 0
          ? data?.map((value, index) => {
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

      <PlusButton
        icon="plus"
        style={{position: 'absolute', zIndex: 10, right: 24, bottom: 24}}
        onPress={() => navigation.navigate('addnew')}
      />
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
  main: {
    paddingHorizontal:24,
    paddingVertical:24
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
  tab: {
    bottom:16,
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 8,
  },
  appointment: {
    gap: 8,
    paddingHorizontal: 8,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
  },
  input:{
    gap:4,
    paddingVertical:16,
    left:4
    

},
searchIcon:{
  top:10,
    height:51,
    right:24,
    padding:16,
},
DOBselect: {
  width:"100%",
  gap: 8,
  //paddingHorizontal: 2,
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
});
export default Appointment;

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {useSelector, useDispatch} from 'react-redux';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {UpdateDoctorRefer, addDoctorRefer} from '../redux/features/prescription/prescriptionSlice';
import {useNavigation} from '@react-navigation/native';
import {HButton,PlusButton} from '../components';
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '../utility/scaleDimension';
import PrescriptionHead from '../components/prescriptionHead';
import { CONSTANTS } from '../utility/constant';
import ShowChip from '../components/showChip';


const ReferToDoctor = ()=>{
    const nav = useNavigation();
    const doctor = useSelector(state => state?.prescription?.selectedDoctor)
    
    const [selected,setSelected] = useState('')
    const [name,setName] = useState('')
    const [speciality,setSpeciality] = useState('')
    const [phone,setPhone] = useState('')
    const dispatch = useDispatch();
    const handleAddDoctors = ()=>{
            dispatch(addDoctorRefer([...doctor,{doctor_name:name,speciality:speciality,phone:phone}])) 
            setName('')
            setSpeciality('')
            setPhone('')
            setSelected('')       
    }
    const handleSelect = (val)=>{
        setName(val?.doctor_name);
        setSpeciality(val?.speciality)
        setPhone(val?.phone)
        setSelected(val);
    }
    const handleDelete = index => {
        if (doctor) {
          const updatedDoctor = doctor?.filter((item, ind) => ind !== index);
    
         dispatch(UpdateDoctorRefer(updatedDoctor));
        }
      };
      const onPress = () => {
        if (doctor.length > 0){
            nav.goBack();
        }
        else{
            Alert.alert('','Please add atleast one')
        }
        
      };
    return(
        <View style={styles.maincontnet}>
              {doctor?.map((item, ind) =>
        doctor.length > 0 ? (
          <ShowChip
            text={`Name: ${item?.doctor_name},  Speciality: ${item?.speciality},  Phone: ${item?.phone}`}
            onPress={() => handleDelete(ind)}
            ind={ind}
          />
        ) : null,
      )}
          <PrescriptionHead heading = 'Refer to Doctor'/>
          <View style={styles.container}>
          <Text style={styles.head}>Recommendation</Text>
          <View style={styles.child}>
          {CONSTANTS?.doctors.map((doctor, index) => (
           <TouchableOpacity
            style={[
                styles.suggestion,
                {
                  backgroundColor:
                    selected === doctor
                      ? CUSTOMCOLOR.primary
                      : CUSTOMCOLOR.white,
                },
              ]} onPress={()=>handleSelect(doctor)}>
                <Text
                style={[
                  styles.fields,
                  {
                    color:
                      selected === doctor
                        ? CUSTOMCOLOR.white
                        : CUSTOMCOLOR.primary,
                  },
                ]}>
                {doctor?.doctor_name}
              </Text>

            </TouchableOpacity>
            ))}
          </View>
          <View style={styles.selected}>
          <View style={{flexDirection: 'row', gap: moderateScale(10)}}>
              <TextInput
                placeholder="Name"
                style={styles.input}
                 value={name}
                onChangeText={val => setName(val)}
              />
              <TextInput
                placeholder="Speciality"
                style={styles.input}
                value={speciality}
                onChangeText={val => setSpeciality(val)}
              />
              <TextInput
                placeholder="Phone number"
                keyboardType="numeric"
                style={styles.input}
                value={phone}
                onChangeText={val => setPhone(val)}
              />
            </View>
          </View>
          </View>
          <View style={{marginTop: verticalScale(64),alignSelf:'flex-end'}}>
            <PlusButton
              icon="plus"
              size={moderateScale(24)}
             onPress={handleAddDoctors}
            />
          </View>
      <View style={{top: moderateScale(64), alignItems: 'center'}}>
        <HButton label={Language[language]['submit']} onPress={onPress}/>
      </View>
        </View>
    )
};
const styles = StyleSheet.create({
    main: {
      //width: horizontalScale(651),
      height: verticalScale(35),
      justifyContent: 'space-between',
      padding: moderateScale(8),
    },
    container: {
      width: horizontalScale(651),
      height: verticalScale(62),
      padding: moderateScale(8),
      gap: moderateScale(8),
    },
    head: {
      //width: horizontalScale(125),
      height: verticalScale(35),
      padding: moderateScale(8),
      gap: moderateScale(10),
      color: CUSTOMCOLOR.black,
      fontSize: moderateScale(14),
      fontWeight: 600,
      lineHeight: moderateScale(16.34),
      fontFamily: CUSTOMFONTFAMILY.body,
    },
    fields: {
      height: verticalScale(14),
      fontFamily: CUSTOMFONTFAMILY.opensans,
      fontSize: moderateScale(10),
      fontWeight: 400,
      lineHeight: moderateScale(13.62),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: horizontalScale(8),
      alignSelf: 'center',
    },
    input: {
      //width: horizontalScale(150),
      paddingHorizontal: horizontalScale(32),
      height: verticalScale(45),
      borderRadius: moderateScale(4),
      //padding: moderateScale(16),
      gap: moderateScale(8),
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: moderateScale(12),
      backgroundColor: CUSTOMCOLOR.white,
    },
    suggestion: {
      flex: 1,
      paddingHorizontal: horizontalScale(12),
      height: verticalScale(32),
      gap: moderateScale(4),
      borderRadius: moderateScale(4),
      alignItems: 'center',
      justifyContent: 'center',
    },
    maincontnet: {
      paddingHorizontal: horizontalScale(24),
      paddingVertical: verticalScale(24),
    },
    child: {
      //width: horizontalScale(323),
      height: verticalScale(30),
      padding: moderateScale(8),
      gap: moderateScale(16),
      flexDirection: 'row',
      paddingHorizontal: horizontalScale(8),
    },
    selected: {
      //width: horizontalScale(651),
      height: verticalScale(50),
      padding: moderateScale(8),
      marginTop: moderateScale(10),
      gap: moderateScale(10),
      flexDirection: 'row',
    },
  });
export default ReferToDoctor;
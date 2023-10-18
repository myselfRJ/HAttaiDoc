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
import {
  UpdateDoctorRefer,
  addDoctorRefer,
} from '../redux/features/prescription/prescriptionSlice';
import {useNavigation} from '@react-navigation/native';
import {HButton, InputText, PlusButton, SelectorBtn} from '../components';
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '../utility/scaleDimension';
import PrescriptionHead from '../components/prescriptionHead';
import {CONSTANTS} from '../utility/constant';
import ShowChip from '../components/showChip';

const ReferToDoctor = () => {
  const nav = useNavigation();
  const doctor = useSelector(state => state?.prescription?.selectedDoctor);
  console.log('=======>doc', doctor);

  const [selected, setSelected] = useState('');
  const [name, setName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [dr_name, setDr_Name] = useState('');
  const dispatch = useDispatch();
  const handleAddDoctors = () => {
    dispatch(
      addDoctorRefer([
        ...doctor,
        {
          refer_to: selected,
          dr_name: dr_name ? dr_name : null,
          doctor_name: name,
          speciality: speciality,
          phone: phone,
          notes: notes,
        },
      ]),
    );
    setName('');
    setSpeciality('');
    setPhone('');
    setSelected('');
    setNotes('');
  };
  const handleSelect = val => {
    setSelected(val);
  };
  const handleDelete = index => {
    if (doctor) {
      const updatedDoctor = doctor?.filter((item, ind) => ind !== index);

      dispatch(UpdateDoctorRefer(updatedDoctor));
    }
  };
  const onPress = () => {
    if (doctor?.length > 0) {
      nav.goBack();
    } else {
    }
  };
  return (
    <View style={styles.maincontnet}>
      <PrescriptionHead
        head={{padding: 0, paddingBottom: moderateScale(12)}}
        heading="Referral"
      />
      {doctor?.map((item, ind) =>
        doctor.length > 0 ? (
          <ShowChip
            text={`Refer To: ${item?.refer_to},Name:${item?.doctor_name} ${
              (item?.dr_name && `Dr.Name : `, item?.dr_name)
            } Speciality: ${item?.speciality},  Phone: ${item?.phone}`}
            onPress={() => handleDelete(ind)}
            key={ind}
          />
        ) : null,
      )}

      <View style={styles.container}>
        <Text style={styles.head}>Refer To </Text>
        <View style={styles.child}>
          {CONSTANTS?.ReferTypes.map((item, index) => (
            <SelectorBtn
              key={index}
              input={item}
              onPress={() => handleSelect(item)}
              select={{
                backgroundColor:
                  selected === item ? CUSTOMCOLOR.primary : CUSTOMCOLOR.white,
              }}
              inputstyle={{
                color:
                  selected === item ? CUSTOMCOLOR.white : CUSTOMCOLOR.primary,
              }}
            />
          ))}
        </View>
        <InputText
          label={selected === 'Doctor' ? 'Dr.Name' : 'Name'}
          placeholder={selected === 'Doctor' ? 'Dr.Name' : 'Name'}
          inputContainer={{paddingHorizontal: 0}}
          value={name}
          setValue={val => setName(val)}
        />
        {selected === 'Clinic' || selected === 'Hospital' ? (
          <InputText
            label={'Dr.Name'}
            placeholder="Dr.Name"
            inputContainer={{paddingHorizontal: 0}}
            value={dr_name}
            setValue={val => setDr_Name(val)}
          />
        ) : null}
        <InputText
          label={'Speciality'}
          placeholder="Speciality"
          value={speciality}
          inputContainer={{paddingHorizontal: 0}}
          setValue={val => setSpeciality(val)}
        />
        <InputText
          label={'Phone Number'}
          placeholder="Phone number"
          value={phone}
          inputContainer={{paddingHorizontal: 0}}
          setValue={val => setPhone(val)}
        />
        <InputText
          label={'Referal Notes'}
          placeholder="Referal Notes"
          multiline={true}
          value={notes}
          inputContainer={{paddingHorizontal: 0}}
          setValue={val => setNotes(val)}
          textStyle={{
            height: moderateScale(150),
            textAlignVertical: 'top',
            color: CUSTOMCOLOR.black,
            fontWeight: '700',
          }}
        />
      </View>
      <View style={{marginTop: verticalScale(64), alignSelf: 'flex-end'}}>
        <PlusButton
          icon="plus"
          size={moderateScale(24)}
          onPress={handleAddDoctors}
        />
      </View>
      <View style={{top: moderateScale(64), alignItems: 'center'}}>
        <HButton
          label={Language[language]['submit']}
          btnstyles={{
            backgroundColor:
              doctor?.length > 0 ? CUSTOMCOLOR.primary : CUSTOMCOLOR.disable,
          }}
          onPress={onPress}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    justifyContent: 'space-between',
    padding: moderateScale(8),
  },
  head: {
    color: CUSTOMCOLOR.black,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  fields: {
    height: verticalScale(14),
    fontFamily: CUSTOMFONTFAMILY.opensans,
    fontSize: moderateScale(16),

    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(8),
    alignSelf: 'center',
  },
  maincontnet: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
  },
  child: {
    gap: moderateScale(16),
    flexDirection: 'row',
  },
});
export default ReferToDoctor;

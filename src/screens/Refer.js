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
import {commonstyles} from '../styles/commonstyle';
import {ScrollView} from 'react-native-gesture-handler';
import GalleryModel from '../components/GalleryModal';

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
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);

  const handleAddDoctors = () => {
    selected && phone && name && speciality
      ? (dispatch(
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
        ),
        setName(''),
        setSpeciality(''),
        setPhone(''),
        setSelected(''),
        setNotes(''),
        setDr_Name(''))
      : null;
  };

  const handleSelect = val => {
    setSelected(val);
    setName('');
    setSpeciality('');
    setPhone('');
    // setSelected('');
    setNotes('');
    setDr_Name('');
  };
  const handleDelete = index => {
    if (doctor) {
      const updatedDoctor = doctor?.filter((item, ind) => ind !== index);

      dispatch(UpdateDoctorRefer(updatedDoctor));
    }
  };
  const onPress = () => {
    if (doctor?.length > 0) {
      // nav.goBack();
    } else {
      setModal(!modal);
    }
  };
  const HandlePress = val => {
    setSpeciality(val);
    setShow(!show);
  };

  return (
    <View style={styles.main}>
      <ScrollView>
        <PrescriptionHead head={{padding: 0}} heading="Referral" />
        {doctor?.map((item, ind) =>
          doctor.length > 0 ? (
            <ShowChip
              text={`Refer To: ${item?.refer_to},Name:${item?.doctor_name} ${
                item?.dr_name ? `Dr.Name : ${item?.dr_name}` : ''
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
            label={
              selected === 'Doctor'
                ? 'Dr.Name'
                : selected === 'Clinic'
                ? ' Clinic Name'
                : 'Hospital Name'
            }
            placeholder={
              selected === 'Doctor'
                ? 'Enter Dr.Name'
                : selected === 'Clinic'
                ? 'Enter Clinic Name'
                : 'Enter Hospital Name'
            }
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
          {/* <InputText
          label={'Speciality'}
          placeholder="Speciality"
          value={speciality}
          inputContainer={{paddingHorizontal: 0}}
          setValue={val => setSpeciality(val)}
        /> */}
          <SelectorBtn
            onPress={() => setShow(!show)}
            label={'Specialization'}
            input={
              speciality?.length > 0 ? speciality : 'Select Specialization'
            }
            name={'chevron-down'}
          />
          {show && (
            <View
              style={[
                styles.dropdownContainer,
                {
                  top:
                    selected === 'Clinic' || selected === 'Hospital'
                      ? verticalScale(404)
                      : verticalScale(310),
                },
              ]}>
              <ScrollView>
                {CONSTANTS?.speciality?.map((val, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.touch}
                    onPress={() => HandlePress(val)}>
                    <Text
                      style={{
                        fontSize: CUSTOMFONTSIZE.h3,
                        padding: moderateScale(10),
                        color: CUSTOMCOLOR.black,
                      }}
                      key={index}>
                      {val}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
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
          <HButton
            btnstyles={{
              backgroundColor:
                selected && name && speciality && phone
                  ? CUSTOMCOLOR.primary
                  : CUSTOMCOLOR.disable,
            }}
            icon="plus"
            label="Add"
            type="addtype"
            size={moderateScale(24)}
            onPress={handleAddDoctors}
          />
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: 'flex-end',
          // flex: 1,
        }}>
        <HButton
          label={'Share'}
          btnstyles={{
            ...commonstyles.activebtn,
            backgroundColor:
              doctor?.length > 0 ? CUSTOMCOLOR.primary : CUSTOMCOLOR.disable,
          }}
          onPress={onPress}
        />
      </View>
      {modal && (
        <GalleryModel
          visible={modal}
          Close={setModal}
          share={true}
          Label1={'Doctor'}
          Label2={'Patient'}
          IconName1={'doctor'}
          IconName2={'human-child'}
          // OnCamera={openCamera}
          // document={true}
          // onDocument={pickSingleFile}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  head: {
    color: CUSTOMCOLOR.black,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  container: {
    gap: verticalScale(16),
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
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(12),
    gap: verticalScale(16),
    flex: 1,
    backgroundColor: CUSTOMCOLOR.background,
  },
  child: {
    gap: moderateScale(16),
    flexDirection: 'row',
  },
  dropdownContainer: {
    position: 'absolute',
    zIndex: 10,
    left: 0,

    borderWidth: 1,
    width: '100%',
    height: verticalScale(400),
    backgroundColor: CUSTOMCOLOR.white,
  },
  touch: {
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
  },
});
export default ReferToDoctor;

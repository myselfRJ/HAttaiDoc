import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {InputText, HButton} from '../components';
import {commonstyles} from '../styles/commonstyle';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../utility/scaleDimension';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {useDispatch, useSelector} from 'react-redux';
import {addAdditionalNote} from '../redux/features/prescription/prescriptionSlice';
import {useNavigation} from '@react-navigation/native';
import {fetchApi} from '../api/fetchApi';
import {URL} from '../utility/urls';

const AdditionalNotes = ({navigation, route}) => {
  const token = useSelector(state => state.authenticate.auth.access);
  const {patient_phone} = route.params;
  const {phone} = useSelector(state => state?.phone?.data);
  const [additionalNote, setAdditionalNote] = useState([]);
  const [note, setNote] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigation();
  const Handlepress = () => {
    dispatch(addAdditionalNote(note));
    nav.goBack();
  };

  const GetNotes = async () => {
    const response = await fetchApi(URL.getNotes(phone, patient_phone), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      setAdditionalNote(jsonData?.data);
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    GetNotes();
  }, []);

  const NoteCard = ({date, notes}) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderRadius: moderateScale(8),
          gap: moderateScale(4),
          marginBottom: verticalScale(8),
        }}>
        <View
          style={{
            backgroundColor: CUSTOMCOLOR.borderColor,
            height: verticalScale(50),
            justifyContent: 'center',
            paddingHorizontal: horizontalScale(16),
            borderTopLeftRadius: moderateScale(8),
            borderTopRightRadius: moderateScale(8),
          }}>
          <Text
            style={{
              fontSize: CUSTOMFONTSIZE.h3,
              color: CUSTOMCOLOR.black,
              fontWeight: '600',
            }}>
            Date:{date}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: horizontalScale(16),
            paddingVertical: verticalScale(8),
          }}>
          <Text
            style={{
              fontSize: CUSTOMFONTSIZE.h3,
              color: CUSTOMCOLOR.black,
              fontWeight: '400',
            }}>
            {notes}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <InputText
        style={styles.notes}
        multiline={true}
        label={'Additional Recommendations/Notes'}
        placeholder="write your notes"
        value={note}
        setValue={setNote}
      />
      {additionalNote?.length > 0 && (
        <>
          <Text style={commonstyles.subhead}>Updated Notes</Text>
          <ScrollView contentContainerStyle={{height: '70%'}}>
            {additionalNote?.map(
              (item, ind) =>
                JSON.parse(item?.notes_message)['additional_notes'] !== '' && (
                  <NoteCard
                    key={ind}
                    date={item?.updated_at?.split('T')[0]}
                    notes={JSON.parse(item?.notes_message)['additional_notes']}
                  />
                ),
            )}
          </ScrollView>
        </>
      )}

      <View style={{justifyContent: 'flex-end', flex: 1}}>
        <HButton
          label={Language[language]['save']}
          onPress={Handlepress}
          btnstyles={commonstyles.activebtn}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(16),
    gap: verticalScale(16),
  },
  inputbox: {
    // flex:1,
    width: '100%',

    paddingHorizontal: horizontalScale(8),
    borderRadius: moderateScale(4),
  },
  notes: {
    borderRadius: moderateScale(4),
    padding: moderateScale(8),
    gap: moderateScale(10),
    backgroundColor: CUSTOMCOLOR.white,
  },
});
export default AdditionalNotes;

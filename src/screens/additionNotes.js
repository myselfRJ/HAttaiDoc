import React, { useState } from "react";
import {View,Text,StyleSheet} from 'react-native';
import { InputText,HButton } from "../components";
import { commonstyles } from "../styles/commonstyle";
import { CUSTOMCOLOR,CUSTOMFONTFAMILY,CUSTOMFONTSIZE } from "../settings/styles";
import { horizontalScale,verticalScale,moderateScale } from "../utility/scaleDimension";
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import { useDispatch, useSelector } from "react-redux";
import { addAdditionalNote } from "../redux/features/prescription/prescriptionSlice";
import { useNavigation } from "@react-navigation/native";
const AdditionalNotes =({navigation})=>{
    const [note,setNote] = useState('');
    const dispatch = useDispatch();
    const nav = useNavigation();
    const Handlepress=()=>{
        dispatch(addAdditionalNote(note));
        nav.goBack();
    }
    return(
        <View style={styles.main}>
          <InputText
            style={styles.notes}
            multiline={true}
            label={'Additional Recommendations/Notes'}
            placeholder="write your notes"
            value={note}
            setValue={setNote}
          />

        <View style={{justifyContent:'flex-end',flex:1}}>
          <HButton label={Language[language]['save']} 
          onPress={Handlepress} 
          btnstyles={commonstyles.activebtn}
          />
        </View>
      </View>
    )
};
const styles = StyleSheet.create({
    main:{
        flex:1,
        paddingHorizontal:horizontalScale(24),
        paddingVertical:verticalScale(16),
    },
    inputbox: {
        // flex:1,
        width: '100%',
      
        paddingHorizontal:horizontalScale(8),
        borderRadius:moderateScale(4)
      },
      notes: {
        borderRadius: moderateScale(4),
        padding: moderateScale(8),
        gap: moderateScale(10),
        backgroundColor: CUSTOMCOLOR.white,
      },
})
export default AdditionalNotes;
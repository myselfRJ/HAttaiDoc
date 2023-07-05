import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { CUSTOMCOLOR,CUSTOMFONTFAMILY,CUSTOMFONTSIZE } from '../settings/styles';
import ReferDoctorForm from '../components/refertodoctor';
import { Provider } from 'react-redux';
import store from '../redux/stores/store';
const  ReferDoctorScreen =()=>{
   
    const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handlePress = (doctor) => {
    setSelectedDoctor(doctor);
  };
  return (
      <Provider store={store}>
         <View>
          <ReferDoctorForm
            handlePress={handlePress}
          />
      </View>
      </Provider>
  );
};
const styles = StyleSheet.create({
    h2: {
        fontSize: 20,
        fontWeight: 700,
        fontFamily: CUSTOMFONTFAMILY.opensans,
        lineHeight: 20 * 2,
        color: CUSTOMCOLOR.black,
        padding: 10
    },
    main: {
        width: 651,
        height: 35,
        justifyContent: "space-between",
        padding: 8
    },
    title: {
        width: 104,
        height: 19,
        fontFamily: CUSTOMFONTFAMILY.opensans,
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 19.07,
        color: CUSTOMCOLOR.black
    },
    container: {
        width: 651,
        height: 62,
        padding: 8,
        gap: 8
    },
    head: {
        width: 125,
        height: 35,
        padding: 8,
        gap: 10,
        color: CUSTOMCOLOR.black,
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 16.34
    },
    fields: {
        width: 52,
        height: 14,
        fontFamily: CUSTOMFONTFAMILY.opensans,
        fontSize: 10,
        fontWeight: 400,
        lineHeight: 13.62,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        alignSelf: "center",
        color: CUSTOMCOLOR.primary,
    },
    input: {
        width: 150,
        height: 45,
        borderRadius: 4,
        padding: 16,
        gap: 8,
        //borderWidth: 0.5,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        backgroundColor:CUSTOMCOLOR.white
    },
    suggestion: {
        width: 100,
        height: 30,
        gap: 8,
        borderWidth: 1,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        //borderColor: CUSTOMCOLOR.primary
    },
    inputfields: {
        width: 34,
        height: 16,
        fontFamily: CUSTOMFONTFAMILY.opensans,
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 16.34
    }
})
export default ReferDoctorScreen;
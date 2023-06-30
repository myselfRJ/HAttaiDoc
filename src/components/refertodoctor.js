import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { CUSTOMCOLOR,CUSTOMFONTFAMILY,CUSTOMFONTSIZE } from '../settings/styles';

const Refer_Doctor = () => {
  const [data, setData] = useState([
    {
      name: 'Dr.Raju',
      speciality: 'Cardiologists',
      phone: '9878965678'
    },
    {
      name: 'Dr.Muthu',
      speciality: 'Cardiologists',
      phone: '9878965678'
    },
    {
      name: 'Dr.Chitti',
      speciality: 'Cardiologists',
      phone: '9878965678'
    }
  ]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handlePress = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleNameChange = (value) => {
    setSelectedDoctor((prevDoctor) => ({
      ...prevDoctor,
      name: value
    }));
  };

  const handleSpecialityChange = (value) => {
    setSelectedDoctor((prevDoctor) => ({
      ...prevDoctor,
      speciality: value
    }));
  };

  const handlePhoneChange = (value) => {
    setSelectedDoctor((prevDoctor) => ({
      ...prevDoctor,
      phone: value
    }));
  };

  return (
    <View>
      <Text style={styles.h2}>Consultation</Text>
      <View style={styles.main}>
        <Text style={styles.title}>Refer to Doctor</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.head}>Recommendation</Text>
        <View style={{ width: 323, height: 30, padding: 8, gap: 16, flexDirection: 'row' }}>
          {data.map((doctor, index) => (
            <TouchableOpacity
              style={[styles.suggestion, { borderColor: selectedDoctor === doctor ? 'green' : CUSTOMCOLOR.primary }]}
              key={index}
              onPress={() => handlePress(doctor)}
            >
              <Text style={styles.fields}>{doctor.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ width: 651, height: 50, padding: 8, marginTop: 10, gap: 10, flexDirection: 'row' }}>
          {selectedDoctor ? (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TextInput
                placeholder='Name'
                style={styles.input}
                value={selectedDoctor.name}
                onChangeText={handleNameChange}
              />
              <TextInput
                placeholder='Speciality'
                style={styles.input}
                value={selectedDoctor.speciality}
                onChangeText={handleSpecialityChange}
              />
              <TextInput
                placeholder='Phone number'
                keyboardType='numeric'
                style={styles.input}
                value={selectedDoctor.phone}
                onChangeText={handlePhoneChange}
              />
            </View>
          ) : (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TextInput placeholder='Name' style={styles.input} />
              <TextInput placeholder='Speciality' style={styles.input} />
              <TextInput placeholder='Phone number' keyboardType='numeric' style={styles.input} />
            </View>
          )}
        </View>
      </View>
    </View>
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
export default Refer_Doctor;

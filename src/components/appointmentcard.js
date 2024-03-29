import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
const AppointmentCard = ({appointment, openVisit}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.maincontainer}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          }}
        />
        <View style={styles.child}>
          <Text style={styles.name}>{appointment.patient.name}</Text>
          <Text style={styles.age}>
            {appointment.patient.age} | {appointment.patient.gender}
          </Text>
          <View style={styles.seperator}></View>
          <Text style={styles.symptom}>{appointment.complaint}</Text>
        </View>
        <View style={styles.hseperator}></View>
        <View style={styles.patientinfo}>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>
              {Language[language]['type']}:{appointment['appointment-type']}
            </Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>
              {Language[language]['time']}:{appointment.time}
            </Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>
              {Language[language]['status']}:{appointment.status}
            </Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>
              {Language[language]['bill']}:{appointment.bill}
            </Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
        </View>
        <Pressable
          style={styles.icon}
          onPress={() => {
            setVisible(!visible);
          }}>
          <View>
            <Icon
              name="dots-horizontal"
              color={CUSTOMCOLOR.primary}
              size={24}
            />
          </View>
          {visible && (
            <View style={[styles.option, {width: 100}]}>
              <View>
                <TouchableOpacity onPress={openVisit}>
                  <Text style={styles.contact1}>
                    {Language[language]['start_visit']}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.contact1}>
                    {Language[language]['reschedule']}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                  }}>
                  <Text style={styles.contact1}>
                    {Language[language]['cancel']}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
         </Pressable>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 12,
    fontSize: CUSTOMFONTSIZE.h3,
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: 4,
    gap: 8,
  },
  child: {
    width: '40%',
  },
  name: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 19,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  age: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 19,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  gender: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 19,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  symptom: {
    flexWrap: 'wrap',
    fontWeight: 600,
    fontSize: CUSTOMFONTSIZE.h5,
    lineHeight: 1.5 * CUSTOMFONTSIZE.h5,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  img: {
    width: 96,
    height: 96,
    borderRadius: 96 / 2,
  },
  patientinfo: {
    gap: 4,
  },
  icon: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 10,
  },
  option: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  seperator: {
    height: 0.5,
    margin: 8,
    backgroundColor: '#f3f4f3',
  },
  hseperator: {
    height: '100%',
    width: 0.5,
    margin: 8,
    backgroundColor: '#f3f4f3',
  },
  statusinfo: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'space-between',
  },
  statustext: {
    textAlign: 'right',
    fontWeight: '600',
  },
  contact: {
    height: 25,
    width: 150,
  },
  contact1: {
    height: 25,
    width: 150,
  },
  modal: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 10,
  },
});

export default AppointmentCard;
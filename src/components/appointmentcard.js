import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
const AppointmentCard = ({appointment}) => {
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
          <Text style={styles.age}>{appointment.patient.age}</Text>
          <Text style={styles.gender}>{appointment.patient.gender}</Text>
          <View style={styles.seperator}></View>
          <Text style={styles.symptom}>
            {appointment.complaint}
          </Text>
        </View>
        <View style={styles.hseperator}></View>
        <View style={styles.patientinfo}>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>{Language[language]['type']}:{appointment['appointment-type']}</Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>{Language[language]['time']}:{appointment.time}</Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>{Language[language]['status']}:{appointment.status}</Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
          <View style={styles.statusinfo}>
            <Text style={styles.contact}>{Language[language]['bill']}:{appointment.bill}</Text>
            <Text style={styles.statustext}>Follow Up</Text>
          </View>
        </View>
        <Pressable
          style={styles.icon}
          onPress={() => {
            setVisible(!visible);
          }}>
          <Icon name="dots-horizontal" color={CUSTOMCOLOR.primary} size={24} />
          {visible && (
            <View
              style={[styles.option, {width: 100}]}
              onPress={() => console.log('hi')}>
              <TouchableOpacity>
                <Text>Start visit</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Cancel</Text>
              </TouchableOpacity>
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
});

export default AppointmentCard;
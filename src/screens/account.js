import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Account = () => {
  return (
    <View>
      <View style={styles.MainHeadContainer}>
        <Text style={styles.MainText}>Account and Settings</Text>
        <Icon
          name="bell"
          size={24}
          color={'#fff'}
          style={{top: 43, right: 37}}
        />
      </View>
      <View style={{top: 40, left: 49}}>
        <Text style={styles.PersonalInf}>Personal Information</Text>
        <View style={styles.pI}>
          <Image
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
            style={{height: 70, width: 70, borderRadius: 100}}
          />
          <View
            style={{
              left: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '87%',
            }}>
            <View>
              <Text style={{fontSize: 16}}>Muthu Ganesh</Text>
              <Text style={{fontSize: 12}}>Age:68 | Male</Text>
              <Text>DOB: 01-01-2023</Text>
            </View>
            <TouchableOpacity>
              <View style={styles.editBtn}>
                <Icon name="pen" size={16} color={'#4ba5fa'} />
                <Text style={{color: '#4ba5fa'}}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{top: 80, left: 47}}>
        <Text style={styles.Professional}>Professional</Text>
        <View style={styles.ProfView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <View style={{flexDirection: 'row', padding: 8, gap: 8}}>
                <Icon
                  name="google-circles-communities"
                  size={16}
                  color={'#4ba5fa'}
                />
                <Text style={{fontWeight: 600}}>Registration Council</Text>
                <Text>Medical Registration</Text>
              </View>
              <View style={{flexDirection: 'row', padding: 8, gap: 8}}>
                <Icon name="medical-bag" size={16} color={'#4ba5fa'} />
                <Text style={{fontWeight: 600}}>Medical Number</Text>
                <Text>89562637542892929</Text>
              </View>
            </View>
            <TouchableOpacity>
              <View style={styles.editBtn}>
                <Icon name="pen" size={16} color={'#4ba5fa'} />
                <Text style={{color: '#4ba5fa'}}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.HPID}>
        <Text style={styles.HPIDText}>Healthcare Professional ID</Text>
        <Text style={styles.HPIDcontent}>
          The Healthcare Professional ID allows healthcare profession to connect
          to India's digital health ecosystem and access a host of service
          through the Healthcare Professional Registry.
        </Text>
        <TouchableOpacity>
          <View style={styles.generateBtn}>
            <Text style={{color: '#4ba5fa'}}>Generate Via Aadhar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{top: 140, left: 47}}>
        <Text style={styles.manageText}>Manage</Text>
        <View style={styles.manageView}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <View style={{flexDirection: 'row', padding: 8, gap: 8}}>
                <Icon name="hospital" size={16} color={'#4ba5fa'} />
                <Text style={{fontWeight: 600}}>Clinics</Text>
                <Text>Medical Registration Council</Text>
              </View>
              <View style={{flexDirection: 'row', padding: 8, gap: 8}}>
                <Icon name="account-group" size={16} color={'#4ba5fa'} />
                <Text style={{fontWeight: 600}}>Staff</Text>
                <Text>Medical Number</Text>
              </View>
            </View>
            <TouchableOpacity>
              <View style={styles.editBtn}>
                <Icon name="plus" size={16} color={'#4ba5fa'} />
                <Text style={{color: '#4ba5fa'}}>Add</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainHeadContainer: {
    width: '100%',
    height: 88,
    backgroundColor: '#4ba5fa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  MainText: {
    color: '#fff',
    top: 43,
    left: 37,
    gap: 33,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21.79,
  },
  PersonalInf: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 27.4,
    bottom: 8,
  },
  pI: {
    width: 650,
    Top: 32,
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  editBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: '#E3E3E3',
    right: 8,
  },
  Professional: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 27.4,
    bottom: 8,
  },
  ProfView: {
    width: 650,
    Top: 32,
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  HPID: {
    width: 650,
    top: 120,
    left: 47,
    padding: 16,
    borderRadius: 8,
    gap: 8,
    backgroundColor: '#4ba5fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HPIDText: {
    padding: 8,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 27.24,
    color: 'black',
  },
  HPIDcontent: {
    gap: 8,
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 24,
    color: '#fff',
  },
  generateBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    top: 10,
  },
  manageText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 27.4,
    bottom: 8,
  },
  manageView: {
    width: 650,
    Top: 32,
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default Account;

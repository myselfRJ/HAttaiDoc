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
      <View
        style={{
          width: '100%',
          height: 88,
          backgroundColor: '#4ba5fa',
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}>
        <Text
          style={{
            color: '#fff',
            top: 43,
            left: 37,
            gap: 33,
            fontWeight: '600',
            fontSize: 16,
            lineHeight: 21.79,
          }}>
          Account and Settings
        </Text>
        <Icon
          name="bell"
          size={24}
          color={'#fff'}
          style={{top: 43, right: 37}}
        />
      </View>
      <View style={{top: 40, left: 49}}>
        <Text
          style={{
            color: '#000000',
            fontWeight: '700',
            fontSize: 20,
            lineHeight: 27.4,
          }}>
          Personal Information
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '87%',
            top: 10,
            left: 2,
            borderRadius: 8,
            padding: 10,
          }}>
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
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  gap: 8,
                  borderRadius: 8,
                  flexDirection: 'row',
                  backgroundColor: '#E3E3E3',
                }}>
                <Icon name="pen" size={16} color={'#4ba5fa'} />
                <Text style={{color: '#4ba5fa'}}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{top: 80, left: 47}}>
        <Text
          style={{
            color: '#000000',
            fontWeight: '700',
            fontSize: 20,
            lineHeight: 27.4,
            bottom: 8,
          }}>
          Professional
        </Text>
        <View
          style={{
            width: 650,
            Top: 32,
            borderRadius: 8,
            justifyContent: 'space-between',
            padding: 16,
            backgroundColor: '#fff',
          }}>
          <View></View>
        </View>
      </View>
    </View>
  );
};

export default Account;

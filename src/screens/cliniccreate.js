import {StyleSheet, Text, View} from 'react-native';
import {
  HButton,
  InfoChip,
  InputText,
  Keyboardhidecontainer,
  PlusButton,
  BottomSheetView,
} from '../components';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {commonstyles} from '../styles/commonstyle';
import {useState, useRef, useEffect} from 'react';
import StatusMessage from '../components/statusMessage';

const ClinicCreate = ({navigation}) => {
  return (
    <Keyboardhidecontainer>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.leftchild}>
          <View style={styles.alignchild}>
            <Text style={commonstyles.h1}>Add Clinics</Text>
          </View>
          <InputText label="Clinic" placeholder="Clinic" />
          <InputText label="Address" placeholder="Address" />
          <View style={styles.alignchild}>
            <Text style={styles.labeltext}>Schedule</Text>
            <HButton
              icon="plus"
              label="Schedule"
              onPress={() => navigation.navigate('createslot')}
            />
          </View>
          <InputText label="Fees" placeholder="Clinic Fees" />
          <InputText label="Speciality" placeholder="Speciliality" />
          <HButton
            label="login"
            onPress={() => {
              navigation.navigate('usercreate');
            }}
          />
        </View>
        <View style={styles.rightchild}>
          <Text>Added Clinic</Text>
          <InfoChip />
        </View>
        <PlusButton
          icon="forward"
          style={{position: 'absolute', right: 64, bottom: 96}}
          onPress={() => navigation.navigate('usercreate')}
        />
      </View>
    </Keyboardhidecontainer>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
  },
  leftchild: {
    flex: 3,

    alignItems: 'center',
    gap: 8,
    paddingLeft: 24,
  },
  rightchild: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 256,
    gap: 8,
  },
  radiogroup: {
    padding: 16,
    flexDirection: 'row',
    gap: 48,
    justifyContent: 'flex-start',
  },
  alignchild: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: 8,
    paddingHorizontal: 8,
  },
  labeltext: {
    fontWeight: '500',
    fontSize: CUSTOMFONTSIZE.h4,
    color: CUSTOMCOLOR.black,
    fontFamily: CUSTOMFONTFAMILY.opensans,
  },
});

export default ClinicCreate;

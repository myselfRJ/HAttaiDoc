import {View, Text, StyleSheet} from 'react-native';
import {CUSTOMFONTSIZE} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {commonstyles} from '../styles/commonstyle';
import Keyboardhidecontainer from '../components/keyboardhidecontainer';
import InputText from '../components/inputext';
import HButton from '../components/button';
import PlusButton from '../components/plusbtn';
import InfoChip from '../components/infochip';
const UserCreate = ({navigation}) => {
  return (
    <Keyboardhidecontainer>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.leftchild}>
          <View style={styles.alignchild}>
            <Text style={commonstyles.h1}>Add User</Text>
          </View>
          <InputText label="Name" placeholder="Full Name" />
          <InputText label="Address" placeholder="Address" />
          <InputText label="Phone" placeholder="+9196754438" />
          <InputText label="Role" placeholder="Receptionist" />
          <InputText label="GovID" placeholder="eg:Aadhar Number" />
          <HButton
            icon="plus"
            label="Add User"
            onPress={() => navigation.navigate('cliniccreate')}
          />
        </View>
        <View style={styles.rightchild}>
          <Text>Added User</Text>
          <InfoChip />
        </View>
        <PlusButton
          icon="check"
          style={{position: 'absolute', right: 64, bottom: 96}}
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
    paddingHorizontal: 8,
  },
});

export default UserCreate;

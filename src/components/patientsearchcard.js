import { View, StyleSheet, Text, Image, Pressable, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
const PatientSearchCard = props => {
  const [visible, setVisible] = useState(false);
  //const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <View style={styles.main}>
        <Image
          style={styles.img}
          source={{
            uri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          }}
        />
        <View style={styles.patientinfo}>
          <Text style={styles.name}>Malumalayi</Text>
          <Text style={styles.age}>Malumalayi</Text>
          <Text style={styles.contact}>
            {Language[language]['contact']}: 989787654
          </Text>
        </View>
        <Pressable
          style={styles.icon}
          onPress={() => {
            setVisible(true)
          }}>
          <View>
            <Icon
              style={styles.icon}
              name="dots-horizontal"
              color={CUSTOMCOLOR.primary}
              size={24}
            />
          </View>
        </Pressable>
        {visible && (
          <View
            style={[styles.option, { width: 100 }]}
            onPress={() => console.log('en')}>
            {/*<View>
              <TouchableOpacity>
                <Text>{Language[language]['update']}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>{Language[language]['delete']}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setVisible(false);
              }}>
                <Text>
                  {Language[language]['cancel']}
                </Text>
              </TouchableOpacity>
            </View>
            </View>*/}

            <Modal
              animationType='slide'
              transparent={true}
              visible={visible}
              onRequestClose={() => {
                setVisible(!visible)
              }}>
              <View style={styles.bottomView}>
                <View style={styles.modalView}>
                  <TouchableOpacity>
                    <Text style={styles.content}>{Language[language]['update']}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.content}>{Language[language]['delete']}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setVisible(false);
                  }}>
                    <Text style={styles.content}>
                      {Language[language]['cancel']}
                    </Text>
                  </TouchableOpacity>

                </View>
              </View>
            </Modal>
          </View>
        )}   
      </View>

    </>
  );
};
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 12,
    fontSize: CUSTOMFONTSIZE.h3,
    backgroundColor: CUSTOMCOLOR.white,
    borderRadius: 4,
    gap: 8,
  },
  name: {
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 20,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  age: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 20,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  contact: {
    fontWeight: 600,
    fontSize: 10,
    lineHeight: 12.5,
    padding: 0,
    color: CUSTOMCOLOR.black,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  patientinfo: {},
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
  bottomView: {
    width: "100%",
    height: 500,
    marginTop: 900,
  },
  modalView: {
    height: 250,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#00BFFF",
    shadowColor: '#ffff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  content: {
    fontSize: 20,
    color: "black",
    padding: 8,
    marginTop: 5

  }
});

export default PatientSearchCard;

import {useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';

const GalleryModel = props => {
  const [modalVisible, setModalVisible] = useState(props.condition);
  return (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={{backgroundColor: '#4ba5fa', justifyContent: 'flex-end'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity onPress={props.OnGallery}>
            <Text>GALLERY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.OnCamera}>
            <Text>CAMERA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GalleryModel;

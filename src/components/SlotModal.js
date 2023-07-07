import {Modal, View, Text, TouchableOpacity} from 'react-native';

const SlotModal = props => {
  const handleValueSelect = value => {
    if (props.onValueSelect) {
      props.onValueSelect(value);
    } else {
      null;
    }
  };

  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      transparent={true}
      onRequestClose={props.onRequestClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            padding: 10,
          }}>
          {props.data
            ? props.data.map((value, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleValueSelect(value)}>
                    <Text style={{padding: 10}}>{value}</Text>
                  </TouchableOpacity>
                );
              })
            : null}
        </View>
      </View>
    </Modal>
  );
};

export default SlotModal;

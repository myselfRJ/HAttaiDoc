import React from 'react';
import {
  TextInput,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';

function MultiUserSelect(props) {
  //props-> label, multiple selection user list, keyboard, icon name, icon/enter action
  // const { label, userList, icon, action } = props;
  const [text, setText] = React.useState('');
  const onClearText = () => {
    setText('');
  };
  const onSubmitText = () => {
    props.action();
  };
  const renderChip = item => {
    // console.log('स्वागत');
    return (
      <View style={styles.chip}>
        <Text style={styles.chip_text}>{item.item}</Text>
        <Pressable style={styles.chip_close} onPress={props.action}></Pressable>
      </View>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <TextInput
          placeholderTextColor={CUSTOMCOLOR.disable}
          style={styles.leftItem}
          onChangeText={setText}
          value={text}
          placeholder={props.label}
          inputMode={props.keyboard}
          onSubmitEditing={onSubmitText}
        />
        <View style={styles.row}>
          {text !== '' ? (
            <Pressable
              style={styles.rightItem}
              onPress={onClearText}></Pressable>
          ) : (
            <></>
          )}
          <Pressable
            style={styles.rightItem}
            onPress={onSubmitText}></Pressable>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={props.userList}
          renderItem={item => renderChip(item)}
          horizontal={true}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  leftItem: {
    height: 19,
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h3,
    lineHeight: 19,
    alignItems: 'center',
    color: '#343434',
    outlineStyle: 'none',
  },
  rightItem: {
    width: 24,
    height: 24,
    backgroundColor: CUSTOMCOLOR.background,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    marginHorizontal: 5,
  },
  chip_close: {
    height: 12,
    width: 12,
    marginHorizontal: 5,
    backgroundColor: CUSTOMCOLOR.background,
  },
  chip_text: {
    height: 19,
    fontFamily: CUSTOMFONTFAMILY.heading,
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: CUSTOMFONTSIZE.h3,
    lineHeight: 19,
    alignItems: 'center',
    color: '#343434',
    outlineStyle: 'none',
    marginHorizontal: 5,
  },
});

export default MultiUserSelect;

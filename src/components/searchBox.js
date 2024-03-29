import React from 'react';
import {TextInput, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';

const SearchBox = props => {
  //props-> label, keyboard, icon name, icon/enter action
  // const { label, icon, action } = props;
  const [text, setText] = React.useState('');
  const onClearText = () => {
    setText('');
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.leftItem}
        onChangeText={setText}
        value={text}
        placeholder={props.label}
        inputMode={props.keyboard}
        onSubmitEditing={props.action}
      />
      <View style={styles.row}>
        {text !== '' ? (
          <Pressable style={styles.rightItem} onPress={onClearText}>
            <Icon name="magnify" size={24} color={CUSTOMCOLOR.primary} />
          </Pressable>
        ) : (
          <></>
        )}
        <Pressable style={styles.rightItem} onPress={props.action}>
          <Icon name="cross" size={24} color={CUSTOMCOLOR.primary} />
        </Pressable>
      </View>
    </View>
  );
};

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
    // outlinedStyle: "none"
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
});

export default SearchBox;

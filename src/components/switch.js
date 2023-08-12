import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';

const ToggleSwitch = props => {
  return (
   
      <Switch
        trackColor={{false: '#767577', true: '#767577'}}
        thumbColor={props.value ? '#4ba5fa' : '#000000aa'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.onValueChange}
        value={props.value}
      />
  
  );
};

const styles = StyleSheet.create({
  container: {
    padding:16
  },
});

export default ToggleSwitch;

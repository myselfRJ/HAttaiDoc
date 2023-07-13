import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
const InitScreen = () => {
  return (
    <View style={styles.main}>
      <Text>Hello</Text>
      <Image
        style={{width: 200, height: 200}}
        source={{
          uri: 'https://www.freepik.com/free-vector/colorful-bird-illustration-gradient_31530356.htm#query=logo%20png&position=0&from_view=keyword&track=ais',
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default InitScreen;

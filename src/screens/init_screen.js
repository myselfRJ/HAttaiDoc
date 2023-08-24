import {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {CUSTOMCOLOR, CUSTOMFONTFAMILY} from '../settings/styles';
import {Language} from '../settings/customlanguage';
import {language} from '../settings/userpreferences';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import {useSelector} from 'react-redux';
import {State} from 'react-native-gesture-handler';
import Logo from '../components/logo';
const InitScreen = ({navigation}) => {
  const token = useSelector(state => state.authenticate.auth.access);

  console.log('====================================');
  console.log('token', token);
  console.log('====================================');
  const [data, setData] = useState();

  const prevScrn = 'undefined';
  const fetchData = async () => {
    const response = await fetch(URL.getInitScreen, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const jsonData = await response.json();
    if (jsonData) {
      navigation.navigate(jsonData.data.lastscreen, {prevScrn});
    }
  };
  useEffect(() => {
    {
      fetchData();
    }
  }, []);
  return (
    <View style={styles.main}>
      <Logo imgstyle={{width: 201, height: 210}} />
      <Text style={styles.text}>{Language[language]['wait']}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CUSTOMCOLOR.white,
    padding: 8,
  },
  text: {
    fontFamily: CUSTOMFONTFAMILY.opansans,
    color: CUSTOMCOLOR.black,
    fontWeight: 600,
    fontSize: 24,
  },
});
export default InitScreen;

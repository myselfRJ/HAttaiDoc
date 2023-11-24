import {Alert} from 'react-native';
import {fetchApi} from '../api/fetchApi';
import {URL} from './urls';

const token =
  'AAAAz5ihZ2k:APA91bHjASxPwGM8B4Wm65D571YUt0IzsEgXHLPSNLu_GeDxK1Ni-NYc13puVhbFdf-GyN_87T8D7VJx1q2kYN02KTexaCbCSRYfRBVtplshylUcZVT69-6nJqV6jRT_pywtXuqkst6l';

const sendNotification = async (fcmTokens, body, title) => {
  const NotificationDetails = {
    data: {},
    notification: {
      body: body,
      title: title,
    },
    registration_ids: fcmTokens,
  };
  console.log(body, title);
  try {
    const response = await fetchApi(URL.sendNotification, {
      method: 'POST',
      headers: {
        Prefer: '',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(NotificationDetails),
    });
    // console.log(NotificationDetails);
    if (response.ok) {
      const jsonData = await response.json();
      if (jsonData) {
        console.log(jsonData);
        Alert.alert('success', 'Succesfully sent');
      } else {
        Alert.alert('Warn', 'Try After sometime');
        console.error('API call failed:', response.status, response);
      }
    }
  } catch (error) {
    console.error('Error occurred:', error);
    Alert.alert('Error', 'Try After sometime');
  }
};

export default sendNotification;

import {Alert} from 'react-native';
import {fetchApi} from '../api/fetchApi';
import {URL} from './urls';
import {useSelector} from 'react-redux';
import {showToast} from './const';

const sendNotification = async (
  token,
  fcmTokens,
  body,
  data_notification,
  screen,
) => {
  const NotificationDetails = {
    data: {
      screen: screen,
    },
    notification: {
      body: body,
      title: 'Alert from Doctor',
    },
    registration_ids: fcmTokens,
  };
  const savingNotification = {
    message: body,
    notification_data: screen,
    user_phone_number: data_notification?.user_phone,
    clinic_id: data_notification?.Clinic_id,
    doctor_phone_number: data_notification?.doc_phone,
    patient_phone_number: data_notification?.patient_phone,
    appointment_id: data_notification?.appointment_id,
  };
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
      showToast('success', 'Succesfully sent');
      if (data_notification) {
        try {
          const savingNotificationdata = await fetchApi(URL.saveNotifications, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${data_notification?.Logintoken}`,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(savingNotification),
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        showToast('error', 'Try After sometime');
        console.error('API call failed:', response.status, response);
      }
    }
  } catch (error) {
    // console.error('Error occurred:', error);
    showToast('error', 'Try After sometime');
  }
};

export default sendNotification;

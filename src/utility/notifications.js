import {Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {fetchApi} from '../api/fetchApi';
import {URL} from './urls';

const token =
  'AAAA31UkYUo:APA91bHiXt63mMSGERo0sFpkMM1P4m8wXSRaJdnZnomMpLiRLyZpc8jdIs9HWxRfvovassPMWRzCmICnHsOK-H-lV8F8xIz0DR9fSIZpIC2Un9LYm2GrMqWLZG_WWBIq1euaJYRScUtu';

const sendNotification = async (fcmTokens, body, title) => {
  const NotificationDetails = {
    data: {},
    notification: {
      body: body,
      title: title,
    },
    to: fcmTokens,
  };
  try {
    const response = await fetchApi(URL.sendNotification, {
      method: 'POST',
      headers: {
        Prefer: '',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json, application/xml',
      },
      body: JSON.stringify(NotificationDetails),
    });
    if (response.ok) {
      const jsonData = await response.json();
      if (jsonData) {
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

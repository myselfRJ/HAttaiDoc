import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from '../redux/stores/store';
import ComplaintsCard from '../components/complaints';

const CheifComplaints = () => {
  const data = ['suggestion1', 'suggestion2', 'suggestion3', 'suggestion4', 'suggestion5'];

  return (
    <Provider store={store}>
      <View>
        <ComplaintsCard cheifcomplaints={data} />
      </View>
    </Provider>
  );
};

export default CheifComplaints;

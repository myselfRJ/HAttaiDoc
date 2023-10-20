import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import store from '../redux/stores/store';
import ComplaintsCard from '../components/complaints';

const CheifComplaints = ({route}) => {
  const data = [
    'suggestion1',
    'suggestion2',
    'suggestion3',
    'suggestion4',
    'suggestion5',
  ];
  const {complaint} = route.params;
  console.log('com====', complaint);
  return (
    <Provider store={store}>
     
        <ComplaintsCard cheifcomplaints={data} complaint={complaint} />
      
    </Provider>
  );
};

export default CheifComplaints;

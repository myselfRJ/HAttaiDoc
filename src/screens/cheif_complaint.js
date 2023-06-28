import {Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import {useState,useEffect} from 'react';
import SelectorBtn from '../components/selector';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import ComplaintsCard from '../components/complaints';

const CheifComplaints=()=>{
    const [data,setData]=useState(['suggestion1','suggestion2','suggestion3','suggestion4','suggestion5'])
    return(
      <View>
        <ComplaintsCard  complaints={data}/>
      </View>  
    );
}

export default CheifComplaints;
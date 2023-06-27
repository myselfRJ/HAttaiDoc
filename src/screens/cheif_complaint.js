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
        <ComplaintsCard complaints={data}/>
      </View>  
    );
}
const styles=StyleSheet.create({
    main: {
        padding: 24,
        gap: 16,
      },
    h2: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily: CUSTOMFONTFAMILY.opensans,
        lineHeight: 20 * 2,
        color: CUSTOMCOLOR.black,
        padding:24
      },
})
export default CheifComplaints;
import React, {useEffect,useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  UpadateCheifComplaint,
  addCheifComplaint,
} from '../redux/features/prescription/prescriptionSlice';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import {useNavigation} from '@react-navigation/native';
import HButton from '../components/button';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
import PrescriptionHead from './prescriptionHead';
import InputText from './inputext';
import { URL } from '../utility/urls';
import { fetchApi } from '../api/fetchApi';
import { ScrollView } from 'react-native-gesture-handler';
const ComplaintsCard = props => {
  // const {complaint} = route.params
  // console.log('com1111====',complaint)
  const option = 'finding'
  const [data,setData] = useState([]);
  const [filtered,setFilteredData] = useState([]);
  const [selected,setSelected]= useState('');
  const selectedComplaint = useSelector(
    state => state.prescription.selectedComplaint,
  );
  const nav = useNavigation();
  const dispatch = useDispatch();
  const complaint = props.complaint;

  // useEffect(() => {
  //   dispatch(UpadateCheifComplaint(complaint));
  // }, []);

  const handlePress = suggestion => {
    // const update = [...complaint, suggestion];
    // dispatch(addCheifComplaint(JSON.stringify(update)));
    dispatch(addCheifComplaint(suggestion));
  };
  const onPress = () => {
    nav.goBack();
  };
  const fetchComplaints = async () => {
    const response = await fetchApi(URL.snomed(selectedComplaint,option), {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      // console.log('complaints====>',jsonData)
      setData(jsonData);
      // dispatch(addDoctor_profile.addDoctor_profile(jsonData?.data));
    } else {
      console.error('API call failed:', response.status, response);
    }
  };
  useEffect(() => {
    fetchComplaints();
  }, [selectedComplaint,option]);

  useEffect(() => {
    if (selectedComplaint) {
      const filtered = data?.filter(
        item =>
          item?.term &&
          item?.term.toLowerCase().startsWith(selectedComplaint.toLowerCase()),
      );
      setFilteredData([...filtered,{term:selectedComplaint}]);
    } else {
      setFilteredData(data);
    }
  }, [data, selectedComplaint]);
  const HandlePress=(value)=>{
    dispatch(addCheifComplaint(value));
     setSelected(value)
    //  dispatch(addDiagnosis([...prev, {diagnosis: value}]));
    //  setValue('')
  }

const [show,setShow] = useState(false)

  return (
    <View style={styles.main}>
      <PrescriptionHead heading='Reason for Visit' />
      {/* <TextInput
        style={styles.input}
        placeholder="write complaints"
        multiline={true}
        value={selectedComplaint}
        onChangeText={text => {
          dispatch(addCheifComplaint(text));
        }}
      /> */}
      <View style={{gap:moderateScale(0)}}>
       <InputText
      inputContainer={styles.inputtext}
        // label="Diagnosis"
        placeholder="Enter complaints"
        multiline={true}
        value={selectedComplaint}
        setValue={text => {
          dispatch(addCheifComplaint(text));
        }}
        search={true}
        IconName={(show  && filtered.length>0 || selectedComplaint === selected || selectedComplaint.length===0) ? 'magnify': 'close'}
        onPress={()=>setShow(!show)}
      />
      {selectedComplaint.length>=4 && (
      (selectedComplaint === selected || show )? null : (       <View style={styles.dropdownContainer}>
        <ScrollView>
        {filtered?.map((val,index)=>(
         <TouchableOpacity style={styles.touch} onPress={()=>HandlePress(val?.term)}>
           <Text style={{fontSize:CUSTOMFONTSIZE.h3,padding:moderateScale(10),color:CUSTOMCOLOR.black}} key={index}>
            {val.term}
           </Text>
           </TouchableOpacity>
           ))}
        </ScrollView>
      </View>)
     )}
     </View>
      <View>
        <Text style={styles.h3}>{Language[language]['suggestions']}</Text>
        <View style={styles.sugg}>
          {props.cheifcomplaints.map((value, index) => (
            <TouchableOpacity
              style={[
                styles.sugbtn,
                {
                  backgroundColor:
                    selectedComplaint === value
                      ? CUSTOMCOLOR.primary
                      : CUSTOMCOLOR.white,
                },
              ]}
              key={index}
              onPress={() => handlePress(value)}>
              <View>
                <Text
                  style={[
                    styles.sugText,
                    {
                      color:
                        selectedComplaint === value
                          ? CUSTOMCOLOR.white
                          : CUSTOMCOLOR.primary,
                    },
                  ]}>
                  {value}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{alignItems: 'center', padding: moderateScale(16)}}>
        <HButton label={Language[language]['save']} onPress={onPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(24),
  },
  h3: {
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: '600',
    fontFamily: CUSTOMFONTFAMILY.opensans,
    lineHeight: 20 * 2,
    color: CUSTOMCOLOR.black,
    paddingHorizontal: horizontalScale(8),
  },
  input: {
    paddingHorizontal: horizontalScale(8),
    borderRadius: moderateScale(4),
    fontSize: moderateScale(12),
    backgroundColor: CUSTOMCOLOR.white,
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  sugg: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sugText: {
    color: CUSTOMCOLOR.primary,
    fontSize: CUSTOMFONTSIZE.h4,
    fontWeight: 400,
    alignItems: 'center',
    fontFamily: CUSTOMFONTFAMILY.body,
  },
  sugbtn: {
    borderRadius: moderateScale(8),
    padding: moderateScale(5),
    height: verticalScale(30),
    gap: moderateScale(4),
  },
  inputtext:{
    paddingVertical:verticalScale(0),
    // borderWidth:1
  },
  dropdownContainer:{
    height:moderateScale(300),
    backgroundColor:CUSTOMCOLOR.white,
    marginHorizontal:horizontalScale(8),
  },
  touch:{
    paddingHorizontal:horizontalScale(8),
    paddingVertical:verticalScale(4)
  }

});

export default ComplaintsCard;

import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PrescriptionHead from '../components/prescriptionHead';
import PresComponent from '../components/presComponent';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ShowChip from '../components/showChip';
import {
  addCommorbities,
  updateCommorbities,
} from '../redux/features/prescription/commorbities';
import {CONSTANTS} from '../utility/constant';
import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {URL} from '../utility/urls';
import {fetchApi} from '../api/fetchApi';
import InputText from '../components/inputext';
import HButton from '../components/button';
import {ScrollView} from 'react-native-gesture-handler';
import {
  StoreAsyncData,
  UpdateAsyncData,
  RetriveAsyncData,
  clearStorage,
} from '../utility/AsyncStorage';
import { commonstyles } from '../styles/commonstyle';
import { addpastHistory } from '../redux/features/prescription/pastHistory';
import ChipInput from '../components/ChipInput';

const MedicalHistory =({navigation})=>{
    const data = useSelector(state=> state?.pasthistory?.pasthistory);
    const commor = useSelector(state => state?.commorbities?.commorbitiesItems);
    // console.log('====data',commor);
    const dispatch = useDispatch();
    const nav = useNavigation();
    const [comorbidities,setComorbidities] = useState('');
    const [past,setPast] = useState('')
    const [social,setSocial] = useState('')
    const [family,setFamily] = useState('')
    const [medical,setMedical] = useState('')
    const [previous,setPrevious] = useState('')
    const [menstrual,setMenstrual] = useState('')
    const [obstetric,setObstetric] = useState('')
    const [select,setSelect] = useState('')
    // const handleAddReceiver = () => {
    //   if (inputText.trim() !== '') {
    //     setReceivers([...receivers, inputText]);
    //     setInputText('');
    //   }
    // }
    const handleSelectComorbidities=(value)=>{
       setSelect(value);
       setComorbidities(value)   
    }
    handleSelectSocial=(val)=>{
        setSelect(val);
        setSocial(val)
    };
    handleSelectFamily=(val)=>{
        setSelect(val);
        setFamily(val)
    }
    handleSelectMedical=(val)=>{
        setSelect(val);
        setMedical(val)
    }
    const handleAddReceiver = (value) => {
      if (comorbidities.trim() !== '') {
        dispatch(addCommorbities([...commor,{commorbities:comorbidities}]))
        setComorbidities('')
      }
    }
    const handledata=()=>{
        dispatch(addpastHistory([...data,{
            comorbidities: comorbidities,
            past: past,
            social:social,
            family:family,
            medical:medical,
            menstrual:menstrual,
            obstetric:obstetric
        }]));
        nav.goBack();
    }
    return(
        <View style={styles.main}>
        <PrescriptionHead heading="Medical History" />
        <ChipInput item={'commorbities'} label={'Commorbities'} data={commor} value={comorbidities} setValue={setComorbidities} onSubmit={handleAddReceiver}/>
  
        <ScrollView contentContainerStyle={{paddingBottom:moderateScale(100)}}>
        <View style={styles.input}>
          {/* <InputText
            inputContainer={styles.inputtext}
            label="Comorbidities"
            placeholder="Enter comorbidities"
            value={comorbidities}
            setValue={(txt)=> setComorbidities(txt)}
          /> */}
         {data?.lenght>0? <View style={{flexDirection:'row',gap:moderateScale(8),marginHorizontal:horizontalScale(8)}}>
           {data?.map((item,ind)=>(
            <TouchableOpacity
            style={[styles.sug,
                 item?.comorbidities == select ? 
                 {backgroundColor:CUSTOMCOLOR.primary} :
                  {backgroundColor:CUSTOMCOLOR.white}]}
            onPress={()=> handleSelectComorbidities(item?.comorbidities)}
            >
                <Text style={[styles.sugtxt,
                item?.comorbidities == select ? {color:CUSTOMCOLOR.white}:{color:CUSTOMCOLOR.primary}
                ]}>{item?.comorbidities}</Text>
            </TouchableOpacity>
           ))}
          </View>:null}
          <InputText
            inputContainer={styles.inputtext}
            label="Past Hospitalization"
            placeholder="Past History"
            value={past}
            setValue={(txt)=> setPast(txt)}
          />
          <InputText
            inputContainer={styles.inputtext}
            label="Social History"
            placeholder="Eg : smoking, drinking"
            value={social}
            setValue={(txt)=>setSocial(txt)}
          />
          {data?.length > 0 ? <View style={{flexDirection:'row',gap:moderateScale(8),marginHorizontal:horizontalScale(8)}}>
           {data?.map((item,ind)=>(
            <TouchableOpacity
            style={[styles.sug,
                item?.social == select ? 
                {backgroundColor:CUSTOMCOLOR.primary} :
                 {backgroundColor:CUSTOMCOLOR.white}]}
                 onPress={()=> handleSelectSocial(item?.social)}
            >
                <Text  style={[styles.sugtxt,
                item?.social == select ? {color:CUSTOMCOLOR.white}:{color:CUSTOMCOLOR.primary}
                ]}>{item?.social}</Text>
            </TouchableOpacity>
           ))}
          </View>:null }
          <InputText
            inputContainer={styles.inputtext}
            label="Family History"
            placeholder="Eg : heart diseases, sugar"
            value={family}
            setValue={(txt)=> setFamily(txt)}
          />
          {data?.length>0?<View style={{flexDirection:'row',gap:moderateScale(8),marginHorizontal:horizontalScale(8)}}>
           {data?.map((item,ind)=>(
            <TouchableOpacity
            style={[styles.sug,
                item?.family == select ? 
                {backgroundColor:CUSTOMCOLOR.primary} :
                 {backgroundColor:CUSTOMCOLOR.white}]}
                 onPress={()=>handleSelectFamily(item?.family)}
            >
                <Text  style={[styles.sugtxt,
                item?.family == select ? {color:CUSTOMCOLOR.white}:{color:CUSTOMCOLOR.primary}
                ]}>{item?.family}</Text>
            </TouchableOpacity>
           ))}
          </View>:null}
          <InputText
            inputContainer={styles.inputtext}
            label="Medication History"
            placeholder="medicine name, dose, quantity, days,reason for medication"
            value={medical}
            setValue={(txt)=> setMedical(txt)}
          />
          {data?.length>0 ? <View style={{flexDirection:'row',gap:moderateScale(8),marginHorizontal:horizontalScale(8)}}>
           {data?.map((item,ind)=>(
            <TouchableOpacity
            style={[styles.sug,
                item?.medical == select ? 
                {backgroundColor:CUSTOMCOLOR.primary} :
                 {backgroundColor:CUSTOMCOLOR.white}]}
                 onPress={()=> handleSelectMedical(item?.medical)}
            >
                <Text  style={[styles.sugtxt,
                item?.medical == select ? {color:CUSTOMCOLOR.white}:{color:CUSTOMCOLOR.primary}
                ]}>{item?.medical}</Text>
            </TouchableOpacity>
           ))}
          </View>:null}
          <Text style={styles.prev}>Previous Prescription</Text>
          <HButton
          btnstyles={{alignSelf:'flex-start',
          marginHorizontal:horizontalScale(8),
          bottom:moderateScale(8)
         
        }}
        textStyle={{fontSize:moderateScale(14)}}
          icon='prescription'
          label='View'
          />
           <InputText
            inputContainer={styles.inputtext}
            label="Menstrual History"
            placeholder="Menstrual history"
            value={menstrual}
            setValue={(txt)=> setMenstrual(txt)}
          />
          <InputText
            inputContainer={styles.inputtext}
            label="Obstetric History"
            placeholder="Obstetric history"
            value={obstetric}
            setValue={(txt)=> setObstetric(txt)}
          />
    
    </View>
    </ScrollView>
          <View
            style={commonstyles.activebtn}>
            <HButton
              label={'Save'}
              onPress={() => {
                handledata();
              }}
            />
          </View>
       
      </View>
    )
};
const styles = StyleSheet.create({
    main: {
      gap:moderateScale(16),
      paddingHorizontal: horizontalScale(24),
      paddingVertical: verticalScale(16),
      backgroundColor:CUSTOMCOLOR.background
    },
    recomend: {
      padding: moderateScale(8),
      borderRadius: moderateScale(8),
      paddingHorizontal: horizontalScale(16),
    },
    dropdownContainer: {
      height: moderateScale(300),
      backgroundColor: CUSTOMCOLOR.white,
      marginHorizontal: horizontalScale(8),
    },
    inputtext: {
      paddingVertical: verticalScale(0),
    
    },
    input: {
      // paddingHorizontal:horizontalScale(8),
      gap:moderateScale(16),
     
    },
    touch: {
      paddingHorizontal: horizontalScale(8),
      paddingVertical: verticalScale(4),
    },
    prev:{
        color:CUSTOMCOLOR.black,
        fontSize:CUSTOMFONTSIZE.h3,
        marginHorizontal:horizontalScale(8)
    },
    sug:{
        paddingHorizontal:horizontalScale(24),
        paddingVertical:verticalScale(12),
        borderWidth:0.5,
        borderRadius:moderateScale(4),
        alignItems:'center',
        borderColor:CUSTOMCOLOR.primary
    },
    sugtxt:{
        fontSize:CUSTOMFONTSIZE.h4,
        fontWeight:'400',
        color:CUSTOMCOLOR.primary
    }
})
export default MedicalHistory;
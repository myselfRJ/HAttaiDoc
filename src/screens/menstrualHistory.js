import {View,Text,StyleSheet} from 'react-native'
import PrescriptionHead from '../components/prescriptionHead';
import { horizontalScale, moderateScale, verticalScale } from '../utility/scaleDimension';
import { HButton, InputText, PlusButton, SelectionTab, SelectorBtn } from '../components';
import { CUSTOMCOLOR, CUSTOMFONTFAMILY, CUSTOMFONTSIZE } from '../settings/styles';
import { CONSTANTS } from '../utility/constant';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import moment, {min} from 'moment';
import { addmenstrualHistory } from '../redux/features/prescription/pastHistory';
import { commonstyles } from '../styles/commonstyle';
import { useSelector,useDispatch } from 'react-redux';
const MenstrualHistory =()=>{
    const dispatch = useDispatch();
    const menstrualHistory = useSelector(state => state?.pasthistory)
      console.log(',enstr==',menstrualHistory);
    const selction=['Yes','No'];
    const [age,setAge] = useState('')
    const [status,setStatus] = useState('')
    const [flow,setFlow] = useState('')
    const [cycle,setCycle] = useState('')
    const [preg,setPreg] = useState('')
    const [menopause,setMenopause] = useState('')
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const formatDate = moment(date).format('YYYY-MM-DD');
    const [date1, setDate1] = useState(new Date());
    const [open1, setOpen1] = useState(false);
    const formatDate1 = moment(date).format('YYYY-MM-DD');
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const handleConfirm = date => {
      setDate(date);
      setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
      };
      const handleConfirm1 = date => {
        setDate1(date);
        setOpen1(false);
      };
      const handleCancel1 = () => {
          setOpen1(false);
        };
    const HandleSelect=(val)=>{
        setStatus(val)
    }
    const Pregselect=(val)=>{
        setPreg(val)
    }
    const menoselect=(val)=>{
        setMenopause(val)
    }
    const handledata=()=>{
        dispatch(addmenstrualHistory([...menstrualHistory,
            {
                age:age,
                status:status,
                flowdays:flow,
                cycledays:cycle,
                pregnant:date,
                menopause:date1
            
        }]))
    }
    return(
        <View style={styles.main}>
            <PrescriptionHead heading='Menstrual History'/>
            <InputText
            label={'Menarche(The first occurrence of menstruration)'}
            placeholder={'Age'}
            value={age}
            setValue={setAge}
            />
            <View style={styles.fields}>
                <View style={{gap:verticalScale(4)}}>
                <Text style={styles.text}>Menstruration Status</Text>
                <View style={{gap:horizontalScale(8),flexDirection:'row'}}>
                {CONSTANTS.menstruration_status.map((item,ind)=>(
                   <SelectionTab
                    label={item}
                    key={ind}
                    onPress={()=>HandleSelect(item)}
                    selected={status === item}
                    />
                ))}
                </View>
                </View>
                <InputText
                inputContainer={{width:horizontalScale(200)}}
                label={'Flow Days'}
                placeholder={'Enter Days'}
                value={flow}
                setValue={setFlow}
                />
                 <InputText
                inputContainer={{width:horizontalScale(200)}}
                label={'Cycle Days'}
                placeholder={'Enter Cycle Days'}
                value={cycle}
                setValue={setCycle}
                />
                {/* <PlusButton
                icon={'plus'}
                size={24}
                /> */}
            </View>
            <View style={{gap:verticalScale(4)}}>
                <Text style={styles.text}>Pregnant</Text>
                <View style={{gap:horizontalScale(8),flexDirection:'row'}}>
                {selction.map((item,ind)=>(
                   <SelectionTab
                    label={item}
                    key={ind}
                    onPress={()=>Pregselect(item)}
                    selected={preg === item}
                    />
                ))}
                </View>
                </View>
               {preg === 'Yes' && (
                <>
                 <SelectorBtn
            label={'LMP(Last month period)'}
            name="calendar"
            onPress={() => setOpen('to')}
            input={formatDate}
            style={styles.DOBselect}
          />
          <DatePicker
            modal
            open={open !== false}
            date={date}
            theme="auto"
            mode="date"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
                </>
               )}
                 <View style={{gap:verticalScale(4)}}>
                <Text style={styles.text}>Menopause</Text>
                <View style={{gap:horizontalScale(8),flexDirection:'row'}}>
                {selction.map((item,ind)=>(
                   <SelectionTab
                    label={item}
                    key={ind}
                    onPress={()=>menoselect(item)}
                    selected={menopause === item}
                    />
                ))}
                </View>
                </View>
                {menopause === 'Yes' && (
                    <>
                    <SelectorBtn
            label={'LMP(Last month period)'}
            name="calendar"
            onPress={() => setOpen('to')}
            input={formatDate1}
            style={styles.DOBselect}
          />
          <DatePicker
            modal
            open={open1 !== false}
            date={date1}
            theme="auto"
            mode="date"
            onConfirm={handleConfirm1}
            onCancel={handleCancel1}
          />
                    </>
                )}

<View style={{flex:1,justifyContent: 'flex-end'}}>
        <HButton
          btnstyles={commonstyles.activebtn}
          label={'Save'}
          onPress={() => {
            handledata();
          }}
        />
      </View>
        </View>
    )
};
const styles= StyleSheet.create({
    main:{
        flex:1,
        paddingHorizontal:horizontalScale(24),
        paddingVertical:verticalScale(16),
        backgroundColor:CUSTOMCOLOR.background,
        gap:moderateScale(16)
    },
    fields:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    text:{
        fontFamily:CUSTOMFONTFAMILY.body,
        fontSize:CUSTOMFONTSIZE.h3,
        color:CUSTOMCOLOR.black,
        fontWeight:'400'

    }

})
export default MenstrualHistory;
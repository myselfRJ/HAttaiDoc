import {View,Text,TouchableOpacity} from 'react-native'
import PrescriptionHead from '../components/prescriptionHead'
import PresComponent from '../components/presComponent'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import ShowChip from '../components/showChip'
import { addLabReport, updateLabReport } from '../redux/features/prescription/labreport'

const LabReports =()=>{
    const nav=useNavigation();
    const [value,setValue] = useState('')
    console.log('value===',value)
    const dispatch = useDispatch();
    const prev = useSelector(state => state?.labreport?.labReport)
    console.log('prev-----',prev)

    const HandleAddValue = () => {
        if (value) {
            console.log('valuesssssssssss');
          dispatch(addLabReport([...prev,{lab_test:value}]));
          setValue('');
        }
      };
      const handleDelete = index => {
        console.log('prescription index', index);
        if (prev) {
          const updatedPrescriptions = prev?.filter(
            (item, ind) => ind !== index,
          );
    
          dispatch(updateLabReport(updatedPrescriptions));
        }
      };
    return(
        <View style={{paddingHorizontal:24,paddingVertical:16,gap:8}}>
            
        <PrescriptionHead heading='Lab Reports'/>  
             
      {prev?.map((item, ind) => (
        prev.length > 0 ? ( <ShowChip text={item?.lab_test} onPress={()=>handleDelete(ind)} ind={ind}/>):null
      ))}
        <PresComponent 
        label='Lab Report' 
        placeholder='Enter reports'
        values={value}
        onChange={setValue}
        onPress={HandleAddValue}
        />
    </View>
    )
}
export default LabReports;
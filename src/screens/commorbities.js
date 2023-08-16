import {View,Text,TouchableOpacity} from 'react-native'
import PrescriptionHead from '../components/prescriptionHead'
import PresComponent from '../components/presComponent'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import ShowChip from '../components/showChip'
import { addCommorbities, updateCommorbities } from '../redux/features/prescription/commorbities'

const Commorbities=()=>{
    const nav=useNavigation();
    const [value,setValue] = useState('')
    console.log('value===',value)
    const dispatch = useDispatch();
    const prev = useSelector(state => state?.commorbities?.commorbitiesItems)
    console.log('prev-----',prev)


    const HandleAddValue = () => {
        if (value) {
            console.log('valuesssssssssss');
          dispatch(addCommorbities([...prev,{commoribities:value}]));
          setValue('');
        }
      };
      const handleDelete = index => {
        console.log('prescription index', index);
        if (prev) {
          const updatedPrescriptions = prev?.filter(
            (item, ind) => ind !== index,
          );
    
          dispatch(updateCommorbities(updatedPrescriptions));
        }
      };

    return(
        <View style={{paddingHorizontal:24,paddingVertical:16,gap:8}}>
            
            
        <PrescriptionHead heading='Commorbities'/>  
             
      {prev?.map((item, ind) => (
        prev.length > 0 ? ( <ShowChip text={item?.commoribities} onPress={()=>handleDelete(ind)} ind={ind}/>):null
      ))}
        <PresComponent 
        label='Commorbities' 
        placeholder='Enter commorbities'
        values={value}
        onChange={setValue}
        onPress={HandleAddValue}
        />
    </View>
    )
}
export default Commorbities;
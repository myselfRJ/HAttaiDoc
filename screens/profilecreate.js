import React,{useState} from 'react';
import {Text, View,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMCOLOR, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
import {commonstyles} from '../styles/commonstyle';
import Keyboardhidecontainer from '../components/keyboardhidecontainer';
import InputText from '../components/inputext';
import HButton from '../components/button';
import AddImage from '../components/addimage';
import Option from '../components/option';
const ProfileCreate=()=>{
    const [selected,setSelected]=useState('male');
    

    //handle selected state

    const handleOptions=(value)=>{
        setSelected(value);
    }


    return (
        <Keyboardhidecontainer>
            <View style={commonstyles.content}>
                <Text>Fill Profile</Text>
                <AddImage url='https://www.kauveryhospital.com/doctorimage/recent/Dr.-Kandasamy2022-09-12-06:30:01am.jpg'/>
                <InputText label='name' placeholder='Full Name'/>
                
                <View >
                <Text>Gender</Text>
                <View style={styles.radiogroup}>
                <Option label='male' value="male" selected={selected==='male'} onPress={()=>handleOptions('male')}/>
                <Option label='female' value="female" selected={selected==='female'} onPress={()=>handleOptions('female')}/>
                <Option label='others' value="others" selected={selected==='others'} onPress={()=>handleOptions('others')}/>

                </View>
              
                </View>
               
                <InputText label='name' placeholder='Full Name'/>
                <InputText label='name' placeholder='Full Name'/>
                <InputText label='name' placeholder='Full Name'/>
                <InputText label='name' placeholder='Full Name'/>
                <HButton label='login'/>
            </View>
        </Keyboardhidecontainer>
    )
}

const styles=StyleSheet.create({
    radiogroup:{
        width:'100%',
        padding:16,
        flexDirection:'row',
        gap:24,
        alignItems:'center',
        justifyContent:'flex-start'

    }
})

export default ProfileCreate
import {View} from 'react-native';
import { CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
import {commonstyles} from '../styles/commonstyle';
import Keyboardhidecontainer from '../components/keyboardhidecontainer';
import InputText from '../components/inputext';
import HButton from '../components/button';
const ProfileCreate=()=>{

    return (
        <Keyboardhidecontainer>
            <View style={commonstyles.content}>
                <InputText label='name' placeholder='Full Name'/>
                <InputText label='name' placeholder='Full Name'/>
                <InputText label='name' placeholder='Full Name'/>
                <InputText label='name' placeholder='Full Name'/>
                <InputText label='name' placeholder='Full Name'/>
                <InputText label='name' placeholder='Full Name'/>
                <HButton label='login'/>
            </View>
        </Keyboardhidecontainer>
    )
}

export default ProfileCreate
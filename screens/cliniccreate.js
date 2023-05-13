import {Text} from 'react-native';
import Keyboardhidecontainer from '../components/keyboardhidecontainer';
import InputText from '../components/inputext';
import HButton from '../components/button';
import { CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
const ClinicCreate=()=>{

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

export default ClinicCreate
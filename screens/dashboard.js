import {Text} from 'react-native';
import { CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
import store from '../redux/stores/store';
import { authenticateActions } from '../redux/features/authenticate/authenticateSlice';
const Dashboard=()=>{
console.log(store.getState())
    return (
        <Text>Dashboard</Text>
    )
}

export default Dashboard
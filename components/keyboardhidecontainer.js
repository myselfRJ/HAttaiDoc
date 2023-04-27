import { TouchableWithoutFeedback,Keyboard } from "react-native";

export default KeyboardAvoidContainer = ({children}) =>{
    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>{children}</TouchableWithoutFeedback>
    )
}
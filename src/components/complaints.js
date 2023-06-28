import {
    View,
    StyleSheet,
    Text,
    Image,
    Pressable,
    Modal,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CUSTOMCOLOR, CUSTOMFONTSIZE, CUSTOMFONTFAMILY } from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
const ComplaintsCard = (props) => {
    const [selectIndex,setSelectIndex] = useState();
    const [text, setText] = useState('');
    
    const handlePress = (suggestion) => {
      setText("")
      setText(suggestion);
    };
  
    const setSelected=(index)=>{
        setSelectIndex(index);
    }
  
    const { complaints } = props;
  
    return (
      <View style={styles.main}>
        <Text style={styles.h2}>{Language[language]['consultation']}</Text>
        <Text style={styles.h3}>{Language[language]['cheif_complaints']}</Text>
          <TextInput
            style={styles.input}
            placeholder='write complaints'
            multiline={true}
            value={text}
            onChangeText={(text)=>{setText(''); setText(text)}}
          />
        <View>
          <Text style={styles.h3}>{Language[language]['suggestions']}</Text>
          <View style={styles.sugg}>
            {complaints.map((value,index) => (
              <Pressable
                style={styles.sugbtn}
                key={index}
                onPress={() => {handlePress(value),setSelected(index)}}
              >
                <View>
                <Text style={styles.sugText}>{value}</Text></View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    );
  };
const styles = StyleSheet.create({
    main: {
        padding: 24,
        gap: 16,
    },
    h2: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily: CUSTOMFONTFAMILY.opensans,
        lineHeight: 20 * 2,
        color: CUSTOMCOLOR.black,
        padding: 24
    },
    h3: {
        fontSize: 20,
        fontWeight: '600',
        fontFamily: CUSTOMFONTFAMILY.opensans,
        lineHeight: 20 * 2,
        color: CUSTOMCOLOR.black,
        padding: 5
    },
    input: {
        width: "100%",
        margin: 10,
        padding: 5,
    },
    sugg:{
        flexDirection:"row",
        justifyContent:"space-around",
    },
    sugText:{
        color:CUSTOMCOLOR.primary
    },
    sugbtn:{
      borderWidth:2,
      borderRadius:5,
      padding:5
    }
})
export default ComplaintsCard;
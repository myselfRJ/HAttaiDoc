import {Text,View,StyleSheet, FlatList} from 'react-native';
import { CUSTOMCOLOR, CUSTOMFONTFAMILY, CUSTOMFONTSIZE } from "../settings/styles";
import { language } from "../settings/userpreferences";
import {Language} from "../settings/customlanguage";
import SelectorBtn from '../components/selector';
import Option from '../components/option';
import SelectionTab from '../components/selectiontab';
import SuggestionTab from '../components/suggestiontab';
import HButton from '../components/button';
const SlotBook=({navigation})=>{

    const data=[1,2,4,5,5,6,6,6,6,10,12,13]
    const renderItems=({value,index})=>{
        return(
            <View style={styles.item}>

           
          
                 <SelectionTab key={index} label='9:30am-10:00am'/>
                 </View>

           
           
        )
    }
    return (
        <View style={styles.main}>
            <SelectorBtn name='calendar'/>
            <View style={styles.child}>
                <View style={styles.type}>
                    <Option label='Offline' selected={true}/>
                    <Option label='Teleconsultation' selected={false}/>
                </View>
                <View style={styles.selection}>
                    <SelectionTab label='New' selected={true}/>
                    <SelectionTab label='Follow up' selected={false}/>
                    <SelectionTab label='Report review' selected={false}/>
                    <SelectionTab label='Routine' selected={false}/>
              
                </View>

                <View>
                    <Text style={styles.h2}>Available Slots</Text>
                        <FlatList 
                        data={data}
                        renderItem={renderItems}
                        numColumns={3}
                    
                        />
                </View>
                <View style={styles.btn}>
                <HButton label='Book Slot'/>
              
                </View>

               


            </View>
            
        </View>
        
    )
}

const styles=StyleSheet.create({
    main:{
        padding:24,
        gap:16
    },
    type:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
    },
       
    selection:{
        flexDirection:'row',
        justifyContent:'space-between',
       
    },
    child:{
        padding:24,
        gap:24

    },
    h2:{
        fontSize:24,
        fontWeight:'700',
        fontFamily:CUSTOMFONTFAMILY.opensans,
        lineHeight:20*2,
        color:CUSTOMCOLOR.black
    },
    item:{margin:8},
    btn:{
        alignItems:'center'
    }
})

export default SlotBook
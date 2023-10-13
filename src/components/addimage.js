import {Pressable, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CUSTOMCOLOR} from '../settings/styles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../utility/scaleDimension';
const AddImage = props => {
  // console.log('urel====>', props.encodedBase64);
  return props?.encodedBase64 ? (
    <Pressable onPress={props.onPress} style={styles.url}>
      <Image
        style={styles.image}
        source={{uri: `data:image/jpeg;base64,${props.encodedBase64}`}}
        resizeMode="cover"
      />
    </Pressable>
  ) : (
    <Pressable onPress={props.onPress} style={styles.main}>
      <Icon name="account-plus" size={24} color={CUSTOMCOLOR.primary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: moderateScale(16),
    borderWidth: 0.5,
    borderColor: CUSTOMCOLOR.primary,
    borderRadius: moderateScale(4),
  },
  url: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:2,
    borderRadius: moderateScale(8),
    // borderColor:CUSTOMCOLOR.primary
  },
  image: {
    height: horizontalScale(80),
    width: horizontalScale(80),
    borderColor: CUSTOMCOLOR.primary,
    borderWidth: 1,
    borderRadius: moderateScale(8),
  },
});
export default AddImage;


























// import {Pressable, Image, StyleSheet,View,TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {CUSTOMCOLOR} from '../settings/styles';
// import React, {useState, useRef, useEffect, startTransition} from 'react';
// import {
//   horizontalScale,
//   moderateScale,
//   verticalScale,
// } from '../utility/scaleDimension';
// import CustomCalendar from './calendar';
// const AddImage = props => {
//   // console.log('urel====>', props.encodedBase64);
//   const [show,setshow] = useState(false)
//   console.log(show)
  
//   return props?.encodedBase64 ? (
//     <View style={{flexDirection:'row'}}>
//     <View><Pressable onPress={props.onPress} style={styles.url}>
//       <Image
//         style={styles.image}
//         source={{uri: `data:image/jpeg;base64,${props.encodedBase64}`}}
//         resizeMode="cover"
//       />
//     </Pressable>
//     <View style={{bottom:moderateScale(16),left:moderateScale(10),alignSelf:'flex-end',borderRadius:moderateScale(24),backgroundColor:CUSTOMCOLOR.white}} >
//     <Pressable onPress={() => {
//             // props.onPress();
//             setshow(!show); 
//           }}>
//       {show == true ?(<View style={{paddingHorizontal:horizontalScale(4)}}><Icon name="close" size={24} color={CUSTOMCOLOR.primary}/></View>)
//       :(<Icon name="plus" size={26} color={CUSTOMCOLOR.primary}/>)}
//       </Pressable>
//       </View>
//       </View>
//        {show && (<View style={{paddingHorizontal:horizontalScale(12),bottom:moderateScale(8)}}>
//        <TouchableOpacity onPress={()=>
//        {
//         props.OnGallery();
//         setshow(!show)
      
//       }}>
//              <Icon
//                name="image-multiple"
//                size={moderateScale(32)}
//                color={CUSTOMCOLOR.primary}
//              />
       
//            </TouchableOpacity>
//            <TouchableOpacity onPress={()=>{
//            props.OnCamera();
//            setshow(!show)}}>
//              <Icon name="camera" size={moderateScale(32)} color={CUSTOMCOLOR.primary} />
   
//            </TouchableOpacity>
//        </View>)}
//        </View>
//   ) : (
//     <View style={{flexDirection:'row'}}>
//       <View>
//     <Pressable onPress={() => {
//             // props.onPress();
//             setshow(true); 
//           }} style={styles.main}>
//       <Icon name="account-plus" size={24} color={CUSTOMCOLOR.primary} />
      
//     </Pressable>
//     <View style={{bottom:moderateScale(16),left:moderateScale(10),alignSelf:'flex-end',borderRadius:moderateScale(24),backgroundColor:CUSTOMCOLOR.white}} >
//     <Pressable onPress={() => {
//             // props.onPress();
//             setshow(!show); 
//           }}>
//       {show == true ?(<View style={{paddingHorizontal:horizontalScale(4)}}><Icon name="close" size={24} color={CUSTOMCOLOR.primary}/></View>)
//       :(<Icon name="plus" size={26} color={CUSTOMCOLOR.primary}/>)}
//       </Pressable>
//       </View>
//       </View>
//       {show && (<View style={{paddingHorizontal:horizontalScale(12),bottom:moderateScale(8)}}>
//       <TouchableOpacity  onPress={()=>
//        {
//         props.OnGallery();
//         setshow(!show)
      
//       }}>
//             <Icon
//               name="image-multiple"
//               size={moderateScale(32)}
//               color={CUSTOMCOLOR.primary}
//             />
      
//           </TouchableOpacity>
//           <TouchableOpacity  onPress={()=>
//        {
//         props.OnCamera();
//         setshow(!show)
      
//       }}>
//             <Icon name="camera" size={moderateScale(32)} color={CUSTOMCOLOR.primary} />
  
//           </TouchableOpacity>
//       </View>)}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     padding: moderateScale(20),
//     borderWidth: 0.5,
//     borderColor: CUSTOMCOLOR.primary,
//     borderRadius: moderateScale(4),
//   },
//   url: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     // borderWidth:2,
//     borderRadius: moderateScale(8),
//     // borderColor:CUSTOMCOLOR.primary
//   },
//   image: {
//     height: verticalScale(80),
//     width: horizontalScale(80),
//     borderColor: CUSTOMCOLOR.primary,
//     borderWidth: 1,
//     borderRadius: moderateScale(8),
//   },
// });
// export default AddImage;

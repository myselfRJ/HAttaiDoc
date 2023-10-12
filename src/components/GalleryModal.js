import {useState,useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {CUSTOMCOLOR, CUSTOMFONTSIZE} from '../settings/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
const GalleryModel = props => {
  const setVisible = props.Close;
  // useEffect(()=>{
  //   if(props.dismiss){
  //     setVisible(!props.visible)
  //   }
  // })
  return (
    
    // <Modal
    //   animationType="slide"
    //   // transparent={true}
    //   visible={props.visible}
    
    //   onRequestClose={() => {
    //     setVisible(!props.visible);
    //   }}
    //   transparent={true}>
       

    //   <View
    //     style={{
    //       flex: 1,
    //       // alignSelf: 'flex-end',
    //       justifyContent: 'flex-end',
    //       alignItems: 'center',
    //       // borderWidth:1,
    //       width:'100%',
    //       // paddingHorizontal:horizontalScale(4)
          
    //     }}>
    //        <TouchableWithoutFeedback onPress={() => {
    //     setVisible(!props.visible);
    //   }}>
    //         <View style={styles.modalOverlay} />
    //       </TouchableWithoutFeedback>
    //     {/* <TouchableOpacity
    //       style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    //       onPress={props.onPress}
    //     /> */}

    //     <View
    //       style={{
    //         flexDirection: 'row',
    //         justifyContent: 'space-around',
    //         backgroundColor: CUSTOMCOLOR.primary,
    //         width: '100%',
    //         padding: moderateScale(40),
    //         borderTopEndRadius: moderateScale(16),
    //         borderTopLeftRadius: moderateScale(16),
    //       }}>
    //       <TouchableOpacity onPress={props.OnGallery}>
    //         <Icon
    //           name="image-multiple"
    //           size={moderateScale(48)}
    //           style={styles.icon}
    //         />
    //         <Text style={styles.text}>GALLERY</Text>
    //       </TouchableOpacity>
    //       <TouchableOpacity onPress={props.OnCamera}>
    //         <Icon name="camera" size={moderateScale(48)} style={styles.icon} />
    //         <Text style={styles.text}>CAMERA</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </Modal>
    <Modal
      animationType="slide"
      // transparent={true}
      visible={props.visible}
      deviceWidth={1}
      onRequestClose={() => {
        setVisible(!props.visible);
      }}
      transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor:'#000000aa'
        }}>
           <TouchableWithoutFeedback onPress={() => {
        setVisible(!props.visible);
      }}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
        <View
          style={{
            flexDirection: 'row',
                    justifyContent: 'space-around',
                    backgroundColor: CUSTOMCOLOR.white,
                    width: '100%',
                    padding: moderateScale(40),
                    borderTopEndRadius: moderateScale(16),
                    borderTopLeftRadius: moderateScale(16),
          }}>
          <TouchableOpacity onPress={props.OnGallery}>
            <Icon
              name="image-multiple"
              size={moderateScale(48)}
              style={styles.icon}
              color={CUSTOMCOLOR.primary}
            />
            <Text style={styles.text}>GALLERY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={props.OnCamera}>
            <Icon name="camera" size={moderateScale(48)} style={styles.icon} color={CUSTOMCOLOR.primary} />
            <Text style={styles.text}>CAMERA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
   
  );
};
// camera - plus;
export default GalleryModel;

const styles = StyleSheet.create({
  text: {
    fontSize: CUSTOMFONTSIZE.h3,
    fontWeight: 'bold',
    color: CUSTOMCOLOR.primary,
  },
  icon: {alignSelf: 'center', marginBottom: moderateScale(8)},
  modalOverlay: {
    position: 'absolute',
    // width:'100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // borderWidth:1
    // backgroundColor: 'rgba(0,0,0,0.5)'
  },
});

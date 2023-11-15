import React from 'react';
import {View,Text} from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import { TouchableOpacity } from 'react-native';


const UploadDocument =()=>{
   // Function to pick a single file
const pickSingleFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        
      });
      {
        result.map((val,index)=> console.log('uri===>',val.uri))
      }
      // console.log('result===',result)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        // Handle other errors
      }
    }
  };

  
//   // Function to pick multiple files
//   const pickMultipleFiles = async () => {
//     try {
//       const results = await DocumentPicker.pickMultiple({
//         type: [DocumentPicker.types.allFiles],
//       });
//       for (const result of results) {
//         if (!result.cancelled) {
//           console.log(
//             "URI: " + result.uri,
//             "Type: " + result.type,
//             "Name: " + result.name,
//             "Size: " + result.size
//           );
//         }
//       }
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         // User cancelled the picker
//       } else {
//         // Handle other errors
//       }
//     }
//   };
  
    return(
     <View>
     <TouchableOpacity onPress={pickSingleFile}>
        <Text>Upload document</Text>
     </TouchableOpacity>
     </View>
    );
}
export default UploadDocument;
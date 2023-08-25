// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import {
//     CUSTOMCOLOR,
//     CUSTOMFONTFAMILY,
//     CUSTOMFONTSIZE,
// } from '../settings/styles';
// import { language } from '../settings/userpreferences';
// import { Language } from '../settings/customlanguage';
// import InputText from '../components/inputext';
// import HButton from '../components/button';
// import { ScrollView } from 'react-native-gesture-handler';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { PermissionsAndroid } from 'react-native';
// import Geocoder from 'react-native-geocoding';
// Geocoder.init('AIzaSyCdshQ6BDrl4SZzdo52cGRxjhSzlNdexOQ');
// const ClinicAddress = (props) => {

//     const [selectedLocation, setSelectedLocation] = useState(null);
//     const [initialLatitude, setInitialLatitude] = useState(13.0827); // Chennai's latitude
//     const [initialLongitude, setInitialLongitude] = useState(80.2707);

//     const [input, setInput] = useState({
//         buildingno: '',
//         street: ''
//     })
//     const handleChangeValue = (field, value) => {
//         setInput(prevValues => ({
//             ...prevValues,
//             [field]: value,
//         }));
//     };
//     // const handleSearchAddress = (data, details = null) => {
//     //     console.log("Selected Location:", details.geometry.location.lat, details.geometry.location.lng);
//     //     setSelectedLocation({
//     //         latitude: details.geometry.location.lat,
//     //         longitude: details.geometry.location.lng,
//     //     });
//     // }
//     // const handleSearchAddress = (data, details = null) => {
//     //     if (details && details.geometry && details.geometry.location) {
//     //         console.log("Selected Location:", details.geometry.location.lat, details.geometry.location.lng);
//     //         setSelectedLocation({
//     //             latitude: details.geometry.location.lat,
//     //             longitude: details.geometry.location.lng,
//     //         });
//     //     } else {
//     //         console.log("Invalid details:", details);
//     //     }
//     // };
//     const handleSearchAddress = (data, details = null) => {
//         if (details) {
//             console.log("Details:", details);
//             setSelectedLocation({
//                 latitude: details.geometry.location.lat,
//                 longitude: details.geometry.location.lng,
//             });
//             // Your existing logic to access geometry and update the state
//         } else {
//             console.log("Invalid details:", details);
//         }
//     };
//     useEffect(() => {
//         Geolocation.getCurrentPosition(info => console.log('current location==', info));
//     }, [])
//     useEffect(() => {
//         // Get the current position
//         Geolocation.getCurrentPosition(
//             async (position) => {
//                 const { latitude, longitude } = position.coords;
//                 console.log('position====',position.coords)
//                 try {
//                     const response = await Geocoder.from(latitude, longitude);
//                     if (response.results.length > 0) {
//                         const address = response.results[0].formatted_address;
//                         console.log('address===', address)
//                         //setCurrentAddress(address);
//                     } else {
//                         console.log('No address found for the given coordinates');
//                     }
//                 } catch (error) {
//                     console.warn('Error fetching address:', error);
//                     // setCurrentAddress('Error fetching address');
//                 }
//             },
//             (error) => {
//                 console.warn('Error getting current location:', error);
//                 //setCurrentAddress('Error getting current location');
//             },
//             { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//     }, []);


//     const [selectedAddress, setSelectedAddress] = useState('');

//     useEffect(() => {
//         if (selectedLocation) {
//             Geocoder.from(selectedLocation.latitude, selectedLocation.longitude)
//                 .then(response => {
//                     const address = response.results[0].formatted_address;
//                     setSelectedAddress(address);
//                 })
//                 .catch(error => console.warn(error));
//         }
//     }, [selectedLocation]);


//     return (

//         <ScrollView>
//             <View style={styles.container}>
//                 <View style={styles.top}>

//                     <View style={{ height: '10%' }}>
//                         <GooglePlacesAutocomplete
//                             placeholder='Search for an address...'
//                             onPress={(data, details) => {
//                                 if (details) {
//                                     handleSearchAddress(data, details);
//                                 }
//                             }}
//                             query={{
//                                 key: 'AIzaSyCdshQ6BDrl4SZzdo52cGRxjhSzlNdexOQ',
//                                 language: 'en',
//                             }}
//                             currentLocation={true}
//       currentLocationLabel='Current location'
//                         />
//                     </View>
//                     <MapView
//                         style={{ flex: 1 }}
//                         region={{
//                             latitude: selectedLocation ? selectedLocation.latitude : initialLatitude,
//                             longitude: selectedLocation ? selectedLocation.longitude : initialLongitude,
//                             latitudeDelta: 0.0922,
//                             longitudeDelta: 0.0421,
//                         }}
//                         onPress={event => {
//                             const { latitude, longitude } = event.nativeEvent.coordinate;
//                             setSelectedLocation({ latitude, longitude });
//                         }}
//                     >
//                         {selectedLocation && (
//                             <Marker coordinate={selectedLocation} title="Selected Location" />
//                         )}
//                     </MapView>

//                 </View>
//                 <View style={styles.bottom}>

//                     <InputText
//                         label={Language[language]['buildingno']}
//                         placeholder="Building No"
//                         value={input.buildingno}
//                         setValue={value => handleChangeValue('buildingno', value)}
//                     />
//                     <InputText
//                         label={Language[language]['street']}
//                         placeholder="Street Address"
//                         value={selectedAddress}
//                         setValue={handleSearchAddress}
//                         multiline={true}
//                     />
//                     <View style={{ alignSelf: 'center' }}>
//                         <HButton label="Save" onPress={handleSearchAddress} />
//                     </View>
                    
//                 </View>

//             </View>
//         </ScrollView>


//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 16,
//         paddingVertical: 8
//     },
//     top: {
//         height: 700,

//     },
//     bottom: {
//         //height: 300,
//         paddingHorizontal: 16,
//         paddingVertical: 16


//     },
//     addressContainer: {
//         borderWidth: 1,
//         top: 50,
//         paddingHorizontal: 16,
//         paddingVertical: 16,
//         alignSelf: 'center',
//         borderRadius: 5
//     }
// })
// export default ClinicAddress;

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CONSTANT } from '../utility/const';
const MapScreen = () => {
  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: 13.0827, // Default initial latitude
    longitude: 80.2707, // Default initial longitude
  });

  const handlePlaceSelect = (data, details) => {
    const { geometry } = details;
    const { location } = geometry;
    
    setMarkerCoordinates({
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: markerCoordinates.latitude,
          longitude: markerCoordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={markerCoordinates} />
      </MapView>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={handlePlaceSelect}
        query={{
          key: CONSTANT.API_KEY,
          language: 'en',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;

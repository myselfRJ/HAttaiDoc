import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
    CUSTOMCOLOR,
    CUSTOMFONTFAMILY,
    CUSTOMFONTSIZE,
} from '../settings/styles';
import axios from 'axios';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import InputText from '../components/inputext';
import HButton from '../components/button';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const ClinicAddress = (props) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [initialLatitude, setInitialLatitude] = useState(13.0827); // Chennai's latitude
    const [initialLongitude, setInitialLongitude] = useState(80.2707);
    const [markerCoordinates, setMarkerCoordinates] = useState({
        latitude: 13.0827, // Default initial latitude
        longitude: 80.2707, // Default initial longitude
    });
    const [formattedAddress, setFormattedAddress] = useState('');
    // console.log('current location===>',currentLocation)
    const [input, setInput] = useState({
        buildingno: '',
        street: ''
    })
    const handleChangeValue = (field, value) => {
        setInput(prevValues => ({
            ...prevValues,
            [field]: value,
        }));
    };
    useEffect(() => {
        const checkLocationPermission = async () => {
            const permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
            if (permissionStatus !== RESULTS.GRANTED) {
                const requestStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
                if (requestStatus === RESULTS.GRANTED) {
                    fetchCurrentLocation();
                    
                    
                }
            } else {
                
                fetchCurrentLocation();
                console.log("erorrr")
                
            }
        };
        const fetchCurrentLocation = () => {
            Geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ latitude, longitude });
                    setMarkerCoordinates({ latitude, longitude });
                    console.log('current location===',currentLocation)
                    console.log('marker==',markerCoordinates)
                },
                error => {
                    console.log('Error getting location:', error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        };

        checkLocationPermission();
    }, []);

    useEffect(() => {
        if (currentLocation) {
            fetchFormattedAddress(currentLocation.latitude, currentLocation.longitude);
        }
    }, [currentLocation]);

    const fetchFormattedAddress = async (latitude, longitude) => {
        try {
            console.log('latitude',latitude)
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCdshQ6BDrl4SZzdo52cGRxjhSzlNdexOQ`
            );

            if (response.data.status === 'OK' && response.data.results.length > 0) {
                const firstResult = response.data.results[0];
                setFormattedAddress(firstResult.formatted_address);
            }
        } catch (error) {
            console.log('Error fetching formatted address:', error);
        }
    };

    return (

        <ScrollView>
            <View style={styles.container}>
                <View style={styles.top}>
                <View style={styles.Mapcontainer}>
     <MapView
       provider={PROVIDER_GOOGLE} 
       style={styles.map}
       region={{
         latitude: 13.0827,
         longitude: 80.2707,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
        <Marker coordinate={markerCoordinates} />
     </MapView>
   </View>
                </View>
                <View style={styles.bottom}>

                    <InputText
                        label={Language[language]['buildingno']}
                        placeholder="Building No"
                        value={input.buildingno}
                        setValue={value => handleChangeValue('buildingno', value)}
                    />
                    <InputText
                        label={Language[language]['street']}
                        placeholder="Street Address"
                        value={formattedAddress}
                        setValue={handleChangeValue}
                        multiline={true}
                    />
                    <View style={{ alignSelf: 'center' }}>
                        <HButton label="Save" onPress={props.onPress} />
                    </View>
                    
                </View>

            </View>
        </ScrollView>


    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    top: {
        height: 700,
        backgroundColor:CUSTOMCOLOR.primary

    },
    bottom: {
        //height: 300,
        paddingHorizontal: 16,
        paddingVertical: 16


    },
    addressContainer: {
        borderWidth: 1,
        top: 50,
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignSelf: 'center',
        borderRadius: 5
    },
    Mapcontainer: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
})
export default ClinicAddress;

// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { CONSTANT } from '../utility/const';
// const ClinicAddress = () => {
//   const [markerCoordinates, setMarkerCoordinates] = useState({
//     latitude: 13.0827, // Default initial latitude
//     longitude: 80.2707, // Default initial longitude
//   });

//   const handlePlaceSelect = (data, details) => {
//     const { geometry } = details;
//     const { location } = geometry;
    
//     setMarkerCoordinates({
//       latitude: location.lat,
//       longitude: location.lng,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: markerCoordinates.latitude,
//           longitude: markerCoordinates.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         <Marker coordinate={markerCoordinates} />
//       </MapView>
//       <GooglePlacesAutocomplete
//         placeholder="Search"
//         onPress={handlePlaceSelect}
//         query={{
//           key: 'AIzaSyCdshQ6BDrl4SZzdo52cGRxjhSzlNdexOQ',
          
//           language: 'en',
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default ClinicAddress;


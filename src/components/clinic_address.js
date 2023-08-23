import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
    CUSTOMCOLOR,
    CUSTOMFONTFAMILY,
    CUSTOMFONTSIZE,
} from '../settings/styles';
import { language } from '../settings/userpreferences';
import { Language } from '../settings/customlanguage';
import InputText from '../components/inputext';
import HButton from '../components/button';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PermissionsAndroid } from 'react-native';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyCdshQ6BDrl4SZzdo52cGRxjhSzlNdexOQ');
const ClinicAddress = (props) => {
    
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [initialLatitude, setInitialLatitude] = useState(13.0827); // Chennai's latitude
const [initialLongitude, setInitialLongitude] = useState(80.2707);

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
     const handleSearchAddress = (data, details) => {
        if (details && details.geometry && details.geometry.location) {
            const { location } = details.geometry;
            setSelectedLocation({
                latitude: location.lat,
                longitude: location.lng,
            });
        }
    };
    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // You have permission, proceed to get current location
                } else {
                    // Permission denied, handle accordingly
                }
            } catch (err) {
                console.warn(err);
            }
        };

        requestLocationPermission();
    }, []);

    const [selectedAddress, setSelectedAddress] = useState('');

    useEffect(() => {
        if (selectedLocation) {
            Geocoder.from(selectedLocation.latitude, selectedLocation.longitude)
                .then(response => {
                    const address = response.results[0].formatted_address;
                    setSelectedAddress(address);
                })
                .catch(error => console.warn(error));
        }
    }, [selectedLocation]);


    return (

        <ScrollView>
            <View style={styles.container}>
                <View style={styles.top}>
                    {/* <GooglePlacesAutocomplete
                        placeholder='Search for an address...'
                        onPress={(data, details = null) => {
                            setSelectedLocation({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            });
                        }}
                        query={{
                            key: 'AIzaSyCdshQ6BDrl4SZzdo52cGRxjhSzlNdexOQ',
                            language: 'en',
                        }}
                    /> */}
                    <MapView
                        style={{ flex: 1 }}
                        region={{
                            latitude: selectedLocation
                                ? selectedLocation.latitude
                                : initialLatitude,
                            longitude: selectedLocation
                                ? selectedLocation.longitude
                                : initialLongitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onPress={event => {
                            const { latitude, longitude } = event.nativeEvent.coordinate;
                            setSelectedLocation({ latitude, longitude });
                        }}
                    >
                        {selectedLocation && (
                            <Marker coordinate={selectedLocation} title="Selected Location" />
                        )}
                    </MapView>

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
                            value={selectedAddress}
                            setValue={handleSearchAddress}
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
        paddingHorizontal:16,
        paddingVertical:8
    },
    top: {
        height: 700,
    },
    bottom: {
        height: 300,
        paddingHorizontal:16,
        paddingVertical:16


    },
    addressContainer: {
        borderWidth:1,
        top: 50,
        paddingHorizontal:16,
        paddingVertical:16,
        alignSelf: 'center',
        borderRadius: 5
    }
})
export default ClinicAddress;
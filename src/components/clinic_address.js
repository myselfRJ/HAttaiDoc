import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

import {
  CUSTOMCOLOR,
  CUSTOMFONTFAMILY,
  CUSTOMFONTSIZE,
} from '../settings/styles';
import axios from 'axios';
import {language} from '../settings/userpreferences';
import {Language} from '../settings/customlanguage';
import InputText from '../components/inputext';
import HButton from '../components/button';
import {ScrollView} from 'react-native-gesture-handler';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useDispatch} from 'react-redux';
import {addAddress} from '../redux/features/profiles/clinicAddress';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../utility/scaleDimension';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {mode} from '../redux/features/prescription/prescribeslice';

const {height, width} = Dimensions.get('screen');
const ClinicAddress = ({navigation}) => {
  const ref = useRef('Search here');
  const mapRef = useRef();
  const markerRef = useRef();

  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState(null);

  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: 13.08,
    longitude: 80.02,
  });
  const [formattedAddress, setFormattedAddress] = useState('');

  const [regionData, setRegiondata] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  useEffect(() => {
    const checkLocationPermission = async () => {
      const permissionStatus = await check(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (permissionStatus !== RESULTS.GRANTED) {
        const requestStatus = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        if (requestStatus === RESULTS.GRANTED) {
          fetchCurrentLocation();
        }
      } else {
        fetchCurrentLocation();
      }
    };
    const fetchCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({latitude, longitude});
          setMarkerCoordinates({latitude, longitude});
          setRegiondata({...regionData, latitude, longitude});
        },

        error => {},
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    checkLocationPermission();
  }, []);

  const onRegionChangeComplete = e => console.log('region Change');

  useEffect(() => {
    if (currentLocation) {
      fetchFormattedAddress(
        currentLocation.latitude,
        currentLocation.longitude,
      );
    }
  }, [currentLocation]);

  const fetchFormattedAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCdshQ6BDrl4SZzdo52cGRxjhSzlNdexOQ`,
      );

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const firstResult = response.data.results[0];
        setFormattedAddress(firstResult.formatted_address);
      }
    } catch (error) {
      // console.log('Error fetching formatted address:', error);
    }
  };
  const HandleAddress = () => {
    dispatch(addAddress(formattedAddress));
  };
  useEffect(() => {
    HandleAddress();
  }, [formattedAddress]);
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          width: '100%',
        }}>
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Search here"
          fetchDetails={true}
          onPress={(data, details = null) => {
            const latitude = details?.geometry?.location?.lat;
            const longitude = details?.geometry?.location?.lng;
            setMarkerCoordinates({latitude, longitude});
            setCurrentLocation({latitude, longitude});
            setRegiondata({...regionData, latitude, longitude});
          }}
          query={{
            key: 'AIzaSyCdshQ6BDrl4SZzdo52cGRxjhSzlNdexOQ',
            language: 'en',
          }}
          // currentLocation={true}
          // currentLocationLabel="Current location"
          styles={{
            textInputContainer: {
              // backgroundColor: CUSTOMCOLOR.primary,
            },
            textInput: {
              // height: moderateScale(38),
              color: '#5d5d5d',
              height: verticalScale(60),
              fontSize: moderateScale(16),

              marginVertical: verticalScale(8),
              marginHorizontal: horizontalScale(16),
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
      </View>
      <View style={{height: height}}>
        <View style={styles.Mapcontainer}>
          <MapView
            ref={mapRef}
            maxZoomLevel={16}
            minZoomLevel={4}
            zoomEnabled={true}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={regionData}
            onRegionChangeComplete={onRegionChangeComplete}
            onPress={event => {
              const {latitude, longitude} = event.nativeEvent.coordinate;
              setCurrentLocation({latitude, longitude});
              setMarkerCoordinates({latitude, longitude});
            }}>
            <Marker.Animated
              ref={markerRef}
              title="current place"
              tracksViewChanges={true}
              draggable
              coordinate={markerCoordinates}
              onDragEnd={e => {
                setMarkerCoordinates(e.nativeEvent.coordinate);
                setCurrentLocation(e.nativeEvent.coordinate);
                setRegiondata({
                  ...regionData,
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                });
                fetchFormattedAddress(
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude,
                );
              }}
            />
          </MapView>
        </View>
      </View>

      <View style={styles.bottom}>
        {/* <InputText
                        label={Language[language]['buildingno']}
                        placeholder="Building No"
                        value={input.buildingno}
                        setValue={value => handleChangeValue('buildingno', value)}
                    /> */}
        <InputText
          label="Address"
          placeholder="Street Address"
          value={formattedAddress}
          setValue={setFormattedAddress}
          multiline={true}
        />
        <View style={{alignSelf: 'center'}}>
          <HButton
            label="Save"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bottom: {
    //height: 300,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: horizontalScale(16),
    backgroundColor: CUSTOMCOLOR.background,
    paddingVertical: verticalScale(16),
    gap: verticalScale(16),
    borderRadius: 8,
  },
  addressContainer: {
    borderWidth: moderateScale(1),
    top: moderateScale(50),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
    alignSelf: 'center',
    borderRadius: moderateScale(5),
  },
  Mapcontainer: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
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

import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
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

const ClinicAddress = ({navigation}) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.setAddressText('Some Text');
  }, []);

  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [initialLatitude, setInitialLatitude] = useState(13.0827); // Chennai's latitude
  const [initialLongitude, setInitialLongitude] = useState(80.2707);
  const [markerCoordinates, setMarkerCoordinates] = useState({
    latitude: 13.08,
    longitude: 80.02,
  });
  const [formattedAddress, setFormattedAddress] = useState('');
  const [region, setRegion] = useState({region: {}, markeradta: {}});
  // console.log('current location===>',currentLocation)
  const [input, setInput] = useState({
    buildingno: '',
    street: '',
  });
  const [regionData, setRegiondata] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  // const handleChangeValue = (field, value) => {
  //     setInput(prevValues => ({
  //         ...prevValues,
  //         [field]: value,
  //     }));
  // };

  // navigator.geolocation = require(GEOLOCATION_PACKAGE);

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
          console.log('current location===', currentLocation);
          console.log('marker==', markerCoordinates);
          setRegiondata({...regionData, latitude, longitude});
        },

        error => {
          console.log('Error getting location:', error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    checkLocationPermission();
  }, []);

  console.log('-------------------------refhggg', regionData, currentLocation);
  useEffect(() => {
    console.log('marker data===>', markerCoordinates);
  }, [markerCoordinates.latitude]);

  const onRegionChangeComplete = () => console.log('chnage region');

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
      console.log('Error fetching formatted address:', error);
    }
  };
  const HandleAddress = () => {
    dispatch(addAddress(formattedAddress));
  };
  useEffect(() => {
    HandleAddress();
  }, [formattedAddress]);
  // const handleRegionChangeComplete = newRegion => {};
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.top}>
            <View style={styles.Mapcontainer}>
              <MapView
                ref={ref}
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
                <Marker
                  title="current place"
                  draggable
                  coordinate={markerCoordinates}
                  onDragEnd={e => {
                    setMarkerCoordinates(e.nativeEvent.coordinate);
                    setCurrentLocation(e.nativeEvent.coordinate);
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
            <GooglePlacesAutocomplete
              ref={ref}
              placeholder="Search"
              fetchDetails={true}
              onPress={(data, details = null) => {
                const latitude = details?.geometry?.location?.lat;
                const longitude = details?.geometry?.location?.lng;
                // ref.current.animateToRegion({
                //   latitude: latitude,
                //   longitude: longitude,
                // });
                setMarkerCoordinates({latitude, longitude});
                setCurrentLocation({latitude, longitude});
                // fetchFormattedAddress(latitude, longitude);
              }}
              query={{
                key: 'AIzaSyCdshQ6BDrl4SZzdo52cGRxjhSzlNdexOQ',
                language: 'en',
              }}
              // currentLocation={true}
              // currentLocationLabel="Current location"
              styles={{
                textInputContainer: {
                  // backgroundColor: 'g,
                },
                textInput: {
                  height: moderateScale(38),
                  color: '#5d5d5d',
                  fontSize: moderateScale(16),
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
  },
  top: {
    height: moderateScale(600),
    backgroundColor: CUSTOMCOLOR.primary,
  },
  bottom: {
    //height: 300,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(16),
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
    justifyContent: 'flex-end',
    alignItems: 'center',
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

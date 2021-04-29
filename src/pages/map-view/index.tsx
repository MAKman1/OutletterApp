import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from 'react'
import { Text, View, TouchableOpacity, Share, Animated, Dimensions, Linking, ActivityIndicator, Platform, Image, Alert } from 'react-native'
import styles from './styles'
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { request, PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions';
import RoundedButton from '../../shared/components/buttons/rounded-button';
import mapStyle from '../../shared/constants/mapStyle';
import axios from 'axios';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { showMessage, hideMessage } from "react-native-flash-message";

function MapViewScreen(props: {
	brand: string,
}): JSX.Element {

	const [location, setLocation] = useState(null);
	const [locationNeededText, setLocationNeededText] = useState(false);
	const [locationList, setLocationList] = useState([]);


	useLayoutEffect(() => {
		getLocationPermission();
	}, [])

	const getLocations = (location: any) => {
		let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
		axios.get(url, {
			params: {
				query: "" + props.brand,
				location: "" + location.latitude + "," + location.longitude,
				radius: 30000,
				fields: "formatted_address,name,geometry/location",
				key: "AIzaSyBMpXvQQ1NIBO5Px2WSIFKKRGwo8edIqgs"
			}
		})
			.then(function (response) {
				let res = response.data;
				let locations = res.results.map((c: any) => {
					return (
						{
							latitude: c.geometry.location.lat,
							longitude: c.geometry.location.lng,
							address: c.formatted_address
						}
					)
				})
				setLocationList(locations)
			})
			.catch(function (error) {
				Alert.alert("Failed to retrieve locations nearby. Please try again later.")
			});
	}

	const getLocationPermission = async () => {

		if (Platform.OS == "ios") {
			Geolocation.requestAuthorization("always").then((result) => {
				switch (result) {
					case RESULTS.GRANTED:
						setLocationNeededText(false);
						findCoordinates();
						break;
					default:
						setLocationNeededText(true);
						setLocation(null)
				}
			});
		} else {
			requestMultiple([PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]).then((result) => {
				console.warn("result: " + JSON.stringify(result));
				if (result['android.permission.ACCESS_COARSE_LOCATION']
					&& result['android.permission.ACCESS_FINE_LOCATION']
					&& result['android.permission.ACCESS_BACKGROUND_LOCATION'] === 'granted') {
					setLocationNeededText(false);
					findCoordinates();
				} else {

					setLocationNeededText(true);
					setLocation(null)
				}
			});
		}
	}

	const findCoordinates = () => {
		Geolocation.getCurrentPosition(
			(position) => {
				let location = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.25,
					longitudeDelta: 0.25,
				};
				setLocation(location);
				getLocations(location)
			},
			(error) => {
				console.warn("Failed to retrieve location")
			},
			{ enableHighAccuracy: true, timeout: 10000, maximumAge: 50000 }
		);
	};



	return (
		<View style={styles.rootContainer}>
			{locationNeededText ?
				<View style={[styles.map, styles.permissionView]}>
					<Text style={styles.permissionText}>{"Location access permission is needed to create a new session."}</Text>
					<RoundedButton backgroundColor={'red'} text={"Request Permission"} onPressed={() => getLocationPermission()}></RoundedButton>
				</View>
				:
				(
					location != null ?
						<View style={{ flexDirection: 'column', flex: 1 }}>
							<View style={styles.topView}>
								<Text style={styles.topTitle}>{"Nearby " + props.brand.toUpperCase() + " stores"}</Text>
							</View>
							<MapView
								provider={PROVIDER_GOOGLE}
								mapType={"standard"}
								customMapStyle={mapStyle}
								style={styles.map}
								region={location}
								zoomControlEnabled
								loadingEnabled
								showsCompass
							>

								<Marker tracksViewChanges={false} coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
									<View style={styles.markerView}>
										<View style={styles.markerCircle} />
										<Image source={require('../../assets/location-pin.png')} style={styles.locationPin} />
									</View>
								</Marker>
								{locationList.length ?
									locationList.map((l, index) => (
										<Marker
											key={index}
											onPress={() => showMessage({
												message: "Address: " + l.address,
												type: "info",
											})
											} tracksViewChanges={false} coordinate={{ latitude: l.latitude, longitude: l.longitude }}>
											<Ionicons name={"location"} size={40} color={"#FB0000"} />
										</Marker>
									))
									: null
								}
							</MapView>
						</View>
						:
						<ActivityIndicator style={styles.map} />

				)
			}
		</View >
	)
}
export default MapViewScreen;
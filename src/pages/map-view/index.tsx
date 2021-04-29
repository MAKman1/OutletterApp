import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Share, Animated, Dimensions, Linking, ActivityIndicator, Platform, Image } from 'react-native'
import styles from './styles'
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { request, PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions';
import RoundedButton from '../../shared/components/buttons/rounded-button';
import mapStyle from '../../shared/constants/mapStyle';

function MapViewScreen(props: {
	locationList: any[],
}): JSX.Element {

	const [location, setLocation] = useState(null);
	const [locationNeededText, setLocationNeededText] = useState(false);


	useEffect(() => {
		getLocationPermission();
	}, [])

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
				setLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				})
			},
			(error) => {
				console.warn("Failed to retrieve location")
			},
			{ enableHighAccuracy: true, timeout: 3000, maximumAge: 5000 }
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
									<Image source={require('@assets/location-pin.png')} style={styles.locationPin} />
								</View>
							</Marker>

						</MapView>
						:
						<ActivityIndicator style={styles.map} />

				)
			}
		</View>
	)
}
export default MapViewScreen;
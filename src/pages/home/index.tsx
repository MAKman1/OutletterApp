import React, { useEffect, useState, useRef } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import styles from './styles'

import SafeAreaView from 'react-native-safe-area-view';
import { Switch } from 'react-native-gesture-handler';
import { APP_COLORS } from '../../shared/styles/colors';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function Home(): JSX.Element {
	const cameraRef = useRef();
	const [found, setFound] = useState(true);

	useEffect(() => {
	}, [])



	return (

		<View style={styles.rootContainer}>

			<RNCamera
				ref={() => cameraRef}
				style={styles.cameraView}
				type={RNCamera.Constants.Type.back}
				flashMode={RNCamera.Constants.FlashMode.on}
				androidCameraPermissionOptions={{
					title: 'Permission to use camera',
					message: 'We need your permission to use your camera',
					buttonPositive: 'Ok',
					buttonNegative: 'Cancel',
				}}
			/>
			<SafeAreaView style={styles.cameraOverlayOuter} >
				<View style={styles.cameraOverlay}>
					<TouchableOpacity style={styles.roundedButton} onPress={() => Alert.alert("Going......")}>
						<Text style={styles.roundedButtonText}>Go!</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setFound(true)}>
						<Text style={{ color: 'white', textAlign: 'center' }}>Show Modal</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>


			<Modal
				animationIn="slideInUp"
				isVisible={found}
				coverScreen={true}
				onSwipeComplete={() => {
					setFound(false);
				}}
				swipeDirection="down"
				useNativeDriver={true}
				style={{ margin: 0 }}
			>
				<SafeAreaView style={styles.fullScreenView}>
					<View style={styles.topView}>
						<View style={{ flex: 1 }} />
						<TouchableOpacity onPress={() => { setFound(false) }}>
							<MaterialIcons color={'#959595'} size={19} name="close" />
						</TouchableOpacity>
					</View>

					<ScrollView style={styles.popupScroll}>
						<View style={styles.popupInner}>
							<Text style={[styles.popupTitle, {fontWeight: 'bold'}]}>Best product</Text>

					

						</View>
					</ScrollView>
				</SafeAreaView>
			</Modal>

		</View>
	)
}

export default Home;
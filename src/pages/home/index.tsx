import React, { useEffect, useState, useRef } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import styles from './styles'

import SafeAreaView from 'react-native-safe-area-view';
import { Switch } from 'react-native-gesture-handler';
import { APP_COLORS } from '../../shared/styles/colors';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function Home(): JSX.Element {
	const cameraRef = useRef();
	const [found, setFound] = useState(false);

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
				androidRecordAudioPermissionOptions={{
					title: 'Permission to use audio recording',
					message: 'We need your permission to use your audio',
					buttonPositive: 'Ok',
					buttonNegative: 'Cancel',
				}}
			/>


			{/* <Modal
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
						<TouchableOpacity>
							<Text style={styles.restore}>Restore</Text>
						</TouchableOpacity>
						<View style={{ flex: 1 }} />
						<TouchableOpacity onPress={() => { setFound(false) }}>
							<MaterialIcons color={'#959595'} size={19} name="close" />
						</TouchableOpacity>
					</View>

					<ScrollView style={styles.popupScroll}>
						<View style={styles.popupInner}>
							<Text style={styles.popupTitle}>Go Further with <Text style={{ fontWeight: 'bold' }}>Pro version</Text></Text>

							<View style={styles.titleView}>
								<MaterialIcons color={APP_COLORS.primary} size={20} name="chevron-right" />
								<Text style={styles.textTitle}>15 scanning formats</Text>
							</View>
							<Text style={styles.textDesc}>Scan everything from QR Code to Barcode, Datamatrix, Google Auth, EAN-8 and more.</Text>


						</View>
					</ScrollView>
				</SafeAreaView>
			</Modal> */}

		</View>
	)
}

export default Home;
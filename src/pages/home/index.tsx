import React, { useEffect, useState, useRef } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import styles from './styles'

import SafeAreaView from 'react-native-safe-area-view';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

function Home(): JSX.Element {
	const cameraRef = useRef();

	const genders = ["Male", "Female", "Other"];
	const stores = ["None", "LCWaikiki", "Koton", "Defacto"];

	const [gender, setGender] = useState("Male");
	const [store, setStore] = useState("None");

	const [found, setFound] = useState(false);
	const [genderModal, setGenderModal] = useState(false);
	const [storeModal, setStoreModal] = useState(false);

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
			<SafeAreaView style={styles.cameraOverlayTop} >
				<View style={styles.topOverlay}>

				</View>
			</SafeAreaView>

			<SafeAreaView style={styles.cameraOverlayBottom} >
				<View style={styles.cameraOverlay}>
					<TouchableOpacity style={styles.roundedButton} onPress={() => Alert.alert("Going......")}>
						<Text style={styles.roundedButtonText}>Go!</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setGenderModal(true)}>
						{
							gender == "Male"
								?
								<MaterialCommunity color={'white'} size={25} name="face-profile" />
								:
								(
									gender == "Female"
										?
										<MaterialCommunity color={'white'} size={25} name="face-profile-woman" />
										:
										<MaterialCommunity color={'white'} size={25} name="emoticon-happy-outline" />
								)

						}

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
							<Text style={[styles.popupTitle, { fontWeight: 'bold' }]}>Best product</Text>



						</View>
					</ScrollView>
				</SafeAreaView>
			</Modal>

			{/* Gender Modal */}
			<Modal
				animationIn="slideInUp"
				isVisible={genderModal}
				coverScreen={true}
				onSwipeComplete={() => {
					setGenderModal(false);
				}}
				swipeDirection="down"
				useNativeDriver={true}
				style={{ margin: 0 }}
			>
				<SafeAreaView style={styles.fullScreenView}>
					<View style={styles.topView}>
						<View style={{ flex: 1 }} />
						<TouchableOpacity onPress={() => { setGenderModal(false) }}>
							<MaterialIcons color={'#959595'} size={19} name="close" />
						</TouchableOpacity>
					</View>

					<ScrollView style={styles.popupScroll}>
						<View style={styles.popupInner}>
							{
								genders.map(g => {
									return (<TouchableOpacity style={{ flexDirection: 'row' }} disabled={gender == g} onPress={() => {
										setGender(g);
										setGenderModal(false);
									}}>
										{gender == g ? <MaterialIcons color={'#04B3FF'} size={19} name="check" /> : null}
										<Text style={{ color: 'black' }}>{g}</Text>
									</TouchableOpacity>)
								})
							}
						</View>
					</ScrollView>
				</SafeAreaView>
			</Modal>

		</View>
	)
}

export default Home;
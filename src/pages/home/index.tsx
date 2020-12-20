import React, { useEffect, useState, useRef } from 'react'
import { Text, View, TouchableOpacity, Image, Button, Alert, ScrollView } from 'react-native'
import styles from './styles'

import SafeAreaView from 'react-native-safe-area-view';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';


function Home(): JSX.Element {
	const cameraRef = useRef(null);

	const genders = ["Male", "Female", "Other"];
	const stores = ["None", "LCWaikiki", "Koton", "Defacto"];

	const [gender, setGender] = useState("Male");
	const [store, setStore] = useState("None");

	const [found, setFound] = useState(true);
	const [genderModal, setGenderModal] = useState(false);
	const [storeModal, setStoreModal] = useState(false);

	useEffect(() => {
	}, [])

	function toggleGender(gender: string) {
		if (gender == "Male") {
			setGender("Female");
		}
		else if (gender == "Female") {
			setGender("Other");
		}
		else {
			setGender("Male");
		}
	}

	function switchStore(store: string) {
		switch (store) {
			case 'None':
				return <MaterialCommunity color={'black'} size={35} name="shopping-outline" />;
			case 'LCWaikiki':
				return <Text style={styles.storeText} >L</Text>
			case 'Koton':
				return <Text style={styles.storeText} >K</Text>
			case 'Defacto':
				return <Text style={styles.storeText} >D</Text>
			default:
				return <MaterialCommunity color={'black'} size={35} name="shopping-outline" />;
		}
	}

	async function takePicture() {
		if (cameraRef.current) {
			const options = { quality: 1.0, base64: true };
			const data = await cameraRef.current.takePictureAsync(options);
			uploadImage(data);
		}
	}

	async function uploadImage(image: any) {
		const data = {
			"image": image.uri,
			"store": store,
			"gender": gender
		};
		axios.post('https://3e469808bbb103cc696680d7fa7d8482.m.pipedream.net/', data)
			.then(function (response) {
				console.warn(JSON.stringify(response));
				setFound(true);
			})
			.catch(function (error) {
				Alert.alert("Request failed");
			});
	}

	return (
		<View style={styles.rootContainer}>
			<RNCamera
				ref={cameraRef}
				style={styles.cameraView}
				type={RNCamera.Constants.Type.back}
				flashMode={RNCamera.Constants.FlashMode.off}
				androidCameraPermissionOptions={{
					title: 'Permission to use camera',
					message: 'We need your permission to use your camera',
					buttonPositive: 'Ok',
					buttonNegative: 'Cancel',
				}}
			/>
			<SafeAreaView style={styles.cameraOverlayTop} >
				<View style={styles.topOverlay}>
					<Image style={{ alignSelf: 'center' }}
						source={
							require('../../assets/outletterLogo.png')
						}
					/>
				</View>
			</SafeAreaView>

			<SafeAreaView style={styles.cameraOverlayBottom} >
				<View style={styles.cameraOverlay}>
					<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
						<TouchableOpacity style={styles.bottomIcon} onPress={() => { toggleGender(gender); }}>
							{
								gender == "Male"
									?
									<MaterialCommunity color={'#38AAFE'} size={35} name="face" />
									:
									(
										gender == "Female"
											?
											<MaterialCommunity color={'#F778A9'} size={35} name="face-woman" />
											:
											<Image style={{ position: 'absolute', top: '45%', bottom: 0, margin: 'auto', alignSelf: 'center', maxWidth: 35, maxHeight: 35, }}
												source={
													require('../../assets/genderless.png')
												}
											/>
									)
							}
						</TouchableOpacity>
						<TouchableOpacity style={styles.roundedButton} onPress={() => takePicture()}>
							<Text style={styles.roundedButtonText}>Go!</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.bottomIcon} onPress={() => { setStoreModal(true) }}>
							{
								switchStore(store)
							}
						</TouchableOpacity>
					</View>
					<TouchableOpacity onPress={() => setFound(true)}>
						<Text style={styles.roundedButtonText}>Show Modal</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>


			<Modal
				animationIn="slideInUp"
				isVisible={found}
				propagateSwipe={true}
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
						{/* <View style={{ flex: 1 }} /> */}

						<TouchableOpacity onPress={() => { setFound(false) }}>
							<MaterialIcons color={'#959595'} size={19} name="close" />
						</TouchableOpacity>
					</View>
					<ScrollView style={styles.popupScroll}>
						<View style={styles.popupInner}>
							<ScrollView
								style={styles.horizontalScroll}
								horizontal
								scrollEnabled={true}
								showsHorizontalScrollIndicator={false}
							>
								<View style={styles.horizontalInner}>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>

								</View>
							</ScrollView>

							<ScrollView
								style={styles.horizontalScroll}
								horizontal
								scrollEnabled={true}
								showsHorizontalScrollIndicator={false}
							>
								<View style={styles.horizontalInner}>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>

								</View>

							</ScrollView>

							<ScrollView
								style={styles.horizontalScroll}
								horizontal
								scrollEnabled={true}
								showsHorizontalScrollIndicator={false}
							>
								<View style={styles.horizontalInner}>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>
									<View style={styles.horizontalCard}>
										<Text>Ajeeb</Text>
									</View>

								</View>

							</ScrollView>


						</View>

					</ScrollView>
				</SafeAreaView>
			</Modal>

			{/* Gender Modal */}
			<Modal
				animationIn="slideInUp"
				isVisible={storeModal}
				coverScreen={true}
				onSwipeComplete={() => {
					setStoreModal(false);
				}}
				swipeDirection="down"
				useNativeDriver={true}
				style={{ margin: 0 }}
			>
				<SafeAreaView style={styles.fullScreenView}>
					<View style={styles.topView}>
						<View style={{ flex: 1 }} />
						<TouchableOpacity onPress={() => { setStoreModal(false) }}>
							<MaterialIcons color={'#959595'} size={19} name="close" />
						</TouchableOpacity>
					</View>

					<ScrollView style={styles.popupScroll}>
						<View style={styles.popupInner}>
							{
								stores.map(s => {
									return (<TouchableOpacity key="{s}" style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'center', minWidth: 300, borderRadius: 10, borderBottomWidth: 1, borderColor: '#04B3FF' }} disabled={store == s} onPress={() => {
										setStore(s);
										setStoreModal(false);
									}}>
										<Text key="{s}" style={{ textAlign: 'center', fontSize: 35, color: 'black' }}>
											{s}
										</Text>
										{store == s ? <MaterialIcons key="{s}" style={{ textAlignVertical: 'center' }} color={'#04B3FF'} size={30} name="check" /> : null}
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
import React, { useEffect, useState, useRef } from 'react'
import { Text, View, TouchableOpacity, Image, Button, Switch, Alert, ScrollView, Platform, ActivityIndicator, Linking } from 'react-native'
import styles from './styles'

import SafeAreaView from 'react-native-safe-area-view';
import Modal from 'react-native-modal';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

// @ts-ignore
import {
	ViroARScene,
	ViroText,
	ViroConstants,
	ViroARSceneNavigator
} from '@viro-community/react-viro';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

import ARDisplay from './arcomponent/index'


function Home(props: any): JSX.Element {
	const cameraRef = useRef(null);
	const arScene = useRef(null);


	const genders = ["Male", "Female", "Other"];
	const stores = ["None", "Koton", "LCWaikiki", "Boyner", "Defacto", "Trendyol", "H&M"];

	const [gender, setGender] = useState("Male");
	const [store, setStore] = useState("None");

	const [arfound, setAr] = useState(true);
	const [found, setFound] = useState(false);
	const [storeModal, setStoreModal] = useState(false);
	const [debugModal, setDebugModal] = useState(true);

	const [links, setLinks] = useState([]);
	const [images, setImages] = useState([]);
	const [segImg, setSegImg] = useState(null);
	const [tags, setTags] = useState([]);
	const [text, setText] = useState([]);
	const [colors, setColors] = useState([]);

	const [loading, setLoading] = useState(false);

	const [queryLabel, setQueryLabel] = useState(null);
	const [resultLabels, setResultLabels] = useState([]);


	useEffect(() => {
	}, [])

	function resetStates() {
		setImages([]);
		setLinks([]);
		setSegImg(null);
		setText([]);
		setTags([]);
		setColors([]);
		setQueryLabel(null);
		setResultLabels([]);
	}

	function setStates(data: any) {
		setLinks(data.links);
		setImages(data.imageLinks);
		if (debugModal) {
			setSegImg(data.segmented_image);
			setText(data.text);
			setTags(data.tags);
			setColors(data.colors);
			setQueryLabel(data.queryLabel);
			setResultLabels(data.resultLabels);
		}
	}

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

	function toggleDebug(debugModal: boolean) {
		setDebugModal(!debugModal);
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
			case 'Boyner':
				return <Text style={styles.storeText} >B</Text>
			case 'H&M':
				return <Text style={styles.storeText} >H</Text>
			case 'Trendyol':
				return <Text style={styles.storeText} >T</Text>
			default:
				return <MaterialCommunity color={'black'} size={35} name="shopping-outline" />;
		}
	}

	async function takePicture() {
		arScene.current.replace({ scene: ARDisplay, passProps: { arfound } })
		setAr(!arfound);
		// if (cameraRef.current) {
		// 	const options = { quality: 0.5, base64: true };
		// 	const data = await cameraRef.current.takePictureAsync(options);
		// 	uploadImage(data);
		// }
	}

	async function uploadImage(image: any) {
		setLoading(true);
		// POST localhost: 8000 / api / v1 / similarItems
		// image = (image file)
		// gender = 'm' / 'f'
		// shop = '0/1/2/3/4/5/6'(need more discussion on this)
		// debug = true / false
		let postGender;
		switch (gender) {
			case 'Male':
				postGender = 'm';
				break;
			case 'Female':
				postGender = 'f';
				break;
			case 'Other':
				postGender = 'm';
				break;
			default:
				postGender = 'm';
				break;
		}

		let shop;
		switch (store) {
			case 'Koton':
				shop = 0;
				break;
			case 'LCWaikiki':
				shop = 1;
				break;
			case 'Boyner':
				shop = 2;
				break;
			case 'Defacto':
				shop = 3;
				break;
			case 'Trendyol':
				shop = 4;
				break;
			case 'H&M':
				shop = 5;
				break;
			case 'None':
				shop = 0;
				break;
			default:
				shop = 0;
				break;
		}

		var data = new FormData();
		data.append("image", {
			uri: Platform.OS === "android" ? image.uri : image.uri.replace("file://", ""),
			name: 'uploaded_image_' + Date.now() + '.jpg',
			type: 'image/*'
		})
		data.append("gender", postGender);
		data.append("debug", debugModal);
		data.append("shop", shop);

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}

		// console.warn(JSON.stringify(data));
		axios.post('http://139.179.203.186:8000/api/v1/similarItems/', data, config)
			.then(function (response) {
				// console.warn(JSON.stringify(response));
				setStates(response.data);
				setFound(true);
				setLoading(false);
			})
			.catch(function (error) {
				resetStates();
				console.warn("Error: " + JSON.stringify(error));
				setLoading(false);
			});
	}

	function _onInitialized(state: any, reason: any) {
		if (state == ViroConstants.TRACKING_NORMAL) {
			console.log('g')
		} else if (state == ViroConstants.TRACKING_NONE) {
			// Handle loss of tracking
		}
	}

	return (
		<View style={styles.rootContainer}>
			
			{/* <RNCamera
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
			/> */}
			<ViroARSceneNavigator
				ref={arScene}
				autofocus={true}
				initialScene={{
					scene: ARDisplay,
				}}
				viroAppProps={ 
					{arfound}
				}
				style={{ flex: 1 }}
			/>
			<SafeAreaView style={styles.cameraOverlayTop} >
				<View style={{ flex: 1, flexDirection: 'row' }}>
					<View style={styles.topOverlay}>
						<Image style={{ alignSelf: 'center' }}
							source={
								require('../../assets/outletterLogo.png')
							}
						/>
					</View>
				</View>
				<View style={{ alignContent: 'center', backgroundColor: 'white', borderRadius: 30, maxWidth: 90, height: 65, opacity: 0.5 }}>
					<Text style={{ paddingTop: 10, color: 'black', textAlign: 'center', fontWeight: "bold", }}>Debug</Text>
					{/* <Switch
						style={{ alignSelf: 'center' }}
						trackColor={{ false: "#767577", true: "#8DCC43" }}
						thumbColor={debugModal ? "white" : "white"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={() => toggleDebug(debugModal)}
						value={debugModal}
					/> */}
				</View>
				{loading && <ActivityIndicator color={"white"} size={35} style={{ marginTop: '50%' }} />}
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
						<TouchableOpacity disabled={loading} style={styles.roundedButton} onPress={() => takePicture()}>
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
						<View style={{ flex: 1 }} />
						<TouchableOpacity onPress={() => { setFound(false) }}>
							<MaterialIcons color={'#959595'} size={19} name="close" />
						</TouchableOpacity>
					</View>
					<ScrollView style={styles.popupScroll}>
						<TouchableOpacity activeOpacity={1}>
							<View style={{ alignContent: 'flex-start', paddingLeft: 20 }}>
								<Text style={styles.popupTitle}>Best product</Text>
							</View>

							{/* <View style={styles.popupInner}> */}
							<ScrollView
								style={styles.horizontalScroll}
								horizontal
								scrollEnabled={true}
								showsHorizontalScrollIndicator={false}
							>
								{images.length &&
									<TouchableOpacity activeOpacity={1} style={styles.horizontalInner} onPress={() => Linking.openURL(links[0])}>
										<View style={styles.horizontalCard}>
											<Image style={{ width: 90, height: 90, borderRadius: 5 }} source={{ uri: images[0] }} />
										</View>
									</TouchableOpacity>
								}
							</ScrollView>

							<View style={{ alignContent: 'flex-start', paddingLeft: 20 }}>
								<Text style={styles.popupTitle}>Top Items</Text>
							</View>

							<ScrollView
								style={styles.horizontalScroll}
								horizontal
								scrollEnabled={true}
								showsHorizontalScrollIndicator={false}
							>
								<TouchableOpacity activeOpacity={1}>

									<View style={styles.horizontalInner}>
										{images.map((i, index) => {
											if (index != 0) {
												return (<TouchableOpacity activeOpacity={1} style={styles.horizontalInner} onPress={() => Linking.openURL(links[index])}>
													<View style={styles.horizontalCard}>
														<Image style={{ width: 90, height: 90, borderRadius: 5 }} source={{ uri: images[index] }} />
													</View>
												</TouchableOpacity>)
											}
										})}

									</View>
								</TouchableOpacity>
							</ScrollView>

							{/* <View style={{ alignContent: 'flex-start', paddingLeft: 20 }}>
								<Text style={styles.popupTitle}>Recommended Items</Text>
							</View>

							<ScrollView
								style={styles.horizontalScroll}
								horizontal
								scrollEnabled={true}
								showsHorizontalScrollIndicator={false}
							>
								<TouchableOpacity activeOpacity={1}>

									<View style={styles.horizontalInner}>
										{images.map((i, index) => {
											if (index != 0) {
												return (<TouchableOpacity activeOpacity={1} style={styles.horizontalInner} onPress={() => Linking.openURL(links[index])}>
													<View style={styles.horizontalCard}>
														<Image style={{ width: 90, height: 90, borderRadius: 5 }} source={{ uri: images[index] }} />
													</View>
												</TouchableOpacity>)
											}
										})}

									</View>
								</TouchableOpacity>
							</ScrollView> */}

							{debugModal &&
								<View>

									<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
										<Text style={styles.popupTitle}>---Debugging---</Text>
									</View>

									<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
										<Text style={styles.popupTitle}>Tags</Text>
										<Text style={{ color: 'black' }}>{JSON.stringify(tags)}</Text>
									</View>

									<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
										<Text style={styles.popupTitle}>Text</Text>
										<Text style={{ color: 'black' }}>{JSON.stringify(text)}</Text>
									</View>

									<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
										<Text style={styles.popupTitle}>Colors</Text>
										<Text style={{ color: 'black' }}>{JSON.stringify(colors)}</Text>
									</View>

									<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
										<Text style={styles.popupTitle}>Query label</Text>
										<Text style={{ color: 'black' }}>{JSON.stringify(queryLabel)}</Text>
									</View>

									<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
										<Text style={styles.popupTitle}>Result labels</Text>
										<Text style={{ color: 'black' }}>{JSON.stringify(resultLabels)}</Text>
									</View>
									<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
										<Text style={styles.popupTitle}>Segmented image</Text>
									</View>
									<Image style={{ height: 400, width: 400 }} source={{ uri: 'data:image/jpeg;base64,' + segImg }} resizeMode={'contain'} />

								</View>
							}


							{/* </View> */}
						</TouchableOpacity>
					</ScrollView>
				</SafeAreaView>
			</Modal>


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
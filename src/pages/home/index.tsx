import React, { useEffect, useState, useRef } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Linking } from 'react-native'
import styles from './styles'

import SafeAreaView from 'react-native-safe-area-view';
import Modal from 'react-native-modal';
import axios from 'axios';

// @ts-ignore
import {
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

	const [arfound, setAr] = useState(false);
	const [found, setFound] = useState(false);
	const [storeModal, setStoreModal] = useState(false);
	const [debugModal, setDebugModal] = useState(true);

	const [queryItem, setQueryItem] = useState<any>({});
	const [similarItems, setSimilarItems] = useState<any[]>([]);
	const [bestItem, setBestItem] = useState<any>({});

	const [loading, setLoading] = useState(false);

	useEffect(() => {
	}, [])

	function resetStates() {
		setQueryItem([]);
		setSimilarItems([]);
		setBestItem({});
	}

	function setStates(data: any) {
		setQueryItem(data.query_item);
		setSimilarItems(data.similar_items);
		setBestItem(data.similar_items[0]);
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
				return <Image style={styles.storeLogo} source={require('../../assets/lcLogo.png')}/>
			case 'Koton':
				return <Image style={styles.storeLogo} source={require('../../assets/kotonLogo.png')}/> //<Text style={styles.storeText} >K</Text>
			case 'Defacto':
				return <Image style={styles.storeLogo} source={require('../../assets/defactoLogo.jpg')}/>
			case 'Boyner':
				return <Image style={styles.storeLogo} source={require('../../assets/boynerLogo.jpg')}/>
			case 'H&M':
				return <Image style={styles.storeLogo} source={require('../../assets/hmLogo.png')}/>
			case 'Trendyol':
				return <Image style={{flex: 1, resizeMode: 'center', alignSelf: 'center'}} source={require('../../assets/trendyolLogo.png')}/>
			default:
				return <MaterialCommunity color={'black'} size={35} name="shopping-outline" />;
		}
	}

	async function takePicture() {
		// arScene.current.replace({ scene: ARDisplay, passProps: { arfound } })
		// if (cameraRef.current) {
		// 	const options = { quality: 0.5, base64: true };
		// 	const data = await cameraRef.current.takePictureAsync(options);
		// 	uploadImage(data);
		// }
		setAr(false);
		arScene.current._resetARSession( true, true);
		arScene.current._takeScreenshot('outletter_' + Date.now() + '_img', false).then((data: any) => {
			console.log(data.success, data.url, data.errorCode);
			uploadImage(data);
		})
			.catch((error: any) => {
				console.log('error' + JSON.stringify(error));
			});
	}

	async function uploadImage(image: any) {
		setLoading(true);
		// POST localhost: 8000 / api / v1 / similarItems
		// image = (image file)
		// gender = 'Male' / 'Female'
		// shop = 'Name of Shop'(need more discussion on this)
		// debug = true / false
		let postGender;
		switch (gender) {
			case 'Male':
				postGender = 'male';
				break;
			case 'Female':
				postGender = 'female';
				break;
			case 'Other':
				postGender = 'male';
				break;
			default:
				postGender = 'male';
				break;
		}

		let shop;
		switch (store) {
			case 'Koton':
				shop = 'www.koton.com';
				break;
			case 'LCWaikiki':
				shop = 'www.lcwaikiki.com';
				break;
			case 'Boyner':
				shop = 'www.boyner.com.tr';
				break;
			case 'Defacto':
				shop = 'www.defacto.com.tr';
				break;
			case 'Koton':
				shop = 'www.koton.com';
				break;
			case 'Trendyol':
				shop = 'www.trendyol.com';
				break;
			case 'H&M':
				shop = 'www2.hm.com/tr_tr';
				break;
			case 'None':
				shop = 'www.trendyol.com';;
				break;
			default:
				shop = 'www.trendyol.com';;
				break;
		}

		var data = new FormData();
		data.append("picture", {
			uri: 'file://' + image.url,
			name: 'uploaded_image_' + Date.now() + '.jpg',
			type: 'image/*'
		})
		// data.append("picture", 'file://' + image.url)
		// data.append("picture", Platform.OS === "android" ? image.uri : image.uri.replace("file://", ""));
		// data.append("picture", image.uri.replace("file:///", "file://"));
		data.append("gender", postGender);
		data.append("shop", shop);
		data.append("debug", debugModal);


		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}

		// console.log(JSON.stringify(data));
		axios.post('https://6461348afde3.ngrok.io/api/v1/items/', data, config)
			.then(function (response) {
				console.warn(JSON.stringify(response));
				setStates(response.data);
				setFound(true);
				setLoading(false);
				setAr(true);
			})
			.catch(function (error) {
				resetStates();
				console.warn("Error: " + JSON.stringify(error));
				setLoading(false);
			});
	}

	return (
		<View style={styles.rootContainer}>
			<ViroARSceneNavigator
				ref={arScene}
				autofocus={true}
				initialScene={{
					scene: ARDisplay,
				}}
				viroAppProps={
					{ arfound, bestItem }
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
								{bestItem &&
									<TouchableOpacity activeOpacity={1} style={styles.horizontalInner} onPress={() => Linking.openURL(bestItem.url)}>
										<View style={styles.horizontalCard}>
											<Image style={{ width: 90, height: 90, borderRadius: 5 }} source={{ uri: bestItem.image_url }} />
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
										{similarItems.map((item, index) => {
											if (index != 0 && item != null) {
												return (<TouchableOpacity activeOpacity={1} style={styles.horizontalInner} onPress={() => Linking.openURL(item[index].url)} key={index}>
													<View style={styles.horizontalCard}>
														<Image style={{ width: 90, height: 90, borderRadius: 5 }} source={{ uri: item.image_url }} />
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

							{debugModal && queryItem &&
								<View>

									<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
										<Text style={styles.popupTitle}>---Debugging---</Text>
									</View>

									<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
										<Text style={styles.popupTitle}>Labels</Text>
										<Text style={{ color: 'black' }}>{JSON.stringify(queryItem.label)}</Text>
									</View>

									<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
										<Text style={styles.popupTitle}>Text</Text>
										<Text style={{ color: 'black' }}>{JSON.stringify(queryItem.texts)}</Text>
									</View>

									<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
										<Text style={styles.popupTitle}>Colors</Text>
										<Text style={{ color: 'black' }}>{JSON.stringify(queryItem.color)}</Text>
									</View>

									<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
										<Text style={styles.popupTitle}>Segmented image</Text>
									</View>
									<Image style={{ height: 400, width: 400 }} source={{ uri: 'https://867229285c17.ngrok.io' + queryItem.picture }} resizeMode={'contain'} />

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
								stores.map( (s, index) => {
									return (<TouchableOpacity key={index} style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'center', minWidth: 300, borderRadius: 10, borderBottomWidth: 1, borderColor: '#04B3FF' }} disabled={store == s} onPress={() => {
													setStore(s);
													setStoreModal(false);
												}}>
											<Text style={{ textAlign: 'center', fontSize: 35, color: 'black' }}>
												{s}
											</Text>
										{store == s ? <MaterialIcons style={{ textAlignVertical: 'center' }} color={'#04B3FF'} size={30} name="check" /> : null}
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
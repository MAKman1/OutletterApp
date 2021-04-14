import React, { useEffect, useState, useRef } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Linking, Dimensions, Animated, LogBox } from 'react-native'
import styles from './styles'

import SafeAreaView from 'react-native-safe-area-view';
import Modal from 'react-native-modal';
import axios from 'axios';

// @ts-ignore
import {
	ViroARSceneNavigator
} from '@viro-community/react-viro';
import LinearGradient from 'react-native-linear-gradient';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import Hamburger from 'react-native-hamburger';

import ARDisplay from './arcomponent/index'
import BottomSwipeableModal from '../../shared/components/modals/bottom-swipeable-modal';
import ProductFoundModal from '../../shared/components/modals/product-found-modal';


function Home(props: any, { navigation }: any): JSX.Element {
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
	const [menuActive, setMenuActive] = useState(false);

	const [queryItem, setQueryItem] = useState<any>({});
	const [similarItems, setSimilarItems] = useState<any[]>([]);
	const [bestItem, setBestItem] = useState<any>({});

	const [loading, setLoading] = useState(false);


	//Animations
	const widthAnim = useRef(new Animated.Value(0)).current;
	const heightAnim = useRef(new Animated.Value(0)).current;


	useEffect(() => {
		LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
	}, [])

	useEffect(() => {
		if (menuActive) {
			Animated.spring(
				widthAnim,
				{
					toValue: Dimensions.get('window').width,
					duration: 1500
				}
			).start();
			Animated.spring(
				heightAnim,
				{
					toValue: (Dimensions.get('window').height * 0.5),
					duration: 1500
				}
			).start();
		} else {
			Animated.spring(
				widthAnim,
				{
					toValue: 0,
					duration: 1500
				}
			).start();
			Animated.spring(
				heightAnim,
				{
					toValue: 0,
					duration: 1500
				}
			).start();
		}
	}, [menuActive])

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
				return <MaterialCommunity color={'black'} size={30} name="shopping-outline" />;
			case 'LCWaikiki':
				return <Image style={styles.storeLogo} resizeMode={"contain"} source={require('../../assets/lcLogo.png')} />
			case 'Koton':
				return <Image style={styles.storeLogo} resizeMode={"contain"} source={require('../../assets/kotonLogo.png')} /> //<Text style={styles.storeText} >K</Text>
			case 'Defacto':
				return <Image style={styles.storeLogo} resizeMode={"contain"} source={require('../../assets/defactoLogo.jpg')} />
			case 'Boyner':
				return <Image style={styles.storeLogo} resizeMode={"contain"} source={require('../../assets/boynerLogo.jpg')} />
			case 'H&M':
				return <Image style={styles.storeLogo} resizeMode={"contain"} source={require('../../assets/hmLogo.png')} />
			case 'Trendyol':
				return <Image style={styles.storeLogo} resizeMode={"contain"} source={require('../../assets/trendyolLogo.png')} />
			default:
				return <MaterialCommunity color={'black'} size={23} name="shopping-outline" />;
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
		arScene.current._resetARSession(true, true);
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

	function openMenuItem(pageName: any) {
		props.navigation.push(pageName);
	}

	return (
		<View style={[styles.rootContainer, { backgroundColor: '#000' }]}>
			{/* <ViroARSceneNavigator
				ref={arScene}
				autofocus={false}
				initialScene={{
					scene: ARDisplay,
				}}
				viroAppProps={
					{ arfound, bestItem }
				}
				style={{ flex: 1 }}
			/> */}
			{/* Menu */}
			<Animated.View style={[styles.menuOverlay, { width: widthAnim, height: heightAnim }]}>
				{menuActive ?
					<LinearGradient style={styles.menuInner} useAngle={true} angle={45} colors={['#00E9D8', '#009ED9']} >
						<TouchableOpacity style={styles.menuItem}>
							<Text style={styles.menuText}>{"Wishlist"}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.menuItem} onPress={() => openMenuItem("Reviews")}>
							<Text style={styles.menuText}>{"Reviews"}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.menuItem}>
							<Text style={styles.menuText}>{"Liked Items"}</Text>
						</TouchableOpacity>
						<View style={styles.menuBottom}>
							<TouchableOpacity style={[styles.circleButton, { marginRight: 30 }]}>
								<Feather color={'#FFF'} size={25} name="settings" />
							</TouchableOpacity>
							<TouchableOpacity style={styles.circleButton}>
								<Feather color={'#FFF'} size={25} name="power" />
							</TouchableOpacity>
						</View>
					</LinearGradient>
					: null}

			</Animated.View>
			<SafeAreaView style={styles.cameraOverlayTop} >
				<View style={styles.topIconView}>
					<View style={{ paddingHorizontal: 10, paddingTop: 20 }}>
						<Hamburger
							active={menuActive}
							type="spinCross"
							onPress={() => menuActive ? setMenuActive(false) : setMenuActive(true)}
							color={"white"}
						/>
					</View>
					<View style={styles.topOverlay}>
						<Image style={{ alignSelf: 'center' }}
							source={
								require('../../assets/outletterLogo.png')
							}
						/>
					</View>
				</View>

				{loading && <ActivityIndicator color={"white"} size={35} style={{ marginTop: '50%' }} />}

			</SafeAreaView>

			<SafeAreaView style={styles.cameraOverlayBottom} >
				<View style={{ width: '40%', borderRadius: 30, marginTop: 10 }}>
					{/* <Switch
						style={{ alignSelf: 'center' }}
						trackColor={{ false: "#767577", true: "#8DCC43" }}
						thumbColor={debugModal ? "white" : "white"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={() => toggleDebug(debugModal)}
						value={debugModal}
					/> */}
					<TouchableOpacity onPress={() => setFound(true)}>
						<Text style={styles.roundedButtonText}>Show Popup</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.cameraOverlay}>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						<TouchableOpacity style={styles.bottomIcon} onPress={() => { toggleGender(gender); }}>
							{
								gender == "Male"
									?
									<MaterialCommunity color={'#38AAFE'} size={30} name="face" />
									:
									(
										gender == "Female"
											?
											<MaterialCommunity color={'#F778A9'} size={30} name="face-woman" />
											:
											<Image style={{ margin: 'auto', alignSelf: 'center', maxWidth: 30, maxHeight: 30, }}
												source={
													require('../../assets/genderless.png')
												}
											/>
									)
							}
						</TouchableOpacity>
						<TouchableOpacity disabled={loading} style={styles.roundedButtonView} onPress={() => takePicture()}>
							<LinearGradient useAngle={true} angle={45} colors={['#00E9D8', '#009ED9']} style={styles.roundedButton}>
								<Text style={styles.roundedButtonText}>Go!</Text>
							</LinearGradient>

						</TouchableOpacity>
						<TouchableOpacity style={styles.bottomIcon} onPress={() => { setStoreModal(true) }}>
							{
								switchStore(store)
							}
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>


			<BottomSwipeableModal
				onCollapse={() => {
					if (found)
						setFound(false)
					if (storeModal)
						setStoreModal(false)
				}}
				show={found || storeModal}
				navigation={props.navigation}
				height="70%">

				{storeModal ?

					stores.map((s, index) => {
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

					:
					<ProductFoundModal bestItem={bestItem} similarItems={similarItems} />
				}


			</BottomSwipeableModal>
		</View>
	)
}

export default Home;
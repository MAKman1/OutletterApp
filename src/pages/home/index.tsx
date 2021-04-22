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
import { launchImageLibrary } from 'react-native-image-picker';
import Hamburger from 'react-native-hamburger';

import ARDisplay from './arcomponent/index'
import BottomSwipeableModal from '../../shared/components/modals/bottom-swipeable-modal';
import ProductFoundModal from '../../shared/components/modals/product-found-modal';
import WriteReview from '../write-review';
import Reviews from '../reviews';
import BestProduct from '../best-product';
import LikedItems from '../liked-items';
import Wishlist from '../wishlist/index';
import SelectedItem from '../selectedItem/index'

import { CropView } from 'react-native-image-crop-tools';


function Home(props: any, { navigation }: any): JSX.Element {
	const cameraRef = useRef(null);
	const arScene = useRef(null);
	const cropViewRef = useRef(null);


	const genders = ["Male", "Female", "Other"];
	const stores = ["None", "Koton", "LCWaikiki", "Boyner", "Defacto", "Trendyol", "H&M"];

	const [gender, setGender] = useState("Male");
	const [store, setStore] = useState("None");

	const [arfound, setAr] = useState(false);
	const [debugModal, setDebugModal] = useState(true);
	const [menuActive, setMenuActive] = useState(false);
	const [iconActive, setIconActive] = useState(false);

	const [queryItem, setQueryItem] = useState<any>({});
	const [similarItems, setSimilarItems] = useState<any[]>([]);
	const [bestItem, setBestItem] = useState<any>({});

	const [loading, setLoading] = useState(false);
	const [navRoute, setNavRoute] = useState(null);
	const [secondRoute, setSecondRoute] = useState(null);

	const [showCrop, setShowCrop] = useState(false);
	const [currentImage, setCurrentImage] = useState('https://i.pinimg.com/736x/0b/0c/d5/0b0cd5d09cd50a1c11c630b908ba48a3.jpg');

	// const [uploadedImage, setUploadedImage] = useState('../../assets/lcLogo.png');


	//Animations
	const widthAnim = useRef(new Animated.Value(0)).current;
	const heightAnim = useRef(new Animated.Value(0)).current;
	const iconPos = useRef(new Animated.Value(0)).current;
	const imageIconPos = useRef(new Animated.Value(0)).current;

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
					toValue: (Dimensions.get('window').height * 0.6),
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


	useEffect(() => {
		if (iconActive) {
			Animated.spring(
				iconPos,
				{
					toValue: 70,
					duration: 100
				}
			).start();
			Animated.spring(
				imageIconPos,
				{
					toValue: 140,
					duration: 100
				}
			).start();
		} else {
			Animated.spring(
				iconPos,
				{
					toValue: 0,
					duration: 1500
				}
			).start();
			Animated.spring(
				imageIconPos,
				{
					toValue: 0,
					duration: 100
				}
			).start();
		}
	}, [iconActive])

	const getModalHeight = (navRoute: any) => {
		if (navRoute == null)
			return 0.7;

		switch (navRoute.name) {
			case "productFoundScreen":
				return 0.8
			case "writeReviewScreen":
				return 0.8
			case "reviewsScreen":
				return 0.8
			case "bestProductScreen":
				return 0.7
			case "likedItemsScreen":
				return 0.8
			case "chooseStoreScreen":
				return 0.55
			default:
				return 0.7
		}
	}

	const renderComponent = (navRoute: any) => {
			
		if (navRoute == null)
			return null;

		switch (navRoute.name) {
			case "selectedItemScreen":
				return <SelectedItem />
			case "wishlistScreen":
				return <Wishlist />
			case "productFoundScreen":
				return <ProductFoundModal bestItem={bestItem} similarItems={similarItems} queryItem={queryItem} onReviewPressed={(id: any) => {
					setSecondRoute({ name: "writeReviewScreen", props: id })
				}} />
			case "writeReviewScreen":
				return <WriteReview id={navRoute.props} />
			case "reviewsScreen":
				return <Reviews />
			case "bestProductScreen":
				return <BestProduct />
			case "likedItemsScreen":
				return <LikedItems />
			case "chooseStoreScreen":
				return stores.map((s, index) => {
					return (<TouchableOpacity key={index} style={{ marginTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'center', minWidth: 300, borderRadius: 10, borderBottomWidth: 1, borderColor: '#04B3FF' }} disabled={store == s} onPress={() => {
						setStore(s);
						setNavRoute(null);
					}}>
						<Text style={{ textAlign: 'center', fontSize: 35, color: 'black' }}>
							{s}
						</Text>
						{store == s ? <MaterialIcons style={{ textAlignVertical: 'center' }} color={'#04B3FF'} size={30} name="check" /> : null}
					</TouchableOpacity>)
				})
			default:
				return <ActivityIndicator />
		}
	}

	function resetStates() {
		setQueryItem({});
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


	async function showCropView() {
		arScene.current._resetARSession(true, true);
		arScene.current._takeScreenshot('outletter_' + Date.now() + '_img', false).then((data: any) => {
			console.log(data.success, data.url, data.errorCode);
			setCurrentImage('file://' + data.url);
			setShowCrop(true);
		}).catch((error: any) => {
			console.log('error' + JSON.stringify(error));
		});
	}

	async function uploadCroppedImage() {
		// let image = await cropViewRef.current.saveImage(true, 90);
		setShowCrop(false);
		uploadImage(currentImage);
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
			// uri: 'file://' + image.url,
			uri: image,
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
		axios.post('https://3e01cf7dcbd2.ngrok.io/api/v1/items/', data, config)
			.then(function (response) {
				console.log(JSON.stringify(response));
				setStates(response.data);
				setNavRoute({ name: "productFoundScreen" });
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
		setNavRoute({ name: pageName });
		setMenuActive(false);
	}

	function uploadFromGallery() {
		let options = {
			mediaType: 'Photo',
			quality: 1,
		};
		launchImageLibrary(options, (response) => {
			if (response.uri) {
				console.log(response.uri)
				setCurrentImage(response.uri);
				setShowCrop(true);
			}
		});
	}

	return (
		<View style={[styles.rootContainer, { backgroundColor: '#000' }]}>
			{showCrop ?
				<SafeAreaView style={styles.cropOuter}>
					<CropView
						sourceUrl={currentImage}
						style={styles.cropView}
						ref={cropViewRef}
						onImageCrop={(res) => setCurrentImage(res.uri)}
					/>
				</SafeAreaView>
				:
				// null
				<ViroARSceneNavigator
					ref={arScene}
					autofocus={false}
					initialScene={{
						scene: ARDisplay,
					}}
					viroAppProps={
						{ arfound, bestItem }
					}
					style={{ flex: 1 }}
				/>
			}

			{/* Menu */}
			<Animated.View style={[styles.menuOverlay, { width: widthAnim, height: heightAnim }]}>
				{menuActive ?
					<LinearGradient style={styles.menuInner} useAngle={true} angle={45} colors={['#00E9D8', '#009ED9']} >
						<TouchableOpacity style={styles.menuItem} onPress={() => openMenuItem("wishlistScreen")}>
							<Text style={styles.menuText}>{"Wishlist"}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.menuItem} onPress={() => openMenuItem("likedItemsScreen")}>
							<Text style={styles.menuText}>{"Liked Items"}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.menuItem} onPress={() => openMenuItem("reviewsScreen")}>
							<Text style={styles.menuText}>{"Reviews"}</Text>
						</TouchableOpacity>
						{/* <TouchableOpacity style={styles.menuItem} onPress={() => openMenuItem("bestProductScreen")}>
							<Text style={styles.menuText}>{"Best Product"}</Text>
						</TouchableOpacity> */}

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
				<View style={styles.cameraOverlay}>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
						{!showCrop ?
							<>
								<TouchableOpacity style={{ ...styles.bottomIcon, zIndex: 2, position: 'absolute' }} onPress={() => setIconActive(!iconActive)}>
									<MaterialCommunity color={'#38AAFE'} size={30} name="plus" />
								</TouchableOpacity>
								<View>
									<Animated.View style={{ overflow: 'hidden', bottom: iconPos, zIndex: 1, position: 'absolute' }}>
										<TouchableOpacity style={{ ...styles.bottomIcon }} onPress={() => { toggleGender(gender); }}>
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
									</Animated.View>
									<Animated.View style={{ overflow: 'hidden', bottom: imageIconPos, zIndex: 1 }}>
										<TouchableOpacity style={{ ...styles.bottomIcon, zIndex: 2 }} onPress={() => uploadFromGallery()}>
											<MaterialCommunity color={'#38AAFE'} size={30} name="image" />
										</TouchableOpacity>
									</Animated.View>
								</View>
							</>

							:
							null
						}
						<TouchableOpacity disabled={loading} style={[styles.roundedButtonView, showCrop ? { marginLeft: 50 } : null]} onPress={() => { showCrop ? uploadCroppedImage() : showCropView() }}>
							{/* <TouchableOpacity >
								<Text style={styles.roundedButtonText}>Upload Image</Text>
							</TouchableOpacity> */}
							<LinearGradient useAngle={true} angle={45} colors={['#00E9D8', '#009ED9']} style={styles.roundedButton}>
								<Text style={styles.roundedButtonText}>{"Go!"}</Text>
							</LinearGradient>
						</TouchableOpacity>
						{!showCrop ?
							<TouchableOpacity style={styles.bottomIcon} onPress={() => { setNavRoute({ name: "chooseStoreScreen" }) }}>
								{
									switchStore(store)
								}
							</TouchableOpacity>
							:
							<TouchableOpacity style={styles.bottomIcon} onPress={() => setShowCrop(false)}>
								<MaterialCommunity color={'black'} size={30} name="close" />
							</TouchableOpacity>
						}
					</View>
				</View>
			</SafeAreaView>

			<BottomSwipeableModal
				onCollapse={() => secondRoute != null ? setSecondRoute(null) : setNavRoute(null)}
				show={secondRoute != null || navRoute != null}
				navigation={props.navigation}
				height={secondRoute != null ? getModalHeight(secondRoute) : getModalHeight(navRoute)}>
				{renderComponent(secondRoute != null ? secondRoute : navRoute)}
			</BottomSwipeableModal>
		</View>
	)
}
export default Home;
import React, { useEffect, useState, useRef } from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Linking, Dimensions, Animated, LogBox, Platform } from 'react-native'
import styles from './styles'

import SafeAreaView from 'react-native-safe-area-view';
import Modal from 'react-native-modal';
import axios from 'axios';

// @ts-ignore
import {
	ViroARSceneNavigator
} from '@viro-community/react-viro';
import LinearGradient from 'react-native-linear-gradient';

import { Bars } from 'react-native-loader';


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

import { SERVER_URL } from '../../shared/constants/constants';
import SegmentationSelector from '../segmentation-selector';
import ImageResizer from 'react-native-image-resizer';
import MapViewScreen from '../map-view';


function Home(props: any, { navigation }: any): JSX.Element {
	const cameraRef = useRef(null);
	const arScene = useRef(null);

	const genders = ["Male", "Female", "Other"];
	const stores = ["None", "Koton", "LCWaikiki", "Boyner", "Defacto", "Trendyol", "H&M"];

	const [gender, setGender] = useState("Male");
	const [store, setStore] = useState("None");

	const [arfound, setAr] = useState(false);
	const [notFound, setNotFound] = useState(false);
	const [debugModal, setDebugModal] = useState(true);
	const [menuActive, setMenuActive] = useState(false);
	const [iconActive, setIconActive] = useState(false);

	const [queryItem, setQueryItem] = useState<any>({});
	const queryItemRef = useRef<any>();
	queryItemRef.current = queryItem;

	const [similarItems, setSimilarItems] = useState<any[]>([]);
	const [bestItem, setBestItem] = useState<any>({});

	const [loading, setLoading] = useState(false);
	const [navRoute, setNavRoute] = useState(null);
	const [secondRoute, setSecondRoute] = useState({name: 'mapViewScreen'});

	const [currentImage, setCurrentImage] = useState(null);

	const [segmentedItems, setSegmentedItems] = useState([]);

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
		if (navRoute == null) {
			return 0.7;
		}

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
			case "segmentSelectorScreen":
				return 0.95
			case "mapViewScreen":
				return 0.9
			default:
				return 0.7
		}
	}

	const renderComponent = (navRoute: any) => {

		if (navRoute == null)
			return null;

		switch (navRoute.name) {
			case "selectedItemScreen":
				return <SelectedItem id={navRoute.props}
					onReviewPressed={(id: any) => {
						setSecondRoute({ name: "writeReviewScreen", props: id })
					}}
				/>
			case "wishlistScreen":
				return <Wishlist
					onItemPressed={(item: any) => {
						setSecondRoute({ name: "selectedItemScreen", props: item })
					}}
				/>
			case "productFoundScreen":
				return <ProductFoundModal bestItem={bestItem} similarItems={similarItems} queryItem={queryItem}
					onReviewPressed={(id: any) => {
						setSecondRoute({ name: "writeReviewScreen", props: id })
					}}
					onItemPressed={(id: any) => {
						setSecondRoute({ name: "selectedItemScreen", props: id })
					}}
				/>
			case "writeReviewScreen":
				return <WriteReview id={navRoute.props} />
			case "reviewsScreen":
				return <Reviews />
			// case "bestProductScreen":
			// 	return <BestProduct />
			case "likedItemsScreen":
				return <LikedItems
					onItemPressed={(id: any) => {
						setSecondRoute({ name: "selectedItemScreen", props: id })
					}}
				/>
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
			case "segmentSelectorScreen":
				return <SegmentationSelector segmentationList={segmentedItems} onItemSelected={(index: number) => onItemSelected(index)} />
			case "mapViewScreen":
				return <MapViewScreen brand={"defacto"} />
			default:
				return <ActivityIndicator />
		}
	}

	function onItemSelected(index: number) {
		setNavRoute(null);
		setAr(false);
		setLoading(true);

		let item: any = segmentedItems[index];
		if (item != null) {
			// let url = SERVER_URL + '/api/v1/'
			let url = 'http://outletters.southcentralus.cloudapp.azure.com:8080/api/v1/'
			axios.get(url + 'items/', {
				params: {
					id: queryItemRef.current.id,
					image_name: item.image_name,
					label: item.label,
				}
			})
				.then(function (response) {
					setStates(response.data);
					setNavRoute({ name: "productFoundScreen" });
					setLoading(false);
					setAr(true);
				})
				.catch(function (error) {
					resetStates();
					showError(" Failed to retrieve item data. Please try again.")
					console.log("Error: " + JSON.stringify(error));
					setLoading(false);
				});
		}
	}

	function showError(error: string) {

	}

	function resetStates() {
		setSegmentedItems([])
		setQueryItem({});
		setSimilarItems([]);
		setBestItem({});
		setAr(false)
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

	function resetARScene() {
		setNotFound(false);
		arScene.current._resetARSession(true, true);
	}


	async function takePictureFromARView() {
		resetARScene();
		arScene.current._takeScreenshot('outletter_' + Date.now() + '_img', false).then((data: any) => {
			console.log(data.success, data.url, data.errorCode);
			setCurrentImage('file://' + data.url);
			uploadImage('file://' + data.url);
		}).catch((error: any) => {
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
				shop = 'www.koton.com';;
				break;
			default:
				shop = 'www.koton.com';;
				break;
		}

		//Resize Image
		let resizedImage = await ImageResizer.createResizedImage(image, 800, 800, 'JPEG', 100, 0, undefined, false, { mode: "contain", onlyScaleDown: true })
			.then(resizedImage => {
				return resizedImage;

			})
			.catch(err => {
				console.log(err);
				return null;
			});
		if (resizedImage == null)
			return;

		var data = new FormData();
		data.append("picture", {
			uri: resizedImage.uri,
			name: 'uploaded_image_' + Date.now() + '.jpg',
			type: 'image/*'
		})
		data.append("gender", postGender);
		data.append("shop", shop);
		data.append("debug", debugModal);


		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
		}

		// console.log(JSON.stringify(data));
		// let url = SERVER_URL + '/api/v1/'
		let url = 'http://outletters.southcentralus.cloudapp.azure.com:8080/api/v1/'
		axios.post(url + 'items/', data, config)
			.then(function (response) {
				let res = response.data;

				if (res.n) {
					setQueryItem(res.query_item);
					setSegmentedItems(res.options);
					setLoading(false);
					setAr(false);
					setNavRoute({ name: 'segmentSelectorScreen' })
				} else {
					setSegmentedItems([])
					setStates(response.data);
					setLoading(false);


					if (response.data.similar_items && response.data.similar_items > 0) {
						setNavRoute({ name: "productFoundScreen" });
						setAr(true);
						setNotFound(false);
					}
					else {
						setNotFound(true);
						setAr(false);
					}
				}
			})
			.catch(function (error) {
				resetStates();
				showError(" Failed to retrieve item data. Please try again.")
				console.log("Error: " + JSON.stringify(error));
				setLoading(false);
				setNotFound(true);
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
				uploadImage(response.uri);
			}
		});
	}

	async function openMapForItem(item: any) {
		setSecondRoute({ name: "mapViewScreen" })
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
					{ arfound, bestItem, notFound, setNavRoute, resetARScene }
				}
				style={{ flex: 1 }}
			/> */}

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

				{(!menuActive && loading) &&
					<View style={{ marginTop: '60%', alignItems: 'center' }}>
						<Bars size={30} color="#FFFFFF" />
					</View>
				}

			</SafeAreaView>
			<SafeAreaView style={styles.cameraOverlayBottom} >
				<View style={styles.cameraOverlay}>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
						<TouchableOpacity disabled={loading} style={styles.roundedButtonView} onPress={() => takePictureFromARView()}>
							{/* <TouchableOpacity >
								<Text style={styles.roundedButtonText}>Upload Image</Text>
							</TouchableOpacity> */}
							<LinearGradient useAngle={true} angle={45} colors={['#00E9D8', '#009ED9']} style={styles.roundedButton}>
								<Text style={styles.roundedButtonText}>{"Go!"}</Text>
							</LinearGradient>
						</TouchableOpacity>
						<TouchableOpacity style={styles.bottomIcon} onPress={() => { setNavRoute({ name: "chooseStoreScreen" }) }}>
							{switchStore(store)}
						</TouchableOpacity>
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
		</View >
	)
}
export default Home;
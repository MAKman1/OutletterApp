import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, Share, Animated, Dimensions, Linking, ActivityIndicator, Alert } from 'react-native'
import styles from './styles'

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SERVER_URL } from '../../shared/constants/constants';
import { APP_COLORS } from "../../shared/styles/colors";

function BestProduct(props: {
	onReviewPressed: any,
	bestItem: any
}): JSX.Element {
	const [liked, setLiked] = useState(false);
	const [wished, setWished] = useState(false);
	const [likeAmount, setlikeAmount] = useState(0);
	const [wishAmount, setWishAmount] = useState(0);

	const [dataFound, setDataFound] = useState(null);


	useEffect(() => {

		try {
			if (props.bestItem.price == "-1.00") {
				axios.get("http://outletters.southcentralus.cloudapp.azure.com:8080/api/v1/items/info", {
					params: {
						query_id: 1,
						similar_id: props.bestItem.id
					}
				}).then((res) => {
					if (res.data.similar_items) {
						setDataFound(res.data.similar_items[0]);
						setlikeAmount(res.data.similar_items[0].item_likes_count);
						setWishAmount(res.data.similar_items[0].item_wish_count);
					}
				}).catch((err) => {
					console.log("Error is: " + JSON.stringify(err));
				})
			}
		} catch (e) {
			Alert.alert("Failed to load best item response. Please try again!")
		}
	}, [])

	function openURL(url: string) {
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			} else {
				console.log("Couldn't Open" + url);
			}
		});
	}

	function likeItem() {
		if (!liked) {
			var data = new FormData();
			data.append("rel_item", props.bestItem.id);
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': 'Token 3b96f2e1cc132e005afba2de8cf2f391b5d3c346'
				}
			}
			axios.post(SERVER_URL + 'like/', data, config)
				.then(function (response) {
					setlikeAmount(likeAmount + 1);
					setLiked(true);
				})
				.catch(function (error) {
					console.warn("Error: " + JSON.stringify(error));
				});
		}
	}

	function addToWishlist() {
		if (!wished) {
			var data = new FormData();
			data.append("rel_item", props.bestItem.id);
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': 'Token 3b96f2e1cc132e005afba2de8cf2f391b5d3c346'
				}
			}
			axios.post(SERVER_URL + 'wish/', data, config)
				.then(function (response) {
					setWishAmount(wishAmount + 1);
					setWished(true);
				})
				.catch(function (error) {
					console.warn("Error: " + JSON.stringify(error));
				});
		}
	}

	async function shareLink() {
		try {
			await Share.share({
				message: props.bestItem.url
			});
		} catch (error) {
			console.warn(error.message);
		}
	}

	const openReviews = (id: any) => {
		props.onReviewPressed(id);
	}

	return (
		<View style={styles.rootContainer}>
			<View style={styles.horizontalCard}>
				<View style={{ flexDirection: 'row', paddingBottom: 20, overflow: 'hidden' }}>
					<Image style={styles.productImage} source={{ uri: props.bestItem.image_url }} />
					{dataFound != null ?
						<View style={{ overflow: 'hidden', }}>
							<Text numberOfLines={1} style={styles.productName}>{dataFound.name}</Text>
							<Text style={styles.productPrice}>{'Price: ' + dataFound.price + ' TRY'}</Text>
							<TouchableOpacity style={styles.roundedButton} onPress={() => openURL(dataFound.url)}>
								<Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>{"Visit URL"}</Text>
							</TouchableOpacity>
						</View>
						:
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<ActivityIndicator />
						</View>
					}
				</View>
				{dataFound != null ?
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
						<View style={styles.optionContainer}>
							<TouchableOpacity style={liked ? styles.optionIconsSelected : styles.optionIcons} onPress={() => likeItem()}>
								<MaterialIcons color={liked ? 'white' : 'black'} size={25} name="thumb-up" />
							</TouchableOpacity>
							<Text style={styles.optionText}>
								{likeAmount + ' Likes'}
							</Text>
						</View>
						<View style={styles.optionContainer}>
							<TouchableOpacity style={styles.optionIcons} onPress={() => openReviews(props.bestItem.id)}>
								<MaterialIcons color={'black'} size={25} name="edit" />
							</TouchableOpacity>
							<Text style={styles.optionText}>
								{dataFound.item_reviews.length + ' Reviews'}
							</Text>
						</View>
						<View style={styles.optionContainer}>
							<TouchableOpacity style={wished ? styles.optionIconsSelected : styles.optionIcons} onPress={() => addToWishlist()}>
								<MaterialIcons color={wished ? 'white' : 'black'} size={25} name="add" />
							</TouchableOpacity>
							<Text style={styles.optionText}>
								{wishAmount + ' Wishes'}
							</Text>
						</View>
						<View style={styles.optionContainer}>
							<TouchableOpacity style={styles.optionIcons} onPress={() => shareLink()}>
								<MaterialIcons color={'black'} size={25} name="share" />
							</TouchableOpacity>
							<Text style={styles.optionText}>
								Share
                        </Text>
						</View>
					</View>
					:
					null
				}
			</View>
		</View>
	)
}

export default BestProduct;
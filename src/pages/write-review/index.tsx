import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, Animated, Dimensions, LogBox, Linking, ActivityIndicator } from 'react-native'
import styles from './styles'

import axios from 'axios';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_COLORS } from "../../shared/styles/colors";
import { TextInput } from 'react-native-gesture-handler';
import { SERVER_URL } from '../../shared/constants/constants';

function WriteReview(props: any): JSX.Element {

	const [text, setText] = React.useState('');
	const [ratings, setRatings] = useState([
		{
			id: 1,
			checked: false,
		},
		{
			id: 2,
			checked: false,
		},
		{
			id: 3,
			checked: false,
		},
		{
			id: 4,
			checked: false,
		},
		{
			id: 5,
			checked: false
		},
	]);
	const [score, setScore] = useState(0);
	const [reviews, setReviews] = useState(null);


	useEffect(() => {
		LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

		getReviews();

	}, [])

	const getReviews = () => {
		//Get reviews
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				'Authorization': 'Token 7330a179a43e3e044e3eff28cc66f6a11905b417'
			}
		}
		axios.get(SERVER_URL + "item/" + props.id, config)
			.then(function (response) {
				setReviews(response.data.item_reviews)
			})
			.catch(function (error) {
				console.warn("Error: " + JSON.stringify(error));
			});
	}


	const updateRatings = (id: number) => {
		let newRatings = [...ratings];
		for (let i = 0; i < 5; i++) {
			if (i <= id) {
				newRatings[i].checked = true;
			}
			else {
				newRatings[i].checked = false;
			}
		}
		setRatings(newRatings);
		setScore(id + 1);
	}

	const postReview = (content: string, ratings: any, item: string) => {
		let rating: number = 0.0;
		ratings.forEach((r: any) => {
			if (r.checked)
				rating += 1.0
		});

		var data = new FormData();
		data.append("title", "Review");
		data.append("content", content);
		data.append("rel_item", item);
		data.append("rating", rating);
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				'Authorization': 'Token 7330a179a43e3e044e3eff28cc66f6a11905b417'
			}
		}
		axios.post(SERVER_URL + "review/", data, config)
			.then(function (response: any) {
				setReviews(null);
				getReviews();
			})
			.catch(function (error) {
				console.warn("Error: " + JSON.stringify(error));
			});
	}

	const openURL = (url: any) => {
		Linking.openURL(url);
	}

	return (
		<View style={styles.rootContainer}>
			<View style={styles.revOuter}>
				<SafeAreaView style={styles.cameraOverlayTop} >
					<Text style={styles.title}>Write Review</Text>
				</SafeAreaView>
				<TextInput style={styles.reviewTextBox} multiline numberOfLines={4} value={text} onChangeText={text => setText(text)} placeholder={'Write review...'} />
				<View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center', marginBottom: 15 }}>
					{ratings.map((rating, index) => {
						return (
							<TouchableOpacity key={index} onPress={() => updateRatings(index)}>
								<MaterialIcons color={rating.checked ? APP_COLORS.lightBlue : APP_COLORS.backgroundGray} size={40} name={rating.checked ? "star" : "star-border"} />
							</TouchableOpacity>
						)
					})
					}
				</View>
				<TouchableOpacity style={styles.roundedButtonView} onPress={() => { postReview(text, ratings, props.id) }}>
					<LinearGradient useAngle={true} angle={45} colors={['#00E9D8', '#009ED9']} style={styles.roundedButton}>
						<Text style={styles.roundedButtonText}>Add Review</Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>
			<Text style={styles.reviewTitle}>{"Reviews"}</Text>
			{reviews == null
				?
				<ActivityIndicator />
				:
				(React.Children.toArray(reviews?.map((review: any) => (

					<View style={styles.horizontalCard}>
						<View style={styles.cardTop}>
							<TouchableOpacity style={{ alignSelf: 'flex-end' }}>
								<MaterialIcons color={APP_COLORS.labelGray} size={20} name="close" />
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: 'row', }}>
							<View style={{ flexDirection: 'row', paddingBottom: 20 }}>
								<Image style={styles.productImage} source={{ uri: review.rel_item.image_url }} />
								<View style={{ overflow: 'hidden', maxWidth: 160, }}>
									<Text numberOfLines={1} style={styles.productName}>{review.rel_item.name}</Text>
									<Text style={styles.productPrice}>{'Price: ' + review.rel_item.price + ' TRY'}</Text>
									<TouchableOpacity style={styles.smallRoundedButton} onPress={() => openURL("http://google.com")}>
										<Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Visit URL</Text>
									</TouchableOpacity>
								</View>
							</View>
							<View style={{ ...styles.rating, alignItems: 'flex-end', flex: 1, marginTop: 10 }}>
								<Text style={styles.ratingText}>{review.rating}</Text>
								<View style={{ flexDirection: 'row' }}>
									<MaterialIcons color={parseInt(review.rating) >= 1 ? APP_COLORS.lightBlue : APP_COLORS.backgroundGray} size={12} name="star" />
									<MaterialIcons color={parseInt(review.rating) >= 2 ? APP_COLORS.lightBlue : APP_COLORS.backgroundGray} size={12} name="star" />
									<MaterialIcons color={parseInt(review.rating) >= 3 ? APP_COLORS.lightBlue : APP_COLORS.backgroundGray} size={12} name="star" />
									<MaterialIcons color={parseInt(review.rating) >= 4 ? APP_COLORS.lightBlue : APP_COLORS.backgroundGray} size={12} name="star" />
									<MaterialIcons color={parseInt(review.rating) === 5 ? APP_COLORS.lightBlue : APP_COLORS.backgroundGray} size={12} name="star" />
								</View>
							</View>
						</View>
						<Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.reviewText}>{"\"" + review.content + "\""}</Text>
					</View>
				))))
			}

		</View>
	)
}

export default WriteReview;
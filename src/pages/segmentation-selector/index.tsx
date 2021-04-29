import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Share, Animated, Dimensions, Linking, ActivityIndicator } from 'react-native'
import styles from './styles'

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import Image from 'react-native-image-progress';

function SegmentationSelector(props: {
	segmentationList: any[],
	onItemSelected: any,
}): JSX.Element {

	const carouselRef = useRef(null)

	const [data, setData] = useState(null);
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		let list = props.segmentationList.map(s => { return { name: sanitizeText(s.label), image: "http://outletters.southcentralus.cloudapp.azure.com:8080" + s.image_name } });
		setData(list);
	}, [])

	const sanitizeText = (text: string) => {
		return toTitleCase(text.replace(/(_)/g, " "));
	}

	const toTitleCase = (str: string) => {
		return str.replace(
			/\w\S*/g,
			function (txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			}
		);
	}

	const renderItem = ({ item, index }) => {
		return (
			<TouchableOpacity activeOpacity={1} disabled={true} style={styles.card} onPress={() => console.warn("hehe")}>
				<Image
					resizeMode={"cover"}
					source={{ uri: item.image, cache: "force-cache" }}
					style={styles.cardImage}
					indicator={ActivityIndicator} />
				{/* <Text style={styles.cardNumber}>{item.name}</Text> */}
			</TouchableOpacity>
		);
	}


	return (
		<View style={styles.rootContainer}>
			<Text style={styles.titleText}>{"Almost there."}</Text>
			<Text style={styles.descriptionText}>{"We found multiple items in the image. Please select the one you want to scan and continue."}</Text>
			{data != null ?
				<Carousel
					ref={carouselRef}
					data={data}
					renderItem={renderItem}
					hasParallaxImages={true}
					sliderWidth={Dimensions.get('window').width}
					itemWidth={Dimensions.get('window').width * 0.8}
					onSnapToItem={(index) => setActiveIndex(index)}
					loop={true}
				/>
				:
				<ActivityIndicator />
			}
			<Pagination
				dotsLength={props.segmentationList.length}
				activeDotIndex={activeIndex}
				dotColor={'#A4A4A4'}
				inactiveDotColor={'grey'}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.6}
			/>
			<TouchableOpacity style={styles.roundedButtonView} onPress={() => props.onItemSelected(activeIndex)}>
				<LinearGradient useAngle={true} angle={45} colors={['#00E9D8', '#009ED9']} style={styles.roundedButton}>
					<MaterialIcons name={"check"} size={32} color={"white"} />
				</LinearGradient>
			</TouchableOpacity>
		</View>
	)
}
export default SegmentationSelector;
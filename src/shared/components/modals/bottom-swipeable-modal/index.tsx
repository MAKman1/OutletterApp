import React, { useEffect, useState, useRef } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView, Touchable, Animated, Dimensions, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity as TO } from 'react-native-gesture-handler';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Bubbles, Bars } from 'react-native-loader';
import { APP_COLORS } from '../../../styles/colors';
import FlashMessage from "react-native-flash-message";



function BottomSwipeableModal(props: {
	navigation?: any,
	show: boolean,
	onCollapse: any,
	children?: any,
	height?: number,
	collapsable?: boolean
}): JSX.Element {

	const fullHeight = Dimensions.get('window').height;

	const [minimized, setMinimized] = useState(false);
	const [loading, setLoading] = useState(true);
	const heightAnim = useRef(new Animated.Value(props.height ? (fullHeight * props.height) : (fullHeight * 0.7))).current;

	useEffect(() => {
		if (props.show) {
			toggleView(true)
		}
	}, [props.show])

	useEffect(() => {
		if (props.children) {
			setLoading(true);
			setTimeout(() => {
				setLoading(false)
			}, 1000);
		}
	}, [props.children])

	const toggleView = (minimized: boolean) => {
		if (minimized) {
			Animated.spring(
				heightAnim,
				{
					toValue: (props.height ? (fullHeight * props.height) : (fullHeight * 0.7)),
					duration: 1500
				}
			).start();
			setMinimized(false);
		} else {
			Animated.spring(
				heightAnim,
				{
					toValue: 60,
					duration: 1500
				}
			).start();
			setMinimized(true);
		}
	}


	return (
		<Modal
			animationIn="slideInUp"
			isVisible={props.show}
			propagateSwipe={true}
			coverScreen={true}
			useNativeDriver={true}
			style={{ margin: 0 }}
			backdropOpacity={0.5}
		>

			<Animated.View style={[styles.fullScreenView, { height: heightAnim }]}>
				<View style={styles.topBar}>

					<TouchableOpacity style={styles.swipeableButtonView}
						onPressOut={() => toggleView(minimized)}>
						<View style={styles.swipeableButton} />
					</TouchableOpacity>
					{!minimized
						?
						<TouchableOpacity style={styles.closeButton} onPress={() => props.onCollapse()}>
							<MaterialIcons name="close" size={30} color={"#808080"} />
						</TouchableOpacity>
						:
						<View style={{ width: 60 }} />
					}

				</View>

				<ScrollView style={styles.popupScroll}>


					{/* Content */}
					{loading ?
						<View style={{ marginTop: '30%', alignItems: 'center' }}>
							<Bars size={20} color={APP_COLORS.lightBlue} />
						</View>
						:
						props.children
					}

				</ScrollView>
			</Animated.View>
			<FlashMessage position="top" />
		</Modal>

	)
}

export default BottomSwipeableModal;
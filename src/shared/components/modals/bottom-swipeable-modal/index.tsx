import React, { useEffect, useState, useRef } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView, Touchable, Animated, Dimensions } from 'react-native'
import Modal from 'react-native-modal'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity as TO } from 'react-native-gesture-handler';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';



function BottomSwipeableModal(props: {
	navigation?: any,
	show: boolean,
	onCollapse: any,
	children?: any,
	height?: string,
	collapsable?: boolean
}): JSX.Element {

	const fullHeight = Dimensions.get('window').height;

	const [minimized, setMinimized] = useState(false);
	const heightAnim = useRef(new Animated.Value(props.height ? (fullHeight * props.height) : 0)).current;

	useEffect(() => {
	}, [])

	const toggleView = (minimized: boolean) => {
		if (minimized) {
			Animated.spring(
				heightAnim,
				{
					toValue: (props.height ? (fullHeight * props.height) : 0),
					duration: 1500
				}
			).start();
		} else {
			Animated.spring(
				heightAnim,
				{
					toValue: 60,
					duration: 1500
				}
			).start();
		}
		if (minimized)
			setMinimized(false);
		else
			setMinimized(true);
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
					{props.children}

				</ScrollView>
			</Animated.View>
		</Modal>

	)
}

export default BottomSwipeableModal;
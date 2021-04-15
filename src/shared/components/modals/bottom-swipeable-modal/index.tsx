import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native'
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
	height?: string

}): JSX.Element {


	useEffect(() => {
	}, [])


	return (
		<Modal
			animationIn="slideInUp"
			isVisible={props.show}
			propagateSwipe={false}
			coverScreen={true}
			// onSwipeComplete={props.onCollapse()}
			swipeDirection="down"
			useNativeDriver={true}
			style={{ margin: 0 }}
			backdropOpacity={0.5}
		>

			<SafeAreaView style={[styles.fullScreenView, props.height ? { height: props.height } : null]}>
				<TO style={styles.swipeableButtonView}
					onPressOut={() => props.onCollapse()}>
					<View style={styles.swipeableButton} />
				</TO>
				<ScrollView style={styles.popupScroll}>


					{/* Content */}
					{props.children}

				</ScrollView>
			</SafeAreaView>
		</Modal>

	)
}

export default BottomSwipeableModal;
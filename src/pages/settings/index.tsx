import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import styles from './styles'

import SafeAreaView from 'react-native-safe-area-view';
import { Switch } from 'react-native-gesture-handler';
import { APP_COLORS } from '../../shared/styles/colors';
import Modal from 'react-native-modal';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function Settings(): JSX.Element {


	const [found, setFound] = useState(false);

	useEffect(() => {

	}, [])



	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.pageTitle}>Settings</Text>
			<View style={styles.innerContainer}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
					<View style={styles.scrollInner}>
						<TouchableOpacity style={styles.card} onPress={() => { setFound(true) }}>
							<View style={styles.procard}></View>
							<View style={{ flex: 1 }}>
								<Text style={styles.title}>Pro Offer</Text>
								<Text style={styles.description}>Unlock all features in the application</Text>
							</View>
							<MaterialIcons color={'grey'} size={15} name="chevron-right" />
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>

			<Modal
				animationIn="slideInUp"
				isVisible={found}
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
						<TouchableOpacity>
							<Text style={styles.restore}>Restore</Text>
						</TouchableOpacity>
						<View style={{ flex: 1 }} />
						<TouchableOpacity onPress={() => { setFound(false) }}>
							<MaterialIcons color={'#959595'} size={19} name="close" />
						</TouchableOpacity>
					</View>

					<ScrollView style={styles.popupScroll}>
						<View style={styles.popupInner}>
							<Text style={styles.popupTitle}>Go Further with <Text style={{ fontWeight: 'bold' }}>Pro version</Text></Text>

							<View style={styles.titleView}>
								<MaterialIcons color={APP_COLORS.primary} size={20} name="chevron-right" />
								<Text style={styles.textTitle}>15 scanning formats</Text>
							</View>
							<Text style={styles.textDesc}>Scan everything from QR Code to Barcode, Datamatrix, Google Auth, EAN-8 and more.</Text>

							
						</View>
					</ScrollView>
				</SafeAreaView>
			</Modal>

		</SafeAreaView>
	)
}

export default Settings;
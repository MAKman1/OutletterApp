import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, ScrollView, Linking } from 'react-native'
import Modal from 'react-native-modal'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity as TO } from 'react-native-gesture-handler';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';



function ProductFoundModal(props: {
	bestItem?: any,
	similarItems?: any[]

}): JSX.Element {


	useEffect(() => {
	}, [])


	return (
		<>
			<TouchableOpacity activeOpacity={1}>
				<View style={{ alignContent: 'flex-start', paddingLeft: 20 }}>
					<Text style={styles.popupTitle}>Best product</Text>
				</View>

				{/* <View style={styles.popupInner}> */}
				<ScrollView
					style={styles.horizontalScroll}
					horizontal
					scrollEnabled={true}
					showsHorizontalScrollIndicator={false}
				>
					{props.bestItem &&
						<TouchableOpacity activeOpacity={1} style={styles.horizontalInner} onPress={() => Linking.openURL(props.bestItem.url)}>
							<View style={styles.horizontalCard}>
								<Image style={{ width: 90, height: 90, borderRadius: 5 }} source={{ uri: props.bestItem.image_url }} />
							</View>
						</TouchableOpacity>
					}
				</ScrollView>

				<View style={{ alignContent: 'flex-start', paddingLeft: 20 }}>
					<Text style={styles.popupTitle}>Top Items</Text>
				</View>

				<ScrollView
					style={styles.horizontalScroll}
					horizontal
					scrollEnabled={true}
					showsHorizontalScrollIndicator={false}
				>
					<TouchableOpacity activeOpacity={1}>

						<View style={styles.horizontalInner}>
							{props.similarItems && props.similarItems.map((item, index) => {
								if (index != 0 && item != null) {
									return (<TouchableOpacity activeOpacity={1} style={styles.horizontalInner} onPress={() => Linking.openURL(item[index].url)} key={index}>
										<View style={styles.horizontalCard}>
											<Image style={{ width: 90, height: 90, borderRadius: 5 }} source={{ uri: item.image_url }} />
										</View>
									</TouchableOpacity>)
								}
							})}

						</View>
					</TouchableOpacity>
				</ScrollView>


				{/* {debugModal && queryItem &&
					<View>

						<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
							<Text style={styles.popupTitle}>---Debugging---</Text>
						</View>

						<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
							<Text style={styles.popupTitle}>Labels</Text>
							<Text style={{ color: 'black' }}>{JSON.stringify(queryItem.label)}</Text>
						</View>

						<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
							<Text style={styles.popupTitle}>Text</Text>
							<Text style={{ color: 'black' }}>{JSON.stringify(queryItem.texts)}</Text>
						</View>

						<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
							<Text style={styles.popupTitle}>Colors</Text>
							<Text style={{ color: 'black' }}>{JSON.stringify(queryItem.color)}</Text>
						</View>

						<View style={{ alignContent: 'flex-start', paddingHorizontal: 20 }}>
							<Text style={styles.popupTitle}>Segmented image</Text>
						</View>
						<Image style={{ height: 400, width: 400 }} source={{ uri: 'https://867229285c17.ngrok.io' + queryItem.picture }} resizeMode={'contain'} />

					</View>
				} */}


				{/* </View> */}
			</TouchableOpacity>
		</>

	)
}

export default ProductFoundModal;
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, Linking, Animated, Dimensions, LogBox, ViewPropTypes, ActivityIndicator } from 'react-native'
import styles from './styles'

import { } from 'react-native';

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_COLORS } from "../../../../styles/colors";


function TopItem(props: any): JSX.Element {

	const [dataFound, setDataFound] = useState(null);

	useEffect(() => {
		if (props.topItem.price == "-1.00") {
			axios.get("http://outletters.southcentralus.cloudapp.azure.com:8080/api/v1/items/info", {
				params: {
					query_id: 1,
					similar_id: props.topItem.id
				}
			}).then((res) => {
				if (res.data.similar_items) {
					setDataFound(res.data.similar_items[0]);
				}
			}).catch((err) => {
				console.log("Erorr is: " + JSON.stringify(err));
			})
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

	const openItem = () => {
		// console.log(props.topItem.id)
		props.onItemPressed(props.topItem.id);
	}

	return (
		<View style={styles.rootContainer}>
			<View style={styles.horizontalCard}>

				<View style={{ flexDirection: 'row', paddingBottom: 20, alignItems: 'center' }}>
					<Image style={styles.productImage} source={{ uri: props.topItem.image_url }} />
					{dataFound != null ?
						<View>
							<TouchableOpacity onPress={() => openItem()}>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between', overflow: 'hidden', maxWidth: 130 }}>
									<Text style={styles.productName} numberOfLines={1}>{dataFound.name}</Text>
								</View>
							</TouchableOpacity>
							<Text style={styles.productPrice}>{'Price: ' + dataFound.price + ' TRY'}</Text>
							<TouchableOpacity style={styles.roundedButton} onPress={() => openURL(dataFound.url)}>
								<Text style={{ color: '#FFF', fontSize: 11, fontWeight: 'bold' }}>Visit URL</Text>
							</TouchableOpacity>
						</View>
						:
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<ActivityIndicator />
						</View>
					}
				</View>
			</View>
		</View>

	)
}

export default TopItem;
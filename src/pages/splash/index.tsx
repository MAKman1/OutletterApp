import React, { useEffect } from 'react'
import { Text } from 'react-native'
import styles from './styles'

import SafeAreaView from 'react-native-safe-area-view';

function Splash({ navigation }): JSX.Element {

	useEffect(() => {
		setTimeout(() => {
			navigation.replace("Home");
		}, 1000);
	}, []);
	return (
		<SafeAreaView style={styles.container}>
			<Text>Splash</Text>
		</SafeAreaView>
	)
}

export default Splash;
import React, { useEffect } from 'react'
import { Text } from 'react-native'
import styles from './styles'

import SafeAreaView from 'react-native-safe-area-view';

function Splash({ navigation }): JSX.Element {


	return (
		<SafeAreaView style={styles.container}>
			<Text>Splash</Text>
		</SafeAreaView>
	)
}

export default Splash;
import React, { useEffect } from 'react'
import { Text, Image , View} from 'react-native'
import styles from './styles'

import SafeAreaView from 'react-native-safe-area-view';

function Splash({ navigation }): JSX.Element {

	useEffect(() => {
		setTimeout(() => {
			navigation.replace("Home");
		}, 1000);
	}, []);
	return (
		<View style={styles.container}>
				<Image style={styles.backgroundImage}
					source={
						require('../../assets/splash.png')
					}
				/>
		</View>
	)
}

export default Splash;
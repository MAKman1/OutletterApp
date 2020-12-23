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
		<SafeAreaView style={styles.container}>
			<View style={{backgroundColor: '#92CCF9', borderRadius: 10,}}> 
				<Image style={{ alignSelf: 'center' }}
					source={
						require('../../assets/outletterLogo.png')
					}
				/>
			</View>
		</SafeAreaView>
	)
}

export default Splash;
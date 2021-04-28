import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, Dimensions, LogBox, ImageBackground } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { APP_COLORS } from '../../shared/styles/colors';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import { Cache } from '../../shared/libs/cache';

function LoginScreen({ navigation }): JSX.Element {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
	}, [])

	const login = (username: string, password: string) => {
		let data = {
			username: username,
			password: password
		}
		navigation.replace("Home")
		// axios.post('https://12a0393b6e6c.ngrok.io/api/v1/user/login/', data).then((res) => {
		// 	Cache.saveString(res.data.token, "AUTH_TOKEN");
		// 	navigation.replace("Home")
		// }).catch((err) => {
		// 	console.warn("Error: " + JSON.stringify(err))
		// })
	}

	return (
		<View style={styles.rootContainer}>

			<ImageBackground
				source={require('../../assets/login-bg.jpg')}
				style={styles.backImage} />

			<SafeAreaView style={styles.containerInner}>

				<View style={styles.titleLogoOuter}>
					<Image style={styles.titleLogo}
						source={require('../../assets/outletterLogo-dark.png')}
					/>
				</View>

				<KeyboardAwareScrollView style={styles.scroll}>
					<View style={styles.scrollInner}>
						<Text style={styles.titleText}>{"Login"}</Text>
						{/* '#00E9D8', '#009ED9' */}
						<View style={styles.inputView}>
							<AntDesign name={"user"} size={22} color={'#009ED9'} />
							<TextInput
								value={username}
								onChangeText={setUsername}
								placeholder={"Enter email"}
								placeholderTextColor={"grey"}
								style={styles.textInput} />
						</View>
						<View style={styles.inputView}>
							<AntDesign name={"lock"} size={22} color={'#009ED9'} />
							<TextInput
								value={password}
								secureTextEntry={true}
								onChangeText={setPassword}
								placeholder={"Enter password"}
								placeholderTextColor={"grey"}
								style={styles.textInput} />
						</View>

						<TouchableOpacity style={styles.buttonOuter} onPress={() => login(username, password)}>
							<LinearGradient style={styles.actionButton} useAngle={true} angle={45} colors={['#00E9D8', '#009ED9']} >
								<Text style={styles.buttonText}>{"Login"}</Text>
							</LinearGradient>
						</TouchableOpacity>


						<Text style={styles.subText}>{"Or create an account as:"}</Text>
						<View style={{ flexDirection: 'row', marginBottom: 50 }}>
							<TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate("Register")}>
								<Text style={styles.smallButtonText}>{"Customer"}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate("Register")}>
								<Text style={styles.smallButtonText}>{"Shop owner"}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</KeyboardAwareScrollView>

			</SafeAreaView>
		</View >
	)
}

export default LoginScreen;
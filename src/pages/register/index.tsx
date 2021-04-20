import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, Dimensions, LogBox, ImageBackground } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { APP_COLORS } from '../../shared/styles/colors';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function RegisterScreen({navigation}): JSX.Element {

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('');
	const [location, setLocation] = useState('');
	const [password, setPassword] = useState('');


	useEffect(() => {
	}, [])

	return (
		<View style={styles.rootContainer}>

			<View style={styles.backButton}>
				<TouchableOpacity style={{paddingHorizontal: 15}} onPress={() => navigation.goBack()}>
					<AntDesign name={"left"} size={22} color={'#000'} />
				</TouchableOpacity>
			</View>

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
						<Text style={styles.titleText}>{"Sign Up"}</Text>
						{/* '#00E9D8', '#009ED9' */}
						<View style={styles.inputView}>
							<AntDesign name={"user"} size={22} color={'#009ED9'} />
							<TextInput
								value={name}
								onChangeText={setName}
								placeholder={"Name"}
								style={styles.textInput} />
						</View>
						<View style={styles.inputView}>
							<AntDesign name={"mail"} size={22} color={'#009ED9'} />
							<TextInput
								value={email}
								secureTextEntry={true}
								onChangeText={setEmail}
								placeholder={"E-mail"}
								style={styles.textInput} />
						</View>

						<View style={{ flexDirection: 'row' }}>
							<View style={[styles.inputView, { flex: 1 }]}>
								<AntDesign name={"calendar"} size={22} color={'#009ED9'} />
								<TextInput
									value={age}
									onChangeText={setAge}
									placeholder={"Age"}
									style={styles.textInput} />
							</View>
							<View style={[styles.inputView, { flex: 1 }]}>
								<AntDesign name={"woman"} size={22} color={'#009ED9'} />
								<TextInput
									value={gender}
									onChangeText={setGender}
									placeholder={"Gender"}
									style={styles.textInput} />
							</View>
						</View>
						<View style={styles.inputView}>
							<AntDesign name={"enviroment"} size={22} color={'#009ED9'} />
							<TextInput
								value={location}
								onChangeText={setLocation}
								placeholder={"Location"}
								style={styles.textInput} />
						</View>
						<View style={styles.inputView}>
							<AntDesign name={"lock"} size={22} color={'#009ED9'} />
							<TextInput
								value={password}
								secureTextEntry={true}
								onChangeText={setPassword}
								placeholder={"Password"}
								style={styles.textInput} />
						</View>

						<TouchableOpacity style={styles.buttonOuter}>
							<LinearGradient style={styles.actionButton} useAngle={true} angle={45} colors={['#00E9D8', '#009ED9']} >
								<Text style={styles.buttonText}>{"Sign Up"}</Text>
							</LinearGradient>
						</TouchableOpacity>



						<TouchableOpacity onPress={() => navigation.navigate("Login")}>
							<Text style={styles.subText}>{"Already have an account?  "}
								<Text style={[styles.smallButtonText, { color: "grey" }]}>{"Login"}</Text>
							</Text>
						</TouchableOpacity>


					</View>
				</KeyboardAwareScrollView>

			</SafeAreaView>
		</View >
	)
}

export default RegisterScreen;
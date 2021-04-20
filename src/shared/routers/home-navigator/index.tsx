import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import Settings from '../../../pages/home';
import { APP_COLORS } from '../../styles/colors';
import Home from '../../../pages/home';
import ARHomeScreen from '../../ARComponents/ARHome';
import LoginScreen from '../../../pages/login';
import RegisterScreen from '../../../pages/register';

const Stack = createStackNavigator();
function HomeNavigator(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName="Login"
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="ARHomeScreen" component={ARHomeScreen} />
		</Stack.Navigator>

	)
}
export default HomeNavigator
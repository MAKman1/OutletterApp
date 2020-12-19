import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import Settings from '../../../pages/home';
import { APP_COLORS } from '../../styles/colors';
import Home from '../../../pages/home';

const Stack = createStackNavigator();
function HomeNavigator(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name="Home" component={Home} />
		</Stack.Navigator>

	)
}
export default HomeNavigator
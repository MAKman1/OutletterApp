import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import Settings from '../../../pages/settings';
import { APP_COLORS } from '../../styles/colors';

const Tab = createBottomTabNavigator();
function HomeNavigator(): JSX.Element {
	return (
		<Tab.Navigator
			initialRouteName="Scanner" tabBarOptions={{
				activeTintColor: APP_COLORS.primary,
				style: {
					paddingBottom: 4
				}
			}}>
			<Tab.Screen
				name="Settings"
				component={Settings}
				options={{
					tabBarLabel: "Settings",
					tabBarIcon: ({ color, size }) => (
						<Feather color={color} size={size} name="settings" />
					)
				}}
			/>
		</Tab.Navigator>
	)
}
export default HomeNavigator
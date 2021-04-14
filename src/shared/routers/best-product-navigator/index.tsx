import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import BestProduct from '../../../pages/best-product';

const Stack = createStackNavigator();
function BestProductNavigator(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName="BestProduct"
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name="BestProduct" component={BestProduct} />
		</Stack.Navigator>

	)
}
export default BestProductNavigator;
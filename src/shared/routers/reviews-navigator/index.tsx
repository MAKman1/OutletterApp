import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Reviews from '../../../pages/reviews';

const Stack = createStackNavigator();
function ReviewsNavigator(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName="Reviews"
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name="Reviews" component={Reviews} />
		</Stack.Navigator>

	)
}
export default ReviewsNavigator;
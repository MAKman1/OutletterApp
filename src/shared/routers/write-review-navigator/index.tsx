import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import WriteReview from '../../../pages/write-review';

const Stack = createStackNavigator();
function WriteReviewNavigator(): JSX.Element {
	return (
		<Stack.Navigator
			initialRouteName="WriteReview"
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen name="WriteReview" component={WriteReview} />
		</Stack.Navigator>

	)
}
export default WriteReviewNavigator;
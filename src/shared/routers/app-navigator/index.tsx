import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

import HomeNavigator from '../home-navigator'
import ReviewsNavigator from '../reviews-navigator'
import Splash from '../../../pages/splash';
const Stack = createStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeNavigator} />
                <Stack.Screen options={{ headerShown: false }} name="Reviews" component={ReviewsNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
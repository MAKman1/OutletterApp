/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import AppNavigator from './src/shared/routers/app-navigator'; // TODO @src
import React from 'react';

import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

declare const global: { HermesInternal: null | {} };

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

const App = () => {
	return (
		<AppNavigator />
	);
};

export default App;

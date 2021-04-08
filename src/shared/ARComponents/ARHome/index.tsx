import React, { Component, useState, useEffect } from 'react';

import {
	ViroARScene,
	ViroText,
	ViroConstants,
} from '@viro-community/react-viro';

import SafeAreaView from 'react-native-safe-area-view';
import style from './style';
import { View } from 'react-native';

function ARHomeScreen({ }): JSX.Element {

	const [text, setText] = useState('Initializing AR...')

	useEffect(() => {
	}, []);


	const onInitialized = (state: any, reason: any) => {
		if (state == ViroConstants.TRACKING_NORMAL) {
			setText('Hello World!');
		} else if (state == ViroConstants.TRACKING_NONE) {
			console.warn('Tracking lost :(')
		}
	}

	return (
		<SafeAreaView style={style.container}>
			<View style={style.arView}>
				<ViroARScene onTrackingUpdated={onInitialized} >
					<ViroText text={text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={style.helloWorldTextStyle} />
				</ViroARScene>
			</View>
		</SafeAreaView>
	)
}

export default ARHomeScreen;
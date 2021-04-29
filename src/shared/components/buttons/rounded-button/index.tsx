import React, { useEffect, useState } from 'react'
import { TextInput,  } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';

function RoundedButton(props: {
	text: string,
	onPressed: any,
	backgroundColor: any
}): JSX.Element {


	return (
		<TouchableOpacity style={[{ backgroundColor: props.backgroundColor}, styles.button]} onPress={props.onPressed}>
			<Text style={styles.buttonText}>{props.text}</Text>
		</TouchableOpacity>
	)
}

export default RoundedButton;
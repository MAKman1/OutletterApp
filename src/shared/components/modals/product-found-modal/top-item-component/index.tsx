import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, Linking, Animated, Dimensions, LogBox, ViewPropTypes } from 'react-native'
import styles from './styles'

import { } from 'react-native';

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_COLORS } from "../../../../styles/colors";


function TopItem(props: any): JSX.Element {

    useEffect(() => {
    }, [])

    function openURL() {
        Linking.canOpenURL(props.topItem.url).then(supported => {
            if (supported) {
              Linking.openURL(props.topItem.url);
            } else {
              console.log("Couldn't Open" + props.topItem.url);
            }
          });
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.horizontalCard}>
                <View style={{ flexDirection: 'row', paddingBottom: 20, alignItems: 'center' }}>
                    <Image style={styles.productImage} source={{uri: props.topItem.image_url}} />
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', overflow: 'hidden' }}>
                            <Text style={styles.productName} numberOfLines={1}>{props.topItem.name}</Text>
                        </View>
                        <Text style={styles.productPrice}>{'Price: ' + props.topItem.price + ' TRY'}</Text>
                        <TouchableOpacity style={styles.roundedButton} onPress={() => openURL()}>
                            <Text style={{ color: '#FFF', fontSize: 11, fontWeight: 'bold' }}>Visit URL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default TopItem;
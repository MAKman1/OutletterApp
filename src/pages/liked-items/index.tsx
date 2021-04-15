import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, Animated, Dimensions, LogBox } from 'react-native'
import styles from './styles'

import { } from 'react-native';

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_COLORS } from "../../shared/styles/colors";


function LikedItems(props: any): JSX.Element {

    useEffect(() => {
    }, [])

    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.cameraOverlayTop} >
                <Text style={styles.title}>Liked Items</Text>
            </SafeAreaView>
            <View style={styles.horizontalCard}>
                <TouchableOpacity style={{alignSelf: 'flex-end',  marginBottom: -20 }} onPress={() => {console.log('x')}}>
                    <MaterialIcons color={APP_COLORS.labelGray} size={20} name="close" />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                    <Image style={styles.productImage} source={require('../../assets/darthvader.jpg')} />
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', overflow: 'hidden', maxWidth: '100%' }}>
                            <Text style={styles.productName} numberOfLines={1}> Darth Vader T-Shirt</Text>
                        </View>
                        <Text style={styles.productPrice}> Price: 50.00 TRY</Text>
                        <TouchableOpacity style={styles.roundedButton} onPress={() => { console.log('link') }}>
                            <Text style={{ color: '#FFF', fontSize: 11, fontWeight: 'bold' }}>Visit URL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default LikedItems;
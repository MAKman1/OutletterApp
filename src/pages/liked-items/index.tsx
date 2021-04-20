import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, Animated, Dimensions, LogBox } from 'react-native'
import styles from './styles'

import { } from 'react-native';

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_COLORS } from "../../shared/styles/colors";


function LikedItems(props: any): JSX.Element {
    const [likedItems, setLikedItems] = useState<any[]>([])

    useEffect(() => {
        let itemId = null;
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token 7330a179a43e3e044e3eff28cc66f6a11905b417'
            }
        }
        axios.get('https://12a0393b6e6c.ngrok.io/api/v1/like/', config)
            .then(function (response) {
                itemId = response.data;
                console.log(itemId);
            })
            .catch(function (error) {
                console.warn("Error: " + JSON.stringify(error));
            });

        axios.get('https://12a0393b6e6c.ngrok.io/api/v1/item/' + itemId + '/', config)
            .then(function (response) {
                console.log(response.data)
                // setLikedItems(response.data)
            })
            .catch(function (error) {
                console.warn("Error: " + JSON.stringify(error));
            });
    }, [])

    return (
        <>
            <View style={{ alignContent: 'flex-start', paddingLeft: 20 }}>
                <Text style={styles.popupTitle}>Your Liked Items</Text>
            </View>
            <View style={styles.rootContainer}>
                {/* {
                    likedItems ?
                        likedItems.map((item, index) => {
                            return (
                                <View style={styles.horizontalCard}>
                                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: -20 }} onPress={() => { console.log('x') }}>
                                        <MaterialIcons color={APP_COLORS.labelGray} size={20} name="close" />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                                        <Image style={styles.productImage} source={require('../../assets/darthvader.jpg')} />
                                        <View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', overflow: 'hidden', maxWidth: '100%' }}>
                                                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                                            </View>
                                            <Text style={styles.productPrice}> Price: 50.00 TRY</Text>
                                            <TouchableOpacity style={styles.roundedButton} onPress={() => { console.log('link') }}>
                                                <Text style={{ color: '#FFF', fontSize: 11, fontWeight: 'bold' }}>Visit URL</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                        :
                        null
                } */}
            </View>
        </>
    )
}

export default LikedItems;
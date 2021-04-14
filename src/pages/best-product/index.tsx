import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, Animated, Dimensions, LogBox } from 'react-native'
import styles from './styles'

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_COLORS } from "../../shared/styles/colors";
import App from '../../../App';

function BestProduct(props: any): JSX.Element {


    useEffect(() => {
    }, [])

    return (
        // <WriteReview/>
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.cameraOverlayTop} >
                <Text style={styles.title}>Best Product</Text>
            </SafeAreaView>
            <View style={styles.horizontalCard}>
                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                    <Image style={styles.productImage} source={require('../../assets/darthvader.jpg')} />
                    <View style={{ overflow: 'hidden', maxWidth: '70%', }}>
                        <Text numberOfLines={1} style={styles.productName}> Darth Vader T-Shirt</Text>
                        <Text style={styles.productPrice}> Price: 50.00 TRY</Text>
                        <TouchableOpacity style={styles.roundedButton} onPress={() => console.log("wz")}>
                            <Text style={{ color: 'white', fontSize: 12 }}>Visit URL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity style={styles.optionIcons}>
                            <MaterialIcons color={'black'} size={25} name="thumb-up" />
                        </TouchableOpacity>
                        <Text style={styles.optionText}>
                            100 Likes
                        </Text>
                    </View>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity style={styles.optionIcons}>
                            <MaterialIcons color={'black'} size={25} name="edit" />
                        </TouchableOpacity>
                        <Text style={styles.optionText}>
                            12 Reviews
                        </Text>
                    </View>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity style={styles.optionIcons}>
                            <MaterialIcons color={'black'} size={25} name="add" />
                        </TouchableOpacity>
                        <Text style={styles.optionText}>
                            46 Wishes
                        </Text>
                    </View>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity style={styles.optionIcons}>
                            <MaterialIcons color={'black'} size={25} name="share" />
                        </TouchableOpacity>
                        <Text style={styles.optionText}>
                            4 Shares
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default BestProduct;
import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import styles from './styles'

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { APP_COLORS } from "../../shared/styles/colors";


function Reviews(props: any): JSX.Element {

    const [textShown, setTextShown] = useState(false);

    useEffect(() => {
    }, [])

    const toggleNumberOfLines = () => { //To toggle the show text or hide it
        setTextShown(!textShown);
    }

    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.cameraOverlayTop} >

                <View style={styles.topOverlay}>
                    <View style={{flexDirection: 'row'}}>
                        {/* <MaterialIcons color={'white'} size={30} name="arrow-back" /> */}
                        <Image
                            source={
                                require('../../assets/outletterLogo.png')
                            }
                        />
                    </View>
                    <Text style={styles.title}>Your Reviews</Text>
                </View>
            </SafeAreaView>

            <TouchableOpacity activeOpacity={1} style={styles.horizontalInner} onPress={toggleNumberOfLines}>
                <View style={styles.horizontalCard}>
                    <View style={styles.cardTop}>
                        <Text style={styles.reviewTop}>24/3/21</Text>
                        <View style={styles.rating}>
                            <Text style={styles.ratingText}>4.7</Text>
                            <MaterialIcons color={APP_COLORS.lightBlue} size={20} name="star" />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 90, height: 90, borderRadius: 5, margin: 10 }} source={require('../../assets/darthvader.jpg')} />
                        <View>
                            <Text style={styles.productName}> Darth Vader T-Shirt</Text>
                            <Text style={styles.productPrice}> Price: 50.00 TRY</Text>
                        </View>
                    </View>
                    <View style={{ paddingTop: 10 }}>
                        <Text
                            numberOfLines={textShown ? undefined : 4}
                            style={styles.reviewText}>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Reviews;
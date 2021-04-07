import React, { useEffect, useState, useRef } from 'react'
import { Text, View, TouchableOpacity, Image, Button, Switch, Alert, ScrollView, Platform, ActivityIndicator, Linking } from 'react-native'
import styles from './styles'

import axios from 'axios';

function Reviews(props: any): JSX.Element {

    useEffect(() => {
    }, [])

    return (
        <View style={styles.rootContainer}>
            <Text>Tsest</Text>
            <TouchableOpacity activeOpacity={1} style={styles.horizontalInner}>
                <View style={styles.horizontalCard}>
                    {/* <Image style={{ width: 90, height: 90, borderRadius: 5 }} source={{ uri: bestItem.image_url }} /> */}
                    <Text style={styles.popupTitle}>Great Product</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Reviews;
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, Linking, Dimensions, LogBox } from 'react-native'
import styles from './styles'

import { } from 'react-native';

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_COLORS } from "../../shared/styles/colors";
import { SERVER_URL } from '../../shared/constants/constants';


function LikedItems(props: any): JSX.Element {
    const [likedItems, setLikedItems] = useState<any[]>([])

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token 3b96f2e1cc132e005afba2de8cf2f391b5d3c346'
            }
        }
        axios.get(SERVER_URL + 'like/', config)
            .then(function (response) {
                setLikedItems(response.data);
            })
            .catch(function (error) {
                console.warn("Error: " + JSON.stringify(error));
            });
    }, [])

    function openURL(index: number) {
        Linking.canOpenURL(likedItems[index].rel_item.url).then(supported => {
            if (supported) {
                Linking.openURL(likedItems[index].rel_item.url);
            } else {
                console.log("Couldn't Open" + likedItems[index].rel_item.url);
            }
        });
    }

    function removeItem(index: number) {
        const config = {
            headers: {
                'Authorization': 'Token 3b96f2e1cc132e005afba2de8cf2f391b5d3c346'
            }
        }
        axios.delete(SERVER_URL + 'like/' + likedItems[index].id + '/', config)
            .then(function (response) {
                let newLikedItems = [...likedItems];
                newLikedItems.splice(index, 1);
                setLikedItems(newLikedItems);
                // console.log(likedItems);
            })
            .catch(function (error) {
                console.warn("Error: " + JSON.stringify(error));
            });
    }

    const openItem = (id: any) => {
        props.onItemPressed(id);
    }


    return (
        <>
            <View style={{ alignContent: 'flex-start', paddingLeft: 20 }}>
                <Text style={styles.popupTitle}>Your Liked Items</Text>
            </View>
            <View style={styles.rootContainer}>
                {
                    likedItems ?
                        likedItems.map((item, index) => {
                            return (
                                <View key={index} style={styles.horizontalCard}>
                                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: -20, zIndex: 1000}} onPress={() => removeItem(index)}>
                                        <MaterialIcons color={APP_COLORS.labelGray} size={20} name="close" />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                        <Image style={styles.productImage} source={{ uri: item.rel_item.image_url }} />
                                        <View>
                                            <TouchableOpacity onPress={() => openItem(item.rel_item.id)}>
                                                <View style={{ overflow: 'hidden', maxWidth: 200, paddingRight: 40 }}>
                                                    <Text style={styles.productName} numberOfLines={1}>{item.rel_item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={styles.productPrice}>{'Price: ' + item.rel_item.price + ' TRY'}</Text>
                                            <TouchableOpacity style={styles.roundedButton} onPress={() => openURL(index)}>
                                                <Text style={{ color: '#FFF', fontSize: 11, fontWeight: 'bold' }}>Visit URL</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                        :
                        null
                }
            </View>
        </>
    )
}

export default LikedItems;
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, Linking, Dimensions, LogBox } from 'react-native'
import styles from './styles'

import { } from 'react-native';

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_COLORS } from "../../shared/styles/colors";


function Wishlist(props: any): JSX.Element {
    const [wishlistItems, setWishlistItems] = useState<any[]>([])

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token 7330a179a43e3e044e3eff28cc66f6a11905b417'
            }
        }
        axios.get('https://3e01cf7dcbd2.ngrok.io/api/v1/wish/', config)
            .then(function (response) {
                setWishlistItems(response.data);
            })
            .catch(function (error) {
                console.warn("Error: " + JSON.stringify(error));
            });
    }, [])

    function openURL(index: number) {
        Linking.canOpenURL(wishlistItems[index].rel_item.url).then(supported => {
            if (supported) {
                Linking.openURL(wishlistItems[index].rel_item.url);
            } else {
                console.log("Couldn't Open" + wishlistItems[index].rel_item.url);
            }
        });
    }

    function removeItem(index: number) {
        const config = {
            headers: {
                'Authorization': 'Token 7330a179a43e3e044e3eff28cc66f6a11905b417'
            }
        }
        axios.delete('https://3e01cf7dcbd2.ngrok.io/api/v1/wish/' + wishlistItems[index].id + '/', config)
                .then(function (response) {
                    let newWishlistItems = [...wishlistItems];
                    newWishlistItems.splice(index, 1);
                    setWishlistItems(newWishlistItems);
                    // console.log(WishlistItems);
                })
                .catch(function (error) {
                    console.warn("Error: " + JSON.stringify(error));
                });
        }

        return (
            <>
                <View style={{ alignContent: 'flex-start', paddingLeft: 20 }}>
                    <Text style={styles.popupTitle}>Your Wishlist</Text>
                </View>
                <View style={styles.rootContainer}>
                    {
                        wishlistItems ?
                            wishlistItems.map((item, index) => {
                                return (
                                    <View key={index} style={styles.horizontalCard}>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: -20 }} onPress={() => removeItem(index)}>
                                            <MaterialIcons color={APP_COLORS.labelGray} size={20} name="close" />
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image style={styles.productImage} source={{ uri: item.rel_item.image_url }} />
                                            <View>
                                                <View style={{ overflow: 'hidden', maxWidth: 200 }}>
                                                    <Text style={styles.productName} numberOfLines={1}>{item.rel_item.name}</Text>
                                                </View>
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

    export default Wishlist;
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, Share, Animated, Dimensions, Linking } from 'react-native'
import styles from './styles'

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_COLORS } from "../../shared/styles/colors";

function BestProduct(props: any): JSX.Element {
    const [liked, setLiked] = useState(false);
    const [wished, setWished] = useState(false);
    const [likeAmount, setlikeAmount] = useState(props.bestItem.item_likes_count);
    const [wishAmount, setWishAmount] = useState(props.bestItem.item_wish_count);


    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Token 7330a179a43e3e044e3eff28cc66f6a11905b417'
            }
        }
        axios.get('https://3e01cf7dcbd2.ngrok.io/api/v1/like/', config)
            .then(function (response) {
                let likedItems = response.data;
                if (likedItems) {
                    setLiked(likedItems.some((item: any) => item.rel_item.id === props.bestItem.id));
                }
            })
            .catch(function (error) {
                console.warn("Error: " + JSON.stringify(error));
            });

        axios.get('https://3e01cf7dcbd2.ngrok.io/api/v1/wish/', config)
            .then(function (response) {
                let wishedItem = response.data;
                if (wishedItem) {
                    setWished(wishedItem.some((item: any) => item.rel_item.id === props.bestItem.id));
                }
            })
            .catch(function (error) {
                console.warn("Error: " + JSON.stringify(error));
            });
    }, [])

    function openURL() {
        Linking.canOpenURL(props.bestItem.url).then(supported => {
            if (supported) {
                Linking.openURL(props.bestItem.url);
            } else {
                console.log("Couldn't Open" + props.bestItem.url);
            }
        });
    }

    function likeItem() {
        if (!liked) {
            var data = new FormData();
            data.append("rel_item", props.bestItem.id);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token 7330a179a43e3e044e3eff28cc66f6a11905b417'
                }
            }
            axios.post('https://3e01cf7dcbd2.ngrok.io/api/v1/like/', data, config)
                .then(function (response) {
                    setlikeAmount(likeAmount + 1);
                    setLiked(true);
                })
                .catch(function (error) {
                    console.warn("Error: " + JSON.stringify(error));
                });
        }
    }

    function addToWishlist() {
        if (!wished) {
            var data = new FormData();
            data.append("rel_item", props.bestItem.id);
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token 7330a179a43e3e044e3eff28cc66f6a11905b417'
                }
            }
            axios.post('https://3e01cf7dcbd2.ngrok.io/api/v1/wish/', data, config)
                .then(function (response) {
                    setWishAmount(wishAmount + 1);
                    setWished(true);
                })
                .catch(function (error) {
                    console.warn("Error: " + JSON.stringify(error));
                });
        }
    }

    async function shareLink() {
        try {
            await Share.share({
                message: props.bestItem.url
            });
        } catch (error) {
            console.warn(error.message);
        }
    }

    return (
        <>
            <View style={{ alignContent: 'flex-start', paddingLeft: 20 }}>
                <Text style={styles.popupTitle}>Your Liked Items</Text>
            </View>
            <View style={styles.rootContainer}>
                <View style={styles.horizontalCard}>
                    <View style={{ flexDirection: 'row', paddingBottom: 20, overflow: 'hidden' }}>
                        <Image style={styles.productImage} source={{ uri: props.bestItem.image_url }} />
                        <View style={{ overflow: 'hidden', }}>
                            <Text numberOfLines={1} style={styles.productName}>{props.bestItem.name}</Text>
                            <Text style={styles.productPrice}>{'Price: ' + props.bestItem.price + ' TRY'}</Text>
                            <TouchableOpacity style={styles.roundedButton} onPress={() => openURL()}>
                                <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>{"Visit URL"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={liked ? styles.optionIconsSelected : styles.optionIcons} onPress={() => likeItem()}>
                                <MaterialIcons color={liked ? 'white' : 'black'} size={25} name="thumb-up" />
                            </TouchableOpacity>
                            <Text style={styles.optionText}>
                                {likeAmount + ' Likes'}
                            </Text>
                        </View>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={styles.optionIcons}>
                                <MaterialIcons color={'black'} size={25} name="edit" />
                            </TouchableOpacity>
                            <Text style={styles.optionText}>
                                {props.bestItem.item_reviews.length + ' Reviews'}
                            </Text>
                        </View>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={wished ? styles.optionIconsSelected : styles.optionIcons} onPress={() => addToWishlist()}>
                                <MaterialIcons color={wished ? 'white' : 'black'} size={25} name="add" />
                            </TouchableOpacity>
                            <Text style={styles.optionText}>
                                {wishAmount + ' Wishes'}
                            </Text>
                        </View>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity style={styles.optionIcons} onPress={() => shareLink()}>
                                <MaterialIcons color={'black'} size={25} name="share" />
                            </TouchableOpacity>
                            <Text style={styles.optionText}>
                                Share
                        </Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}

export default BestProduct;
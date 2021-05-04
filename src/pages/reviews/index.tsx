import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, Linking, Animated, Dimensions, LogBox } from 'react-native'
import styles from './styles'

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_COLORS } from "../../shared/styles/colors";
import { SERVER_URL } from '../../shared/constants/constants';

function Reviews(props: any): JSX.Element {

    const [textShown, setTextShown] = useState(true);
    const [textHeight, setTextHeight] = useState(10);
    const [reviews, setReviews] = useState<any[]>([]);
    const heightAnim = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        getReviews();
    }, [])

    function getReviews() {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token 3b96f2e1cc132e005afba2de8cf2f391b5d3c346'
            }
        }
        axios.get(SERVER_URL + 'review/', config)
            .then(function (response) {
                console.log(response.data);
                setReviews(response.data);
            })
            .catch(function (error) {
                console.warn("Error: " + JSON.stringify(error));
            });
    }

    useEffect(() => {
        if (textShown) {
            Animated.spring(
                heightAnim,
                {
                    toValue: 40,
                    duration: 1500
                }
            ).start();
        } else {
            Animated.spring(
                heightAnim,
                {
                    toValue: textHeight + 150, //TODO fix this implementation
                    duration: 1500
                }
            ).start();
        }
    }, [textShown])

    const toggleNumberOfLines = () => {
        setTextShown(!textShown);
    }

    const onLayout = useCallback(e => {
        let { x, y, width, height } = e.nativeEvent.layout;
        setTextHeight(height);
    }, []);

    function openURL(index: number) {
        Linking.canOpenURL(reviews[index].rel_item.url).then(supported => {
            if (supported) {
                Linking.openURL(reviews[index].rel_item.url);
            } else {
                console.log("Couldn't Open" + reviews[index].rel_item.url);
            }
        });
    }

    function removeReview(index: number) {
        const config = {
            headers: {
                'Authorization': 'Token 3b96f2e1cc132e005afba2de8cf2f391b5d3c346'
            }
        }
        axios.delete(SERVER_URL + 'review/' + reviews[index].id + '/', config)
            .then(function (response) {
                let newReviews = [...reviews];
                newReviews.splice(index, 1);
                setReviews(newReviews);
                // console.log(WishlistItems);
            })
            .catch(function (error) {
                console.warn("Error: " + JSON.stringify(error));
            });
    }

    return (
        <View style={styles.rootContainer}>
            <View style={{ alignContent: 'flex-start', paddingLeft: 20 }}>
                <Text style={styles.title}>Your Reviews</Text>
            </View>
            {
                reviews ?
                    reviews.map((review, index) => {
                        return (
                            <View key={index} style={styles.horizontalCard}>
                                <View style={styles.cardTop}>
                                    {/* <Text style={styles.reviewDate}>24/3/21</Text> */}
                                    <TouchableOpacity style={{ alignSelf: 'flex-end', zIndex: 1000 }} onPress={() => removeReview(index)}>
                                        <MaterialIcons color={APP_COLORS.labelGray} size={20} name="close" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', }}>
                                    <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                                        <Image style={styles.productImage} source={{ uri: review.rel_item.image_url }} />
                                        <View style={{ overflow: 'hidden', maxWidth: 150, }}>
                                            <Text numberOfLines={1} style={styles.productName}>{review.rel_item.name}</Text>
                                            <Text style={styles.productPrice}>{'Price: ' + review.rel_item.price + ' TRY'}</Text>
                                            <TouchableOpacity style={styles.roundedButton} onPress={() => openURL(index)}>
                                                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>Visit URL</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ ...styles.rating, alignItems: 'flex-end', flex: 1, marginTop: 10 }}>
                                        <Text style={styles.ratingText}>{review.rating}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            <MaterialIcons color={parseInt(review.rating) >= 1 ? APP_COLORS.lightBlue : APP_COLORS.backgroundGray} size={12} name="star" />
                                            <MaterialIcons color={parseInt(review.rating) >= 2 ? APP_COLORS.lightBlue : APP_COLORS.backgroundGray} size={12} name="star" />
                                            <MaterialIcons color={parseInt(review.rating) >= 3 ? APP_COLORS.lightBlue : APP_COLORS.backgroundGray} size={12} name="star" />
                                            <MaterialIcons color={parseInt(review.rating) >= 4 ? APP_COLORS.lightBlue : APP_COLORS.backgroundGray} size={12} name="star" />
                                            <MaterialIcons color={parseInt(review.rating) === 5 ? APP_COLORS.lightBlue : APP_COLORS.backgroundGray} size={12} name="star" />
                                        </View>
                                    </View>
                                </View>
                                <Animated.View style={{ width: '100%', height: heightAnim, alignSelf: 'center', flexDirection: 'row' }}>
                                    <TouchableOpacity activeOpacity={1} onPress={() => toggleNumberOfLines()} style={{ overflow: 'hidden' }}>
                                        <Text
                                            onLayout={onLayout}
                                            style={styles.reviewText}>{'"' + review.content + '"'}
                                        </Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                        )
                    })
                    :
                    null
            }
        </View>
    )
}

export default Reviews;
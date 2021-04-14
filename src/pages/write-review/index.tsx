import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, Animated, Dimensions, LogBox } from 'react-native'
import styles from './styles'

import axios from 'axios';

import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_COLORS } from "../../shared/styles/colors";
import { TextInput } from 'react-native-gesture-handler';

function WrtieReview(props: any): JSX.Element {

    const [textShown, setTextShown] = useState(true);
    const [textHeight, setTextHeight] = useState(10);
    const [text, setText] = React.useState('');
    const [ratings, setRatings] = useState([
        {
            id: 1,
            checked: false,
        },
        {
            id: 2,
            checked: false,
        },
        {
            id: 3,
            checked: false,
        },
        {
            id: 4,
            checked: false,
        },
        {
            id: 5,
            checked: false
        },
    ]);
    const [score, setScore] = useState(0);

    const widthAnim = useRef(new Animated.Value(0)).current;
    const heightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    useEffect(() => {
        if (textShown) {
            Animated.spring(
                widthAnim,
                {
                    toValue: Dimensions.get('window').width * .85,
                    duration: 1500,
                }
            ).start();
            Animated.spring(
                heightAnim,
                {
                    toValue: 40,
                    duration: 1500
                }
            ).start();
        } else {
            Animated.spring(
                widthAnim,
                {
                    toValue: Dimensions.get('window').width * .85,
                    duration: 1500
                }
            ).start();
            Animated.spring(
                heightAnim,
                {
                    toValue: textHeight,
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

    const updateRatings = (id: number) => {
        let newRatings = [...ratings];
        for (let i = 0; i < 5; i++) {
            if (i <= id) {
                newRatings[i].checked = true;
            }
            else {
                newRatings[i].checked = false;
            }
        }
        setRatings(newRatings);
        setScore(id + 1);
    }

    const postReview = () => {
        var data = new FormData();
		data.append("text", text);
		data.append("score", score);
    }

    return (
        <View style={styles.rootContainer}>
            <SafeAreaView style={styles.cameraOverlayTop} >
                <Text style={styles.title}>Write Review</Text>
            </SafeAreaView>
            <TextInput style={styles.reviewTextBox} multiline numberOfLines={4} value={text} onChangeText={text => setText(text)} placeholder={'Write review...'} />
            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center', marginBottom: 15 }}>
                {ratings.map((rating, index) => {
                    return (
                        <TouchableOpacity key={index} onPress={() => updateRatings(index)}>
                            <MaterialIcons color={rating.checked ? APP_COLORS.lightBlue : APP_COLORS.backgroundGray} size={40} name={rating.checked ? "star" : "star-border"} />
                        </TouchableOpacity>
                    )
                })
                }
            </View>
            <TouchableOpacity style={styles.roundedButtonView} onPress={() => { postReview() }}>
                <LinearGradient useAngle={true} angle={45} colors={['#00E9D8', '#009ED9']} style={styles.roundedButton}>
                    <Text style={styles.roundedButtonText}>Add Review</Text>
                </LinearGradient>
            </TouchableOpacity>
            {/* <View style={styles.horizontalCard}>
                <View style={styles.cardTop}>
                    <Text style={styles.reviewDate}>24/3/21</Text>
                    <View style={styles.rating}>
                        <Text style={styles.ratingText}>4.7</Text>
                        <MaterialIcons color={APP_COLORS.lightBlue} size={20} name="star" />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                    <Image style={styles.productImage} source={require('../../assets/darthvader.jpg')} />
                    <View style={{ overflow: 'hidden', maxWidth: '50%', }}>
                        <Text numberOfLines={1} style={styles.productName}> Darth Vader T-Shirt</Text>
                        <Text style={styles.productPrice}> Price: 50.00 TRY</Text>
                        <TouchableOpacity style={styles.smallRoundedButton} onPress={() => toggleNumberOfLines()}>
                            <Text style={{ color: 'white', fontSize: 12 }}>Visit URL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Animated.View style={{ width: widthAnim, height: heightAnim, alignSelf: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => toggleNumberOfLines()} style={{ overflow: 'hidden' }}>
                        <Text
                            onLayout={onLayout}
                            style={styles.reviewText}>{"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View> */}
        </View>
    )
}

export default WrtieReview;
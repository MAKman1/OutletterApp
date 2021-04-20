import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, Image, SafeAreaView, Animated, Dimensions, Linking } from 'react-native'
import styles from './styles'

import axios from 'axios';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { APP_COLORS } from "../../shared/styles/colors";

function BestProduct(props: any): JSX.Element {
    const [itemLiked, setItemLiked] = useState(false);

    useEffect(() => {
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

    return (
        <View style={styles.rootContainer}>
            <View style={styles.horizontalCard}>
                <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                    <Image style={styles.productImage} source={{uri: props.bestItem.image_url}} />
                    <View style={{ overflow: 'hidden',  }}>
                        <Text numberOfLines={1} style={styles.productName}>{props.bestItem.name}</Text>
                        <Text style={styles.productPrice}>{'Price: ' + props.bestItem.price + ' TRY'}</Text>
                        <TouchableOpacity style={styles.roundedButton} onPress={() => openURL()}>
                            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold' }}>{"Visit URL"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' }}>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity style={styles.optionIcons}>
                            <MaterialIcons color={'black'} size={25} name="thumb-up" />
                        </TouchableOpacity>
                        <Text style={styles.optionText}>
                            {props.bestItem.item_likes_count + ' Likes'}
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
                        <TouchableOpacity style={styles.optionIcons}>
                            <MaterialIcons color={'black'} size={25} name="add" />
                        </TouchableOpacity>
                        <Text style={styles.optionText}>
                        {props.bestItem.item_wish_count + ' Wishes'}
                        </Text>
                    </View>
                    <View style={styles.optionContainer}>
                        <TouchableOpacity style={styles.optionIcons}>
                            <MaterialIcons color={'black'} size={25} name="share" />
                        </TouchableOpacity>
                        <Text style={styles.optionText}>
                            Shares
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default BestProduct;
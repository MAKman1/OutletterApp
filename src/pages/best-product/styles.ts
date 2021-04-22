import { StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APP_COLORS } from "../../shared/styles/colors";

export default StyleSheet.create({
    rootContainer: {
        width: Dimensions.get('window').width,
        // backgroundColor: "#FFFFFF",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    title: {
        padding: 20,
        fontSize: 32,
        textAlign: 'center',
        color: 'black'
    },
    horizontalCard: {
        maxHeight: 400,
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 20,
        padding: 15,
        margin: 15,
        backgroundColor: "white",

        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    reviewDate: {
        color: APP_COLORS.primary,
        fontSize: 16,
        marginBottom: 10,
    },
    reviewText: {
        lineHeight: 20,
    },
    cameraOverlayTop: {
        top: 0,
        width: "100%",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // elevation: 5,
    },
    productImage: {
        width: 110,
        height: 110,
        borderRadius: 5,
        marginRight: 20,
        marginLeft: 10,
    },
    productName: {
        fontSize: 25,
        paddingBottom: 5
    },
    productPrice: {
        color: APP_COLORS.lightBlue,
        fontSize: 20,
        marginBottom: 5
    },
    roundedButton: {
        marginTop: 5,
        height: 25,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        borderRadius: 50,
        backgroundColor: "#04B3FF",
    },
    optionIcons: {
        height: 45,
        width: 45,
        borderWidth: 3,
        borderColor: APP_COLORS.lightBlue,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    optionIconsSelected: {
        height: 45,
        width: 45,
        borderWidth: 3,
        borderColor: APP_COLORS.lightBlue,
        backgroundColor: APP_COLORS.lightBlue,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    optionContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 12
    }
});

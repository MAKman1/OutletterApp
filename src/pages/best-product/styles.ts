import { StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APP_COLORS } from "../../shared/styles/colors";

export default StyleSheet.create({
    rootContainer: {
        backgroundColor: "#FBFBFB",
        flex: 1,
    },
    title: {
        padding: 20,
        fontSize: 32,
        textAlign: 'center',
        color: 'black'
    },
    horizontalCard: {
        // maxHeight: 400,
        // alignSelf: 'center',
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
        elevation: 20,
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
        marginRight: 10,
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
        height: "10%",
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
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
    optionContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 12
    }
});

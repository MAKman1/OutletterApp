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
    reviewTextBox: {
        margin: 15,
        padding: 10,
        borderWidth: 2,
        borderColor: APP_COLORS.lightBlue,
        borderRadius: 10,
        textAlignVertical: 'top'
    },
    roundedButtonView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    roundedButton: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderRadius: 50,
        backgroundColor: "#04B3FF",
    },
    roundedButtonText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    horizontalCard: {
        maxHeight: 400,
        alignSelf: 'center',
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
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rating: {
        flexDirection: "row",
    },
    ratingText: {
        color: APP_COLORS.lightBlue,
        fontSize: 16,
        paddingRight: 5,
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

        elevation: 5,
    },
    productImage: {
        width: 90,
        height: 90,
        borderRadius: 5,
        marginRight: 10,
    },
    productName: {
        fontSize: 20,
    },
    productPrice: {
        color: APP_COLORS.lightBlue,
        fontSize: 20,
    },
    smallRoundedButton: {
        marginTop: 5,
        height: "10%",
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15,
        borderRadius: 50,
        backgroundColor: "#04B3FF",
    },
});

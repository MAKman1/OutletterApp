import { StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APP_COLORS } from "../../shared/styles/colors";

export default StyleSheet.create({
  rootContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  title: {
    color: 'black',
    fontSize: 25,
    // fontWeight: "bold",
    marginBottom: 10,
  },
  horizontalCard: {
    width: Dimensions.get('window').width * 0.9,
    maxHeight: 400,
    alignSelf: "center",
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
    justifyContent: 'flex-end'
    // justifyContent: "space-between",
  },
  rating: {
    flexDirection: "column",
  },
  ratingText: {
    color: APP_COLORS.lightBlue,
    fontSize: 30,
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
    marginRight: 20,
  },
  productName: {
    fontSize: 20,
  },
  productPrice: {
    color: APP_COLORS.lightBlue,
    fontSize: 16,
  },
  roundedButton: {
    marginTop: 5,
    height: 25,
    width: 75,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: "#04B3FF",
  },
});

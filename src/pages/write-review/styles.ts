import { StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APP_COLORS } from "../../shared/styles/colors";

export default StyleSheet.create({
  horizontalCard: {
    width: Dimensions.get("window").width * 0.9,
    maxHeight: 400,
    alignSelf: "center",
    borderRadius: 20,
    padding: 15,
    margin: 5,
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
    justifyContent: "flex-end",
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
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#494949",
  },
  productPrice: {
    color: APP_COLORS.lightBlue,
    fontSize: 16,
  },
  rootContainer: {
    backgroundColor: "#F7F7F7",
	flex: 1,
	paddingBottom: 50
  },
  title: {
    padding: 20,
    fontSize: 32,
    textAlign: "center",
    color: "black",
  },
  reviewTextBox: {
    margin: 15,
    padding: 10,
    borderWidth: 2,
    minHeight: 120,
    borderColor: APP_COLORS.lightBlue,
    borderRadius: 10,
    textAlignVertical: "top",
  },
  roundedButtonView: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,

    elevation: 5,
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
  smallRoundedButton: {
    marginTop: 5,
    height: 25,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 50,
    backgroundColor: "#04B3FF",
  },
  reviewTitle: {
    color: "#494949",
    fontSize: 30,
    fontWeight: "bold",
	marginLeft: 25,
	marginBottom: 10
  },
  revOuter: {
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
});

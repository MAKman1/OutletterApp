import { StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APP_COLORS } from "../../shared/styles/colors";

export default StyleSheet.create({
  rootContainer: {
    width: Dimensions.get("window").width,
    // backgroundColor: "#FFFFFF",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  titleText: {
    color: "#0885D1",
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
    marginVertical: 5,
  },
  descriptionText: {
    color: "grey",
    fontSize: 15,
    marginHorizontal: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    width: Dimensions.get("window").width * 0.8 - 20,
    marginHorizontal: 10,
	marginBottom: 20,
	marginTop: 10,
    flexDirection: "column",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: Dimensions.get("window").width * 0.8 - 20,
    height: (Dimensions.get("window").width * 0.8 - 20) * 1.5,
    borderRadius: 15,
  },
  cardNumber: {
    margin: 5,
    textAlign: "center",
    fontWeight: "bold",
    color: "#636363",
    fontSize: 14,
  },
  roundedButtonView: {
    flex: 1,
    justifyContent: "center",
	alignItems: "center",
	marginBottom: 10
  },
  roundedButton: {
    justifyContent: "center",
    alignItems: "center",
	height: 60,
	width: 60,
    borderRadius: 50,
    backgroundColor: "#04B3FF",
  },
  paginationContainer: {
	  height: 10,
	  width: 100,
	  padding: 0,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: 'grey'
  },
  paginationDot: {
	  padding: 0,
	  height: 10,
	  width: 10,
	  borderRadius: 10
  }
});

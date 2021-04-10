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
    maxHeight: '15%',
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
  cardTop: {
    alignItems: 'flex-end',
    backgroundColor: 'red'
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
});
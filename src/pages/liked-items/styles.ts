import { StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APP_COLORS } from "../../shared/styles/colors";

export default StyleSheet.create({
  rootContainer: {
    // backgroundColor: "#FFFFFF",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  horizontalCard: {
    height: 130,
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
  popupTitle: {
    color: 'black',
    fontSize: 25,
    // fontWeight: "bold",
    marginBottom: 10,
  },
  cardTop: {
    alignItems: 'flex-end',
    backgroundColor: 'red'
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 5,
    marginRight: 20,
    marginLeft: 10,
  },
  productName: {
    fontSize: 22,
    // paddingBottom: 5
  },
  productPrice: {
    color: APP_COLORS.lightBlue,
    fontSize: 20,
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
});
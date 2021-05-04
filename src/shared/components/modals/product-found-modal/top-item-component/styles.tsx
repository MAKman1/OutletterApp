import { StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APP_COLORS } from '../../../../styles/colors';

export default StyleSheet.create({
  rootContainer: {
    // backgroundColor: "#FFFFFF",
    flex: 1,
  },
  title: {
    padding: 20,
    fontSize: 32,
    textAlign: 'center',
    color: 'black'
  },
  horizontalCard: {
    height: 110,
	width: Dimensions.get('window').width - 130,
	justifyContent: 'center',
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
  cardTop: {
    alignItems: 'flex-end',
    backgroundColor: 'red'
  },
  productImage: {
    width: 75,
    height: 75,
    borderRadius: 5,
    marginRight: 20,
    marginLeft: 5,
  },
  productName: {
    fontSize: 22,
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
import { StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APP_COLORS } from "../../shared/styles/colors";

export default StyleSheet.create({

rootContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  horizontalInner: {
    flex: 1,
  },
  horizontalCard: {
    alignSelf:'center',
    width: 300,
    height: 100,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    // justifyContent: "center",
    // // alignItems: "center",

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popupTitle: {
    color: APP_COLORS.primary,
    fontSize: 22,
    // fontWeight: 'bold',
    // textAlign: 'left',
    // marginTop: 40,
    marginBottom: 10,
  },
});
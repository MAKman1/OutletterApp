import { StyleSheet, Dimensions } from "react-native";
import { APP_COLORS } from "../../../styles/colors";

export default StyleSheet.create({
  horizontalScroll: {
    marginBottom: 20,
  },
  popupTitle: {
    color: APP_COLORS.primary,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  horizontalCard: {
    width: 100,
    height: 100,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  horizontalInner: {
    flexDirection: "row",
  },
});

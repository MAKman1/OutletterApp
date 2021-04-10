import { StyleSheet, Dimensions } from "react-native";
import { APP_COLORS } from "../../../styles/colors";

export default StyleSheet.create({
  popupScroll: {},
  popupInner: {
    flex: 1,
    paddingBottom: 100,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  fullScreenView: {
    position: "absolute",
    bottom: 0,
    height: "70%",
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "white",
  },
  swipeableButtonView: {
	width: "100%",
	height: 10,
	paddingVertical: 20,
	marginBottom: 10,
    justifyContent: "center",
	alignItems: "center"
  },
  swipeableButton: {
    width: 35,
    height: 5,
    borderRadius: 10,
    backgroundColor: "#B6B6B6",
  },
});

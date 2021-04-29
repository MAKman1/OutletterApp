import { StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APP_COLORS } from "../../shared/styles/colors";

export default StyleSheet.create({
  rootContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
    backgroundColor: "#FFFFFF",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  markerView: {
    width: 50,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  markerCircle: {
    backgroundColor: "rgba(0, 179, 227, 0.5)",
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  locationPin: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 0,
  },
  map: {
    flex: 1,
    borderRadius: 20,
  },
  permissionView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  permissionText: {
    color: "grey",
    fontSize: 18,
    textAlign: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  topView: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    bottom: 0,
    zIndex: 999,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 5,
  },
  topTitle: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#696969",
  },
});

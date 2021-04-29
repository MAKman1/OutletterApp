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
    ...StyleSheet.absoluteFillObject,
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
});

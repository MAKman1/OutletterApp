import { StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APP_COLORS } from "../../shared/styles/colors";

export default StyleSheet.create({
  rootContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    padding: 20,
    fontSize: 32,
    textAlign: 'center',
    color: 'white'
  },
  horizontalInner: {
    flex: 1,
  },
  horizontalCard: {
    alignSelf: 'center',
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
    elevation: 5,
  },
  reviewTop: {
    color: APP_COLORS.primary,
    fontSize: 12,
    marginBottom: 10,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: "row",
  },
  ratingText: {
    color: APP_COLORS.lightBlue,
    fontSize: 16,
    paddingRight: 5,
  },
  reviewText: {
    lineHeight: 21,
  },
  topOverlay: {
    backgroundColor: APP_COLORS.lightBlue,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    // justifyContent: "flex-start",
    // alignItems: "center",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  cameraOverlayTop: {
    top: 0,
    width: "100%",
  },
  productName: {
    fontSize: 25, 
    paddingTop: 10,
  },
  productPrice: {
    color: APP_COLORS.lightBlue, 
    fontSize: 20,
  },
  menuInner: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
  menuOverlay: {
    width: 0,
    height: 0,
    backgroundColor: "#21004B",
    // position: "absolute",
    top: 0,
    borderBottomRightRadius: 200,
    zIndex: 100,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    padding: 10,
    marginVertical: 10,
  },
  menuText: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
  },
  menuBottom: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  circleButton: {
    borderWidth: 3,
    borderColor: "white",
    width: 55,
    height: 55,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
  },
});
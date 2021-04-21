import { StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APP_COLORS } from "../../shared/styles/colors";

export default StyleSheet.create({
  rootContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    backgroundColor: APP_COLORS.primary,
    paddingTop: 45,
    flex: 1,
  },
  pageTitle: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  scrollView: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  scrollInner: {
    flex: 1,
    paddingBottom: 100,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    color: "#393939",
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  title: {
    fontSize: 17,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "grey",
  },
  procard: {
    backgroundColor: "#E1D8FF",
    borderRadius: 5,
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
  cardItem: {
    flexDirection: "column",
    margin: 10,
    flex: 1,
  },
  colorView: {
    width: 35,
    height: 35,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: "#A5A5A5",
    marginRight: 5,
    alignItems: "center",
  },
  proBubble: {
    backgroundColor: "red",
    borderRadius: 5,
    width: 28,
    height: 12,
    marginTop: 27,
  },
  proText: {
    color: "white",
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  fullScreenView: {
    position: "absolute",
    bottom: 0,
    height: "70%",
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "white",
  },
  topView: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  textDesc: {
    color: "#959595",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 30,
    marginBottom: 25,
  },
  restore: {
    color: "#959595",
    fontSize: 14,
    fontWeight: "bold",
  },
  popupScroll: {
    // paddingTop: 20
  },
  popupInner: {
    flex: 1,
    // paddingBottom: 100,
    alignItems: "center",
  },
  popupTitle: {
    color: APP_COLORS.primary,
    fontSize: 22,
    fontWeight: "bold",
    // textAlign: 'left',
    // marginTop: 40,
    marginBottom: 10,
  },
  titleView: {
    flexDirection: "row",
    marginHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  textTitle: {
    color: APP_COLORS.primary,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  proTextBubble: {
    backgroundColor: "#D0D7FF",
    paddingHorizontal: 30,
    borderRadius: 50,
    paddingVertical: 8,
    width: "50%",
    marginTop: 10,
    marginBottom: 30,
  },
  protext: {
    color: APP_COLORS.primary,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
    paddingTop: 25,
  },
  priceText: {
    color: "grey",
    fontSize: 17,
    marginBottom: 5,
  },
  continueButton: {
    backgroundColor: APP_COLORS.primary,
    borderRadius: 5,
    paddingVertical: 15,
    width: "70%",
  },
  continueText: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomText: {
    color: "#959595",
    fontSize: 12,
    marginHorizontal: 10,
  },
  contactViewInner: {
    position: "absolute",
    bottom: 0,
    height: "95%",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: -10,
  },
  contactModalView: {
    height: "100%",
    width: "100%",
  },
  contactView: {
    backgroundColor: "white",
    height: "93%",
    width: "100%",
  },
  contactTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  cancelButton: {
    position: "absolute",
    right: 10,
  },
  topBar: {
    flexDirection: "row",
    backgroundColor: APP_COLORS.primary,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 50,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cameraOverlayBottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    overflow: 'visible'
  },
  cameraOverlayTop: {
    position: "absolute",
    top: 0,
    width: Dimensions.get("window").width,
    elevation: 6,
  },
  topIconView: {
    flex: 1,
    flexDirection: "row",
  },
  topOverlay: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topIcons: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 10,
    // justifyContent: "flex-start",
    // alignItems: 'flex-start',
  },
  bottomIcon: {
    borderRadius: 50,
    backgroundColor: "white",
    padding: 10,
    maxWidth: 50,
    maxHeight: 50,
    alignContent: "center",
    justifyContent: "center",
  },
  cameraOverlay: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
  storeText: {
    fontSize: 25,
    borderRadius: 50,
    textAlign: "center",
  },
  storeLogo: {
    flex: 1,
    alignSelf: "center",
    maxWidth: 30,
  },
  roundedButton: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 50,
    backgroundColor: "#04B3FF",
  },
  roundedButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  menuInner: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    paddingTop: 100,
    borderBottomRightRadius: 100,
  },
  menuOverlay: {
    width: 0,
    height: 0,
    backgroundColor: "#000",
    position: "absolute",
    top: 0,
    borderBottomRightRadius: 100,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  menuItem: {
    padding: 10,
    marginVertical: 2,
  },
  menuText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
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
    width: 45,
    height: 45,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  roundedButtonView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cropOuter: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
  },
  cropView: {
	  height: '80%',
	  width: '100%',
	  backgroundColor: "#000"
  },
});

import { StyleSheet, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { APP_COLORS } from "../../shared/styles/colors";

export default StyleSheet.create({
  rootContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    flexDirection: "column",
  },
  containerInner: {
    flex: 1,
    justifyContent: "center",
  },
  textInput: {
    fontSize: 16,
    marginLeft: 15,
	marginRight: 15,
	width: '100%'
  },
  inputView: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 15,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: "#CECECE",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  titleText: {
    fontSize: 35,
    color: "#7E7E7E",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  actionButton: {
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonSmall: {
    borderRadius: 50,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOuter: {
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  smallButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  subText: {
    color: "grey",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
  backImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
  },
  smallButton: {
    flex: 1,
    backgroundColor: "#B2B2B2",
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  titleLogo: {
	  margin: 0,
	  alignSelf: 'center'
  },
  titleLogoOuter: {
	alignSelf: "center",
    position: "absolute",
	top: 60,
	backgroundColor: "#FFF",
	borderRadius: 50,
	paddingHorizontal: 5,
	zIndex: 999
  },
  scroll: {
	  height: '100%',
	  width: '100%'
  },
  scrollInner: {
	  minHeight: '100%',
	  width: '100%',
	  justifyContent: 'center'
  }
});

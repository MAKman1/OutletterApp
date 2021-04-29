import { StyleSheet } from "react-native";

export default StyleSheet.create({
  button: {
    width: "90%",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

import { StyleSheet, Dimensions } from "react-native";
import { APP_COLORS } from "../../../shared/styles/colors";


export default StyleSheet.create({
  ARComponentStyle: {
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: '900',
    color: '#343434',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  priceText: {
    fontFamily: 'Roboto',
    fontSize: 10,
    fontWeight: '900',
    color: APP_COLORS.lightBlue,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
import { StatusBar, Platform, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  header: {
    ...Platform.select({
      android: {
        height: StatusBar.currentHeight,
        backgroundColor: "#039BE5"
      }
    })
  }
});

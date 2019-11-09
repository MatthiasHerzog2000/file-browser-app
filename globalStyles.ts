import { StatusBar, Platform, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  header: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  }
});

import React, { Component } from "react";
import { Text, View, ActivityIndicator, StatusBar } from "react-native";
import IAuthLoadingProps from "./IAuthLoadingProps";
import AuthService from "../../services/AuthService";

export default class AuthLoadingScreen extends Component<
  IAuthLoadingProps,
  {}
> {
  constructor(props: IAuthLoadingProps) {
    super(props);
  }
  async componentWillMount() {
    console.log(await AuthService.getToken());
    if (await AuthService.getToken()) {
      this.props.navigation.navigate("App");
    } else {
      this.props.navigation.navigate("Auth");
    }
  }
  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

import LoginScreen from "./src/Screens/Login/LoginScreen";
import React, { Component } from "react";
import IAppState from "./IAppState";
import * as Font from "expo-font";
import { StyleProvider, Root } from "native-base";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";
import MainRouter from "./src/Screens/MainRouter";
import Axios from "axios";
import AuthService from "./src/services/AuthService";
Axios.interceptors.request.use(
  async function(config) {
    if (await AuthService.getToken()) {
      config.headers.Authorization = `Bearer ${await AuthService.getToken()}`;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

export default class App extends Component<{}, IAppState> {
  state = {
    isReady: false
  };
  componentWillMount = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ isReady: true });
  };
  render() {
    return (
      <Root>
        <StyleProvider style={getTheme(material)}>
          <MainRouter></MainRouter>
        </StyleProvider>
      </Root>
    );
  }
}

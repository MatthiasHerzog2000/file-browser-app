import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  BackHandler,
  NativeEventSubscription,
  Alert,
  StatusBar
} from "react-native";
import PathService from "../../services/PathService";
import AuthService from "../../services/AuthService";
import { IFile } from "../../models/file";
import { Button, Content, Container } from "native-base";
import IHomeProps from "./IHomeProps";
import IHomeState from "./IHomeState";
import FileComponent from "../../components/file-component/FileComponent";
import LoadingComponent from "../../components/loading-component/LoadingComponent";
import HeaderComponent from "../../components/header-component/HeaderComponent";
import { globalStyles } from "../../../globalStyles";
import material from "../../../native-base-theme/variables/material";
var backHandler: NativeEventSubscription;
export default class HomeScreen extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
  }
  state: IHomeState = {
    directory: null,
    isLoading: false,
    searchString: ""
  };
  static navigationOptions = {
    header: null
  };
  async componentWillMount() {
    console.log("cwm");
    this.setState({ isLoading: true });
    let directory: IFile = await PathService.getFiles(
      await AuthService.getCurrentPath()
    );
    this.setState({ directory: directory, isLoading: false });
  }
  componentDidMount() {
    backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
  }
  componentWillUnmount() {
    backHandler.remove();
  }
  handleBackPress = async () => {
    const path = await AuthService.getCurrentPath();
    const lastPath = path
      .split("/")
      .slice(0, path.split("/").length - 1)
      .join("/");
    if (path != (await AuthService.getInitPath())) {
      let directory: IFile = await PathService.getFiles(lastPath);
      AuthService.setCurrentPath(lastPath);
      this.setState({ directory: directory });
    } else {
      this._renderAlert();
    }
    return true;
  };
  _renderAlert = () => {
    Alert.alert(
      "Exit Application",
      "Do you want to exit the Application?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => BackHandler.exitApp() }
      ],
      { cancelable: false }
    );
  };
  _onPressFolder = async (path: string) => {
    console.log(path);
    AuthService.setCurrentPath(path);

    let directory: IFile = await PathService.getFiles(path);
    this.props.navigation.navigate({
      routeName: "Home",
      params: { path: path }
    });
    this.setState({ directory: directory });
  };
  _onTextChange = (text: string) => {
    console.log(text);
    this.setState({ searchString: text });
  };
  render() {
    if (this.state.isLoading) {
      return <LoadingComponent></LoadingComponent>;
    } else {
      return (
        <Container>
          <View style={globalStyles.header}></View>
          <HeaderComponent
            searchString={this.state.searchString}
            _onTextChange={this._onTextChange}
          ></HeaderComponent>
          <Content>
            <FlatList
              data={this.state.directory.children}
              extraData={this.state.searchString}
              renderItem={({ item, index }) => {
                if (item.name.includes(this.state.searchString)) {
                  return (
                    <FileComponent
                      _onPressFolder={this._onPressFolder}
                      file={item}
                      key={index}
                    ></FileComponent>
                  );
                } else {
                  return null;
                }
              }}
            ></FlatList>
            <Button
              onPress={() => {
                AuthService.clear();
                this.props.navigation.navigate("Auth");
              }}
            >
              <Text>Logout</Text>
            </Button>
          </Content>
        </Container>
      );
    }
  }
}

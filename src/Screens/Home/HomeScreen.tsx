import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  BackHandler,
  NativeEventSubscription,
  Alert,
  StatusBar,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native";
import PathService from "../../services/PathService";
import AuthService from "../../services/AuthService";
import { IFile } from "../../models/file";
import { Button, Content, Container, Drawer } from "native-base";
import IHomeProps from "./IHomeProps";
import IHomeState from "./IHomeState";
import FileComponent from "../../components/file-component/FileComponent";
import LoadingComponent from "../../components/loading-component/LoadingComponent";
import HeaderComponent from "../../components/header-component/HeaderComponent";
import { globalStyles } from "../../../globalStyles";
import SideBarComponent from "../../components/sidebar-component/SideBarComponent";
import FABComponent from "../../components/fab-component/FABComponent";
var backHandler: NativeEventSubscription;
export default class HomeScreen extends Component<IHomeProps, IHomeState> {
  drawer: any = {};
  offset: number = 0;
  constructor(props: IHomeProps) {
    super(props);
  }
  state: IHomeState = {
    directory: null,
    isLoading: false,
    searchString: "",
    fabsVisible: true
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
  _closeDrawer = () => {
    this.drawer._root.close();
  };
  Copy;
  _openDrawer = () => {
    this.drawer._root.open();
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
  _detectScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    var currentOffset = event.nativeEvent.contentOffset.y;
    var direction = currentOffset > this.offset ? "down" : "up";
    this.offset = currentOffset;
    if (direction === "up" || currentOffset <= 0) {
      this.setState({ fabsVisible: true });
    } else {
      this.setState({ fabsVisible: false });
    }
  };
  _onUploadPress = () => {};
  _onNewFolderPress = () => {};
  render() {
    if (this.state.isLoading) {
      return <LoadingComponent></LoadingComponent>;
    } else {
      return (
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={<SideBarComponent navigation={this.props.navigation} />}
          onClose={() => this._closeDrawer()}
        >
          <Container>
            <View style={globalStyles.header}></View>
            <HeaderComponent
              searchString={this.state.searchString}
              _onTextChange={this._onTextChange}
              _openDrawer={this._openDrawer}
            ></HeaderComponent>
            <Content
              onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) =>
                this._detectScroll(event)
              }
            >
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
            </Content>
            {this.state.fabsVisible ? (
              <View>
                <FABComponent
                  icon="folder-plus-outline"
                  margin={70}
                  _onClick={this._onUploadPress}
                ></FABComponent>
                <FABComponent
                  icon="upload"
                  margin={0}
                  _onClick={this._onNewFolderPress}
                ></FABComponent>
              </View>
            ) : null}
          </Container>
        </Drawer>
      );
    }
  }
}

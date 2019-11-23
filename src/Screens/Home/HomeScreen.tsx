import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  BackHandler,
  NativeEventSubscription,
  Alert,
  NativeSyntheticEvent,
  NativeScrollEvent
} from "react-native";
import { Notifications } from "expo";
import PathService from "../../services/PathService";
import * as FileSystem from "expo-file-system";
import AuthService from "../../services/AuthService";
import { IFile } from "../../models/IFile";
import { Content, Container, Drawer } from "native-base";
import IHomeProps from "./IHomeProps";
import IHomeState from "./IHomeState";
import FileComponent from "../../components/file-component/FileComponent";
import LoadingComponent from "../../components/loading-component/LoadingComponent";
import HeaderComponent from "../../components/header-component/HeaderComponent";
import { globalStyles } from "../../../globalStyles";
import SideBarComponent from "../../components/sidebar-component/SideBarComponent";
import FABComponent from "../../components/fab-component/FABComponent";
import { ModalTypes } from "../../utils/ModalTypeEnum";
import FileDetailsComponent from "../../components/file-details-component/FileDetailsComponent";
import emitter from "tiny-emitter/instance";
import { FileOption } from "../../utils/FileOptionsEnum";
import FooterComponent from "../../components/footer-component/FooterComponent";
import { IError } from "../../models/IError";
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
    fabsVisible: true,
    fileDetailsModalVisible: false,
    selectedFile: undefined,
    markedFiles: [],
    downloads: []
  };
  static navigationOptions = {
    header: null
  };
  async componentWillMount() {
    emitter.on("OptionsClicked", async buttonIndex => {
      if (FileOption.More_Information === buttonIndex) {
        this.setState({ fileDetailsModalVisible: true });
      } else if (FileOption.Download === buttonIndex) {
        const success = await PathService.downloadFile(
          this.state.selectedFile.path,
          this.state.selectedFile.name,
          this.state.selectedFile.type,
          this._onDownloadProgress
        );
      }
    });
    this.setState({ isLoading: true });
    let directory: IFile | IError = await PathService.getFiles(
      await AuthService.getCurrentPath()
    );
    if ("err" in directory) {
      this.props.navigation.navigate("Auth");
    } else {
      this.setState({ directory: directory as IFile, isLoading: false });
    }
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
  _setModalVisible = (type: string) => {
    if (type === ModalTypes.FileDetails) {
      this.setState({
        fileDetailsModalVisible: !this.state.fileDetailsModalVisible
      });
    }
  };
  _onSelectedFile = (selectedFile: IFile) => {
    this.setState({ selectedFile });
  };
  handleBackPress = async () => {
    const path = await AuthService.getCurrentPath();
    const lastPath = path
      .split("/")
      .slice(0, path.split("/").length - 1)
      .join("/");
    if (path != (await AuthService.getInitPath())) {
      let directory: IFile | IError = await PathService.getFiles(lastPath);
      AuthService.setCurrentPath(lastPath);
      this.setState({ directory: directory as IFile });
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
  _openDrawer = () => {
    this.drawer._root.open();
  };
  _onPressFile = (file: IFile) => {
    if (this.state.markedFiles.length != 0) {
      this._markFileOrFolder(file);
    } else {
    }
  };
  _onDownloadProgress = async (progress: FileSystem.DownloadProgressData) => {
    const copyDownloads = this.state.downloads;
    var exisitingNotification = this.state.downloads.find(
      s => s.totalBytes === progress.totalBytesExpectedToWrite
    );
    if (!exisitingNotification) {
      exisitingNotification = {
        id: 0,
        file: this.state.selectedFile.name,
        totalBytes: progress.totalBytesExpectedToWrite
      };
    } else {
      copyDownloads.splice(
        copyDownloads.findIndex(cd => cd.id === exisitingNotification.id),
        1
      );
      Notifications.dismissNotificationAsync(exisitingNotification.id);
    }
    if (progress.totalBytesWritten !== progress.totalBytesExpectedToWrite) {
      const notificationId = await Notifications.presentLocalNotificationAsync({
        title: `Download ${this.state.selectedFile.name}`,
        body: `${Math.round(
          (progress.totalBytesWritten * 100) /
            progress.totalBytesExpectedToWrite
        )}% Downloaded`
      });
      exisitingNotification.id = notificationId;
      copyDownloads.push(exisitingNotification);
      this.setState({ downloads: copyDownloads });
    }
  };
  _onPressFolder = async (file: IFile) => {
    console.log(file);
    if (this.state.markedFiles.length != 0) {
      this._markFileOrFolder(file);
    } else {
      AuthService.setCurrentPath(file.path);

      let directory: IFile | IError = await PathService.getFiles(file.path);
      this.props.navigation.navigate({
        routeName: "Home",
        params: { path: file.path }
      });
      this.setState({ directory: directory as IFile });
    }
  };
  _onTextChange = (text: string) => {
    console.log(text);
    this.setState({ searchString: text });
  };
  _markFileOrFolder = (selected: IFile) => {
    const copyDir = this.state.directory;
    const copyMarkedFiles = this.state.markedFiles;
    let selectedFile = copyDir.children.find(
      file => file.name === selected.name
    );
    selectedFile.active = !selectedFile.active;
    if (selectedFile.active) {
      copyMarkedFiles.push(selectedFile);
    } else {
      copyMarkedFiles.splice(
        copyMarkedFiles.findIndex(sFile => sFile.name === selectedFile.name),
        1
      );
    }
    this.setState({ directory: copyDir, markedFiles: copyMarkedFiles });
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
                extraData={[this.state.searchString, this.state.directory]}
                renderItem={({ item, index }) => {
                  if (item.name.includes(this.state.searchString)) {
                    return (
                      <FileComponent
                        _onPressFolder={this._onPressFolder}
                        _onSelectedFile={this._onSelectedFile}
                        __markFileOrFolder={this._markFileOrFolder}
                        _onPressFile={this._onPressFile}
                        markedFiles={this.state.markedFiles}
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
            {this.state.fabsVisible && this.state.markedFiles.length === 0 ? (
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
            {this.state.selectedFile ? (
              <FileDetailsComponent
                key={this.state.selectedFile.path}
                setModalVisible={this._setModalVisible}
                fileDetailsModalVisible={this.state.fileDetailsModalVisible}
                selectedFile={this.state.selectedFile}
              ></FileDetailsComponent>
            ) : null}
            <FooterComponent
              markedFiles={this.state.markedFiles}
            ></FooterComponent>
          </Container>
        </Drawer>
      );
    }
  }
}

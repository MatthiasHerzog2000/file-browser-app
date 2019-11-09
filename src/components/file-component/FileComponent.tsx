import React, { Component } from "react";
import { Text, Icon, Col, Row } from "native-base";
import IFileProps from "./IFileProps";
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableHighlight,
  View
} from "react-native";
import DateParser from "../../utils/date";
import { TYPE_DIR } from "../../utils/staticStrings";

export default class FileComponent extends Component<IFileProps, {}> {
  constructor(props: IFileProps) {
    super(props);
  }
  _renderIconType = () => {
    let jsx: any;
    if (!!this.props.file.extension) {
      switch (this.props.file.extension) {
        case ".jpeg":
        case ".jpg":
        case ".svg":
          jsx = (
            <Icon
              style={{ color: "#add8e6" }}
              color="darkGrey"
              type="FontAwesome5"
              name="file-image"
            />
          );
          break;
        case ".pdf":
          jsx = (
            <Icon
              style={{ color: "red" }}
              type="FontAwesome5"
              name="file-pdf"
            />
          );
          break;
        case ".docx":
        case ".doc":
          jsx = (
            <Icon
              style={{ color: "darkBlue" }}
              type="FontAwesome5"
              name="file-word"
            />
          );
          break;
        case ".xlsx":
        case ".xls":
          jsx = (
            <Icon
              style={{ color: "darkGreen" }}
              type="FontAwesome5"
              name="file-excel"
            />
          );
          break;
        case ".js":
          jsx = (
            <Icon color="darkGrey" type="Ionicons" name="logo-javascript" />
          );
          break;
        case ".html":
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="html5" />;
          break;
        case ".java":
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="java" />;
          break;
        case ".cs":
        case ".c":
        case ".h":
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="file-code" />;
          break;
        case ".csv":
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="file-csv" />;
          break;
        case ".pptx":
        case ".ppt":
          jsx = (
            <Icon
              style={{ color: "orange" }}
              type="FontAwesome5"
              name="file-powerpoint"
            />
          );
          break;
        case ".zip":
        case ".targz":
        case ".rar":
          jsx = (
            <Icon color="darkGrey" type="FontAwesome5" name="file-archive" />
          );
          break;
        case ".mp3":
        case ".wav":
        case ".wma":
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="file-audio" />;
          break;
        case ".avi":
        case ".mp4":
        case ".wmv":
        case ".mpg":
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="file-video" />;
          break;
        default:
          jsx = <Icon color="darkGrey" type="FontAwesome5" name="file" />;
          break;
      }
    } else {
      return (
        <Icon
          color="darkGrey"
          type="FontAwesome5"
          name="folder"
          style={styles.icon}
        />
      );
    }
    return jsx;
  };
  _renderOptions = () => {
    console.log("render");
  };
  _fileClicked = () => {
    console.log("file");
  };
  render() {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#c6c6c6")}
        onPress={() => this.props._onPressFolder(this.props.file.path)}
      >
        <Row style={{ padding: 20 }}>
          <Col style={styles.leftItem}>{this._renderIconType()}</Col>

          <Col
            style={{
              width: "70%"
            }}
          >
            <Text>{this.props.file.name}</Text>
            <Text note>
              Geändert am:
              {DateParser.parseDateToString(new Date(this.props.file.mtime))}
            </Text>
          </Col>

          <Col style={styles.rightItem}>
            <TouchableHighlight
              onPress={this._renderOptions}
              underlayColor="lightgrey"
              style={styles.optionHighlight}
            >
              <View style={styles.rightItem}>
                <Icon
                  style={[{ fontSize: 20, marginTop: 4 }]}
                  type="FontAwesome5"
                  name="ellipsis-v"
                  color="lightgrey"
                ></Icon>
              </View>
            </TouchableHighlight>
          </Col>
        </Row>
      </TouchableNativeFeedback>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    fontSize: 30,
    width: 30
  },
  leftItem: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  rightItem: {
    justifyContent: "center",
    alignItems: "center"
  },
  optionHighlight: {
    width: 30,
    height: 30,
    alignSelf: "center",
    borderRadius: 30 / 2
  }
});

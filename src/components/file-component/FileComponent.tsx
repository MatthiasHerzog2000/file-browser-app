import React, { Component } from "react";
import { Text, Icon, Col, Row } from "native-base";
import IFileProps from "./IFileProps";
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableHighlight,
  View
} from "react-native";
import DateParser from "../../utils/DateParser";
import { FileOptions } from "../../utils/FileOptions";
import IconFinder from "../../utils/IconFinder";
import material from "../../../native-base-theme/variables/material";
import { TYPE_DIR } from "../../utils/staticStrings";

export default class FileComponent extends Component<IFileProps, {}> {
  constructor(props: IFileProps) {
    super(props);
  }

  render() {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#c6c6c6")}
        onPress={() =>
          this.props.file.type === TYPE_DIR
            ? this.props._onPressFolder(this.props.file)
            : this.props._onPressFile(this.props.file)
        }
        onLongPress={() => this.props.__markFileOrFolder(this.props.file)}
      >
        <Row style={{ padding: 20 }}>
          <Col style={styles.leftItem}>
            {this.props.file.active ? (
              <Icon
                name="check"
                style={{ color: material.buttonPrimaryBg }}
              ></Icon>
            ) : (
              IconFinder._renderIconType(this.props.file, 30)
            )}
          </Col>

          <Col
            style={{
              width: "70%"
            }}
          >
            <Text>{this.props.file.name}</Text>
            <Text note>
              Geändert am:
              {DateParser.parseDateToString(new Date(this.props.file.atime))}
            </Text>
          </Col>
          {this.props.markedFiles.length != 0 ? null : (
            <Col style={styles.rightItem}>
              <TouchableHighlight
                onPress={() => {
                  FileOptions.show();
                  this.props._onSelectedFile(this.props.file);
                }}
                underlayColor="lightgrey"
                style={styles.optionHighlight}
              >
                <View style={styles.rightItem}>
                  <Icon
                    style={[{ fontSize: 20, marginTop: 4, color: "#9E9E9E" }]}
                    type="FontAwesome5"
                    name="ellipsis-v"
                  ></Icon>
                </View>
              </TouchableHighlight>
            </Col>
          )}
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

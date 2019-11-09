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
import { FileOptions } from "../../utils/FileOptions";
import IconFinder from "../../utils/IconFinder";

export default class FileComponent extends Component<IFileProps, {}> {
  constructor(props: IFileProps) {
    super(props);
  }

  render() {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple("#c6c6c6")}
        onPress={() => this.props._onPressFolder(this.props.file.path)}
      >
        <Row style={{ padding: 20 }}>
          <Col style={styles.leftItem}>
            {IconFinder._renderIconType(this.props.file)}
          </Col>

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
              onPress={() => FileOptions.show()}
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

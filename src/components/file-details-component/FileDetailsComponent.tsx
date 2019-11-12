import React, { Component } from "react";
import { Modal, StyleSheet } from "react-native";
import IFileDetailsProps from "./IFileDetailsProps";
import { ModalTypes } from "../../utils/ModalTypeEnum";
import {
  Grid,
  Text,
  Row,
  Container,
  Icon,
  Col,
  H2,
  View,
  Content
} from "native-base";
import IconFinder from "../../utils/IconFinder";
import material from "../../../native-base-theme/variables/material";
import DateParser from "../../utils/DateParser";

export default class FileDetailsComponent extends Component<
  IFileDetailsProps,
  {}
> {
  constructor(props: IFileDetailsProps) {
    super(props);
  }
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.fileDetailsModalVisible}
      >
        <Container>
          <View style={styles.iconRow}>
            <View>
              <Icon
                onPress={() =>
                  this.props.setModalVisible(ModalTypes.FileDetails)
                }
                name="close"
                style={{ color: "black", paddingLeft: 10, paddingTop: 10 }}
              ></Icon>
            </View>

            <View style={styles.iconView}>
              {IconFinder._renderIconType(this.props.selectedFile, 80)}
            </View>
          </View>
          <View style={styles.divider}></View>
          <Grid style={{ marginLeft: 20 }}>
            <Row style={{ height: 50 }}>
              <View
                style={{
                  marginRight: 10
                }}
              >
                {IconFinder._renderIconType(this.props.selectedFile, 30)}
              </View>
              <Text style={{ fontSize: 20 }}>
                {this.props.selectedFile.name}
              </Text>
            </Row>
            <Row style={{ height: 50 }}>
              <Col>
                <Text style={styles.mainText}>Typ</Text>
                <Text style={styles.subText} note>
                  {this.props.selectedFile.type ||
                    this.props.selectedFile.extension}
                </Text>
              </Col>
            </Row>
            <Row style={{ height: 50 }}>
              <Col>
                <Text style={styles.mainText}>Ort</Text>
                <Text style={styles.subText} note>
                  {this.props.selectedFile.path}
                </Text>
              </Col>
            </Row>
            <Row style={{ height: 50 }}>
              <Col>
                <Text style={styles.mainText}>Erstellt</Text>
                <Text style={styles.subText} note>
                  {DateParser.parseDateToDateString(
                    new Date(this.props.selectedFile.mtime)
                  )}
                </Text>
              </Col>
              <Col>
                <Text style={styles.mainText}>Geändert</Text>
                <Text style={styles.subText} note>
                  {DateParser.parseDateToDateString(
                    new Date(this.props.selectedFile.atime)
                  )}
                </Text>
              </Col>
            </Row>
          </Grid>
        </Container>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  iconRow: {
    height: "30%"
  },
  iconView: {
    justifyContent: "center",
    alignItems: "center",
    height: "90%"
  },
  divider: {
    borderBottomColor: "darkgrey",
    borderBottomWidth: 1,
    marginBottom: 20
  },
  mainText: { fontSize: 15 },
  subText: { fontSize: 15 }
});

import React, { Component } from "react";
import { Modal, StyleSheet, Image, ImageBackground } from "react-native";
import IFileDetailsProps from "./IFileDetailsProps";
import { ModalTypes } from "../../utils/ModalTypeEnum";
import { Grid, Text, Row, Container, Icon, Col, H2, View } from "native-base";
import IconFinder from "../../utils/IconFinder";
import material from "../../../native-base-theme/variables/material";
import DateParser from "../../utils/DateParser";
import { IPreviewOptions } from "../../models/IPreviewOptions";
import PathService from "../../services/PathService";
import { IFileDetailsState } from "./IFileDetailsState";

export default class FileDetailsComponent extends Component<
  IFileDetailsProps,
  IFileDetailsState
> {
  constructor(props: IFileDetailsProps) {
    super(props);
  }
  state: IFileDetailsState = {
    base64: undefined
  };
  async componentWillMount() {
    if (this.props.selectedFile.type !== "directory") {
      const options: IPreviewOptions = {
        quality: 100,
        width: 780,
        height: 1024,
        isDetailed: false
      };
      const response: any = await PathService.generatePreview(
        this.props.selectedFile.path,
        options
      );
      if (response.success) {
        const base = await PathService.getPreview(response.outpath);
        console.log(base);
        this.setState({ base64: "data:image/jpg;base64," + base });
      } else {
        this.setState({ base64: undefined });
      }
    }
  }
  _renderSize(bytes: number, si: boolean) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }
    var units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    var u = -1;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + " " + units[u];
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
            {this.state.base64 ? (
              <ImageBackground
                style={{
                  width: "100%",
                  height: "100%"
                }}
                source={{ uri: this.state.base64 }}
              >
                <Icon
                  onPress={() =>
                    this.props.setModalVisible(ModalTypes.FileDetails)
                  }
                  name="close"
                  style={{ color: "black", paddingLeft: 10, paddingTop: 10 }}
                ></Icon>
              </ImageBackground>
            ) : (
              <View>
                <Icon
                  onPress={() =>
                    this.props.setModalVisible(ModalTypes.FileDetails)
                  }
                  name="close"
                  style={{ color: "black", paddingLeft: 10, paddingTop: 10 }}
                ></Icon>

                <View style={styles.iconView}>
                  {IconFinder._renderIconType(this.props.selectedFile, 80)}
                </View>
              </View>
            )}
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
            <Row style={styles.rowStyle}>
              <Col>
                <Text style={styles.mainText}>Typ</Text>
                <Text style={styles.subText} note>
                  {this.props.selectedFile.type ||
                    this.props.selectedFile.extension}
                </Text>
              </Col>
            </Row>
            <Row style={styles.rowStyle}>
              <Col>
                <Text style={styles.mainText}>Ort</Text>
                <Text style={styles.subText} note>
                  {this.props.selectedFile.path}
                </Text>
              </Col>
            </Row>
            <Row style={styles.rowStyle}>
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
            <Row style={styles.rowStyle}>
              <Col>
                <Text style={styles.mainText}>Größe</Text>
                <Text style={styles.subText} note>
                  {this._renderSize(this.props.selectedFile.size, true)}
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
  rowStyle: {
    height: 50,
    marginVertical: 10
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

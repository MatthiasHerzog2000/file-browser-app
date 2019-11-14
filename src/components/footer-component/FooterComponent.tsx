import React, { Component } from "react";
import { Text, View } from "react-native";
import IFooterProps from "./IFooterProps";
import { Footer, Left, Icon, Right } from "native-base";
import material from "../../../native-base-theme/variables/material";

export default class FooterComponent extends Component<IFooterProps, {}> {
  constructor(props: IFooterProps) {
    super(props);
  }
  render() {
    if (this.props.markedFiles.length != 0) {
      return (
        <Footer style={{ backgroundColor: "white" }}>
          <Left style={{ marginLeft: 20 }}>
            <Icon
              style={{ color: material.buttonPrimaryBg }}
              name="close"
            ></Icon>
          </Left>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                color: material.buttonPrimaryBg,
                fontSize: 20,
                textAlign: "left"
              }}
            >{`${this.props.markedFiles.length} ${
              this.props.markedFiles.length > 1 ? "Elemente" : "Element"
            }`}</Text>
          </View>

          <Right style={{ marginRight: 20, marginLeft: 20 }}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Icon
                style={{ color: material.buttonPrimaryBg, marginRight: 10 }}
                type="MaterialCommunityIcons"
                name="file-move"
              ></Icon>
              <Icon
                style={{ color: material.buttonPrimaryBg }}
                type="MaterialCommunityIcons"
                name="trash-can"
              ></Icon>
            </View>
          </Right>
        </Footer>
      );
    } else {
      return null;
    }
  }
}

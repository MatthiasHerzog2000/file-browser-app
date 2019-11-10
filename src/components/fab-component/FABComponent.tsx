import React, { Component } from "react";
import { Fab, Icon, Button } from "native-base";
import IFABProps from "./IFABProps";
import material from "../../../native-base-theme/variables/material";

export default class FABComponent extends Component<IFABProps, {}> {
  constructor(props: IFABProps) {
    super(props);
  }
  render() {
    return (
      <Fab
        containerStyle={{}}
        style={{
          backgroundColor: material.buttonPrimaryBg,
          marginBottom: this.props.margin
        }}
        position="bottomRight"
        onPress={() => this.props._onClick()}
      >
        <Icon type="MaterialCommunityIcons" name={this.props.icon} />
      </Fab>
    );
  }
}

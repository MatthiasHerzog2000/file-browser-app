import React, { Component } from "react";
import { Text, View, StatusBar } from "react-native";
import {
  Header,
  Left,
  Button,
  Icon,
  Title,
  Body,
  Right,
  Item,
  Input
} from "native-base";
import IHeaderProps from "./IHeaderProps";

export default class HeaderComponent extends Component<IHeaderProps, {}> {
  constructor(props: IHeaderProps) {
    super(props);
  }
  render() {
    return (
      <Header searchBar>
        <Left>
          <Button rounded onPress={this.props._openDrawer} transparent>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Item rounded style={{ backgroundColor: "#fff" }}>
            <Icon name="ios-search" />
            <Input
              value={this.props.searchString}
              onChangeText={text => this.props._onTextChange(text)}
              placeholder="Suche in File-Browser"
            />
          </Item>
        </Body>
      </Header>
    );
  }
}

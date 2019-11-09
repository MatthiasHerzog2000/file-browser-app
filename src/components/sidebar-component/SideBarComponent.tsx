import React, { Component } from "react";
import { Image, StyleSheet, TouchableNativeFeedback } from "react-native";
import {
  Drawer,
  Text,
  Content,
  H2,
  Footer,
  Right,
  Container,
  Icon,
  View,
  Row,
  H3,
  Col,
  Button,
  Grid
} from "native-base";
import { globalStyles } from "../../../globalStyles";
import { FILEBROWSERLOGO } from "../../img";
import { DRAWER_TITLE, LOGOUT_STRING } from "../../utils/staticStrings";
import ISideBarState from "./ISideBarState";
import ISideBarProps from "./ISideBarProps";
import AuthService from "../../services/AuthService";
import material from "../../../native-base-theme/variables/material";

export default class SideBarComponent extends Component<
  ISideBarProps,
  ISideBarState
> {
  constructor(props: ISideBarProps) {
    super(props);
  }
  state: ISideBarState = {
    user: undefined
  };
  async componentWillMount() {
    this.setState({ user: await AuthService.getUser() });
  }
  render() {
    return (
      <Container>
        <Content style={{ backgroundColor: "#FFFFFF" }}>
          <View style={globalStyles.header}></View>
          <View style={styles.headerWrapper}>
            <Image
              style={styles.image}
              resizeMethod="resize"
              source={FILEBROWSERLOGO}
            ></Image>
            <H2 style={styles.title}>{DRAWER_TITLE}</H2>
          </View>
          {this.state.user ? (
            <View style={styles.personalInformation}>
              <Row>
                <Col size={20}>
                  <Icon type="SimpleLineIcons" name="user"></Icon>
                </Col>
                <Col size={80}>
                  <H3>{this.state.user.name}</H3>
                  <Text note>{this.state.user.email}</Text>
                </Col>
              </Row>
            </View>
          ) : null}
        </Content>
        <Footer>
          <Right>
            <TouchableNativeFeedback
              onPress={() => {
                AuthService.clear();
                this.props.navigation.navigate("Auth");
              }}
              background={TouchableNativeFeedback.Ripple(
                material.androidRippleColor
              )}
            >
              <View>
                <Grid style={styles.logoutButtonWrapper}>
                  <Text style={styles.logoutButton}>{LOGOUT_STRING}</Text>
                  <Icon
                    style={styles.logoutButton}
                    type="MaterialCommunityIcons"
                    name="logout"
                  />
                </Grid>
              </View>
            </TouchableNativeFeedback>
          </Right>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  },
  headerWrapper: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    marginHorizontal: 20
  },
  title: {
    paddingBottom: 20
  },
  personalInformation: {
    paddingTop: 20,
    marginLeft: 20
  },
  logoutButton: {
    color: "white",
    paddingHorizontal: 5
  },
  logoutButtonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 20
  }
});

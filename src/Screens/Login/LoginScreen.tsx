import React, { Component } from "react";
import {
  Header,
  Form,
  Input,
  Container,
  Content,
  Item,
  Icon,
  View,
  Text,
  Grid,
  Row,
  Col,
  Button
} from "native-base";
import { globalStyles } from "../../../globalStyles";
import { StyleSheet, Image } from "react-native";
import { FILEBROWSERLOGO } from "../../img";
import { ILoginState } from "./ILoginState";
import { LoginService } from "../../services/LoginService";
import material from "../../../native-base-theme/variables/material";
import ILoginProps from "./ILoginProps";
import AuthService from "../../services/AuthService";
import LoadingComponent from "../../components/loading-component/LoadingComponent";
import PathService from "../../services/PathService";
export default class LoginScreen extends Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);
  }
  static navigationOptions = {
    header: null
  };
  state: ILoginState = {
    activeUsername: false,
    isLoading: false,
    activePassword: false,
    username: "",
    password: "",
    usernameError: false,
    passwordError: false,
    ErrorMsg: ""
  };
  _loginButtonPressed = async () => {
    this.setState({ isLoading: true });
    let response = await LoginService.login(
      this.state.username,
      this.state.password
    );
    if (!response.success) {
      this.setState({
        usernameError: true,
        passwordError: true,
        ErrorMsg: response.err,
        isLoading: false
      });
    } else {
      AuthService.setToken(response.token);
      AuthService.setUser(response.user);
      const initPath = await PathService.getInitialPath();
      console.log(initPath);
      AuthService.setInitPath(initPath.initPath);
      AuthService.setCurrentPath(initPath.initPath);
      this.setState({ isLoading: false });
      this.props.navigation.navigate("App");
    }
  };
  render() {
    if (this.state.isLoading) {
      return <LoadingComponent></LoadingComponent>;
    } else {
      return (
        <Container style={globalStyles.header}>
          <Content
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Grid>
              <Row size={30}>
                <Col style={{ alignItems: "center", justifyContent: "center" }}>
                  <Image
                    resizeMethod="resize"
                    style={styles.image}
                    source={FILEBROWSERLOGO}
                  ></Image>
                </Col>
              </Row>
              <Row size={70}>
                <Col>
                  <Form>
                    <Item
                      error={this.state.usernameError}
                      style={styles.itemStyle}
                      floatingLabel
                    >
                      <Icon
                        type="MaterialIcons"
                        style={this.state.activeUsername ? styles.active : null}
                        name="email"
                      />
                      <Input
                        placeholder="E-Mail"
                        onBlur={() => this.setState({ activeUsername: false })}
                        onFocus={() => this.setState({ activeUsername: true })}
                        value={this.state.username}
                        onChangeText={text => this.setState({ username: text })}
                      />
                    </Item>

                    <Item
                      error={this.state.passwordError}
                      style={styles.itemStyle}
                      floatingLabel
                    >
                      <Icon
                        type="FontAwesome5"
                        style={this.state.activePassword ? styles.active : null}
                        active
                        name="lock"
                      />
                      <Input
                        onBlur={() => this.setState({ activePassword: false })}
                        onFocus={() => this.setState({ activePassword: true })}
                        secureTextEntry
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                      />
                    </Item>
                    {this.state.usernameError || this.state.passwordError ? (
                      <View style={styles.error}>
                        <Icon
                          type="Ionicons"
                          name="md-close-circle-outline"
                          style={styles.errorIcon}
                        ></Icon>
                        <Text
                          style={{
                            color: material.buttonDangerBg,
                            textAlign: "center"
                          }}
                        >
                          {this.state.ErrorMsg}
                        </Text>
                      </View>
                    ) : null}

                    <View style={styles.loginButton}>
                      <Button onPress={this._loginButtonPressed} block primary>
                        <Text>Login</Text>
                      </Button>
                    </View>
                  </Form>
                </Col>
              </Row>
            </Grid>
          </Content>
        </Container>
      );
    }
  }
}
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  },
  loginButton: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20
  },
  itemStyle: {
    marginLeft: 10,
    marginRight: 10
  },
  active: {
    color: "#039BE5"
  },
  errorIcon: {
    marginRight: 10,
    color: material.buttonDangerBg
  },
  error: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import ILoadingProps from "./ILoadingComponentProps";
import { Bar } from "./shapes/Bar";
import { Container } from "native-base";
export default class LoadingComponent extends Component<ILoadingProps, {}> {
  constructor(props: ILoadingProps) {
    super(props);
  }

  componentDidMount() {
    console.log();
  }
  render() {
    return (
      <Container
        style={[
          StyleSheet.absoluteFill,
          {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }
        ]}
      >
        {[0, 100, 200, 300, 400, 500, 600, 700].map((element, index) => {
          return <Bar startDelay={element} key={index}></Bar>;
        })}
      </Container>
    );
  }
}

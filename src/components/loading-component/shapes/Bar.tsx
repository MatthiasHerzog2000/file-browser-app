import React, { useEffect } from "react";
import IBarProps from "./IBarProps";
import { Animated } from "react-native";

export function Bar(props: IBarProps) {
  const usePulse = () => {
    const scale = new Animated.Value(1);
    const pulse = () => {
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.2 }),
        Animated.timing(scale, { toValue: 0.8 })
      ]).start(() => pulse());
    };
    useEffect(() => {
      const timeout = setTimeout(() => pulse(), props.startDelay);
      return () => clearTimeout(timeout);
    }, []);
    return scale;
  };

  return (
    <Animated.View
      style={{
        width: 10,
        height: 80,
        backgroundColor: "#039BE5",
        transform: [{ scale: usePulse() }],
        marginHorizontal: 10
      }}
    />
  );
}

import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Logo = ({ size }) => {
  const { container, s, m, l } = styles;

  const logoStyle = (size) => {
    if (size === "small")
      return {
        height: 30,
        width: 30,
      };
    if (size === "medium")
      return {
        height: 50,
        width: 50,
      };
    if (size === "large")
      return {
        height: 100,
        width: 100,
      };
  };

  console.log(size);

  return (
    <View style={container}>
      <Image
        source={require("../assets/airbnb-logo.png")}
        style={logoStyle(size)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  m: {
    height: 50,
    width: 50,
  },
  l: {
    height: 100,
    width: 100,
  },
});

export default Logo;

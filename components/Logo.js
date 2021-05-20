import React from "react";
import { View, Image, StyleSheet } from "react-native";

const Logo = ({ size, position }) => {
  const {
    containerCenter,
    containerLeft,
    containerRight,
    small,
    medium,
    large,
  } = styles;

  const logoStyle = (size) => {
    if (!size) return medium;
    if (size === "small") return small;
    if (size === "medium") return medium;
    if (size === "large") return large;
  };

  const containerStyle = (position) => {
    if (!position) return containerCenter;
    if (position === "center") return containerCenter;
    if (position === "left") return containerLeft;
    if (position === "right") return containerRight;
  };

  return (
    <View style={containerStyle(position)}>
      <Image
        source={require("../assets/airbnb-logo.png")}
        style={logoStyle(size)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    alignItems: "center",
  },
  containerLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  containerRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  small: {
    height: 30,
    width: 30,
  },
  medium: {
    height: 50,
    width: 50,
  },
  large: {
    height: 100,
    width: 100,
  },
});

export default Logo;

import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../assets/colors";

const TouchButton = ({ title, onPress }) => {
  const renderButtonTitle = (title) => {
    if (!title) return "Touch me";
    return title;
  };

  const { button } = styles;

  return (
    <TouchableOpacity style={button} onPress={onPress}>
      <Text>{renderButtonTitle(title)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 50,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});

export default TouchButton;

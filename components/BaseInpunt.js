import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../assets/colors";

const BaseInpunt = ({ placeholder, value, setValue }) => {
  const { input } = styles;

  return (
    <>
      <TextInput
        placeholder={placeholder}
        style={input}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: colors.accent,
    borderBottomWidth: 1,
    marginBottom: 30,
    paddingBottom: 10,
  },
});

export default BaseInpunt;

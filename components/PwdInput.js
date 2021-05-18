import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../assets/colors";

const PwdInput = ({ placeholder }) => {
  const { input } = styles;
  return (
    <>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={true}
        style={input}
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

export default PwdInput;

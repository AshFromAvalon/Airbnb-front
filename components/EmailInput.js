import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../assets/colors";

const EmailInput = ({ placeholder, value, setEmail }) => {
  const { input } = styles;
  return (
    <>
      <TextInput
        placeholder={placeholder}
        style={input}
        value={value}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
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

export default EmailInput;

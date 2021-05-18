import React from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../assets/colors";

const AreaInput = ({ placeholder, value, setDescription }) => {
  const { input } = styles;
  return (
    <>
      <TextInput
        placeholder={placeholder}
        multiline={true}
        numberOfLines={4}
        style={input}
        value={value}
        onChangeText={(text) => setDescription(text)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: colors.accent,
    borderWidth: 1,
    marginBottom: 30,
    padding: 10,
    height: 100,
  },
});

export default AreaInput;

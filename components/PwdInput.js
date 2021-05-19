import React from "react";
import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../assets/colors";

const PwdInput = ({ placeholder, value, setValue }) => {
  const { input } = styles;
  const [secure, setSecure] = useState(true);

  return (
    <>
      <View style={input}>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secure}
          value={value}
          style={{ flex: 1 }}
          onChangeText={(text) => setValue(text)}
        />
        <FontAwesome
          name={secure ? "eye-slash" : "eye"}
          size={22}
          color={secure ? colors.primary : "black"}
          onPress={() => setSecure(!secure)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: colors.accent,
    borderBottomWidth: 1,
    marginBottom: 30,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PwdInput;

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../assets/colors";

const Link = ({ screen, title }) => {
  const navigation = useNavigation();
  const { linkText, link } = styles;

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen)} style={link}>
      <Text style={linkText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: colors.primary,
    fontSize: 12,
  },
  link: {
    paddingVertical: 15,
  },
});

export default Link;

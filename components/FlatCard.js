import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import colors from "../assets/colors";

const FlatCard = ({ flat }) => {
  const yellowStar = <FontAwesome name="star" size={24} color="#FFB100" />;
  const greyStar = <FontAwesome name="star" size={24} color={colors.primary} />;
  console.log(flat);

  const { cardContainer } = styles;

  return (
    <View style={cardContainer}>
      <Text>{flat.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "lightcoral",
    height: 400,
  },
});

export default FlatCard;

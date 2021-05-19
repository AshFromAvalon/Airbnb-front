import React from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import colors from "../assets/colors";

const LoadingActivity = () => {
  const { activityContainer } = styles;
  return (
    <View style={activityContainer}>
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );
};

const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight - 100,
  },
});

export default LoadingActivity;

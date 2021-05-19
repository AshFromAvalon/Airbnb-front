import React from "react";
import { useNavigation } from "@react-navigation/core";
import LottieView from "lottie-react-native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import axios from "axios";

import FlatCard from "../components/FlatCard";
import LoadingActivity from "../components/LoadingActivity";
import colors from "../assets/colors";
import { color } from "react-native-reanimated";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(res.data);
        setIsLoading(false);
        animation.play();
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, []);

  const { container, listContainer } = styles;

  console.log(Platform);

  return (
    <SafeAreaView style={container}>
      {isLoading ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={listContainer}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("Flat", { id: item._id })}
              >
                <FlatCard flat={item} description={false} />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      ) : Platform.OS === "ios" ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <LottieView
            style={{
              height: 200,
              width: 200,
            }}
            autoPlay={true}
            loop={true}
            source={require("../assets/lottieAnimation.json")}
          />
        </View>
      ) : (
        <LoadingActivity />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  listContainer: {},
});

export default HomeScreen;

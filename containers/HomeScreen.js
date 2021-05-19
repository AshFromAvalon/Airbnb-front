import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import axios from "axios";

import FlatCard from "../components/FlatCard";
import LoadingActivity from "../components/LoadingActivity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, []);

  const { container, listContainer } = styles;

  return (
    <SafeAreaView style={container}>
      {!isLoading ? (
        <FlatList
          style={listContainer}
          data={data}
          renderItem={({ item, index }) => {
            <FlatCard key={index} flat={item} />;
          }}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <LoadingActivity />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },

  listContainer: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});

export default HomeScreen;

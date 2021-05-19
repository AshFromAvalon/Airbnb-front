import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

import FlatCard from "../components/FlatCard";
import LoadingActivity from "../components/LoadingActivity";

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
          showsVerticalScrollIndicator={false}
          style={listContainer}
          data={data}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Flat", { id: item._id })}
              >
                <FlatCard key={index} flat={item} description={false} />
              </TouchableOpacity>
            );
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
    flex: 1,
    paddingHorizontal: 15,
  },

  listContainer: {},
});

export default HomeScreen;

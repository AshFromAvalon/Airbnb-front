import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";

import FlatCard from "../components/FlatCard";
import LoadingActivity from "../components/LoadingActivity";
import colors from "../assets/colors";

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

  const { container, listContainer, separator } = styles;

  return (
    <SafeAreaView style={container}>
      {!isLoading ? (
        <FlatList
          ItemSeparatorComponent={() => {
            return <View style={separator} />;
          }}
          showsVerticalScrollIndicator={false}
          style={listContainer}
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate("Flat", { id: item._id })}
              >
                <FlatCard flat={item} description={false} slider={false} />
              </TouchableOpacity>
            );
          }}
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
    backgroundColor: "white",
  },

  listContainer: {
    backgroundColor: "white",
  },

  separator: {
    height: 1,
    marginBottom: 20,
    width: "100%",
    backgroundColor: colors.secondary,
  },
});

export default HomeScreen;

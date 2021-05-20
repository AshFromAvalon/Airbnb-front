import React from "react";
import { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/core";
import axios from "axios";

import LoadingActivity from "../components/LoadingActivity";
import FlatCard from "../components/FlatCard";

const FlatScreen = () => {
  const [flat, setFlat] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        setFlat(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const route = useRoute();
  const { id } = route.params;

  const { container } = styles;

  return (
    <SafeAreaView style={container}>
      {!isLoading ? (
        <FlatCard flat={flat} description={true} slider={true} />
      ) : (
        <LoadingActivity />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FlatScreen;

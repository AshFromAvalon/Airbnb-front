import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

import LoadingActivity from "../components/LoadingActivity";

const MapScreen = () => {
  const [userCoords, setUserCoords] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const userLocation = await Location.getCurrentPositionAsync({});
        console.log(userLocation);
        setUserCoords({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
      } else {
        setError(true);
      }
      setIsLoading(false);
    };
    askPermission();
  }, []);

  const { map, container } = styles;

  return !isLoading ? (
    error ? (
      <View style={container}>
        <Text>Permisson refusée</Text>
      </View>
    ) : (
      <View style={container}>
        <MapView style={styles.map} />
      </View>
    )
  ) : (
    <LoadingActivity style={map} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;

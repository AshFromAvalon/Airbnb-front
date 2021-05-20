import * as React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

import LoadingActivity from "../components/LoadingActivity";
import axios from "axios";

const MapScreen = () => {
  const navigation = useNavigation();
  const [userCoords, setUserCoords] = useState();
  const [flats, setFlats] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const userLocation = await Location.getCurrentPositionAsync({});
        setUserCoords({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
        try {
          const res = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitue=${userLocation.coords.latitude}&longitude=${userLocation.coords.longitude}`
          );
          setFlats(res.data);
        } catch (error) {
          console.log(error);
        }
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
        <MapView
          style={map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: userCoords.latitude,
            longitude: userCoords.longitude,
            latitudeDelta: 0.4,
            longitudeDelta: 0.4,
          }}
        >
          {flats.map((flat, index) => {
            return (
              <Marker
                onPress={() => navigation.navigate("Flat", { id: flat._id })}
                key={index}
                coordinate={{
                  latitude: flat.location[1],
                  longitude: flat.location[0],
                }}
              />
            );
          })}
        </MapView>
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

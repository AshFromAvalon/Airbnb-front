import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

import { Octicons } from "@expo/vector-icons";
import colors from "../assets/colors";

import LoadingActivity from "../components/LoadingActivity";

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

  const { map, container, marker, markerText, markerContainer } = styles;

  return !isLoading ? (
    error ? (
      <SafeAreaView style={container}>
        <Text>Permisson refusée</Text>
      </SafeAreaView>
    ) : (
      <View style={container}>
        <MapView
          style={map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
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
                key={index}
                onPress={() => navigation.navigate("Flat", { id: flat._id })}
                coordinate={{
                  latitude: flat.location[1],
                  longitude: flat.location[0],
                }}
              >
                <View style={markerContainer}>
                  <View style={marker}>
                    <Text style={markerText}>{flat.price} €</Text>
                  </View>
                  <View style={{ marginTop: -7 }}>
                    <Octicons name="triangle-down" size={20} color="black" />
                  </View>
                </View>
              </Marker>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height:
      Platform.OS === "android"
        ? Dimensions.get("window").height - 100
        : Dimensions.get("window").height - 170,
  },

  map: {
    width: "100%",
    height: "100%",
  },

  markerContainer: {
    flex: 1,
    alignItems: "center",
  },

  marker: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 50,
    backgroundColor: "black",
  },

  markerText: {
    color: "white",
  },
});

export default MapScreen;

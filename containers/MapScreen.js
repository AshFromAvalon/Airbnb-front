import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
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
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        let res;

        if (status === "granted") {
          const userLocation = await Location.getCurrentPositionAsync({});
          setUserCoords({
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          });
          try {
            res = await axios.get(
              `https://express-airbnb-api.herokuapp.com/rooms/around?latitue=${userLocation.coords.latitude}&longitude=${userLocation.coords.longitude}`
            );
          } catch (error) {
            console.log(error);
          }
        }

        if (status === "denied") {
          try {
            res = await axios.get(
              "https://express-airbnb-api.herokuapp.com/rooms/around"
            );
          } catch (error) {
            console.log(error);
          }
        }
        setFlats(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    askPermission();
  }, []);

  const getInitialRegion = () => {
    return {
      latitude: userCoords ? userCoords.latitude : 48.8534,
      longitude: userCoords ? userCoords.longitude : 2.3488,
      latitudeDelta: 0.4,
      longitudeDelta: 0.4,
    };
  };

  const { map, container, marker, markerText, markerContainer } = styles;

  return !isLoading ? (
    <View style={container}>
      <MapView
        style={map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={getInitialRegion()}
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
        ? Dimensions.get("window").height
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

import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/core";
import axios from "axios";

import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../assets/colors";

import LoadingActivity from "../components/LoadingActivity";
import FlatCard from "../components/FlatCard";
import Logo from "../components/Logo";
import { color } from "react-native-reanimated";

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

  const { container, map, mapContainer, marker } = styles;

  return (
    <SafeAreaView style={container}>
      <ScrollView>
        {!isLoading ? (
          <>
            <View style={{ flex: 1 }}>
              <FlatCard flat={flat} description={true} slider={true} />
            </View>
            <View style={mapContainer}>
              <MapView
                style={map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: flat.location[1],
                  longitude: flat.location[0],
                  latitudeDelta: 0.09,
                  longitudeDelta: 0.09,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: flat.location[1],
                    longitude: flat.location[0],
                  }}
                >
                  <View style={marker}>
                    <Logo size={"small"} />
                  </View>
                </Marker>
              </MapView>
            </View>
          </>
        ) : (
          <LoadingActivity />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
  },

  map: {
    height: 350,
    width: "100%",
  },

  marker: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: colors.accent,
  },
});

export default FlatScreen;

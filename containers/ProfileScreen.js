import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import axios from "axios";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import colors from "../assets/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import EmailInput from "../components/EmailInput";
import BaseInput from "../components/BaseInpunt";
import AreaInput from "../components/AreaInpunt";
import TouchButton from "../components/TouchButton";
import LoadingActivity from "../components/LoadingActivity";
import { Colors } from "react-native/Libraries/NewAppScreen";

const ProfileScreen = ({ userId, userToken, setToken }) => {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [imageUser, setImageUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setUser(res.data);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setDescription(res.data.description);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const {
    container,
    imageContainer,
    imageInputContainer,
    image,
    iconsContainer,
    icon,
    inputsContainer,
    buttonsContainer,
    button,
  } = styles;

  return (
    <SafeAreaView style={container}>
      {!isLoading ? (
        <>
          <View style={imageInputContainer}>
            <View style={imageContainer}>
              {user ? (
                user.photo ? (
                  <Image style={image} source={{ uri: user.photo }} />
                ) : (
                  <FontAwesome
                    name="user"
                    size={104}
                    color={colors.secondary}
                  />
                )
              ) : null}
            </View>
            <View style={iconsContainer}>
              <MaterialIcons
                name="photo-library"
                size={28}
                color={colors.primary}
              />
              <MaterialIcons
                name="photo-camera"
                size={28}
                color={colors.primary}
              />
            </View>
          </View>
          <View style={inputsContainer}>
            <EmailInput setValue={setEmail} value={email} />
            <BaseInput setValue={setUsername} value={username} />
            <AreaInput setValue={setDescription} value={description} />
          </View>
          <View style={buttonsContainer}>
            <TouchButton title={"Photo"} />
            <TouchButton title={"Gallery"} />
            <TouchButton title={"Log out"} onPress={() => setToken(null)} />
          </View>
        </>
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
    paddingVertical: 15,
  },
  imageInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  imageContainer: {
    height: 200,
    width: 200,
    borderColor: colors.accent,
    borderWidth: 2,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {},
  iconsContainer: {
    height: 200,
    justifyContent: "space-around",
    marginLeft: 15,
  },
  icon: {},
  inputsContainer: {
    justifyContent: "center",
    marginTop: 50,
  },
  buttonsContainer: {
    alignItems: "center",
    marginTop: 50,
    justifyContent: "space-around",
  },
  button: {
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 50,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
});

export default ProfileScreen;

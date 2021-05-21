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
import EmailInput from "../components/EmailInput";
import BaseInput from "../components/BaseInpunt";
import AreaInput from "../components/AreaInpunt";

const ProfileScreen = ({ userId, userToken }) => {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [imageUser, setImageUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/60a3dc7fcef2a200172a3fca`,
          {
            headers: {
              auhtorization: `Bearer QWNW5OLHChgxYv060bZglrRje14Pqz8d7GdMkzEhfejLWJCVVnddgL8YCbLNCAYf`,
            },
          }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
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
      <View>
        <Text>HELLO</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightcoral",
  },
  imageInputContainer: {},
  imageContainer: {},
  image: {},
  iconsContainer: {},
  icon: {},
  inputsContainer: {},
  buttonsContainer: {},
  button: {},
});

export default ProfileScreen;

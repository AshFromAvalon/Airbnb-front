import React, { useState, useEffect, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
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
  const [selectedImage, setSelectedImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch User data and set State on screen mount
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

  // Get Gallery permission and set new Profile Pic
  const getGalleryPermission = async () => {
    const galleryPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(galleryPerm);
    if (galleryPerm.status != "granted") return;

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    setSelectedImage(pickerResult);
  };

  // Update profile pic and information
  const updateProfile = useCallback(async () => {
    console.log("IN UPDATE");
    if (!selectedImage) return;
    console.log("SELECTED IMAGE EXIST");
    if (selectedImage.cancelled) return;
    console.log("EXECUTING FUNC...");

    const uri = selectedImage.uri;
    const fileExtension = uri.split(".").pop();

    const formData = new FormData();
    formData.append("photo", {
      uri,
      name: `photo.${fileExtension}`,
      type: `image/${fileExtension}`,
    });

    const uploadResult = await axios.put(
      `https://express-airbnb-api.herokuapp.com/user/upload_picture${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(uploadResult);
  });

  // Render profile pics based on states
  const renderProfilePic = () => {
    if (selectedImage)
      return (
        <Image
          source={{ uri: selectedImage ? selectedImage.uri : null }}
          style={image}
        />
      );
    if (user) {
      return user.photo ? (
        <Image style={image} source={{ uri: user.photo }} />
      ) : (
        <FontAwesome name="user" size={104} color={colors.secondary} />
      );
    }
  };

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
            <View style={imageContainer}>{renderProfilePic()}</View>
            <View style={iconsContainer}>
              <MaterialIcons
                name="photo-library"
                size={28}
                color={colors.primary}
                onPress={getGalleryPermission}
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
            <TouchButton title={"Update"} onPress={updateProfile} />
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
    paddingHorizontal: 30,
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
  image: {
    height: 160,
    width: 160,
    borderRadius: 100,
  },
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
    flex: 1,
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

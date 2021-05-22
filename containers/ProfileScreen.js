import React, { useState, useEffect, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

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
  }, [profilePic]);

  // Get Gallery permission and set new Profile Pic
  const getGalleryPermission = async () => {
    const galleryPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(galleryPerm);
    if (galleryPerm.status != "granted") return;

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    UploadSelectedImage(pickerResult);
  };

  // Get Gallery permission and set new Profile Pic
  const getCameraPermission = async () => {
    const galleryPerm = await ImagePicker.requestCameraPermissionsAsync();
    console.log(galleryPerm);
    if (galleryPerm.status != "granted") return;

    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    UploadSelectedImage(pickerResult);
  };

  // Update profile pic
  const UploadSelectedImage = useCallback(async (pickerResult) => {
    console.log("IN UPDATE");
    if (!pickerResult) return;
    console.log("SELECTED IMAGE EXIST");
    if (pickerResult.cancelled) return;
    console.log("EXECUTING FUNC...");

    setUploading(true);

    const uri = pickerResult.uri;
    const fileExtension = uri.split(".").pop();

    const formData = new FormData();
    formData.append("photo", {
      uri,
      name: `photo.${fileExtension}`,
      type: `image/${fileExtension}`,
    });

    const uploadResult = await axios.put(
      `https://express-airbnb-api.herokuapp.com/user/upload_picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const uploadedPicture = uploadResult.data.photo[0].url;
    setProfilePic(uploadedPicture);
    setUploading(false);
  });

  const updateInfo = async () => {
    try {
      const updateInfoResult = await axios.put(
        "https://express-airbnb-api.herokuapp.com/user/update",
        {
          email,
          username,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(updateInfoResult.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Render profile pics based on states
  const renderProfilePic = () => {
    if (uploading || isLoading) return <LoadingActivity />;
    if (profilePic) return <Image style={image} source={{ uri: profilePic }} />;
    if (user) {
      return user.photo ? (
        <Image style={image} source={{ uri: user.photo[0].url }} />
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
    inputsContainer,
    buttonsContainer,
  } = styles;

  return (
    <KeyboardAwareScrollView style={container}>
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
                onPress={getCameraPermission}
              />
            </View>
          </View>
          <View style={inputsContainer}>
            <EmailInput setValue={setEmail} value={email} />
            <BaseInput setValue={setUsername} value={username} />
            <AreaInput setValue={setDescription} value={description} />
          </View>
          <View style={buttonsContainer}>
            <TouchButton title={"Update"} onPress={updateInfo} />
            <TouchButton title={"Log out"} onPress={() => setToken(null)} />
          </View>
        </>
      ) : (
        <LoadingActivity />
      )}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    height: Dimensions.get("window").height,
  },
  imageInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  imageContainer: {
    height: 180,
    width: 180,
    borderColor: colors.accent,
    borderWidth: 2,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 100,
  },
  iconsContainer: {
    height: 180,
    justifyContent: "space-around",
    marginLeft: 15,
  },
  inputsContainer: {},
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    height: 120,
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

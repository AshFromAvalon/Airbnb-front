import React from "react";
import { useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

// Compnents
import AreaInput from "../components/AreaInpunt";
import BaseInput from "../components/BaseInpunt";
import EmailInput from "../components/EmailInput";
import PwdInput from "../components/PwdInput";
import Link from "../components/Link";
import LoadingActivity from "../components/LoadingActivity";

import colors from "../assets/colors";

const SignUpScreen = ({ setToken }) => {
  const {
    button,
    btnText,
    center,
    form,
    logoBig,
    screenTitle,
    formContainer,
    alertText,
  } = styles;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const postForm = async () => {
    if (password != confirmPwd) {
      setError("Passwords are not matching");
      return;
    }

    if (email && username && password && description) {
      setIsLoading(true);

      try {
        const res = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email,
            username,
            password,
            description,
          }
        );
        console.log(res.data);
        if (res.data.token) {
          setIsLoading(false);
          setToken(res.data.token);
        }
      } catch (error) {
        const message = error.response.data.error;
        if (message === "This email already has an account.") {
          setError(message);
        }
        if (message === "This username already has an account.") {
          setError(message);
        }
        setIsLoading(false);
      }
    } else {
      setError("All fileds must filled");
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={formContainer}>
      <StatusBar style="dark" />
      <KeyboardAwareScrollView>
        {!isLoading ? (
          <>
            <View style={center}>
              <Image
                source={require("../assets/airbnb-logo.png")}
                style={logoBig}
              />
              <Text style={screenTitle}>Sign up</Text>
            </View>
            <View style={form}>
              <EmailInput
                placeholder="email"
                value={email}
                setValue={setEmail}
              />
              <BaseInput
                placeholder="username"
                value={username}
                setValue={setUsername}
              />
              <AreaInput
                placeholder="Describe yourself in a few words..."
                value={description}
                setValue={setDescription}
              />
              <PwdInput
                placeholder="password"
                value={password}
                setValue={setPassword}
              />
              <PwdInput
                placeholder="confirm password"
                value={confirmPwd}
                setValue={setConfirmPwd}
              />
              <View style={center}>
                {error ? <Text style={alertText}>{error}</Text> : null}
                <TouchableOpacity style={button} onPress={postForm}>
                  <Text style={btnText}>Sign up</Text>
                </TouchableOpacity>
                <Link
                  screen="SignIn"
                  title="Already have an account? Sign in"
                />
              </View>
            </View>
          </>
        ) : (
          <LoadingActivity />
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  alertText: {
    color: colors.accent,
    paddingBottom: 10,
  },

  center: {
    alignItems: "center",
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

  btnText: {
    color: colors.primary,
    fontSize: 14,
  },

  form: {
    paddingHorizontal: 35,
    paddingVertical: 20,
  },

  formContainer: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },

  logoBig: {
    height: 100,
    width: 100,
  },

  screenTitle: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: "600",
    marginVertical: 10,
  },
});

export default SignUpScreen;

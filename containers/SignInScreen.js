import React from "react";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import axios from "axios";

import AreaInput from "../components/AreaInpunt";
import BaseInput from "../components/BaseInpunt";
import EmailInput from "../components/EmailInput";
import PwdInput from "../components/PwdInput";
import Link from "../components/Link";

import colors from "../assets/colors";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const {
    activityContainer,
    alertText,
    button,
    btnText,
    center,
    form,
    formContainer,
    logoBig,
    screenTitle,
  } = styles;
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const postForm = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: pwd,
        }
      );
      if (res.data.token) {
        setToken(res.data.token);
        console.log("Signed in");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError("invalid email or password");
      console.log(error.message);
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
              <Text style={screenTitle}>Sign in</Text>
            </View>
            <View style={form}>
              <EmailInput
                placeholder="email"
                value={email}
                setEmail={setEmail}
              />
              <PwdInput placeholder="password" value={pwd} setPwd={setPwd} />
              <View style={center}>
                {error ? <Text style={alertText}>{error}</Text> : null}
                <TouchableOpacity style={button} onPress={postForm}>
                  <Text style={btnText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={activityContainer}>
              <ActivityIndicator size="large" color={colors.accent} />
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  alertText: {
    color: colors.primary,
    paddingBottom: 10,
  },

  activityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight - 100,
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

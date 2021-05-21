import React from "react";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
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

import EmailInput from "../components/EmailInput";
import PwdInput from "../components/PwdInput";
import LoadingActivity from "../components/LoadingActivity";
import TouchButton from "../components/TouchButton";
import Logo from "../components/Logo";

import colors from "../assets/colors";

export default function SignInScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const {
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
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const postForm = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email,
          password,
        }
      );
      if (res.data.token) {
        setIsLoading(false);
        setToken(res.data.token);
        setId(res.data.id);
      }
    } catch (error) {
      setIsLoading(false);
      setError("invalid email or password");
    }
  };

  return (
    <SafeAreaView style={formContainer}>
      <StatusBar style="dark" />
      <KeyboardAwareScrollView>
        {!isLoading ? (
          <>
            <View style={center}>
              <Logo size={"large"} />
              <Text style={screenTitle}>Sign in</Text>
            </View>
            <View style={form}>
              <EmailInput
                placeholder="email"
                value={email}
                setValue={setEmail}
              />
              <PwdInput
                placeholder="password"
                value={password}
                setValue={setPassword}
              />
              <View style={center}>
                {error ? <Text style={alertText}>{error}</Text> : null}
                <TouchButton title={"Sign in"} onPress={postForm} />
              </View>
            </View>
          </>
        ) : (
          <LoadingActivity />
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
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

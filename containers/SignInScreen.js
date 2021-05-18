import React from "react";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import AreaInput from "../components/AreaInpunt";
import BaseInput from "../components/BaseInpunt";
import EmailInput from "../components/EmailInput";
import PwdInput from "../components/PwdInput";
import Link from "../components/Link";

import colors from "../assets/colors";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const { button, btnText, center, form, logoBig, screenTitle } = styles;
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const postForm = async () => {
    try {
      const res = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: pwd,
        }
      );
      res.data && setToken(res.data.token);
      console.log("Signed in");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={center}>
        <Image source={require("../assets/airbnb-logo.png")} style={logoBig} />
        <Text style={screenTitle}>Sign in</Text>
      </View>
      <View style={form}>
        <EmailInput placeholder="email" value={email} setEmail={setEmail} />
        <PwdInput placeholder="password" value={pwd} setPwd={setPwd} />
        <View style={center}>
          <TouchableOpacity style={button} onPress={postForm}>
            <Text style={btnText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
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

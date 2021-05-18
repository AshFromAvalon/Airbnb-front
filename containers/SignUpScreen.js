import React from "react";
import { useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

// Compnents
import AreaInput from "../components/AreaInpunt";
import BaseInput from "../components/BaseInpunt";
import EmailInput from "../components/EmailInput";
import PwdInput from "../components/PwdInput";
import Link from "../components/Link";

import colors from "../assets/colors";

const SignUpScreen = ({ setToken }) => {
  const { button, btnText, center, form, logoBig, screenTitle } = styles;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [description, setDescription] = useState("");

  const postForm = async () => {
    try {
      const res = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
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
        <Text style={screenTitle}>Sign up</Text>
      </View>
      <View style={form}>
        <EmailInput placeholder="email" value={email} setEmail={setEmail} />
        <BaseInput
          placeholder="username"
          value={username}
          setUsername={setUsername}
        />
        <AreaInput
          placeholder="Describe yourself in a few words..."
          value={description}
          setDescription={setDescription}
        />
        <PwdInput placeholder="password" value={pwd} setPwd={setPwd} />
        <PwdInput
          placeholder="confirm password"
          value={confirmPwd}
          setConfirmPwd={setConfirmPwd}
        />
        <View style={center}>
          <TouchableOpacity style={button} onPress={postForm}>
            <Text style={btnText}>Sign up</Text>
          </TouchableOpacity>
          <Link screen="SingIn" title="Already have an account? Sign in" />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

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

export default SignUpScreen;

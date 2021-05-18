import React from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Compnents
import AreaInput from "../components/AreaInpunt";
import BaseInput from "../components/BaseInpunt";
import EmailInput from "../components/EmailInput";
import PwdInput from "../components/PwdInput";
import Link from "../components/Link";

import colors from "../assets/colors";

const SignUpScreen = ({ setToken }) => {
  const { button, btnText, center, form, logoBig, screenTitle } = styles;
  return (
    <KeyboardAwareScrollView>
      <View style={center}>
        <Image source={require("../assets/airbnb-logo.png")} style={logoBig} />
        <Text style={screenTitle}>Sign up</Text>
      </View>
      <View style={form}>
        <EmailInput placeholder="email" />
        <BaseInput placeholder="username" />
        <AreaInput placeholder="Describe yourself in a few words..." />
        <PwdInput placeholder="password" />
        <PwdInput placeholder="confirm password" />
        <View style={center}>
          <TouchableOpacity
            style={button}
            onPress={async () => {
              const userToken = "secret-token";
              setToken(userToken);
            }}
          >
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

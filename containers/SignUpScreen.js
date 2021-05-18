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
import axios from "axios";

// Compnents
import AreaInput from "../components/AreaInpunt";
import BaseInput from "../components/BaseInpunt";
import EmailInput from "../components/EmailInput";
import PwdInput from "../components/PwdInput";
import Link from "../components/Link";

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
    activityContainer,
    alertText,
    alertPwd,
  } = styles;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pwdError, setPwdError] = useState("");

  const postForm = async () => {
    if (pwd != confirmPwd) {
      setPwdError("Passwords are not matching");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/sign_up",
        {
          email: email,
          password: pwd,
        }
      );
      console.log(res.data);
      if (res.data.token) {
        setToken(res.data.token);
        console.log("Signed in");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong");
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={formContainer}>
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
                setEmail={setEmail}
              />
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
                {pwdError ? <Text style={alertPwd}>{pwdError}</Text> : null}
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
          <>
            <View style={activityContainer}>
              <ActivityIndicator size="large" color={colors.accent} />
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  alertText: {
    color: colors.primary,
    paddingBottom: 10,
  },

  alertPwd: {
    color: colors.accent,
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
    marginTop: 40,
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

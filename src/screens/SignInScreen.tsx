import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useTheme } from "../theme/ThemeProvider";
import { useUserRegistration } from "../components/UserContext";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { AuthContext } from "../components/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { applied } = useTheme();
  const { setUserData } = useUserRegistration();
  const auth = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const BASE_URL = process.env.EXPO_PUBLIC_APP_URL;
  const logo =
    applied === "dark"
      ? require("../../assets/logo-dark.png")
      : require("../../assets/logo.png");


  const handleLogin = async () => {
    if (!firstName || !lastName || !mobile) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Please fill all fields.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("mobile", mobile);

      const response = await fetch(`${BASE_URL}/MyChatApp/LoginController`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status) {
        setUserData(result.user);
        auth?.signUp(result.user.id.toString());
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Login Failed",
          textBody: result.message,
        });
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "Unable to connect to server.",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
      className="flex-1 justify-center items-center dark:bg-slate-950 p-5"
    >
      <StatusBar hidden={true} />

      <SafeAreaView className="justify-center items-center mt-32">
      <Image source={logo}
        style={{
          width: 100,
          height: 100,
          borderWidth: 4,
          borderColor: applied === "dark" ? "#FFF" : "#262729",
          borderRadius: 100
        }} />
      </SafeAreaView>

      <View className="w-full my-1 mt-2">
        <FloatingLabelInput
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          inputStyles={{ color: applied === "dark" ? "#FFF" : "#000" }}
        />
      </View>
      <View className="w-full my-1">
        <FloatingLabelInput
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          inputStyles={{ color: applied === "dark" ? "#FFF" : "#000" }}
        />
      </View>
      <View className="w-full my-1">
        <FloatingLabelInput
          inputMode="tel"
          label="Mobile"
          value={mobile}
          onChangeText={setMobile}
          inputStyles={{ color: applied === "dark" ? "#FFF" : "#000" }}
        />
      </View>

      <Pressable
        onPress={handleLogin}
        className="bg-sky-600 h-14 justify-center items-center rounded-full w-full mt-4"
      >
        <Text className="text-slate-100 font-bold text-2xl">Login</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

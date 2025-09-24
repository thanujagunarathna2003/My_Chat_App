import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useState } from "react";
import { useTheme } from "../theme/ThemePrivider";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";

type SignUpProps = NativeStackNavigationProp<RootStack, "SignUpScreen">;

export default function SignUpScreen() {

  const navigation = useNavigation<SignUpProps>();


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { applied } = useTheme();
  const logo =
    applied === "dark"
      ? require("../../assets/logo2_dark.png")
      : require("../../assets/logo2.png");

  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
        className="flex-1 items-center dark:bg-slate-950"
      >
        <SafeAreaView className="justify-center items-center p-5">
          <StatusBar hidden={true} />
          <Image source={logo} style={{
            width: 150,
            height: 150,
            borderWidth: 4,
            borderColor: applied === "dark" ? "#FFF" : "#262729",
            borderRadius: 100
          }} />
          <View className="w-full justify-start items-start top-20">
            <Text className="font-bold text-neutral-950 dark:text-slate-100">
              Create your account and start the conversation With TG App
            </Text>
          </View>
          <View className="self-stretch top-20">
            <View className="w-full my-3">
              <FloatingLabelInput
                value={firstName}
                onChangeText={setFirstName}
                label={"Enter Your First Name"}
              />
            </View>
            <View className="w-full my-3">
              <FloatingLabelInput value={lastName}
                onChangeText={setLastName}
                label={"Enter Your Last Name"} />
            </View>
          </View>
        </SafeAreaView>
        <View className="absolute bottom-5 w-full p-5">
          <Pressable className="bg-sky-600 h-14 justify-center items-center rounded-full"
            onPress={() => navigation.replace("ContactScreen")}
          >
            <Text className="text-slate-100 dark:text-slate-100 font-bold text-2xl">
              Next
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
  );
}

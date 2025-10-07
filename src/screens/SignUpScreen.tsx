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
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { useTheme } from "../theme/ThemeProvider";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateFirstName, validateLastName } from "../util/Validation";
import { Ionicons } from "@expo/vector-icons";

type SignUpProps = NativeStackNavigationProp<RootStack, "SignUpScreen">;

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpProps>();
  const { applied } = useTheme();
  const logo =
    applied === "dark"
      ? require("../../assets/logo-dark.png")
      : require("../../assets/logo.png");

  const { userData, setUserData } = useUserRegistration();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
      className="flex-1 items-center dark:bg-slate-950"
    >
      <SafeAreaView className="justify-center items-center p-5">
        <StatusBar hidden={true} />
        <Image source={logo}
          style={{
            width: 100,
            height: 100,
            borderWidth: 4,
            borderColor: applied === "dark" ? "#FFF" : "#262729",
            borderRadius: 100
          }} />
        <View className="container w-full mt-4 justify-center">
          <Pressable
            onPress={() => {
              navigation.navigate("SignInScreen");
            }}
          >
            <Text className="text-sky-600 dark:text-slate-100 font-bold text-xl underline">
              Login
              <Ionicons name="arrow-forward" size={16} color="dark" />
            </Text>
          </Pressable>
        </View>
        <View className="w-full justify-start items-start top-5">
          <Text className="font-bold text-neutral-950 dark:text-slate-100">
            Create your account and start the conversation With TG App
          </Text>
        </View>
        <View className="self-stretch top-5">
          <View className="w-full my-2">
            <FloatingLabelInput
              label={"Enter Your First Name"}
              value={userData.firstName}
              onChangeText={(text) => {
                setUserData((previous) => ({
                  ...previous,
                  firstName: text,
                }));
              }}
              inputStyles={{
                color: applied === "dark" ? "#FFF" : "#000"
              }}
            />
          </View>
          <View className="w-full my-1">
            <FloatingLabelInput
              label={"Enter Your Last Name"}
              value={userData.lastName}
              onChangeText={(text) => {
                setUserData((previous) => ({
                  ...previous,
                  lastName: text,
                }));
              }}
              inputStyles={{
                color: applied === "dark" ? "#FFF" : "#000"
              }}
            />
          </View>
        </View>
      </SafeAreaView>
      <View className="flex-1 w-full p-5 mt-[-10]">
        <Pressable
          className="bg-sky-600 h-14 justify-center items-center rounded-full"
          onPress={() => {
            let validFirstName = validateFirstName(userData.firstName);
            let validLastName = validateLastName(userData.lastName);
            if (validFirstName) {
              // skip null
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: validFirstName,
              });
            } else if (validLastName) {
              // skip null
              Toast.show({
                type: ALERT_TYPE.WARNING,
                title: "Warning",
                textBody: validLastName,
              });
            } else {
              navigation.navigate("ContactScreen");
            }
          }}
        >
          <Text className="text-slate-100 dark:text-slate-100 font-bold text-2xl">Next</Text>
        </Pressable>
      </View>

    </KeyboardAvoidingView>
  );
}

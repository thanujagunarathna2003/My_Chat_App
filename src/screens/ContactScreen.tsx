import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { validateCountryCode, validatePhoneNo } from "../util/Validation";
import { useTheme } from "../theme/ThemeProvider";
type ContactProps = NativeStackNavigationProp<RootStack, "ContactScreen">;

export default function ContactScreen() {
  const navigation = useNavigation<ContactProps>();

  const [countryCode, setCountryCode] = useState<CountryCode>("LK"); // default country code
  const [country, setCountry] = useState<Country | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const { userData, setUserData } = useUserRegistration();
  const [callingCode, setCallingCode] = useState("+94");
  const [phoneNo, setPhoneNo] = useState("");
  const { applied } = useTheme();
  const logo =
    applied === "dark"
      ? require("../../assets/logo-dark.png")
      : require("../../assets/logo.png");

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950 items-center">
      <StatusBar hidden={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
      >
        <View className="p-5 items-center flex-1">
          <View>
            <Image source={logo}
              style={{
                width: 150,
                height: 150,
                borderWidth: 4,
                borderColor: applied === "dark" ? "#FFF" : "#262729",
                borderRadius: 100
              }} />
          </View>
          <View>
            <Text className="text-slate-600 font-bold mt-4 text-center">
              We use your contacts to help you find friends who are already on
              the app. Your contacts stay private.
            </Text>
          </View>
          <View className="mt-5 w-full">
            <View className="justify-center items-center flex-row h-14 mb-3">
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCountryNameButton
                withCallingCode
                visible={show}
                theme={{
                  backgroundColor: applied === "dark" ? "#000000" : "#FFFFFF", // Modal background
                  onBackgroundTextColor: applied === "dark" ? "#FFFFFF" : "#000000", // Text color
                  primaryColor: "#38BDF8",          // sky-400 highlight color
                  primaryColorVariant: "#0284C7",   // sky-600 accent
                  filterPlaceholderTextColor: applied === "dark" ? "#94A3B8" : "#6B7280", // placeholder
                  itemHeight: 50,
                }}

                onClose={() => {
                  setShow(false);
                }}
                onSelect={(c) => {
                  setCountryCode(c.cca2);
                  setCountry(c);
                  setShow(false);
                }}
              />

              <AntDesign
                name="caret-down"
                size={18}
                color={applied === "dark" ? "#ffffff" : "#000000"}
                style={{ marginTop: 5 }}
              />
            </View>
            {/* <View className="mt-2 flex flex-row justify-center">
              <TextInput
                inputMode="tel"
                className="h-16 font-bold text-lg border-y-2 border-y-sky-600 w-[18%] "
                placeholder="+94"
                editable={false}
                value={country ? `+${country.callingCode}` : callingCode}
                onChangeText={(text) => {
                  setCallingCode(text);
                }}
              />
              <TextInput
                inputMode="tel"
                className="h-16 font-bold text-lg border-y-2 border-y-sky-600 w-[80%] ml-2"
                placeholder="77 #### ###"
                value={phoneNo}
                onChangeText={(text) => {
                  setPhoneNo(text);
                }}
              />
            </View> */}
            <View className="mt-2 flex flex-row justify-center">
              {/* Country Code Field */}
              <TextInput
                inputMode="tel"
                className={`h-16 font-bold text-lg border-y-2 w-[18%] text-center rounded-2xl ${applied === "dark"
                    ? "bg-gray-900 text-white border-y-sky-400"
                    : "bg-white text-black border-y-sky-600"
                  }`}
                placeholder="+94"
                placeholderTextColor={applied === "dark" ? "#94A3B8" : "#6B7280"}
                editable={false}
                value={country ? `+${country.callingCode}` : callingCode}
                onChangeText={(text) => {
                  setCallingCode(text);
                }}
              />

              {/* Phone Number Field */}
              <TextInput
                inputMode="tel"
                className={`h-16 font-bold text-lg border-y-2 w-[78%] ml-2 rounded-2xl px-4 ${applied === "dark"
                    ? "bg-gray-900 text-white border-y-sky-400"
                    : "bg-white text-black border-y-sky-600"
                  }`}
                placeholder="77 #### ###"
                placeholderTextColor={applied === "dark" ? "#94A3B8" : "#6B7280"}
                value={phoneNo}
                onChangeText={(text) => setPhoneNo(text)}
              />
            </View>

          </View>
          <View className="mt-8 w-full">
            <Pressable
              className="justify-center items-center bg-sky-600 w-full h-14 rounded-full"
              onPress={() => {
                const validCountryCode = validateCountryCode(callingCode);
                const validPhoneNo = validatePhoneNo(phoneNo);

                if (validCountryCode) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validCountryCode,
                  });
                } else if (validPhoneNo) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validPhoneNo,
                  });
                } else {
                  setUserData((previous) => ({
                    ...previous,
                    countryCode: country
                      ? `+${country.callingCode}`
                      : callingCode,
                    contactNo: phoneNo,
                  }));
                  navigation.replace("AvatarScreen");
                }
              }}
            >
              <Text className="text-xl font-bold text-slate-50">Next</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

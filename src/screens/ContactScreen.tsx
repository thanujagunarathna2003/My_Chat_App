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
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { CountryItem, CountryPicker } from "react-native-country-codes-picker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStak } from "../../App";

type ContactProps = NativeStackNavigationProp<RootStak, "ContactScreen">;

export default function ContactScreen() {
    
    const navigation = useNavigation<ContactProps>();

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState<CountryItem | null>(null);

    return (
        <SafeAreaView className="flex-1 bg-white items-center">
            <StatusBar hidden={false} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}
            >
                <View className="p-5 items-center flex-1">
                    <View>
                        <Image
                            source={require("../../assets/logo2.png")}
                            className="h-40 w-36"
                        />
                    </View>
                    <View>
                        <Text className="text-slate-600 font-bold text-center">
                            We use your contact to help find friends who are already on the
                            app. Your contacts stay private.
                        </Text>
                    </View>
                    <View className="mt-5 w-full">
                        <Pressable className="w-full flex justify-center items-center flex-row h-16 border-b-2 border-b-sky-600"
                            onPress={() => { setShow(true) }}>
                            <Text className="font-bold text-lg">Select Country </Text>
                            <AntDesign
                                name="caret-down"
                                size={20}
                                color="black"
                                className="mt-1 ml-5"
                            />
                        </Pressable>

                        <CountryPicker
                            show={show}
                            lang={"en"}
                            pickerButtonOnPress={(item) => {
                                setCountryCode(item);
                                setShow(false);
                            }}
                            onBackdropPress={() => setShow(false)}
                            style={{
                                modal: {
                                    height: 300
                                }
                            }}
                        />

                        <View className="mt-2 flex flex-row gap-x-2">
                            <TextInput inputMode="tel" className="h-16 font-bold text-lg border-y-2 border-y-sky-600 w-1/6 " placeholder="+94" />
                            <TextInput inputMode="tel" className="h-16 font-bold text-lg border-y-2  border-y-sky-600 w-[80%] ml-2" placeholder="77 #### ###" />
                        </View>
                    </View>
                    <View className="mt-16 w-full">
                        <Pressable className="justify-center items-center bg-sky-600 w-full h-14 rounded-full"
                            onPress={() => {
                                navigation.replace("AvatarScreen");
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
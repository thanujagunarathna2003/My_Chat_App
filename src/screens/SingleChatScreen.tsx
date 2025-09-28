import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Image, KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type Message = {
    id: number;
    text: string;
    sender: "me" | "friend";
    time: string;
    status?: "sent" | "delivered" | "read";
};


type SingleChatScreenProps = NativeStackNavigationProp<RootStack, "SingleChatScreen">

export default function SingleChatScreen() {

    const navigation = useNavigation<SingleChatScreenProps>();



    const [message, setMessage] = useState<Message[]>([

        {
            id: 3,
            text: "How Are You",
            sender: "me",
            time: "11:00 AM",
            status: "read",
        },

        {
            id: 1,
            text: "Hi",
            sender: "friend",
            time: "10:56 AM"
        },

        {
            id: 2,
            text: "Hi, Hello",
            sender: "friend",
            time: "10.58 AM"
        },


    ]);


    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerLeft: () => (
                <View className="flex-row items-center gap-2">
                    <Image
                        source={require("../../assets/avatar/avatar_1.png")}
                        className="h-14 w-14 rounded-full border-2 border-gray-400 p-1"
                    />

                    <View className="space-y-2">
                        <Text className="font-bold text-2xl">Sahan Bandara</Text>
                        <Text className="italic text-xs font-bold text-gray-500">Last seen today at 11.00 am</Text>
                    </View>

                </View>
            ),

            headerRight: () => (
                <TouchableOpacity>
                    <Ionicons name="chatbox-ellipses" size={24} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const renderItem = ({ item }: { item: Message }) => {

        const isMe = item.sender === "me";
        return (
            <View
                className={`my-1 py-2 px-3 max-w-[75%] 
                     ${isMe
                        ? `self-end bg-sky-600 rounded-tl-xl rounded-bl-xl rounded-br-xl`
                        : `rounded-tr-xl rounded-bl-xl rounded-br-xl self-start bg-gray-700`

                    } `}>

                <Text className={`text-white text-base`}>
                    {item.text}
                </Text>

                <View className="flex-row justify-end items-center mt-1">
                    <Text className={`text-white italic text-xs me-2`}>{item.time}</Text>
                    {isMe && (
                        <Ionicons name={
                            item.status === 'read'
                                ? 'checkmark-done-sharp'
                                : item.status === 'delivered'
                                    ? 'checkmark-done-sharp' : 'checkmark'}

                            size={18}
                            color={item.status === "read" ? "#fff" : "#fff"}
                        />
                    )}
                </View>

            </View>

        );

    };

    const sendMessage = () => {
        if (input.trim()) {
            const newMsg: Message = {
                id: Date.now(),
                text: input,
                sender: "me",
                time: Date.now().toString(),
                status: 'sent',
            };

            setMessage([newMsg, ...message]);
            setInput("");
        }

        return !input.trim();
    };

    return (

        <SafeAreaView className="flex-1 bg-white" edges={['right', 'bottom', 'left']}>

            <StatusBar hidden={false} />
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "android" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === 'android' ? 90 : 90}>

                <FlatList
                    data={message}
                    renderItem={renderItem}
                    className="px-3 flex-1"
                    inverted
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 60 }}

                />

                <View className="flex-row items-end p-2 bg-white">
                    <TextInput
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        multiline
                        placeholder="Type a message"
                        className="flex-1 min-h-14 max-h-32 h-auto px-5 py-2 bg-gray-200 rounded-3xl text-base"

                    />
                    <TouchableOpacity className="bg-sky-600 w-12 h-12 items-center justify-center rounded-full ml-2 mb-1"
                        onPress={sendMessage}
                        
                    >
                        <Ionicons name="send" size={22} color="black" />

                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>


        </SafeAreaView>
    );
}
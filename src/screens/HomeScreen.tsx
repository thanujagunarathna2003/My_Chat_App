import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLayoutEffect, useState } from "react";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type props = NativeStackNavigationProp<RootStack, "HomeScreen">;
const chats = [
  {
    id: 1,
    name: "Hashen Malsha",
    lastMessage: "Hello, Hai",
    time: "9:46 pm",
    unread: 2,
    profile: require("../../assets/avatar/avatar_1.png"),
  },
  {
    id: 2,
    name: "Fathima Aamila",
    lastMessage: "Hello, Kamal,project eka harida",
    time: "Yesterday",
    unread: 0,
    profile: require("../../assets/avatar/avatar_2.png"),
  },
  {
    id: 3,
    name: "Senuri Galkotuwa",
    lastMessage: "Hello, Senu",
    time: "9:46 pm",
    unread: 2,
    profile: require("../../assets/avatar/avatar_3.png"),
  },
  {
    id: 4,
    name: "Ransilu Omesha",
    lastMessage: "Hello, Ran",
    time: "2024/05/14",
    unread: 2,
    profile: require("../../assets/avatar/avatar_4.png"),
  },
  {
    id: 5,
    name: "Kamal",
    lastMessage: "Hello, Kamal",
    time: "9:46 pm",
    unread: 2,
    profile: require("../../assets/avatar/avatar_5.png"),
  },
  {
    id: 6,
    name: "Thinishi ",
    lastMessage: "Hello, Thini",
    time: "9:46 pm",
    unread: 2,
    profile: require("../../assets/avatar/avatar_6.png"),
  },
  {
    id: 7,
    name: "Thinishi ",
    lastMessage: "Hello, Thini",
    time: "9:46 pm",
    unread: 2,
    profile: require("../../assets/avatar/avatar_6.png"),
  },
  {
    id: 8,
    name: "Thinishi ",
    lastMessage: "Hello, Thini",
    time: "9:46 pm",
    unread: 2,
    profile: require("../../assets/avatar/avatar_6.png"),
  },];
export default function HomeScreen() {
  const navigation = useNavigation<props>();
  const [search, setSearch] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "TG APP",
      headerTitleStyle: { fontWeight: "bold", fontSize: 24 },
      headerRight: () =>
        <View className="flex-row space-x-4">
          <TouchableOpacity className="me-5"><Ionicons name="camera" size={26} color="black" /></TouchableOpacity>
          <TouchableOpacity><Ionicons name="ellipsis-vertical" size={24} color="black" /></TouchableOpacity>
        </View>
    });
  }, [navigation]);
  const filteredChats = chats.filter((chat) => {
    return (chat.name.toLowerCase().includes(search.toLowerCase())
      ||
      chat.lastMessage.toLowerCase().includes(search.toLowerCase())
    );
  });

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      className="flex-row items-center justify-between bg-gray-200 py-2 px-3 my-1 rounded-lg"
      onPress={() => {
        navigation.navigate("SingleChatScreen", {
          chatId: 1,
          friendName: "Anjana",
          lastSeenTime: "8:07pm",
          profileImage: require("../../assets/avatar/avatar_1.png"),
        });
      }}
    >

      <View className="flex-row items-center flex-1">
        <Image source={item.profile} className="h-16 w-16 rounded-full" />
        <View className="ml-3 flex-1">
          <Text className="font-bold text-lg" numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
          <Text className="text-gray-500" numberOfLines={1} ellipsizeMode="tail">{item.lastMessage}</Text>
        </View>
      </View>

      <View className="items-end">
        <Text className="text-gray-400 text-sm">{item.time}</Text>
        {item.unread > 0 && (
          <View className="bg-sky-600 rounded-full h-6 w-6 items-center justify-center mt-1">
            <Text className="text-white font-bold text-sm">{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>

  );


  return (
    <SafeAreaView className="flex-1 mt-[-16] p-0" edges={["right", "bottom", "left"]}>
      <View className="items-center flex-row mx-2 border-gray-300 border-2 rounded-full px-3 h-14 mt-7">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput className="flex-1 font-bold text-lg ps-2" placeholder="Search" value={search} onChangeText={setSearch} />
      </View>
      <View className="mt-1">
        <FlatList data={filteredChats} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 80 }} />
      </View>
      <View className="absolute bg-sky-600 bottom-3 right-3 h-16 w-16 rounded-3xl shadow-lg">
        <TouchableOpacity className="flex-1 justify-center items-center rounded-3xl">
          <Ionicons name="chatbox-ellipses" size={24} color="black" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
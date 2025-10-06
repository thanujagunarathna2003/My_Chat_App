import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { User } from "../socket/chat";
import { useUserList } from "../socket/UseUserList";

type NewChatScreenProp = NativeStackNavigationProp<RootStack, "NewChatScreen">;
export default function NewChatScreen() {
  const navigation = useNavigation<NewChatScreenProp>();
  const [search, setSearch] = useState("");
  const users = useUserList();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerLeft: () => (
        <View className="items-center flex-row gap-x-2">
          <TouchableOpacity
            className="justify-center items-center"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <View className="flex-col">
            <Text className="text-lg font-bold">Select Contact</Text>
            <Text className="text-sm font-bold">{users.length} contacts</Text>
          </View>
        </View>
      ),
      headerRight: () => <View></View>,
    });
  }, [navigation, users]);

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      className="flex-row items-center justify-start px-3 py-2 gap-x-3 mt-1 bg-gray-50 "
      onPress={() => {
        navigation.replace("SingleChatScreen", {
          chatId: item.id,
          friendName: `${item.firstName} ${item.lastName}`,
          lastSeenTime: item.updatedAt,
          profileImage: item.profileImage
            ? item.profileImage
            : `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
        });
      }}
    >
      <View>
        <TouchableOpacity className="h-14 w-14 rounded-full border-1 border-gray-300 justify-center items-center">
          {item.profileImage ? (
            <Image
              source={{ uri: item.profileImage }}
              className="h-14 w-14 rounded-full"
            />
          ) : (
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
              }}
              className="h-14 w-14 rounded-full"
            />
          )}
        </TouchableOpacity>
      </View>
      <View className="flex-col gap-y-1">
        <Text className="font-bold text-xl">
          {item.firstName} {item.lastName}
        </Text>
        <Text className="text-sm italic">
          {item.status === "ACTIVE"
            ? "Already in Friend List; Message Now"
            : "Hey there! I am using TGApp"}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const filteredUsers = [...users]
    .filter((user) => {
      return (
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.contactNo.includes(search)
      );
    })
    .sort((a, b) => a.firstName.localeCompare(b.firstName));

  return (
           <SafeAreaView
            className="flex-1 bg-white"
            edges={["right", "bottom", "left"]}
        >
            <StatusBar hidden={false} translucent={true} />
            <View className="flex-1 px-4 pt-3">

                {/* Search Bar */}
                <View className="flex-row items-center px-4 py-2 bg-gray-100 rounded-full shadow-sm">
                    <Ionicons name="search" size={20} color="gray" />
                    <TextInput
                        className="flex-1 text-base ps-2 text-gray-700"
                        placeholder="Search"
                        placeholderTextColor="gray"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>

                {/* Section: New Contact */}
                <View className="mt-5">
                    <Text className="mb-2 text-sm font-semibold text-gray-500">
                        Quick Actions
                    </Text>
                    <TouchableOpacity 
                    className="flex-row items-center gap-x-3 px-4 py-3 bg-sky-100 rounded-xl"
                    onPress={() => navigation.navigate("NewContactScreen")}                    
                    >
                        <View className="items-center justify-center w-12 h-12 bg-sky-600 rounded-full">
                            <Feather name="user-plus" size={24} color="white" />
                        </View>
                        <Text className="text-lg font-semibold text-gray-800">New Contact</Text>
                    </TouchableOpacity>
                </View>

                {/* User List */}
                <View className="flex-1 mt-5">
                    <Text className="mb-2 text-sm font-semibold text-gray-500">
                        Contacts
                    </Text>
                    <FlatList
                        className="rounded-xl"
                        data={filteredUsers}
                        renderItem={renderItem}
                        keyExtractor={(_, index) => index.toString()}
                    />
                </View>
            </View>
        </SafeAreaView>
  );
}

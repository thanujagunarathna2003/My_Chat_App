import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function StatusScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity className="flex-row items-center p-3">
          <View className="relative">
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/men/50.jpg" }}
              className="w-14 h-14 rounded-full"
            />
            <View className="absolute bottom-0 right-0 bg-sky-600 rounded-full p-1">
              <Ionicons name="add" size={16} color="white" />
            </View>
          </View>
          <View className="ml-3">
            <Text className="text-base font-semibol text-black">
              My Status
            </Text>
            <Text className="text-sm text-gray-500">
              Tap to add status update
            </Text>
          </View>
        </TouchableOpacity>

        <View className="bg-sky-100 p-2">
          <Text className="text-sm font-semibold text-gray-500">
            Recent updates
          </Text>
        </View>

        <TouchableOpacity className="flex-row items-center p-3">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/12.jpg" }}
            className="w-14 h-14 rounded-full border-2 border-sky-600"
          />
          <View className="ml-3">
            <Text className="text-base font-semibold text-black">
              Thanuja Gunarathna
            </Text>
            <Text className="text-sm text-gray-500">
              Today, 10:00 AM
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center p-3">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/33.jpg" }}
            className="w-14 h-14 rounded-full border-2 border-sky-600"
          />
          <View className="ml-3">
            <Text className="text-base font-semibold text-black">
              Nimal Perera
            </Text>
            <Text className="text-sm text-gray-500">
              Yesterday, 8:45 PM
            </Text>
          </View>
        </TouchableOpacity>

        <View className="bg-sky-100 p-2">
          <Text className="text-sm font-semibold text-gray-500">
            Viewed updates
          </Text>
        </View>

        <TouchableOpacity className="flex-row items-center p-3">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/22.jpg" }}
            className="w-14 h-14 rounded-full border-2 border-gray-400"
          />
          <View className="ml-3">
            <Text className="text-base font-semibold text-black">
              Anusha Kumari
            </Text>
            <Text className="text-sm text-gray-500">
              Yesterday, 2:30 PM
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Floating Buttons */}
      <View className="absolute bottom-8 right-6 items-center">
        <TouchableOpacity className="mb-4 bg-gray-200 p-3 rounded-full shadow">
          <MaterialCommunityIcons name="pencil" size={22} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-sky-600 p-4 rounded-full shadow-lg">
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

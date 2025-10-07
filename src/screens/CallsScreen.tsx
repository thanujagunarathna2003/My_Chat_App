import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider"; 

type CallItem = {
  id: number;
  name: string;
  avatar?: string | null;
  type: "incoming" | "outgoing" | "missed";
  isVideo?: boolean;
  timestamp: string; // ISO
  duration?: string; // e.g. "02:34"
};

// show local time (e.g. 10:45 PM)
const formatTime = (iso: string) => {
  const date = new Date(iso);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const h = hours % 12 || 12;
  const m = minutes < 10 ? `0${minutes}` : minutes;
  return `${h}:${m} ${ampm}`;
};

export default function CallsScreen() {
  const { applied } = useTheme();
  const [filter, setFilter] = useState<"all" | "missed" | "incoming" | "outgoing">(
    "all"
  );

  // Demo data
  const calls = useMemo<CallItem[]>(
    () => [
      {
        id: 1,
        name: "Thanuja Gunarathna",
        avatar: null,
        type: "incoming",
        isVideo: false,
        timestamp: new Date().toISOString(),
        duration: "00:03:21",
      },
      {
        id: 2,
        name: "Kamal Perera",
        avatar: "https://i.pravatar.cc/150?img=12",
        type: "outgoing",
        isVideo: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        duration: "00:12:10",
      },
      {
        id: 3,
        name: "Nimal",
        avatar: null,
        type: "missed",
        isVideo: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        id: 4,
        name: "Saroja",
        avatar: "https://i.pravatar.cc/150?img=5",
        type: "incoming",
        isVideo: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        duration: "00:01:48",
      },
    ],
    []
  );

  const filtered = calls.filter((c) =>
    filter === "all" ? true : c.type === filter
  );

  const renderItem = ({ item }: { item: CallItem }) => (
    <TouchableOpacity
      className="flex-row items-center px-4 py-3 bg-white"
      onPress={() => console.log("Tapped", item.name)}
    >
      <View className="h-14 w-14 rounded-full overflow-hidden justify-center items-center">
        {item.avatar ? (
          <Image source={{ uri: item.avatar }} className="h-14 w-14 rounded-full" />
        ) : (
          <View
            className="h-14 w-14 rounded-full justify-center items-center"
            style={{
              backgroundColor: applied === "dark" ? "#374151" : "#e2e8f0",
            }}
          >
            <Text className="font-bold text-base text-gray-700">
              {item.name
                .split(" ")
                .map((p) => p[0])
                .slice(0, 2)
                .join("")}
            </Text>
          </View>
        )}
      </View>

      <View className="flex-1 ms-3">
        <View className="flex-row justify-between items-center">
          <Text
            className={`text-base font-bold ${
              applied === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            {item.name}
          </Text>
          <Text className="text-xs text-gray-400">{formatTime(item.timestamp)}</Text>
        </View>

        <View className="flex-row items-center mt-1">
          <Ionicons
            name={
              item.isVideo
                ? "videocam"
                : item.type === "missed"
                ? "call-outline"
                : "call"
            }
            size={16}
            color={
              item.type === "missed"
                ? "#ef4444"
                : item.type === "incoming"
                ? "#0284C7"
                : "#0284C7"
            }
            style={{ marginRight: 6 }}
          />
          <Text
            className={`text-sm ${
              item.type === "missed" ? "text-red-500" : "text-gray-500"
            }`}
          >
            {item.type === "missed"
              ? "Missed"
              : item.isVideo
              ? `Video • ${item.duration ?? "—"}`
              : `${item.duration ?? "—"}`}
          </Text>
        </View>
      </View>

      <View className="ms-3">
        <Pressable className="p-2 rounded-full">
          <Ionicons name="call" size={20} color="black" />
        </Pressable>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`${applied === "dark" ? "bg-slate-900" : "bg-white"} flex-1`}
    >
      <StatusBar barStyle={applied === "dark" ? "light-content" : "dark-content"} />

      {/* Header */}
      <View
        className={`flex-row items-center justify-between px-4 py-3 ${
          applied === "dark" ? "bg-slate-900" : "bg-white"
        }`}
      >
      </View>

      {/* Filter Tabs */}
      <View className="flex-row justify-around px-2 py-3 border-b border-gray-200">
        {[
          { key: "all", label: "All" },
          { key: "missed", label: "Missed" },
          { key: "incoming", label: "Incoming" },
          { key: "outgoing", label: "Outgoing" },
        ].map((f) => (
          <Pressable
            key={f.key}
            onPress={() => setFilter(f.key as any)}
            className="px-3 py-1 rounded-full"
            style={{
              backgroundColor:
                filter === (f.key as any)
                  ? applied === "dark"
                    ? "#1f2937"
                    : "#e6f4ff"
                  : "transparent",
            }}
          >
            <Text
              className={`text-sm ${
                filter === (f.key as any)
                  ? "font-semibold text-sky-600"
                  : "text-gray-500"
              }`}
            >
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View className="h-px bg-gray-100" />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating Call Buttons */}
      <View className="absolute bottom-8 right-6 flex-col items-end space-y-3">
        <TouchableOpacity
          onPress={() => console.log("New video call")}
          className="h-14 w-14 bg-white rounded-full justify-center items-center shadow"
        >
          <Ionicons name="videocam" size={22} color="#111827" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("New voice call")}
          className="h-16 w-16 bg-sky-600 rounded-full justify-center items-center shadow-xl"
        >
          <Ionicons name="call" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

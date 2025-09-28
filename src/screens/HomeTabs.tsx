import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import StatusScreen from "./StatusScreen";
import CallsScreen from "./CallsScreen";
import ChatsScreen from "./ChatsScreen";


export default function HomeTabs() {
    const Tabs = createBottomTabNavigator();
    return (
        <Tabs.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
                let iconName = "chatbubble-ellipses-sharp";
                if (route.name === "Chats") iconName = "chatbubble-ellipses-sharp";
                else if (route.name === "Status") iconName = "time";
                else if (route.name === "Calls") iconName = "call";
                return (<Ionicons name={iconName as any} size={28} color={color} />);
            },
            tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
            tabBarActiveTintColor: "#0284C7",
            tabBarInactiveTintColor: "#6b7280",
            tabBarStyle: {
                height: 95,
                backgroundColor: "#fff",
               

            }
        })}>
            <Tabs.Screen name="Chats" component={ChatsScreen} options={{ headerShown: false }} />
            <Tabs.Screen name="Status" component={StatusScreen} />
            <Tabs.Screen name="Calls" component={CallsScreen} />
        </Tabs.Navigator>
    );
}
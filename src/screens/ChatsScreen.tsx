import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingScreen";
import NewChatScreen from "./NewChatScreen";


const Stack = createNativeStackNavigator();
export default function ChatsScreen(){
return (<Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen}/>
    <Stack.Screen name="SettingScreen" component={SettingsScreen}/>
    <Stack.Screen name="NewChatScreen" component={NewChatScreen}/>
</Stack.Navigator>);
}
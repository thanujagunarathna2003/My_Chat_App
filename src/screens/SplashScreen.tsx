import { StatusBar } from "expo-status-bar";
import "../../global.css"
import { Image, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef } from "react";
import CircleShape from "../components/CircleShape";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemePrivider";

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;

export default function SplashScrean() {

    const navigation = useNavigation<Props>();

    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 3000 });

        const timer = setTimeout(() => {
            navigation.replace("SignUpScreen");
        }, 3000);

        return()=>{
            clearTimeout(timer);
        };

    }, [navigation, opacity]);

    const animatedStyle = useAnimatedStyle(() => {
        return { opacity: opacity.value };
    });

    const { applied } = useTheme();

    const logo =
        applied === "dark"
            ? require("../../assets/logo2_dark.png")
            : require("../../assets/logo2.png");

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">

            <StatusBar hidden={true} />

            <CircleShape
                circleWidth={150}
                circleHeight={150}
                circleColor={applied === "dark" ? "#6e7178" : "#262729"}
                // circleColor="#262729"
                circleBorderRadius={999}
                circleTopValue={-20}
                circleLeftValue={-20}
            ></CircleShape>
            <CircleShape
                circleWidth={80}
                circleHeight={80}
                circleColor="#fff"
                circleBorderRadius={999}
                circleTopValue={30}
                circleLeftValue={30}
            ></CircleShape>

            <CircleShape
                circleWidth={60}
                circleHeight={60}
                circleColor={applied === "dark" ? "#6e7178" : "#262729"}
                // circleColor="#262729"
                circleBorderRadius={999}
                circleTopValue={-10}
                circleLeftValue={99}
            ></CircleShape>
            <CircleShape
                circleWidth={30}
                circleHeight={30}
                circleColor="#fff"
                circleBorderRadius={999}
                circleTopValue={10}
                circleLeftValue={120}
            ></CircleShape>

            <CircleShape
                circleWidth={150}
                circleHeight={150}
                circleColor={applied === "dark" ? "#cc731b" : "#12b0e0"}
                circleBorderRadius={999}
                circleBottomValue={-20}
                circleRightValue={-20}
            ></CircleShape>
            <CircleShape
                circleWidth={80}
                circleHeight={80}
                circleColor="#fff"
                circleBorderRadius={999}
                circleBottomValue={30}
                circleRightValue={30}
            ></CircleShape>

            <CircleShape
                circleWidth={60}
                circleHeight={60}
                circleColor={applied === "dark" ? "#cc731b" : "#12b0e0"}
                // circleColor="#12b0e0"
                circleBorderRadius={999}
                circleBottomValue={-10}
                circleRightValue={99}
            ></CircleShape>
            <CircleShape
                circleWidth={30}
                circleHeight={30}
                circleColor="#fff"
                circleBorderRadius={999}
                circleBottomValue={10}
                circleRightValue={120}
            ></CircleShape>

            <Animated.View style={animatedStyle}>
                <Image source={logo}
                    style={{
                        width: 150,
                        height: 150,
                        borderWidth: 4,
                        borderColor: applied === "dark" ? "#FFF" : "#262729",
                        borderRadius: 100
                    }} />
            </Animated.View>

            <Animated.View className="absolute bottom-5 items-center" style={animatedStyle}>
                <Text className={`font-bold ${applied === "dark" ? "text-white" : "text-black"}`}>POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}</Text>
                <Text className={`font-bold text-sm ${applied === "dark" ? "text-white" : "text-black"}`}>APP VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}</Text>
            </Animated.View>
        </SafeAreaView>
    );
}

import { StatusBar } from "expo-status-bar";
import "../../global.css"
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { useEffect, useRef } from "react";
import CircleShape from "../components/CircleShape";

export default function SplashScrean() {

    const fadeIn = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }, [fadeIn]);

    return (
        <View className="flex-1 items-center justify-center">

            <CircleShape
                circleWidth={150}
                circleHeight={150}
                circleColor="#262729"
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
                circleColor="#262729"
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
                circleColor="#12b0e0"
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
                circleColor="#12b0e0"
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

            <Animated.View style={{ opacity: fadeIn }}>
                <Image source={require("../../assets/logo2.png")}
                    style={{
                        width: 150,
                        height: 150,
                        borderWidth: 4,
                        borderColor: '#262729',
                        borderRadius: 100
                    }} />
            </Animated.View>

            <StatusBar hidden={true} />

            <View className="absolute bottom-5 items-center">
                <Text className="text-black font-bold">POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}</Text>
                <Text className="text-black font-bold text-sm">APP VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}</Text>
            </View>
        </View>
    );
}

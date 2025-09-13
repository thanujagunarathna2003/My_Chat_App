import { View } from "react-native";

interface Circle {
    circleWidth: number;
    circleHeight: number;
    circleColor: string;
    circleBorderRadius: number;
    circleTopValue?: number;
    circleRightValue?: number;
    circleBottomValue?: number;
    circleLeftValue?: number;
}

export default function CircleShape({
    circleWidth,
    circleHeight,
    circleColor,
    circleBorderRadius,
    circleTopValue,
    circleRightValue,
    circleBottomValue,
    circleLeftValue,
}: Circle) {
    return(
        <View
            style={{
                width:circleWidth,
                height:circleHeight,
                backgroundColor:circleColor,
                borderRadius:circleBorderRadius,
                position:'absolute',

                ...(circleTopValue !== undefined && {top:circleTopValue}),
                ...(circleRightValue !== undefined && {right:circleRightValue}),
                ...(circleBottomValue !== undefined && {bottom:circleBottomValue}),
                ...(circleLeftValue !== undefined && {left:circleLeftValue}),
            }}
        >

        </View>
    );
}
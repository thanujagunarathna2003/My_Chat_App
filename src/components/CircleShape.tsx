import { View } from "react-native";

interface Circle {
    circleWidth: number;
    circleHeight: number;
    circleBorderRadius: number;
    circleColor?: string;
    className?: string;
    circleTopValue?: number;
    circleRightValue?: number;
    circleBottomValue?: number;
    circleLeftValue?: number;
}

export default function CircleShape(c: Circle) {
    return (
        <View
            className={`${c.className ?? ""}`}
            style={{
                width: c.circleWidth,
                height: c.circleHeight,
                borderRadius: c.circleBorderRadius,
                position: 'absolute',

                ...(c.circleColor !== undefined && { backgroundColor: c.circleColor }),
                ...(c.circleTopValue !== undefined && { top: c.circleTopValue }),
                ...(c.circleRightValue !== undefined && { right: c.circleRightValue }),
                ...(c.circleBottomValue !== undefined && { bottom: c.circleBottomValue }),
                ...(c.circleLeftValue !== undefined && { left: c.circleLeftValue }),
                zIndex: 0,
            }}
        >

        </View>
    );
}
import { ImageSourcePropType, View } from "react-native";
import Animated , { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Simplification: Initialize with 0 directly.
  // At the start, translateX.value is 0, so useSharedValue(0) has the same effect.
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);


  const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(() => {
    if (scaleImage.value === imageSize) {
      scaleImage.value = imageSize * 2;
    } else {
      scaleImage.value = imageSize;
    }
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  // Pan Style
  const drag = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
    }).onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
        {
          translateX: translateX.value,
        },
      ]
    }
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={containerStyle}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            style={imageStyle}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
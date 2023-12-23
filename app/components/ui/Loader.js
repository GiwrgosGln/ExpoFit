import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

const size = 20;
const dim = 60;

const Loader1 = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animatedLoop = Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    animatedLoop.start();

    return () => {
      animatedLoop.stop();
    };
  }, [animation]);

  const inputRange = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];

  const interpolateAnimation = (outputRange) =>
    animation.interpolate({
      inputRange,
      outputRange,
    });

  const left1 = interpolateAnimation([
    0,
    dim - size,
    dim - size,
    0,
    0,
    0,
    dim - size,
    dim - size,
    0,
  ]);
  const top1 = interpolateAnimation([
    0,
    0,
    dim - size,
    dim - size,
    0,
    dim - size,
    dim - size,
    0,
    0,
  ]);

  const left2 = interpolateAnimation([
    dim - size,
    0,
    0,
    dim - size,
    dim - size,
    dim - size,
    0,
    0,
    dim - size,
  ]);
  const top2 = interpolateAnimation([
    dim - size,
    dim - size,
    0,
    0,
    dim - size,
    0,
    0,
    dim - size,
    dim - size,
  ]);

  const left3 = interpolateAnimation([
    0,
    0,
    dim - size,
    dim - size,
    0,
    dim - size,
    dim - size,
    0,
    0,
  ]);
  const top3 = interpolateAnimation([
    dim - size,
    0,
    0,
    dim - size,
    dim - size,
    dim - size,
    0,
    0,
    dim - size,
  ]);

  const left4 = interpolateAnimation([
    dim - size,
    dim - size,
    0,
    0,
    dim - size,
    0,
    0,
    dim - size,
    dim - size,
  ]);
  const top4 = interpolateAnimation([
    0,
    dim - size,
    dim - size,
    0,
    0,
    0,
    dim - size,
    dim - size,
    0,
  ]);

  const angleValue = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });

  const backgroundColor = "#6879f8";

  return (
    <View style={styles.container}>
      <View style={{ width: dim, height: dim }}>
        <Animated.View
          style={{
            ...styles.item,
            backgroundColor,
            transform: [
              { translateX: left1 },
              { translateY: top1 },
              { rotate: angleValue },
            ],
          }}
        />
        <Animated.View
          style={{
            ...styles.item,
            backgroundColor,
            transform: [
              { translateX: left2 },
              { translateY: top2 },
              { rotate: angleValue },
            ],
          }}
        />
        <Animated.View
          style={{
            ...styles.item,
            backgroundColor,
            transform: [
              { translateX: left3 },
              { translateY: top3 },
              { rotate: angleValue },
            ],
          }}
        />
        <Animated.View
          style={{
            ...styles.item,
            backgroundColor,
            transform: [
              { translateX: left4 },
              { translateY: top4 },
              { rotate: angleValue },
            ],
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: { width: size, height: size, position: "absolute" },
});

export default Loader1;

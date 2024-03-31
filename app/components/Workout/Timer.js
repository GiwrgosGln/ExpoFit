import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Timer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 16, color: "white" }}>Duration</Text>
      <Text style={styles.timerText}>{formatTime(timer)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontSize: 14,
    color: "white",
    fontWeight: "200",
  },
});

export default Timer;

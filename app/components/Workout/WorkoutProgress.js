import React from "react";
import { View, Text } from "react-native";
import {
  AnimatedCircularProgress,
  CircularProgress,
} from "react-native-circular-progress";

const WorkoutProgress = ({ currentWorkouts, goalWorkouts }) => {
  const percentage = (currentWorkouts / goalWorkouts) * 100;

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#292a3e",
        flexDirection: "row",
        paddingVertical: 20,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
      }}
    >
      <AnimatedCircularProgress
        size={80}
        width={8}
        fill={50}
        tintColor="#6879f8"
        backgroundColor="#161a22"
        duration={1000}
      >
        {(fill) => (
          <View style={{ alignItems: "center", flexDirection: "column" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
              {Math.round(fill)}%
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Text style={{ fontSize: 16, color: "#fff", fontWeight: 300 }}>
          Workouts Done
        </Text>
        <Text style={{ fontSize: 26, color: "#fff", fontWeight: 700 }}>2</Text>
      </View>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <Text style={{ fontSize: 16, color: "#fff", fontWeight: 300 }}>
          Goal
        </Text>
        <Text style={{ fontSize: 26, color: "#fff", fontWeight: 700 }}>4</Text>
      </View>
    </View>
  );
};

export default WorkoutProgress;

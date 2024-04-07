import React from "react";
import { View, Text, ScrollView } from "react-native";

const workouts = [
  { id: "1", title: "Upper", difficulty: "Beginner" },
  { id: "2", title: "Lower", difficulty: "Beginner" },
  { id: "3", title: "Push", difficulty: "Intermediate" },
  { id: "4", title: "Pull", difficulty: "Intermediate" },
  { id: "5", title: "Legs", difficulty: "Intermediate" },
  { id: "6", title: "5x5", difficulty: "Intermediate" },
];

const WorkoutItem = ({ title, difficulty }) => (
  <View
    style={{
      backgroundColor: "#6879f8",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 8,
      borderRadius: 10,
      width: 150,
    }}
  >
    <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
      {title}
    </Text>
    <Text style={{ fontSize: 14, color: "white" }}>{difficulty}</Text>
  </View>
);

const SampleWorkouts = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled={true}
    >
      {workouts.map((item) => (
        <WorkoutItem
          key={item.id}
          title={item.title}
          difficulty={item.difficulty}
        />
      ))}
    </ScrollView>
  );
};

export default SampleWorkouts;

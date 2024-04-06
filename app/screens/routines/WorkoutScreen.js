import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function WorkoutScreen({ route }) {
  // Extract workout data from the route params
  const { workout } = route.params;

  // Format the workout date
  const workoutDate = new Date(workout.date);
  const formattedDate = workoutDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Function to check if an exercise has sets with values
  const hasSetsWithValue = (exercise) => {
    return exercise.sets.some(
      (set) => set.weight !== null || set.reps !== null
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 60, backgroundColor: "#161a22" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginBottom: 40,
        }}
      >
        <Text style={{ color: "white", fontSize: 24 }}>
          {workout.routine_name}
        </Text>
        <Text style={{ color: "white", fontSize: 18 }}>{formattedDate}</Text>
      </View>

      {/* Render exercises */}
      <View style={{ paddingHorizontal: 20 }}>
        {workout.exercises
          .filter((exercise) => hasSetsWithValue(exercise))
          .map((exercise, index) => (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={{ color: "white", fontSize: 18, marginBottom: 5 }}>
                {exercise.name}
              </Text>
              <View style={{ marginLeft: 20 }}>
                {exercise.sets.map(
                  (set, setIndex) =>
                    (set.weight !== null || set.reps !== null) && (
                      <Text
                        key={setIndex}
                        style={{ color: "white", fontSize: 16 }}
                      >
                        {setIndex + 1}: {set.type} Set{" "}
                        {set.weight !== null ? `${set.weight} kgs - ` : ""}
                        {set.reps !== null ? `${set.reps} reps` : ""}
                      </Text>
                    )
                )}
              </View>
            </View>
          ))}
      </View>
      <View style={{ alignSelf: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#ff6b6b",
            width: "400",
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Delete Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

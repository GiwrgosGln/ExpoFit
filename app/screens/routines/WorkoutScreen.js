import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";

export default function WorkoutScreen({ route }) {
  // Extract workout data from the route params
  const { workout } = route.params;
  const navigation = useNavigation();

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

  // Function to delete the workout
  const deleteWorkout = () => {
    // Assuming you're using fetch for your API requests
    fetch(`https://ginfitapi.onrender.com/delete-workout/${workout.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If deletion is successful, navigate back to the previous screen
          navigation.goBack();
        } else {
          // If deletion fails, show an alert
          Alert.alert("Error", "Failed to delete workout.");
        }
      })
      .catch((error) => {
        console.error("Error deleting workout:", error);
        // Handle error as needed
        Alert.alert("Error", "Failed to delete workout.");
      });
  };

  return (
    <View style={{ flex: 1, paddingTop: 40, backgroundColor: "#161a22" }}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 40,
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: "white" }}>Workout</Text>
        <View style={{ width: 24 }} />
      </View>
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
          onPress={deleteWorkout}
          style={{
            backgroundColor: "#ff6b6b",
            width: 200,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Delete Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

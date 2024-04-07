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
          marginBottom: 20,
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            flex: 2,
            fontSize: 20,
            color: "white",
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          {workout.routine_name.length > 10
            ? workout.routine_name.substring(0, 10) + "..."
            : workout.routine_name}
        </Text>

        <View>
          <Text
            style={{
              fontSize: 16,
              color: "white",
              textAlign: "right",
              fontWeight: 300,
            }}
          >
            {formattedDate}
          </Text>
        </View>
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
                      <View
                        key={setIndex}
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 16 }}>
                          {setIndex + 1}. {set.type} Set
                        </Text>
                        <Text style={{ color: "white", fontSize: 16 }}>
                          {set.weight !== null && set.weight !== 0
                            ? `${set.weight} kg - `
                            : ""}

                          {set.reps !== null ? `${set.reps} reps ` : ""}
                          {set.rpe !== null ? `${set.rpe} - RPE` : ""}
                        </Text>
                      </View>
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

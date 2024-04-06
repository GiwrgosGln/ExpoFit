import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const isFocused = useIsFocused();
  const uid = useSelector((state) => state.auth.uid);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          `https://ginfitapi.onrender.com/workouts/${uid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }
        const data = await response.json();

        if (data === null) {
          // Handle case where data is null (no workouts available)
          setWorkouts([]); // Set workouts to an empty array
          return;
        }

        // Sort workouts by date in descending order
        const sortedWorkouts = data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        // Get the last 3 workouts
        const last3Workouts = sortedWorkouts.slice(0, 2);
        setWorkouts(last3Workouts);
      } catch (error) {
        console.error(error);
        // Handle error, e.g., display an error message to the user
      }
    };

    fetchWorkouts();
  }, [isFocused]);

  const handleWorkoutPress = (workout) => {
    navigation.navigate("Workout", { workout });
  };

  const renderWorkoutItem = ({ item }) => {
    // Parse the ISO 8601 date string into a Date object
    const workoutDate = new Date(item.date);

    // Format the date in a readable format (e.g., "Day, Month Date, Year")
    const formattedDate = workoutDate.toLocaleDateString("en-US", {
      //   weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Format the time in 12-hour format with AM/PM
    const formattedTime = workoutDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 20,
          backgroundColor: "#292a3e",
          padding: 10,
          borderRadius: 10,
          marginBottom: 15,
        }}
        onPress={() => handleWorkoutPress(item)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            {item.routine_name}
          </Text>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "white" }}>
            {formattedDate}
          </Text>
        </View>
        <FlatList
          style={{ gap: 10, marginTop: 20, marginBottom: 10 }}
          data={item.exercises.filter((exercise) =>
            exercise.sets.some(
              (set) =>
                (set.weight !== null || set.reps !== null) &&
                (set.type === "Working" || set.type === "Failure")
            )
          )}
          renderItem={({ item: exercise }) => {
            const filteredSets = exercise.sets.filter(
              (set) =>
                (set.weight !== null || set.reps !== null) &&
                (set.type === "Working" || set.type === "Failure")
            );
            if (filteredSets.length === 0) {
              return null;
            }
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 16, color: "white" }}>
                  {exercise.name}
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>
                  {filteredSets.length}{" "}
                  {filteredSets.length === 1
                    ? "working " + "set"
                    : "working " + "sets"}
                </Text>
              </View>
            );
          }}
          keyExtractor={(exercise) => exercise.exercise_id}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ paddingTop: 20 }}>
      <FlatList
        data={workouts}
        renderItem={renderWorkoutItem}
        keyExtractor={(workout) => workout.id}
      />
    </View>
  );
};

export default WorkoutList;

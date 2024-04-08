import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

const WorkoutList = ({ selectedDate }) => {
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
          setWorkouts([]);
          return;
        }

        const filteredWorkouts = data.filter(
          (workout) =>
            new Date(workout.date).toLocaleDateString("en-US", {
              timeZone: "UTC", // Set timezone to UTC to match the backend
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }) ===
            selectedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
        );

        const sortedWorkouts = filteredWorkouts.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setWorkouts(sortedWorkouts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkouts();
  }, [isFocused, selectedDate]);

  const handleWorkoutPress = (workout) => {
    navigation.navigate("Workout", { workout });
  };

  const findBestSet = (sets) => {
    let bestSet = null;
    sets.forEach((set) => {
      if (!bestSet || (set.weight && set.weight > bestSet.weight)) {
        bestSet = set;
      }
    });
    return bestSet;
  };

  return (
    <ScrollView style={{ paddingTop: 20 }}>
      {workouts.length === 0 ? (
        <Text style={{ fontSize: 16, color: "white", alignSelf: "center" }}>
          No workouts available for this date.
        </Text>
      ) : (
        workouts.map((workout, index) => (
          <TouchableOpacity
            key={`${workout._id}_${index}`}
            style={{
              marginHorizontal: 10,
              backgroundColor: "#292a3e",
              padding: 10,
              borderRadius: 10,
              marginTop: 20,
            }}
            onPress={() => handleWorkoutPress(workout)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                {workout.routine_name}
              </Text>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
              >
                {new Date(workout.date).toLocaleDateString("en-US", {
                  timeZone: "UTC", // Set timezone to UTC to match the backend
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
            <View
              style={{
                marginTop: 20,
                marginBottom: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16, color: "white", fontWeight: 700 }}>
                Exercise
              </Text>
              <Text style={{ fontSize: 16, color: "white", fontWeight: 700 }}>
                Best Set
              </Text>
            </View>
            {workout.exercises.map((exercise) => {
              const bestSet = findBestSet(exercise.sets);
              if (!bestSet || (!bestSet.weight && !bestSet.reps)) {
                return null;
              }
              return (
                <View
                  key={exercise._id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: 300 }}
                  >
                    {exercise.name}
                  </Text>
                  <Text
                    style={{ fontSize: 14, color: "white", fontWeight: 300 }}
                  >
                    {bestSet.weight} kg x {bestSet.reps} reps
                  </Text>
                </View>
              );
            })}
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default WorkoutList;

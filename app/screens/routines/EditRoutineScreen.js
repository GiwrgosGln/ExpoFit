import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import {
  addExercise,
  reorderExercises,
} from "../../redux/routine/routineSlice";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { Input } from "tamagui";

export default function EditRoutineScreen({ route }) {
  const { routine } = route.params;
  const [routineTitle, setRoutineTitle] = useState(routine.title);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.routine.exercises);

  useEffect(() => {
    routine.exercises.forEach((exercise) => {
      dispatch(addExercise(exercise));
    });
  }, []);

  const handleAddExercise = () => {
    navigation.navigate("Exercises");
  };

  const onSave = async () => {
    setIsLoading(true);
    try {
      const exercisesToSend = exercises.map((exercise) => ({
        ...exercise,
        secondarymuscles: exercise.secondarymuscles || [],
        instructions: exercise.instructions || [],
      }));

      const response = await fetch(
        `https://ginfitapi.onrender.com/edit-routine/${routine._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: routine.userID,
            title: routineTitle,
            exercises: exercisesToSend,
          }),
        }
      );
      if (response.ok) {
        // Handle success
        // For example, show a success message
        console.log("Routine saved successfully!");
        navigation.navigate("Routines");
      } else {
        // Handle error
        console.log("Failed to save routine");
      }
    } catch (error) {
      // Handle network error
      console.log("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDragEnd = ({ data }) => {
    dispatch(reorderExercises(data));
    console.log(data);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#161a22",
        paddingTop: 50,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: "white" }}>Edit Routine</Text>
        <TouchableOpacity onPress={onSave} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <FontAwesome name="save" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
      <Input
        placeholder="Title"
        style={{ borderColor: "#6879f8", marginBottom: 40 }}
        value={routineTitle}
        onChangeText={(text) => setRoutineTitle(text)}
      />
      {/* DraggableFlatList for rendering and managing exercises */}
      <DraggableFlatList
        data={exercises}
        renderItem={({ item, index, drag, isActive }) => (
          <TouchableOpacity
            style={{
              backgroundColor: isActive ? "#6879f8" : "#292a3e",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onLongPress={drag}
          >
            <Text style={{ color: isActive ? "white" : "white", fontSize: 18 }}>
              {item.name}
            </Text>
            <MaterialCommunityIcons
              name="drag-horizontal-variant"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => `exercise-${index}`}
        onDragEnd={onDragEnd}
      />
      {/* Add Exercise Button */}
      <TouchableOpacity
        onPress={handleAddExercise}
        style={{
          backgroundColor: "#6879f8",
          alignItems: "center",
          borderRadius: 10,
          paddingVertical: 8,
          marginTop: 40,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Select Exercises</Text>
      </TouchableOpacity>
    </View>
  );
}

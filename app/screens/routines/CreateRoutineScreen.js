import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Input } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addExercise,
  reorderExercises,
  resetExercises,
} from "../../redux/routine/routineSlice";
import DraggableFlatList from "react-native-draggable-flatlist";

const CreateRoutineScreen = () => {
  const [routineTitle, setRoutineTitle] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.routine.exercises);

  const onDragEnd = useCallback(
    ({ data }) => {
      dispatch(reorderExercises(data));
    },
    [dispatch]
  );

  const handleAddExercise = () => {
    navigation.navigate("Exercises");
  };

  const handleSave = () => {
    if (!routineTitle.trim()) {
      Alert.alert("Error", "Please enter a routine title");
      return;
    }

    const routineData = {
      userId: "Bhh4BMoakiPssq07cofgDfuc3gm1",
      title: routineTitle.trim(),
      exercises: exercises,
    };

    fetch("https://ginfitapi.onrender.com/create-routine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(routineData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Routine created:", result);
        dispatch(resetExercises());
        setRoutineTitle("");
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Error creating routine:", error);
        Alert.alert(
          "Error",
          "Failed to create routine. Please try again later."
        );
      });
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
        <Text style={{ fontSize: 20, color: "white" }}>Create Routine</Text>
        <TouchableOpacity onPress={handleSave}>
          <FontAwesome name="save" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Input
          placeholder="Title"
          style={{ borderColor: "#6879f8" }}
          value={routineTitle}
          onChangeText={(text) => setRoutineTitle(text)}
        />
      </View>

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
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Add Exercise</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateRoutineScreen;

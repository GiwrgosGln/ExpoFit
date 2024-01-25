import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Button, Input } from "tamagui";
import useExerciseStore from "../../../state/exerciseStore";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { saveRoutine } from "../../../services/apiService";
import useAuthStore from "../../../state/authStore";

const CreateRoutineScreen = ({ route }) => {
  const {
    selectedExercises,
    sets,
    clearExercises,
    clearSelectedExercises,
    setSets,
    addSet,
    removeSelectedExercise,
  } = useExerciseStore();
  const { uid } = useAuthStore();

  const [routineTitle, setRoutineTitle] = useState("");
  const navigation = useNavigation();

  const handleAddSet = (exerciseIndex) => {
    const existingSetsForExercise = sets
      ? sets.filter((set) => set.exerciseIndex === exerciseIndex)
      : [];
    const setIndex = existingSetsForExercise.length;

    addSet({ type: "", exerciseIndex, setIndex });
  };

  const handleTypeChange = (type, exerciseIndex, setIndex) => {
    const newSets = sets ? [...sets] : [];
    const setToUpdate = newSets.find(
      (s) => s.exerciseIndex === exerciseIndex && s.setIndex === setIndex
    );

    if (setToUpdate) {
      setToUpdate.type = type; // Use the actual value you want to store

      setSets(newSets);
    }
  };

  const handleRemoveSet = (exerciseIndex, setIndexToRemove) => {
    const newSets = sets
      ? sets.filter(
          (set) =>
            !(
              set.exerciseIndex === exerciseIndex &&
              set.setIndex === setIndexToRemove
            )
        )
      : [];

    const remainingSetsForExercise = newSets.filter(
      (set) => set.exerciseIndex === exerciseIndex
    );
    remainingSetsForExercise.forEach((set, index) => {
      set.setIndex = index;
    });

    setSets(newSets);
  };

  const handleRemoveExercise = (exerciseIndex) => {
    removeSelectedExercise(exerciseIndex);

    const newSets = sets.filter((set) => set.exerciseIndex !== exerciseIndex);

    newSets.forEach((set) => {
      if (set.exerciseIndex > exerciseIndex) {
        set.exerciseIndex -= 1;
      }
    });

    setSets(newSets);
  };

  const handleSaveRoutine = async () => {
    try {
      // Check if the routine title is empty
      if (!routineTitle.trim()) {
        console.error("Routine title is required");
        return;
      }

      const routineData = {
        userID: uid,
        title: routineTitle,
        exercises: {},
      };

      selectedExercises.forEach((exercise, exerciseIndex) => {
        routineData.exercises[exercise.name] = sets
          .filter((set) => set.exerciseIndex === exerciseIndex)
          .map((set) => (set.type === "" ? "Working" : set.type));
      });

      const response = await saveRoutine(routineData);

      if (response) {
        clearExercises();
        clearSelectedExercises();
        setSets([]);
        setRoutineTitle("");
        navigation.goBack();
      } else {
        console.error("Failed to save routine");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#161a22",
        paddingTop: 40,
        gap: 30,
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
        <TouchableOpacity onPress={handleSaveRoutine}>
          <FontAwesome name="save" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={{ gap: 10 }}>
        <Input
          placeholder="Title"
          style={{
            borderColor: "#6879f8",
          }}
          value={routineTitle}
          onChangeText={(text) => setRoutineTitle(text)}
        />
      </View>
      <View style={{ paddingBottom: 100, gap: 40, marginTop: 20 }}>
        {selectedExercises.map((exercise, exerciseIndex) => (
          <View key={exercise.id} style={{ gap: 0 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  alignSelf: "center",
                  fontWeight: 600,
                }}
              >
                {exercise.name}
              </Text>
              <TouchableOpacity
                onPress={() => handleAddSet(exerciseIndex)}
                style={{
                  backgroundColor: "#6879f8",
                  borderRadius: 10,
                  padding: 10,
                  marginTop: 10,
                  alignSelf: "center",
                }}
              >
                <Text style={{ color: "white" }}>Add Set</Text>
              </TouchableOpacity>
            </View>

            {sets
              .filter((set) => set.exerciseIndex === exerciseIndex)
              .map((set, setIndex) => (
                <View key={setIndex}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      marginVertical: 10,
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        alignSelf: "center",
                        fontSize: 24,
                      }}
                    >
                      {setIndex + 1}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        borderRadius: 10,
                        overflow: "hidden",
                        height: 40,
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Picker
                        selectedValue={set.type}
                        onValueChange={(itemValue) =>
                          handleTypeChange(itemValue, exerciseIndex, setIndex)
                        }
                        style={{
                          backgroundColor: "#292a40",
                          color: "white",
                          flex: 1,
                          marginHorizontal: 5,
                        }}
                        dropdownIconColor={"white"}
                      >
                        <Picker.Item label="Working" value="Working" />
                        <Picker.Item label="Warm Up" value="Warm Up" />
                        <Picker.Item label="Failure" value="Failure" />
                      </Picker>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleRemoveSet(exerciseIndex, setIndex)}
                    >
                      <Feather name="x" size={28} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            <TouchableOpacity
              onPress={() => handleRemoveExercise(exerciseIndex)}
              style={{
                backgroundColor: "#ff6b6b",
                borderRadius: 10,
                padding: 10,
                marginTop: 10,
                alignSelf: "center",
              }}
            >
              <Text style={{ color: "white" }}>Remove Exercise</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CreateRoutineScreen;

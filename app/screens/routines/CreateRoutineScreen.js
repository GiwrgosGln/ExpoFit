import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native"; // Import FlatList instead of ScrollView
import { Button, Input } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addExercise,
  reorderExercises,
} from "../../redux/routine/routineSlice";
import DraggableFlatList from "react-native-draggable-flatlist";

const CreateRoutineScreen = ({ route }) => {
  const [routineTitle, setRoutineTitle] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.routine.exercises);

  console.log("Exercises in Redux Store:", exercises);

  const onDragEnd = useCallback(
    ({ data }) => {
      // Dispatch action to update the order of exercises in Redux state
      dispatch(reorderExercises(data));
    },
    [dispatch]
  );

  return (
    <View
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
        <TouchableOpacity>
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

      <View>
        {exercises.length > 0 && (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontSize: 16,
                  fontWeight: 200,
                }}
              >
                Hold the exercise to re-order
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Exercises")}
                style={{
                  backgroundColor: "#6879f8",
                  alignItems: "center",
                  borderRadius: 10,
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
                  Add Exercises
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
              <Text
                style={{ color: isActive ? "white" : "white", fontSize: 18 }}
              >
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
      </View>

      {exercises.length < 1 && (
        <>
          <View style={{ alignSelf: "center", marginTop: 20, width: "100%" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Exercises")}
              style={{
                backgroundColor: "#6879f8",
                alignItems: "center",
                borderRadius: 10,
                paddingVertical: 8,
              }}
            >
              <Text style={{ color: "white", fontSize: 16 }}>
                Add Exercises
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CreateRoutineScreen;

import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Button, Input } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addExercise } from "../../redux/routine/routineSlice";

const CreateRoutineScreen = ({ route }) => {
  const [routineTitle, setRoutineTitle] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.routine.exercises);

  console.log("Exercises in Redux Store:", exercises);

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

      {/* Display added exercises */}

      <View style={{ marginTop: 20 }}>
        {/* Map through the exercises in the Redux store and display them */}
        {Array.isArray(exercises) &&
          exercises.map((exercise, index) => (
            <Text key={index} style={{ color: "white", fontSize: 18 }}>
              {exercise.name}
            </Text>
          ))}
      </View>

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
          <Text style={{ color: "white", fontSize: 16 }}>Add Exercises</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateRoutineScreen;

import React from "react";
import { TouchableOpacity, Text } from "react-native";

const AddedExercisesButton = ({ onPress }) => (
  <TouchableOpacity
    style={{
      backgroundColor: "#6879f8",
      height: 40,
      alignItems: "center",
      marginTop: 15,
      borderRadius: 10,
      width: "92%",
      alignSelf: "center",
      justifyContent: "center",
    }}
    onPress={onPress}
  >
    <Text style={{ color: "black", fontSize: 16 }}>Show Added Exercises</Text>
  </TouchableOpacity>
);

export default AddedExercisesButton;

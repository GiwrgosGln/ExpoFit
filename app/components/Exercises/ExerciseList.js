import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { getExercises } from "../../../services/apiService";
import Sheet from "../ui/Sheet";
import {
  Button,
  Group,
  ListItem,
  Separator,
  XGroup,
  YGroup,
  YStack,
  ScrollView,
} from "tamagui";
import { Scroll } from "@tamagui/lucide-icons";

const ExerciseItem = React.memo(({ exercise, onPress }) => (
  <TouchableOpacity onPress={() => onPress(exercise)}>
    <YGroup separator={<Separator />}>
      <YGroup.Item>
        <ListItem
          style={{ backgroundColor: "#161a22" }}
          title={`${exercise.name}`}
          subTitle={`${exercise.equipment}`}
        />
        <Separator />
      </YGroup.Item>
    </YGroup>
  </TouchableOpacity>
));

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [key, setKey] = useState(0); // Add key state

  useEffect(() => {
    const fetchExercises = async () => {
      const exercisesData = await getExercises();

      if (exercisesData) {
        setExercises(exercisesData);
      }
    };

    fetchExercises();
  }, []);

  const handleExercisePress = (exercise) => {
    console.log("Exercise pressed:", exercise);
    setSelectedExercise(exercise);
    setKey((prevKey) => prevKey + 1); // Update key when exercise changes
  };

  const handleCloseSheet = () => {
    setSelectedExercise(null);
  };

  return (
    <View style={{ height: "100%" }}>
      <ScrollView>
        {exercises.length > 0 ? (
          exercises.map((exercise) => (
            <ExerciseItem
              key={exercise._id.toString()}
              exercise={exercise}
              onPress={handleExercisePress}
            />
          ))
        ) : (
          <Text>Loading exercises...</Text>
        )}
      </ScrollView>

      {selectedExercise && (
        <Sheet
          key={key}
          exercise={selectedExercise}
          onClose={handleCloseSheet}
        />
      )}
    </View>
  );
};

export default ExerciseList;

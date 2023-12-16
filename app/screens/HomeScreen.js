import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPart/chest",
          {
            params: { limit: "10" },
            headers: {
              "X-RapidAPI-Key":
                "00853b9656msh3db1fd8ad933a62p1e8e0fjsn8cf8f3ebce73",
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            },
          }
        );

        setExercises(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const image = {
    uri: "https://wallpapers-clan.com/wp-content/uploads/2023/09/keep-that-energy-sis-greeen-black-background.jpg",
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      {loading ? (
        <Text style={{ color: "white" }}>Loading...</Text>
      ) : (
        exercises.map((exercise, index) => (
          <View key={index}>
            <Text style={{ color: "white" }}>{exercise.name}</Text>
            {exercise.gifUrl && (
              <Image
                source={{ uri: exercise.gifUrl }}
                style={{
                  width: 150,
                  height: 150,
                }}
                resizeMode="contain"
              />
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161a22",
  },
});

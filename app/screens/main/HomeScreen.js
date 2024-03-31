import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../styles/globalStyles";
import WorkoutList from "../../components/Workout/WorkoutList";

const Home = () => {
  return (
    <View style={globalStyles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={globalStyles.title}>Hello, user!</Text>
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, color: "white", alignSelf: "center" }}>
            Last Workouts
          </Text>
        </View>
        <WorkoutList />
      </View>
    </View>
  );
};

export default Home;

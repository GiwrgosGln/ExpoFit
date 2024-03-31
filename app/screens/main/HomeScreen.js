import React, { useEffect } from "react";
import { StyleSheet, Text, View, BackHandler, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../styles/globalStyles";
import WorkoutList from "../../components/Workout/WorkoutList";

const Home = () => {
  // Disable back button listener when the component mounts
  useEffect(() => {
    const disableBackButton = () => {
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", disableBackButton);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", disableBackButton);
    };
  }, []);
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

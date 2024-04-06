import React, { useEffect } from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { Avatar } from "tamagui";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../styles/globalStyles";
import WorkoutList from "../../components/Workout/WorkoutList";
import { useSelector } from "react-redux";

const Home = () => {
  const { uid, username, email } = useSelector((state) => state.auth);

  useEffect(() => {
    // Log uid, username, and email
    console.log("UID:", uid);
    console.log("Username:", username);
    console.log("Email:", email);
  }, [uid, username, email]);

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
        <View
          style={{
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={globalStyles.title}>Hello, {username}!</Text>
          <Avatar circular size="$4" style={{ alignSelf: "center" }}>
            <Avatar.Image
              accessibilityLabel="Nate Wienert"
              src="https://i.pinimg.com/280x280_RS/c6/49/70/c64970ce68687694d897decdba92ea85.jpg"
            />
          </Avatar>
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

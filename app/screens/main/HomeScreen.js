import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "tamagui";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../styles/globalStyles";
import WorkoutList from "../../components/Workout/WorkoutList";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import WeeklyCalendar from "../../components/ui/WeeklyCalendar";
import SampleWorkouts from "../../components/Workout/SampleWorkouts";

const Home = () => {
  const { uid, username, email, dateofbirth } = useSelector(
    (state) => state.auth
  );
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const icon = require("../../../assets/icon.png");

  useEffect(() => {
    console.log("Date of Birth from Redux:", dateofbirth);
  }, [dateofbirth]);

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
    <ScrollView style={globalStyles.container} nestedScrollEnabled={true}>
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
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 16, color: "white", fontWeight: 300 }}>
              Hello 👋
            </Text>
            <Text style={{ fontSize: 16, color: "white", fontWeight: 700 }}>
              {username}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar
              circular
              size="$5"
              style={{
                alignSelf: "center",
                borderWidth: 1,
                borderColor: "#6879f8",
              }}
            >
              <Avatar.Image accessibilityLabel="ExpoFit" src={icon} />
            </Avatar>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
          {/* Pass selectedDate to WeeklyCalendar */}
          <WeeklyCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </View>
        {/* Pass selectedDate to WorkoutList */}
        <WorkoutList selectedDate={selectedDate} />
      </View>

      <View
        style={{
          marginTop: 30,
          flexDirection: "column",
          marginBottom: 100,
        }}
      >
        <Text
          style={{
            color: "white",
            paddingHorizontal: 10,
            fontSize: 20,
          }}
        >
          Recommended Routines
        </Text>
        <SampleWorkouts />
      </View>
    </ScrollView>
  );
};

export default Home;

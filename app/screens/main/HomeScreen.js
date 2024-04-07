import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "tamagui";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../styles/globalStyles";
import WorkoutList from "../../components/Workout/WorkoutList";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import WeeklyCalendar from "../../components/ui/WeeklyCalendar";
import WorkoutProgress from "../../components/Workout/WorkoutProgress";
import { FontAwesome5 } from "@expo/vector-icons";
import SampleWorkouts from "../../components/Workout/SampleWorkouts";
import GoogleFit from "../../components/ui/GoogleFit";

const Home = () => {
  const { uid, username, email, dateofbirth } = useSelector(
    (state) => state.auth
  );
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    console.log("Date of Birth from Redux:", dateofbirth);
  }, [dateofbirth]);

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
              <Avatar.Image
                accessibilityLabel="Nate Wienert"
                src="https://i.pinimg.com/280x280_RS/c6/49/70/c64970ce68687694d897decdba92ea85.jpg"
              />
            </Avatar>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            paddingHorizontal: 10,
            marginTop: 20,
          }}
        >
          <WorkoutProgress />
        </View> */}
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
        }}
      >
        <Text
          style={{
            color: "white",
            paddingHorizontal: 10,
            marginBottom: 10,
            fontSize: 20,
          }}
        >
          Recommended Routines
        </Text>
        <SampleWorkouts />
      </View>
      <View>
        <GoogleFit />
      </View>
    </ScrollView>
  );
};

export default Home;

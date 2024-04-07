import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "tamagui";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../styles/globalStyles";
import WorkoutList from "../../components/Workout/WorkoutList";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";

const Home = () => {
  const { uid, username, email } = useSelector((state) => state.auth);
  const navigation = useNavigation();

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
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 16, color: "white", fontWeight: 300 }}>
              Hello 👋
            </Text>
            <Text style={{ fontSize: 16, color: "white", fontWeight: 700 }}>
              {username}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar circular size="$5" style={{ alignSelf: "center" }}>
              <Avatar.Image
                accessibilityLabel="Nate Wienert"
                src="https://i.pinimg.com/280x280_RS/c6/49/70/c64970ce68687694d897decdba92ea85.jpg"
              />
            </Avatar>
          </TouchableOpacity>
        </View>
        <View></View>
        <WorkoutList />
      </View>
    </View>
  );
};

export default Home;

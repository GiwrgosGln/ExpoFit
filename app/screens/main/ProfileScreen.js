import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "tamagui";
import { ListItem, Separator, YGroup } from "tamagui";
import SignOut from "../../components/Auth/SignOut";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AvatarIcon from "../../components/ui/AvatarIcon";

export default function ProfileScreen() {
  const { uid, username, email } = useSelector((state) => state.auth);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <SignOut />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingTop: 20,
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        <AvatarIcon />
        <Text
          style={{
            paddingTop: 15,
            alignSelf: "center",
            color: "white",
            fontSize: 24,
            fontWeight: 300,
          }}
        >
          {username}
        </Text>
      </View>
      <View
        style={{ paddingHorizontal: 28, marginTop: 60, paddingBottom: 100 }}
      >
        <YGroup separator={<Separator />}>
          <YGroup.Item>
            <ListItem
              title="Account"
              subTitle="Edit your account"
              backgroundColor={"#292a3e"}
              onPress={() => navigation.navigate("Account")}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              title="Bodyweight"
              subTitle="Track your bodyweight"
              backgroundColor={"#292a3e"}
              onPress={() => navigation.navigate("Bodyweight")}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              title="Routines"
              subTitle="Manage your routines"
              backgroundColor={"#292a3e"}
              onPress={() => navigation.navigate("MyRoutines")}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              title="Workouts"
              subTitle="Check your workout history"
              backgroundColor={"#292a3e"}
              onPress={() => navigation.navigate("WorkoutHistory")}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              title="Feature Request"
              subTitle="Submit a feature idea"
              backgroundColor={"#292a3e"}
              onPress={() => navigation.navigate("FeatureRequest")}
            />
          </YGroup.Item>

          <YGroup.Item>
            <ListItem
              title="Contact Support"
              subTitle="Need assistance? Contact us"
              backgroundColor={"#292a3e"}
              onPress={() => navigation.navigate("ContactSupport")}
            />
          </YGroup.Item>
        </YGroup>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161a22",
    paddingTop: 52,
  },
});

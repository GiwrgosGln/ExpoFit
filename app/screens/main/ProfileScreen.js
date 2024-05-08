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
      <View style={{ paddingHorizontal: 28, marginTop: 40 }}>
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
              title="Feature Request"
              subTitle="Submit a feature idea"
              backgroundColor={"#292a3e"}
              onPress={() => navigation.navigate("FeatureRequest")}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              title="FAQ"
              subTitle="Frequently Asked Questions"
              backgroundColor={"#292a3e"}
              onPress={() => navigation.navigate("FrequentlyAskedQuestions")}
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
          <YGroup.Item>
            <ListItem
              title="Play Store"
              subTitle="Review ExpoFit on the Play Store"
              backgroundColor={"#292a3e"}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              title="Terms and Conditions"
              subTitle="Read our terms of service"
              backgroundColor={"#292a3e"}
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

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Avatar } from "tamagui";
import {
  Button,
  Group,
  ListItem,
  Separator,
  XGroup,
  YGroup,
  YStack,
} from "tamagui";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  AntDesign,
  Fontisto,
  Entypo,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import SignOut from "../../components/Auth/SignOut";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <View
        style={{
          paddingTop: 20,
          alignSelf: "center",
          flexDirection: "column",
        }}
      >
        <Avatar circular size="$12">
          <Avatar.Image
            accessibilityLabel="Nate Wienert"
            src="https://i.pinimg.com/280x280_RS/c6/49/70/c64970ce68687694d897decdba92ea85.jpg"
          />
        </Avatar>
        <Text
          style={{
            paddingTop: 15,
            alignSelf: "center",
            color: "white",
            fontSize: 24,
            fontWeight: 300,
          }}
        >
          Cbum
        </Text>
      </View>
      <View style={{ paddingHorizontal: 28, paddingTop: 20 }}>
        <YGroup separator={<Separator />}>
          <YGroup.Item>
            <ListItem
              title="Account"
              subTitle="Edit your account"
              backgroundColor={"#292a3e"}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              title="Notifications"
              subTitle="Manage your notifications"
              backgroundColor={"#292a3e"}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              title="Units"
              subTitle="Change your preffered units"
              backgroundColor={"#292a3e"}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              title="Guide"
              subTitle="Getting Started Guide"
              backgroundColor={"#292a3e"}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              title="FAQ"
              subTitle="Frequently Asked Questions"
              backgroundColor={"#292a3e"}
            />
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              title="Play Store"
              subTitle="Review ExpoFit on the Play Store"
              backgroundColor={"#292a3e"}
            />
          </YGroup.Item>
        </YGroup>
        <View style={{ marginTop: 40 }}>
          <SignOut />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161a22",
    paddingTop: 52,
  },
});

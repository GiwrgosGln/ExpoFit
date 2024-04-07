import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Input } from "tamagui";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/user/authSlice";

export default function AccountScreen() {
  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);
  const [username, setUsername] = useState(auth.username);
  const dispatch = useDispatch();

  const handleUpdateUsername = async () => {
    try {
      const response = await fetch(
        `https://ginfitapi.onrender.com/users/${auth.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update username");
      }

      // Update username in Redux
      dispatch(setUser({ ...auth, username: username }));
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error updating username:", error);
      Alert.alert(
        "Error",
        "Failed to update username. Please try again later."
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#161a22",
      }}
    >
      <StatusBar backgroundColor="#161a22" style="light" />
      <View
        style={{
          marginTop: 40,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 20 }}>Account</Text>
        <TouchableOpacity onPress={handleUpdateUsername}>
          <FontAwesome name="save" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 40,
          paddingHorizontal: 20,
          justifyContent: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: "white",
              marginBottom: 5,
              alignSelf: "center",
              fontSize: 16,
            }}
          >
            Username
          </Text>
          <Input
            placeholder="Username"
            style={{ borderColor: "#6879f8" }}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
      </View>
    </View>
  );
}

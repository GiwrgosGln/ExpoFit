import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "tamagui";
import useAuthStore from "../../../state/authStore";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import { registerUser } from "../../../services/apiService";

const AdditionalInfoScreen = () => {
  const { uid, saveUsername } = useAuthStore();
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");

  const handleRegister = async () => {
    console.log(uid);

    try {
      // Parse weight as a number
      const registrationResult = await registerUser(
        uid,
        username,
        sex,
        parseFloat(weight)
      );

      if (registrationResult && registrationResult.id) {
        console.log("Registration successful:", registrationResult);
        saveUsername(username);
        navigation.navigate("HomeStack");
      } else {
        console.error(
          "Registration failed. Server response:",
          registrationResult
        );
      }
    } catch (error) {
      console.error("An error occurred during registration:", error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        gap: 15,
      }}
    >
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <Input
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Input
        placeholder="Sex"
        value={sex}
        onChangeText={(text) => setSex(text)}
      />
      <Input
        placeholder="Weight"
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />
      <Button onPress={handleRegister}>Register</Button>
    </View>
  );
};

export default AdditionalInfoScreen;

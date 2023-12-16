import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "tamagui";
import useAuthStore from "../../state/authStore";
import { useNavigation } from "@react-navigation/core";
import { BlurView } from "expo-blur";

const AdditionalInfoScreen = () => {
  const { uid, saveUsername } = useAuthStore();
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");

  const handleRegister = async () => {
    console.log(uid); // Use authStore.uid instead of useAuthStore.id
    const requestData = {
      id: uid, // Fetching uid from Zustand store
      username,
      sex,
      weight: parseInt(weight),
    };

    try {
      const response = await fetch("https://fitnessapi.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log("Registration successful:", data);
      saveUsername(username);
      navigation.navigate("HomeStack");
    } catch (error) {
      console.error("Error registering:", error);
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

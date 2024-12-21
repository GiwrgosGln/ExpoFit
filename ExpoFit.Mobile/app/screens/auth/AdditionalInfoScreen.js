import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "tamagui";
import { useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { registerUser } from "../../../services/apiService";
import { setUser } from "../../redux/user/authSlice";
import { useNavigation } from "@react-navigation/core";

const AdditionalInfoScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");

  const handleRegister = async () => {
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
        dispatch(setUser({ uid, email, username }));
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

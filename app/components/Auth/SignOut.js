import { useState, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Button } from "tamagui";
import { getAuth } from "firebase/auth";
import useAuthStore from "../../../state/authStore";

export default function SignOut() {
  const auth = getAuth();
  const navigation = useNavigation();
  const { resetUser } = useAuthStore();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        resetUser();
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View>
      <Button onPress={handleSignOut} backgroundColor={"white"} color={"black"}>
        Sign Out
      </Button>
    </View>
  );
}

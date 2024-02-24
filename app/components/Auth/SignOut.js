import { useState, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Button } from "tamagui";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/user/authSlice";

export default function SignOut() {
  const auth = getAuth();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(resetUser());
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  const navigation = useNavigation();

  return (
    <View>
      <Button
        onPress={handleSignOut}
        backgroundColor={"#ff6b6b"}
        color={"white"}
        fontSize={16}
      >
        Sign Out
      </Button>
    </View>
  );
}

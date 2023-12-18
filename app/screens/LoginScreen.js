import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { Input, Button, Text } from "tamagui";
import { auth } from "../../firebase";
import useAuthStore from "../../state/authStore";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";

const LoginScreen = () => {
  const [email, setEmail] = useState("gergegl1999@gmail.com");
  const [password, setPassword] = useState("30031963g");
  const navigation = useNavigation();
  const { setUser } = useAuthStore();

  const image = require("../../assets/wallpaper3.jpg");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.email, user.uid);
        console.log(user);
        navigation.navigate("HomeStack");
      }
    });

    return unsubscribe;
  }, [navigation, setUser]);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
        setUser(user.email, user.uid);
        navigation.navigate("AdditionalInfo");
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        console.log(user);
        setUser(user.email, user.uid);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ImageBackground source={image} resizeMode="cover" style={{ flex: 1 }}>
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView style={styles.container} behavior="height">
          <View style={{ alignSelf: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 40, color: "white" }}>
              Workout Tracker
            </Text>
          </View>
          <BlurView
            intensity={15}
            style={{
              height: "75%",
              width: "100%",
              borderTopLeftRadius: 100,
              borderTopWidth: 0.5,
              borderLeftWidth: 0.5,
              overflow: "hidden",
              justifyContent: "center",
              borderColor: "white",
            }}
          >
            <View style={{ width: "100%", gap: 52 }}>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <Input
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  width={"80%"}
                  backgroundColor={"black"}
                  color={"white"}
                />
                <Input
                  placeholder="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                  width={"80%"}
                  backgroundColor={"black"}
                  color={"white"}
                />
              </View>

              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Button
                  onPress={handleLogin}
                  width={"80%"}
                  backgroundColor={"black"}
                  color={"white"}
                >
                  Login
                </Button>
                <Button
                  onPress={handleSignUp}
                  width={"80%"}
                  backgroundColor={"black"}
                  color={"white"}
                >
                  Register
                </Button>
              </View>
            </View>
          </BlurView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 140,
  },
});

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
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../../firebase";
import { setUser } from "../../redux/user/authSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("gergegl1999@gmail.com");
  const [password, setPassword] = useState("30031963g");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const image = require("../../../assets/wallpaper3.jpg");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ email: user.email, uid: user.uid }));
        console.log(user);
        navigation.navigate("HomeStack");
      }
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registered with:", user.email);
        console.log("UID:", user.uid);
        dispatch(setUser({ email: user.email, uid: user.uid }));
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
        console.log("UID:", user.uid);
        console.log(user);
        dispatch(setUser({ email: user.email, uid: user.uid }));
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#6879f8" }}>
      <StatusBar backgroundColor="#6879f8" color="white" style="light" />
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView style={styles.container} behavior="height">
          <View>
            <Text style={{ fontSize: 40, color: "white" }}>
              Workout Tracker
            </Text>
          </View>
          <View
            style={{
              height: "75%",
              width: "100%",
              borderTopLeftRadius: 100,
              overflow: "hidden",
              justifyContent: "center",
              borderColor: "#6879f8",
              backgroundColor: "#161a22",
            }}
          >
            <View style={{ width: "100%", gap: 52 }}>
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Input
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  width={"80%"}
                  backgroundColor={"black"}
                  color={"white"}
                  borderColor={"#6879f8"}
                />
                <Input
                  placeholder="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                  width={"80%"}
                  backgroundColor={"black"}
                  color={"white"}
                  borderColor={"#6879f8"}
                />
              </View>

              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <Button
                  onPress={handleLogin}
                  width={"80%"}
                  backgroundColor={"#6879f8"}
                  color={"white"}
                >
                  Login
                </Button>
                <Button
                  onPress={handleSignUp}
                  width={"80%"}
                  backgroundColor={"#6879f8"}
                  color={"white"}
                >
                  Register
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
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

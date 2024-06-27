import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button, Text } from "tamagui";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../../firebase";
import { setUser } from "../../redux/user/authSlice";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { sendPasswordResetEmail } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const waves = require("../../../assets/images/waves.png");
  const logo = require("../../../assets/icon.png");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            uid: user.uid,
            username: user.username,
            gender: user.gender,
            dateofbirth: user.dateofbirth,
          })
        );

        fetchUserData(user.uid);
      }
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => alert(error.message));
  };

  const fetchUserData = async (uid) => {
    try {
      const response = await fetch(
        `https://ginfitapi.onrender.com/user/${uid}`
      );
      const userData = await response.json();

      dispatch(
        setUser({
          email: userData.email,
          uid: userData.id,
          username: userData.username,
          gender: userData.gender,
          dateofbirth: userData.dateofbirth,
        })
      );
      navigation.navigate("HomeStack");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#292a3e",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <StatusBar backgroundColor="#292a3e" color="white" style="light" />
      <View style={{ marginTop: 100 }}>
        <Image source={logo} style={{ height: 230, width: 300 }} />
      </View>
      <View style={{ marginTop: 20, width: "100%", gap: 20 }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              gap: 20,
            }}
          >
            <MaterialIcons
              name="email"
              size={30}
              color="#6879f8"
              style={{ marginTop: 10 }}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor={"lightgray"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                height: 50,
                width: "60%",
                color: "white",
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Entypo
              name="key"
              size={30}
              color="#6879f8"
              style={{ marginTop: 10 }}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={"lightgray"}
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                height: 50,
                width: "60%",
                color: "white",
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              marginTop: 15,
              width: "50%",
              alignSelf: "center",
            }}
            onPress={() => handlePasswordReset()}
          >
            <Text style={{ fontSize: 16 }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 80, width: "100%", alignItems: "center" }}>
          <Button
            onPress={handleLogin}
            width={"75%"}
            backgroundColor={"#6879f8"}
            color={"white"}
          >
            Login
          </Button>
          <View style={{ flexDirection: "row", gap: 5, marginTop: 10 }}>
            <Text style={{ color: "white", fontSize: 16 }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  color: "#6879f8",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 30 }}>
        <Image source={waves} />
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

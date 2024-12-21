import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Input, Button, Text } from "tamagui";
import { useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../../firebase";
import { setUser } from "../../redux/user/authSlice";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const waves = require("../../../assets/images/waves.png");
  const logo = require("../../../assets/icon.png");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({ email: user.email, uid: user.uid, username: user.username })
        );
        navigation.navigate("HomeStack");
      }
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  const handleSignUp = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      // Send HTTP request to MongoDB endpoint
      const response = await fetch("https://ginfitapi.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.uid,
          email: user.email,
          username: username,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user in MongoDB");
      }

      // Dispatch setUser action
      dispatch(
        setUser({ email: user.email, uid: user.uid, username: username })
      );

      // Navigate to Home
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error signing up:", error);
      alert(error.message);
    }
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
      <View
        style={{ marginTop: 10, width: "100%", gap: 20, alignItems: "center" }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <Ionicons
            name="person"
            size={30}
            color="#6879f8"
            style={{ marginTop: 10 }}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor={"lightgray"}
            value={username}
            onChangeText={(text) => setUsername(text)}
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
            justifyContent: "center",
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
            justifyContent: "center",
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
        <View
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Button
            onPress={handleSignUp}
            width={"80%"}
            backgroundColor={"#6879f8"}
            color={"white"}
          >
            Register
          </Button>
          <View style={{ flexDirection: "row", gap: 5, alignSelf: "center" }}>
            <Text style={{ color: "white", fontSize: 16 }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  color: "#6879f8",
                  fontWeight: 600,
                  fontSize: 16,
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <View style={{ flex: 1 }}>
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
                  placeholder="Username"
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  width={"80%"}
                  backgroundColor={"black"}
                  color={"white"}
                  borderColor={"#6879f8"}
                />
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
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <Button
                  onPress={handleSignUp}
                  width={"80%"}
                  backgroundColor={"#6879f8"}
                  color={"white"}
                >
                  Register
                </Button>
                <View
                  style={{ flexDirection: "row", gap: 5, alignSelf: "center" }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text
                      style={{
                        color: "#6879f8",
                        fontWeight: 600,
                        fontSize: 16,
                      }}
                    >
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View> */}
      <View style={{ marginTop: 40 }}>
        <Image source={waves} />
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 120,
  },
});

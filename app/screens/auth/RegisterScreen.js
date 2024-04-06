import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Input, Button, Text } from "tamagui";
import { useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { auth } from "../../../firebase";
import { setUser } from "../../redux/user/authSlice";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ email: user.email, uid: user.uid }));
        navigation.navigate("HomeStack");
      }
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        dispatch(
          setUser({ email: user.email, uid: user.uid, username: username })
        );

        // Send HTTP request to MongoDB endpoint
        try {
          const response = await fetch(
            "https://ginfitapi.onrender.com/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: user.uid,
                email: user.email,
                username: username,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to register user in MongoDB");
          }

          navigation.navigate("Home");
        } catch (error) {
          console.error("Error sending request to MongoDB endpoint:", error);
          // Handle error
        }
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

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/user/authSlice";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AccountScreen() {
  const navigation = useNavigation();
  const auth = useSelector((state) => state.auth);
  const [username, setUsername] = useState(auth.username);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [gender, setGender] = useState(
    auth.gender ? auth.gender : "Choose Gender"
  );
  const [selectedDateOfBirth, setSelectedDateOfBirth] = useState(
    auth.dateofbirth ? new Date(auth.dateofbirth) : new Date()
  );
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const dispatch = useDispatch();

  console.log(auth.dateofbirth, "dateofbirth v2");

  const handleUpdateUsername = async () => {
    try {
      const dobDate = new Date(selectedDateOfBirth);
      const formattedDOB = dobDate.toISOString().split("T")[0];

      const response = await fetch(
        `https://ginfitapi.onrender.com/users/${auth.uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: auth.email,
            gender: gender,
            dateofbirth: formattedDOB,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update username");
      }

      dispatch(
        setUser({
          ...auth,
          username: username,
          gender: gender,
          dateofbirth: formattedDOB,
        })
      );

      navigation.navigate("Home");
    } catch (error) {
      console.error("Error updating username:", error);
      Alert.alert(
        "Error",
        "Failed to update username. Please try again later."
      );
    }
  };

  const getGenderButtonStyle = (selectedGender) => ({
    backgroundColor: gender === selectedGender ? "#6879f8" : "#292a3e",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#161a22" }}>
      <StatusBar backgroundColor="#161a22" style="light" />
      <View
        style={{
          marginTop: 40,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 20 }}>Account</Text>
        <TouchableOpacity onPress={handleUpdateUsername}>
          <FontAwesome name="save" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 40,
          paddingHorizontal: 20,
          justifyContent: "center",
        }}
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
            gap: 15,
            marginTop: 40,
          }}
        >
          <MaterialCommunityIcons
            name="gender-male-female"
            size={40}
            color="#6879f8"
          />
          <TouchableOpacity
            style={getGenderButtonStyle("Male")}
            onPress={() => setGender("Male")}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getGenderButtonStyle("Female")}
            onPress={() => setGender("Female")}
          >
            <Text style={{ fontSize: 16, color: "white" }}>Female</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            marginTop: 40,
          }}
        >
          <FontAwesome name="birthday-cake" size={30} color="#6879f8" />
          <TouchableOpacity
            onPress={() => setDatePickerVisible(true)}
            style={{
              borderColor: "#6879f8",
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "62%",
            }}
          >
            <Text style={{ color: "white" }}>
              {selectedDateOfBirth.toDateString()}
            </Text>
            <AntDesign name="caretdown" size={15} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={datePickerVisible}
        onRequestClose={() => {
          setDatePickerVisible(false);
        }}
      >
        <View
          style={{
            backgroundColor: "#292a3e",
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <DateTimePicker
            value={selectedDateOfBirth}
            mode="date"
            display="spinner"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || selectedDateOfBirth;
              setSelectedDateOfBirth(currentDate);
              setDatePickerVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

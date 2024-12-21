import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as MailComposer from "expo-mail-composer";
import { TextArea } from "tamagui";

export default function ContactSupportScreen() {
  const navigation = useNavigation();
  const [emailBody, setEmailBody] = useState("");

  // Function to send email
  const sendEmail = async () => {
    try {
      await MailComposer.composeAsync({
        recipients: ["georgios.glinias@gmail.com"],
        subject: "Support",
        body: emailBody,
      });
      console.log("Email sent successfully");
      setEmailBody("");
    } catch (error) {
      console.error("Failed to send email", error);
    }
  };

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
        <Text style={{ color: "white", fontSize: 20 }}>Support</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={{ padding: 20 }}>
        <TextArea
          placeholder="Type your message here..."
          placeholderTextColor="#A9A9A9"
          value={emailBody}
          onChangeText={(text) => setEmailBody(text)}
          multiline
          size="$4"
          textAlignVertical="top"
          height={200}
          style={{
            backgroundColor: "#2C2F3E",
            color: "white",
            marginTop: 10,
            padding: 10,
            borderRadius: 5,
          }}
        />
        <TouchableOpacity
          onPress={sendEmail}
          style={{
            marginTop: 20,
            backgroundColor: "#6879f8",
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

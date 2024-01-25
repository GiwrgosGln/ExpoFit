import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function FrequentlyAskedQuestionsScreen() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#161a22",
      }}
    >
      <StatusBar backgroundColor="#161a22" color="white" style="light" />
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
        <Text style={{ color: "white", fontSize: 20 }}>FAQ</Text>
        <View style={{ width: 24 }}></View>
      </View>
      <View style={{ marginTop: 40, alignSelf: "center" }}></View>
    </View>
  );
}

import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CreateNewRoutine() {
  const navigation = useNavigation();
  return (
    <View style={{ borderRadius: 5, overflow: "hidden" }}>
      <Button
        title="Create New Routine"
        color="#6879f8"
        onPress={() => navigation.navigate("CreateRoutine")}
      />
    </View>
  );
}

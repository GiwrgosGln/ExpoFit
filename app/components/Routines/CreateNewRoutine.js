import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CreateNewRoutine() {
  const navigation = useNavigation();
  return (
    <Button
      title="Create New Routine"
      color="#6879f8"
      onPress={() => navigation.navigate("Exercises")}
    />
  );
}

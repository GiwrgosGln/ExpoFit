import { Button } from "react-native";

export default function StartEmptyWorkoutBtn() {
  return (
    <Button
      title="Start Empty Workout"
      color="#6879f8"
      onPress={() => console.log("Start Empty Workout")}
    />
  );
}

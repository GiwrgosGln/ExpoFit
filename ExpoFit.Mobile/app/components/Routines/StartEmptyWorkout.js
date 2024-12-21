import { Button, View } from "react-native";

export default function StartEmptyWorkoutBtn() {
  return (
    <View style={{ borderRadius: 15, overflow: "hidden" }}>
      <Button
        title="Start Empty Workout"
        color="#6879f8"
        onPress={() => console.log("Start Empty Workout")}
      />
    </View>
  );
}

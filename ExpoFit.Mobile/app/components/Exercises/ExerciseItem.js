import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ListItem, Separator, YGroup } from "tamagui";
import { AntDesign } from "@expo/vector-icons";

const ExerciseItem = React.memo(({ exercise, onPress, onAddPress }) => (
  <TouchableOpacity onPress={() => onPress(exercise)} key={exercise._id}>
    <YGroup>
      <YGroup.Item>
        <ListItem
          style={{ backgroundColor: "#161a22", fontFamily: "Inter" }}
          title={`${exercise.name}`}
          subTitle={`${exercise.equipment}`}
          iconAfter={
            <View style={{ flexDirection: "row", gap: 5 }}>
              <TouchableOpacity onPress={() => onAddPress(exercise)}>
                <AntDesign name="pluscircleo" size={30} color="#6879f8" />
              </TouchableOpacity>
            </View>
          }
        />
        <Separator />
      </YGroup.Item>
    </YGroup>
  </TouchableOpacity>
));

export default ExerciseItem;

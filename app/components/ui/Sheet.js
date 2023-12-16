import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useMemo, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";

export default function Sheet() {
  // hooks
  const sheetRef = useRef(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["70%", "90%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  // render
  const renderItem = useCallback(
    (item) => (
      <View key={item} style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  return (
    <View style={styles.container}>
      <Button
        title="Snap To 90%"
        onPress={() => handleSnapPress(1)}
        style={{ backgroundColor: "#6879f8" }}
      />
      <Button title="Snap To 70%" onPress={() => handleSnapPress(0)} />
      <Button title="Close" onPress={() => handleClosePress()} />
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onChange={handleSheetChange}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#292a3e" }}
        handleIndicatorStyle={{ backgroundColor: "#6879f8" }}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {/* {data.map(renderItem)} */}
          <View style={{ backgroundColor: "white", marginTop: 10 }}>
            <Image
              source={{ uri: "https://v2.exercisedb.io/image/fmw-lBf2WlmZRN" }}
              style={{
                height: 250,
                width: 250,
                alignSelf: "center",
              }}
            />
          </View>
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              marginTop: 10,
              fontSize: 30,
            }}
          >
            Barbell Bench Press
          </Text>
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize: 16,
            }}
          >
            Chest, Triceps, Shoulders
          </Text>
          <View
            style={{
              marginTop: 20,
              gap: 20,
              paddingHorizontal: 20,
              paddingBottom: 50,
            }}
          >
            <Text style={{ fontSize: 16, color: "white" }}>
              1. Lie flat on a bench with your feet flat on the ground and your
              back pressed against the bench.
            </Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              2. Grasp the barbell with an overhand grip slightly wider than
              shoulder-width apart.
            </Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              3. Lift the barbell off the rack and hold it directly above your
              chest with your arms fully extended.
            </Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              4. Lower the barbell slowly towards your chest, keeping your
              elbows tucked in.
            </Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              5. Pause for a moment when the barbell touches your chest.
            </Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              6. Push the barbell back up to the starting position by extending
              your arms.
            </Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              7. Repeat for the desired number of repetitions.
            </Text>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
  },
  contentContainer: {
    backgroundColor: "#292a3e",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
    color: "blue",
  },
});

{
  /* <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#292a3e" }}
        handleIndicatorStyle={{ backgroundColor: "#6879f8" }}
        onChange={handleSheetChange}
      ></BottomSheet> */
}

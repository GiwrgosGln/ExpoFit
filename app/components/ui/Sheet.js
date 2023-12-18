import React, { useRef, useEffect, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { StyleSheet, Text, View, Image } from "react-native";

const Sheet = ({ exercise, onClose }) => {
  const sheetRef = useRef(null);
  const [isValidGif, setIsValidGif] = useState(true);

  useEffect(() => {
    if (sheetRef.current) {
      sheetRef.current.snapToIndex(0); // Ensure the sheet is open when exercise is pressed
    }

    // Check if gifUrl is valid
    if (exercise.gifurl) {
      fetch(exercise.gifurl)
        .then((response) => {
          setIsValidGif(response.ok);
        })
        .catch(() => {
          setIsValidGif(false);
        });
    } else {
      setIsValidGif(false);
    }
  }, [exercise]);

  const handleSheetChange = (index) => {
    console.log("handleSheetChange", index);
  };

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={["70%", "90%"]}
      enablePanDownToClose={true}
      onChange={handleSheetChange}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          {...props}
        />
      )}
      backgroundStyle={{ backgroundColor: "#292a3e" }}
      handleIndicatorStyle={{ backgroundColor: "#6879f8" }}
    >
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        {isValidGif && exercise.gifurl ? (
          <View style={{ backgroundColor: "white", marginTop: 10 }}>
            <Image
              source={{ uri: exercise.gifurl }}
              style={{
                height: 250,
                width: 250,
                alignSelf: "center",
              }}
            />
          </View>
        ) : null}
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            marginTop: 10,
            fontSize: 30,
            marginHorizontal: 20,
            textAlign: "center",
            marginBottom: 5,
          }}
        >
          {exercise.name}
        </Text>
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            fontSize: 16,
          }}
        >
          Target Muscle: {exercise.target}
        </Text>
        <View
          style={{
            marginTop: 20,
            gap: 20,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          {exercise.instructions.map((instruction, index) => (
            <Text key={index} style={{ fontSize: 16, color: "white" }}>
              {index + 1}. {instruction}
            </Text>
          ))}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "#292a3e",
  },
});

export default Sheet;

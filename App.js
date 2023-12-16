import { StatusBar } from "expo-status-bar";
import { useColorScheme, Text } from "react-native";
import { TamaguiProvider, Theme, YStack } from "tamagui";
import { useFonts } from "expo-font";
import config from "./tamagui.config";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./app/navigations/TabNavigation";
import LoginScreen from "./app/screens/LoginScreen";
import AdditionalInfoScreen from "./app/screens/AdditionalInfoScreen";

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Theme name={colorScheme === "dark" ? "dark" : "light"}>
        <YStack f={1} backgroundColor={"$backgroundSoft"}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomeStack"
                component={TabNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AdditionalInfo"
                component={AdditionalInfoScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </YStack>
      </Theme>
    </TamaguiProvider>
  );
}

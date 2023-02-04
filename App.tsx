import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./src/screens/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import SignUpNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <SignUpNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/SignUp";
import { SignUpUserInfo } from "../screens/SignUpUserInfo";
import Login from "../screens/Login";
import { Platform } from "react-native";
import Profile from "../screens/Profile";
const Stack = createStackNavigator();
import { User } from "../store/userSlice";

interface MainNavigatorProps {
  user: User;
}

export const SignUpNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: Platform.OS === "ios" ? false : true,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignUpUserInfo" component={SignUpUserInfo} />
    </Stack.Navigator>
  );
};

export const MainNavigator = (props: MainNavigatorProps) => {
  const { user } = props;

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="Profile" component={() => <Profile user={user} />} />
    </Stack.Navigator>
  );
};

export default SignUpNavigator;

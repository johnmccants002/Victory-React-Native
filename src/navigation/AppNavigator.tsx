import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/SignUp";
import { SignUpUserInfo } from "../screens/SignUpUserInfo";
import Login from "../screens/Login";
import { Platform } from "react-native";
const Stack = createStackNavigator();

const SignUpNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="WorkerHome"
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

export default SignUpNavigator;

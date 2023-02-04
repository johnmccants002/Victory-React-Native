import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/SignUp";
import { SignUpUserInfo } from "../screens/SignUpUserInfo";

const Stack = createStackNavigator();

const SignUpNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignUpUserInfo" component={SignUpUserInfo} />
    </Stack.Navigator>
  );
};

export default SignUpNavigator;

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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VictoryMainFeed from "../screens/VictoryMainFeed";
import CreateVictoryHeader from "../components/CreateVictoryHeader";
import CreateVictory from "../screens/CreateVictory";
import { Chat } from "../screens/Chat";

interface MainNavigatorProps {
  user: User;
}

type MainParamList = {
  Profile: undefined;
  VictoryMainFeed: undefined;
  CreateVictory: undefined;
  Chat: undefined;
};

type FeedParamList = {
  VictoryMainFeed: undefined;
  CreateVictory: undefined;
};

type ChatParamList = {
  Chat: undefined;
};

const FeedStack = createStackNavigator<FeedParamList>();
const ChatStack = createStackNavigator<ChatParamList>();
const MainTabs = createBottomTabNavigator<MainParamList>();

export const TabNavigator = (props) => {
  const { user } = props;
  return (
    <MainTabs.Navigator
      initialRouteName="VictoryMainFeed"
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "grey",
        headerShown: false,
      }}
    >
      <MainTabs.Screen name="VictoryMainFeed" component={FeedNavigator} />
      <MainTabs.Screen name="Chat" component={ChatNavigator} />

      <MainTabs.Screen
        name="Profile"
        options={{
          headerShown: true,
        }}
        component={() => <Profile user={user} />}
      />
    </MainTabs.Navigator>
  );
};

export const SignUpNavigator = (props) => {
  const { setUser } = props;
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: Platform.OS === "ios" ? false : true,
      }}
    >
      <Stack.Screen
        name="Login"
        component={() => <Login setUser={setUser} />}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignUpUserInfo" component={SignUpUserInfo} />
    </Stack.Navigator>
  );
};

export const FeedNavigator = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="VictoryMainFeed"
        component={VictoryMainFeed}
        options={{
          headerRight: () => <CreateVictoryHeader />,
        }}
      />
      <FeedStack.Screen name="CreateVictory" component={CreateVictory} />
    </FeedStack.Navigator>
  );
};

export const ChatNavigator = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen name="Chat" component={Chat} options={{}} />
      <ChatStack.Screen name="Chat" component={Chat} />
    </ChatStack.Navigator>
  );
};

export const MainNavigator = (props: MainNavigatorProps) => {
  const { user } = props;

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Main"
        component={() => <TabNavigator user={user} />}
      />
    </Stack.Navigator>
  );
};

export default SignUpNavigator;

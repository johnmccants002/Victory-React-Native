import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/SignUp";
import { SignUpUserInfo } from "../screens/SignUpUserInfo";
import SignInScreen from "../screens/SignInScreen";
import { Platform } from "react-native";
import Profile from "../screens/Profile";
const Stack = createStackNavigator();
import { User } from "../store/userSlice";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import VictoryMainFeed from "../screens/VictoryMainFeed";
import CreateVictoryHeader from "../components/CreateVictoryHeader";
import CreateVictory from "../screens/CreateVictory";
import SlotText from "../components/SlotText";
import { useChatClient } from "../config/useChatClient";
import { OverlayProvider, Chat } from "stream-chat-expo";
import Inbox from "../screens/Inbox";
import ChatScreen from "../screens/Chat";
import { StreamChat } from "stream-chat";
import { chatApiKey } from "../config/chatConfig";

interface MainNavigatorProps {
  user: User;
}

type MainParamList = {
  Profile: undefined;
  VictoryMainFeed: undefined;
  CreateVictory: undefined;
  ChatNavigator: undefined;
};

type FeedParamList = {
  VictoryMainFeed: undefined;
  CreateVictory: undefined;
};

type ChatParamList = {
  Inbox: undefined;
  Chat: undefined;
  Profile: undefined;
};

const FeedStack = createStackNavigator<FeedParamList>();
const ChatStack = createStackNavigator<ChatParamList>();
const MainTabs = createBottomTabNavigator<MainParamList>();

const chatClient = StreamChat.getInstance(chatApiKey);

export const TabNavigator = (props) => {
  const { user } = props;
  const { clientIsReady } = useChatClient();
  if (!clientIsReady) {
    return <Text>Loading chat ...</Text>;
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <MainTabs.Navigator
          initialRouteName="VictoryMainFeed"
          screenOptions={{
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "grey",
            headerShown: false,
          }}
        >
          <MainTabs.Screen name="VictoryMainFeed" component={FeedNavigator} />
          <MainTabs.Screen name="ChatNavigator" component={ChatNavigator} />

          <MainTabs.Screen
            name="Profile"
            options={{
              headerShown: true,
            }}
            component={() => <Profile user={user} />}
          />
        </MainTabs.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export const ChatNavigator = (props) => {
  const navigation = useNavigation();
  return (
    <ChatStack.Navigator initialRouteName="Inbox">
      <ChatStack.Screen
        name={"Inbox"}
        component={() => <Inbox navigation={navigation} />}
      />
      <ChatStack.Screen name={"Chat"} component={() => <ChatScreen />} />
    </ChatStack.Navigator>
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
        component={() => <SignInScreen setUser={setUser} />}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignUpUserInfo" component={SignUpUserInfo} />
    </Stack.Navigator>
  );
};

export const FeedNavigator = () => {
  const [toggleModal, setToggleModal] = useState(false);
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="VictoryMainFeed"
        component={() => (
          <VictoryMainFeed
            toggleModal={toggleModal}
            setToggleModal={setToggleModal}
          />
        )}
        options={{
          headerRight: () => <CreateVictoryHeader />,
          headerLeft: () => (
            <TouchableOpacity onPress={() => setToggleModal(true)}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <SlotText />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <FeedStack.Screen name="CreateVictory" component={CreateVictory} />
    </FeedStack.Navigator>
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

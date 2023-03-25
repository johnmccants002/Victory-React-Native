import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PlatformColor,
} from "react-native";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  getFocusedRouteNameFromRoute,
  useNavigationState,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Sponsors from "../screens/Sponsors";

const CustomHeader = ({ title }) => {
  return (
    <LinearGradient
      colors={["#FF9500", "#5856D6"]}
      style={styles.container}
    ></LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  navBar: {},
});

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
  Sponsors: undefined;
};

type ChatParamList = {
  Inbox: undefined;
  Chat: undefined;
};

const FeedStack = createStackNavigator<FeedParamList>();
const ChatStack = createStackNavigator<ChatParamList>();
const MainTabs = createBottomTabNavigator<MainParamList>();

const chatClient = StreamChat.getInstance(chatApiKey);

const getActiveRoute = (state) => {
  const route = state.routes[state?.index || 0];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRoute(route.state);
  }

  return route;
};

export const TabNavigator = (props) => {
  const { user } = props;
  const { clientIsReady } = useChatClient();
  const navigationState = useNavigationState((state) => state);
  const activeRoute = getActiveRoute(navigationState);
  // let routeName = getFocusedRouteNameFromRoute(activeRoute);
  // if (!clientIsReady) {
  //   return <Text>Loading chat ...</Text>;
  // }

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
          <MainTabs.Screen
            name="VictoryMainFeed"
            component={FeedNavigator}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="alpha-v-circle-outline"
                  size={18}
                />
              ),
            }}
          />

          <MainTabs.Screen
            name="ChatNavigator"
            component={ChatNavigator}
            options={({ route }) => ({
              tabBarStyle: ((route) => {
                // console.log(routeName);
                console.log("This is the route: ", route);
                console.log("This is the active", activeRoute);
                if (activeRoute.name === "Chat") {
                  return { display: "none" };
                }
                return;
              })(route),
              tabBarIcon: () => (
                <MaterialCommunityIcons name="chat-outline" size={18} />
              ),
              tabBarBadge: 2,
            })}
          />

          <MainTabs.Screen
            name="Profile"
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons name="face-man-profile" size={18} />
              ),
            }}
            component={() => <Profile user={user} />}
          />
        </MainTabs.Navigator>
      </Chat>
    </OverlayProvider>
  );
};

export const ChatNavigator = (props) => {
  const { route, navigation } = props;
  return (
    <ChatStack.Navigator
      initialRouteName="Inbox"
      screenOptions={{
        headerBackground: () => <CustomHeader />,
        headerTintColor: "white",
      }}
    >
      <ChatStack.Screen
        name={"Inbox"}
        component={() => <Inbox navigation={navigation} route={route} />}
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
  const [showCreateVictory, setShowCreateVictory] = useState(false);
  const navigation = useNavigation();
  return (
    <FeedStack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackground: () => <CustomHeader title="Victory" />,
        headerTintColor: "white",
      }}
    >
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
          headerShown: true,
          headerTintColor: "white",
          headerTitle: "Victory",
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Sponsors")}>
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
          headerBackground: () => <CustomHeader title="Victory" />,
        }}
      />
      <FeedStack.Screen
        name="CreateVictory"
        component={CreateVictory}
        options={{
          headerShown: true,
          presentation: "transparentModal",
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.goBack}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  size={25}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <FeedStack.Screen
        name="Sponsors"
        component={Sponsors}
        options={{
          headerShown: true,
          presentation: "transparentModal",
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.goBack}>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 20,
                }}
              >
                <MaterialCommunityIcons
                  name="close-circle-outline"
                  size={25}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
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

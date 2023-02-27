import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./src/screens/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { SignUpNavigator, MainNavigator } from "./src/navigation/AppNavigator";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { useState, useEffect } from "react";
import { User } from "./src/store/userSlice";
// import { withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const userInfo = await Auth.currentUserInfo();

    const { email, preferred_username } = userInfo.attributes;
    const { id } = userInfo;
    setUser({
      email: email,
      id: id,
      preferred_username: preferred_username,
    });
  };

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      console.log("THIS IS THE USER USEEFFECT", user);
    }
  }, [user]);
  return (
    <NavigationContainer>
      {user ? <MainNavigator user={user} /> : <SignUpNavigator />}
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

export default App;

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./src/screens/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { SignUpNavigator, MainNavigator } from "./src/navigation/AppNavigator";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { useState, useEffect } from "react";
// import { withAuthenticator } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const userInfo = await Auth.currentUserInfo();
    console.log("userInfo", userInfo);
    console.log(userInfo.attributes, "User Info Attributes");
    setUser(userInfo.attributes);
  };

  useEffect(() => {
    if (!user) {
      getUser();
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

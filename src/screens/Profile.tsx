import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { User } from "../store/userSlice";
import { Victory } from "../models/index";
import { Amplify, Auth, DataStore } from "aws-amplify";
import { Button } from "react-native-paper";

interface ProfileProps {
  user?: User;
}

const Profile = (props: ProfileProps) => {
  const [user, setUser] = useState<User | null>(props.user ? props.user : null);

  console.log(`PROFILE USER: ${JSON.stringify(user)}`);

  const [userVictories, setUserVictories] = useState<Array<Victory>>([]);

  useEffect(() => {
    fetchUserVictories();
  }, []);

  const fetchUserVictories = async () => {
    console.log("THIS IS THE USER", user);
    const userInfo = await Auth.currentUserInfo();
    if (user) {
      const victories = await DataStore.query(Victory, (c) =>
        c.user.eq(userInfo.id)
      );

      console.log("THESE ARE THE VICTORIES: ", victories);
      setUserVictories(victories);
    }
  };

  const logout = async () => {
    try {
      await Auth.signOut();
      // Navigate to your login screen or do any other necessary cleanup
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: user?.photoUrl
            ? user?.photoUrl
            : "https://i.imgur.com/MWTxxA6.jpg",
        }}
        style={styles.photo}
      />
      <Text style={styles.about}>
        Yoooo I'm John McCants and I am currently building this Victory App on
        React Native
      </Text>
      <Text style={styles.name}>{user?.preferred_username}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {userVictories.map((victory) => {
          return <Text style={{ padding: 20 }}>{victory.victoryText}</Text>;
        })}
      </ScrollView>
      <TouchableOpacity onPress={logout}>
        <Text style={{ width: 50, height: 20 }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    padding: 20,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  about: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    color: "#888",
  },
});
export default Profile;

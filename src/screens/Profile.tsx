import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { User } from "../store/userSlice";
import CreateVictory from "./CreateVictory";
import { DataStore } from "aws-amplify";
import { Victory } from "../models/index";
import { Amplify, Auth } from "aws-amplify";

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

      {user && <CreateVictory user={user} />}

      {userVictories.map((victory) => {
        return <Text style={{ padding: 20 }}>{victory.victoryText}</Text>;
      })}
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

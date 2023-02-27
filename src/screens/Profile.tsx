import { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { User } from "../store/userSlice";

interface ProfileProps {
  user?: User;
}

const Profile = (props: ProfileProps) => {
  const [user, setUser] = useState<User | null>(props.user ? props.user : null);

  useEffect(() => {}, []);

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

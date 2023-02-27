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
      <Image source={{ uri: user?.photoUrl }} style={styles.photo} />
      <Text style={styles.about}>{user?.aboutText}</Text>
      <Text style={styles.name}>{user?.preferred_username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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

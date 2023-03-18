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
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.coverPhoto}
          source={{
            uri: "https://www.bootdey.com/image/250x250/9400D3/9400D3",
          }}
        />

        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: user?.photoUrl
                ? user?.photoUrl
                : "https://i.imgur.com/MWTxxA6.jpg",
            }}
            style={styles.profilePhoto}
          />
          <Text style={styles.nameText}>{user?.preferred_username}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.statCount}>1234</Text>
        <Text style={styles.statLabel}>Supporters</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.bioText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
          ullamcorper nisi.
        </Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send Message</Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sponsor</Text>
        </TouchableOpacity> */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {userVictories.map((victory) => {
          return <Text style={{ padding: 20 }}>{victory.victoryText}</Text>;
        })}
      </ScrollView>
      {/* <TouchableOpacity onPress={logout}>
        <Text style={{ width: 50, height: 20 }}>Logout</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    padding: 20,
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 120,
  },
  coverPhoto: {},
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
  headerContainer: {
    alignItems: "center",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: -70,
  },
  profilePhoto: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  bioContainer: {
    padding: 15,
  },
  bioText: {
    fontSize: 16,
    textAlign: "center",
    color: "#A9A9A9",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  statCount: {
    color: "#999",
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 16,
    color: "#999",
    marginLeft: 4,
  },
  button: {
    backgroundColor: "#9400D3",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 20,
    width: 220,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  friendCard: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 2,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendsScroll: {
    paddingBottom: 10,
  },
});
export default Profile;

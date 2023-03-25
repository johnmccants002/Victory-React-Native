import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { User } from "../store/userSlice";
import { Victory } from "../models/index";
import { Amplify, Auth, DataStore } from "aws-amplify";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

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

  const Header = () => {
    return <View style={{ height: 200 }}></View>;
  };

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <ImageBackground
        source={{
          uri: "data:image/jpeg;base64,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",
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.imageContainer}></View>
      </ImageBackground>

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
    borderColor: "black",
    borderWidth: 2,
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },

  imageContainer: {
    width: "50%",
    height: "50%",
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "transparent",
  },

  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
export default Profile;

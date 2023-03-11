import React, { useState, useEffect } from "react";
import { User } from "../store/userSlice";
import { DataStore } from "aws-amplify";
import { Victory } from "../models/index";
import { Amplify, Auth } from "aws-amplify";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export interface CreateVictoryProps {
  user?: User;
}

export interface CurrentUser {
  id: string;
}
const CreateVictory = (props: CreateVictoryProps) => {
  const { user } = props;
  const [currUser, setCurrUser] = useState<CurrentUser | null>(null);
  const [imageUri, setImageUri] = useState(null);

  const getUser = async () => {
    const userInfo = await Auth.currentUserInfo();
    console.log("userInfo", userInfo);
    console.log(userInfo.attributes, "User Info Attributes");
    setCurrUser(userInfo);
  };

  useEffect(() => {
    getUser();
  }, []);

  const [victory, setVictory] = useState<Victory | null>(null);
  const [victoryText, setVictoryText] = useState("");

  const createVictory = async () => {
    if (currUser) {
      try {
        await DataStore.save(
          new Victory({
            user: currUser.id,
            victoryText: victoryText,
            victoryImage: imageUri,
          })
        );
        console.log("Post saved successfully!");
      } catch (error) {
        console.log("Error saving post", error);
      }
    }
  };

  const handleChooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Victory text"
        value={victoryText}
        onChangeText={setVictoryText}
      />
      {imageUri && <Image style={styles.image} source={{ uri: imageUri }} />}
      <Button title="Choose image" onPress={handleChooseImage} />
      <Button title="Create" onPress={createVictory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    width: "80%",
  },
  image: {
    width: "80%",
    height: 80,
    resizeMode: "contain",
    marginBottom: 16,
  },
});

export default CreateVictory;

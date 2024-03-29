import React, { useState, useEffect } from "react";
import {
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  BUCKET_REGION,
  BUCKET_NAME,
} from "@env";
import { User } from "../store/userSlice";
import { DataStore } from "aws-amplify";
import { Victory } from "../models/index";
import { Amplify, Auth } from "aws-amplify";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  const [imgData, setImgData] = useState(null);

  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: BUCKET_REGION,
  });

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
  const navigation = useNavigation();

  // S3 Bucket Upload Function
  const uploadImageToS3 = async () => {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: BUCKET_NAME,
        Key: uuid() + ".jpg",
        Body: imgData,
        ACL: "public-read",
        ContentType: "image/jpeg",
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.log("Error:", err);
          reject(err);
        } else {
          console.log("Upload Success:", data.Location);
          resolve(data.Location);
        }
      });
    });
  };

  // Creating Victory Function
  const createVictory = async () => {
    if (currUser) {
      try {
        const uploadedImageUri = await uploadImageToS3();
        await DataStore.save(
          new Victory({
            user: currUser.id,
            victoryText: victoryText,
            victoryImage: uploadedImageUri,
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

    if (!result.didCancel) {
      setImageUri(result.assets[0].uri);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      setImgData(blob);
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
      <View
        style={{
          flexDirection: "row-reverse",
          width: "100%",
          marginLeft: 20,
        }}
      >
        <TouchableOpacity onPress={handleChooseImage}>
          <MaterialCommunityIcons
            name="image-plus"
            size={50}
            color={"#5856D6"}
          />
        </TouchableOpacity>
      </View>
      {imageUri && <Image style={styles.image} source={{ uri: imageUri }} />}
      <Button title="Create Victory" onPress={createVictory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    padding: 8,
    width: "100%",
    paddingBottom: 100,
  },
  image: {
    width: "80%",
    height: 80,
    resizeMode: "contain",
    marginBottom: 16,
  },
});

export default CreateVictory;

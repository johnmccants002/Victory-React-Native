import React, { useState, useEffect } from "react";
import { User } from "../store/userSlice";
import { DataStore } from "aws-amplify";
import { Victory } from "../models/index";
import { Amplify, Auth } from "aws-amplify";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, Image, StyleSheet } from "react-native";

export interface CreateVictoryProps {
  user?: User;
}

export interface CurrentUser {
  id: string;
}
const CreateVictory = (props: CreateVictoryProps) => {
  const { user } = props;
  const [currUser, setCurrUser] = useState<CurrentUser | null>(null);

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

  const createVictory = async () => {
    if (currUser) {
      try {
        await DataStore.save(
          new Victory({
            user: currUser.id,
            victoryText: "test",
          })
        );
        console.log("Post saved successfully!");
      } catch (error) {
        console.log("Error saving post", error);
      }
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => createVictory()}>
        <Text>Create Victory</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default CreateVictory;

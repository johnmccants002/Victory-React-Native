import React from "react";
import { StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CreateVictoryHeader = (props) => {
  // console.log("~~ Props::: ", props);
  const navigation = useNavigation();
  // console.log("PROFILE HEADER, USER~~~~~~~: ", user);
  // console.log("PROFILE HEADER, Auth~~~~~~~: ", props.auth);
  // console.log("PROFILE HEADER:::: ", user.userId);
  // console.log("PROFILE PROPS NAVIGATION::: ", props.navProps);
  // console.log("PROFILE HEADER NAVIGATION: ", navigation);
  //   const link = props.navigation.navigate("Profile", { userId: user.userId });

  return (
    <TouchableOpacity
      style={[
        styles.profileContainer,
        { paddingLeft: props.paddingLeft },
        { width: props.width, height: props.height },
      ]}
      onPress={() => navigation.navigate("CreateVictory")}
    >
      <MaterialCommunityIcons name="plus" size={24} color="purple" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    marginBottom: 10,
    marginRight: 10,
    marginTop: 10,
  },
});

export default CreateVictoryHeader;

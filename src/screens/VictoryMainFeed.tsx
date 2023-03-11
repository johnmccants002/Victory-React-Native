import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Victory } from "../models/index";
import { DataStore } from "aws-amplify";
import { Skeleton } from "moti/skeleton";
import { Dimensions } from "react-native";
import { data } from "../data/dummyData";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const VictoryMainFeed = () => {
  const [victories, setVictories] = useState<Array<Victory>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const skelData = [1, 2, 3, 4, 5, 6, 7, 8];
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    fetchVictories();

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const fetchVictories = async () => {
    const victories = await DataStore.query(Victory);

    setVictories(victories);
  };

  const replyPress = () => {
    console.log("reply button pressed");
  };

  const renderSkeletonPosts = () => {
    return skelData.map(() => (
      <View style={{ padding: 20 }}>
        <Skeleton
          height={200}
          width={300}
          colorMode={"light"}
          colors={["gainsboro", "lightGray"]}
        />
      </View>
    ));
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          width: screenWidth,
        }}
      >
        {data.map((obj) => (
          <View
            style={{
              // flexDirection: "column",
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              elevation: 3,
              margin: 8,
              padding: 12,
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              width: "90%",
              height: 240,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ height: 40, width: 40 }}
                source={{
                  uri: "https://allworldpm.com/wp-content/uploads/2016/10/230x230-avatar-dummy-profile-pic.jpg",
                }}
              />

              <View style={{ flexDirection: "column" }}>
                <Text>{obj.name}</Text>
                <Text>@{obj.username}</Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "column",
                  width: "auto",
                  height: 150,
                }}
              >
                {obj.postImage && (
                  <View
                    style={{
                      width: "auto",
                      height: 120,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: 100,
                        paddingHorizontal: 8,
                      }}
                      source={{ uri: obj.postImage }}
                    />
                  </View>
                )}
                <Text>{obj.postText}</Text>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.divider}></View>
                </View>
                <TouchableOpacity onPress={replyPress}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 4,
                    }}
                  >
                    <Text>Reply</Text>
                    <MaterialCommunityIcons
                      name={"message-outline"}
                      size={25}
                      color={"grey"}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* {isLoading ? (
          renderSkeletonPosts()
        ) : victories ? (
          <>
            {victories.map((victory) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    padding: 40,
                    borderColor: "gray",
                    borderWidth: 2,
                    margin: 40,
                    width: 300,
                  }}
                >
                  {victory.victoryImage && (
                    <Image
                      style={styles.image}
                      source={{ uri: victory.victoryImage }}
                    />
                  )}

                  <Text>{victory.victoryText}</Text>
                </View>
              );
            })}
          </>
        ) : (
          <Text>Fetching Victories</Text>
        )} */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "80%",
    height: 80,
    resizeMode: "contain",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    width: "95%",
    backgroundColor: "gainsboro",
    marginTop: 8,
  },
});

export default VictoryMainFeed;

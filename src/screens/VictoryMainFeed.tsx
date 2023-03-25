import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Victory } from "../models/index";
import { DataStore } from "aws-amplify";
import { Skeleton } from "moti/skeleton";
import { Dimensions, TouchableOpacity } from "react-native";
import { data } from "../data/dummyData";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SlotText from "../components/SlotText";
import Tokens from "../screens/Tokens";

const width = Dimensions.get("window").width;

interface VictoryMainFeedProps {
  toggleModal: boolean;
  setToggleModal: (value: boolean) => void;
}

export const VictoryMainFeed = (props: VictoryMainFeedProps) => {
  const { toggleModal, setToggleModal } = props;
  const [victories, setVictories] = useState<Array<Victory>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const skelData = [1, 2, 3, 4, 5, 6, 7, 8];
  const screenWidth = Dimensions.get("window").width;

  const replyPress = () => {
    console.log("reply button pressed");
  };

  useEffect(() => {
    fetchVictories();

    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, []);

  const fetchVictories = async () => {
    const victories = await DataStore.query(Victory);

    setVictories(victories);
    // setIsLoading(false);
  };

  const renderSkeletonPosts = () => {
    return skelData.map(() => (
      <View style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.image}>
            <Skeleton
              radius={"square"}
              colorMode={"light"}
              width={40}
              height={40}
            />
          </View>
          <View style={{ flexDirection: "column", marginLeft: 8 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 270,
              }}
            >
              <Skeleton
                colorMode="light"
                radius={"square"}
                height={14}
                width={120}
              />
              <Skeleton
                colorMode="light"
                radius={"square"}
                height={14}
                width={40}
              />
            </View>
            <View style={{ height: 6 }} />

            <Skeleton
              colorMode="light"
              radius={"square"}
              height={14}
              width={100}
            />
          </View>
        </View>

        <View>
          <Skeleton
            radius={"square"}
            colorMode={"light"}
            width={320}
            height={20}
          />
          <View style={{ height: 8 }}></View>
          <Skeleton
            radius={"square"}
            colorMode={"light"}
            width={320}
            height={20}
          />
          <View style={{ height: 8 }}></View>
          <Skeleton
            radius={"square"}
            colorMode={"light"}
            width={320}
            height={20}
          />

          <View style={{ height: 40 }}></View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 320,
            }}
          >
            <Skeleton
              radius={"square"}
              colorMode={"light"}
              width={140}
              height={40}
            />
            <Skeleton
              radius={"square"}
              colorMode={"light"}
              width={140}
              height={40}
            />
          </View>
        </View>
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
      {toggleModal && (
        <Tokens toggleModal={toggleModal} setToggleModal={setToggleModal} />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          width: screenWidth,
        }}
      >
        {isLoading
          ? renderSkeletonPosts()
          : data.map((obj) => (
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
                  height: obj.postImage ? 240 : 120,
                }}
              >
                <MaterialCommunityIcons
                  name="chevron-down"
                  color={"gainsboro"}
                  size={28}
                  style={{ position: "absolute", top: 4, right: 4 }}
                />
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
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: "100%",
                      }}
                    >
                      <TouchableOpacity onPress={replyPress}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: 4,
                          }}
                        >
                          <Text>Respect </Text>
                          <MaterialCommunityIcons
                            name={"thumb-up-outline"}
                            size={25}
                            color={"grey"}
                          />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={replyPress}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: 4,
                          }}
                        >
                          <Text>Reply </Text>
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
              </View>
            ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: 16,
  },
  card: {
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
  },
  divider: {
    height: 1,
    width: "95%",
    backgroundColor: "gainsboro",
    marginTop: 8,
  },
});

export default VictoryMainFeed;

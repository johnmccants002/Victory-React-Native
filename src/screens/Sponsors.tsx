import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Sponsors = () => {
  const redeemTokens = () => {};

  return (
    <ScrollView style={{ overflow: "visible", backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={{ padding: 10, fontWeight: "bold", fontSize: 16 }}>
            March 2023{" "}
          </Text>
          <Text
            style={{
              padding: 10,
              fontWeight: "bold",
              color: "#5856D6",
              fontSize: 48,
            }}
          >
            ¥10,500.75
          </Text>
          <Text style={{ padding: 10, fontWeight: "500", fontSize: 16 }}>
            30 Completed Sponsors
          </Text>
          <TouchableOpacity onPress={redeemTokens}>
            <View style={styles.redeemButtonContainer}>
              <Text style={styles.redeemText}>Redeem $10,500</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.sponsorDataContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.sponsorDataText}> See Sponsor Data </Text>
                <AntDesign
                  name="arrowright"
                  size={16}
                  color={"black"}
                  style={{ marginLeft: 4 }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingVertical: 20,
              paddingHorizontal: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Text style={styles.dayTokenText}>March</Text>
              <Text style={styles.dateText}> 20-26</Text>
            </View>

            <Text style={styles.dayTokenText}>¥400.00</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 20,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.topText}>Completed</Text>
              <Text style={styles.bottomText}>6</Text>
            </View>

            <View style={{ flexDirection: "column" }}>
              <Text style={styles.topText}>Victories</Text>
              <Text style={styles.bottomText}>245</Text>
            </View>

            <View style={{ flexDirection: "column" }}>
              <Text style={styles.topText}>Sponsorees</Text>
              <Text style={styles.bottomText}>5</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: 60,
            paddingHorizontal: 12,
            borderBottomWidth: 0.3,
            borderBottomColor: "gainsboro",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://media.istockphoto.com/id/1338134336/photo/headshot-portrait-african-30s-man-smile-look-at-camera.jpg?b=1&s=170667a&w=0&k=20&c=j-oMdWCMLx5rIx-_W33o3q3aW9CiAWEvv9XrJQ3fTMU=",
              }}
              style={{ width: 30, height: 30, borderRadius: 15 }}
            />
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "black",
                marginLeft: 8,
              }}
            >
              Terry Jones
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "black",
              }}
            >
              ¥100
            </Text>
            <Ionicons
              name="chevron-forward-sharp"
              size={14}
              color={"black"}
              style={{ paddingLeft: 4 }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: 60,
            paddingHorizontal: 12,
            borderBottomWidth: 0.3,
            borderBottomColor: "gainsboro",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: "https://i.imgur.com/hCwHtRcs.png" }}
              style={{ width: 30, height: 30, borderRadius: 15 }}
            />
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "black",
                marginLeft: 8,
              }}
            >
              John McCants
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontWeight: "500",
                fontSize: 14,
                color: "black",
              }}
            >
              ¥300
            </Text>
            <Ionicons
              name="chevron-forward-sharp"
              size={14}
              color={"black"}
              style={{ paddingLeft: 4 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sponsorDataContainer: {
    width: Dimensions.get("window").width,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    marginTop: 50,
    borderTopColor: "gainsboro",
    borderTopWidth: 0.7,
  },
  sponsorDataText: {
    color: "black",
    fontSize: 14,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  topContainer: {
    height: 340,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 3,
    // margin: 8,
    padding: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: "100%",
  },
  bottomContainer: {
    height: 140,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 20,

    width: "100%",
    // padding: 12,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  topLabelContainer: {},
  tokenContainer: {},
  sponsorCountContainer: {},
  redeemButtonContainer: {
    width: 240,
    height: 60,
    backgroundColor: "#5856D6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 10,
  },
  redeemText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  topText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "600",
  },

  dayTokenText: {
    color: "black",
    fontSize: 22,
    fontWeight: "600",
  },
  dateText: {
    color: "gray",
    fontSize: 22,
    fontWeight: "600",
  },
  bottomText: {
    color: "black",
    fontSize: 16,
    fontWeight: "600",
  },
  sponsorsContainer: {},
});

export default Sponsors;

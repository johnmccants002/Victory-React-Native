import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { Victory } from "../models/index";
import { DataStore } from "aws-amplify";
import { Skeleton } from "moti/skeleton";

export const VictoryMainFeed = () => {
  const [victories, setVictories] = useState<Array<Victory>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const skelData = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    fetchVictories();

    setTimeout(() => {
      setIsLoading(true);
    }, 5000);
  }, []);

  const fetchVictories = async () => {
    const victories = await DataStore.query(Victory);

    setVictories(victories);
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {victories ? (
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
                    width: "auto",
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
        )}
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
});

export default VictoryMainFeed;

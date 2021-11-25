import { useRoute } from "@react-navigation/core";
import * as React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { width } from "../constants/Layout";

export default function HomeScreen() {
  const { params }: any = useRoute();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.detailContainer}>
          <View style={styles.playerInfo}>
            <Text style={{ flex: 1 }}>
              {params.item.firstName && params.item.firstName}{" "}
              {params.item.lastName}
            </Text>
            {/* <Text>{params.playerPosition}</Text> */}
            <Text>{params.nameClub}</Text>
            <Image
              source={{ uri: params.uriJersey }}
              style={{ width: 40, height: 40, marginLeft: 20 }}
            />
          </View>
          <View style={styles.stats}>
            <Text style={{ color: Colors.primary }}>
              Note moyenne : {params.item.stats.averageRating.toFixed(2)}
            </Text>

            {params.item.stats.matches.map((match: any) => {
              return (
                <View key={match.date} style={styles.match}>
                  <Text style={{ marginBottom: 20 }}>{match.matchId}</Text>
                  <Text>Score</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Text>Home : {match.home.score}</Text>
                    <Text style={{ marginLeft: 20 }}>
                      Away : {match.away.score}
                    </Text>
                  </View>

                  {match.playerPerformance.minutesPlayed ? (
                    <>
                      <Text>Performance</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text>But : {match.playerPerformance.goals}</Text>
                        <Text style={{ marginHorizontal: 10 }}>
                          Minutes : {match.playerPerformance.minutesPlayed}
                        </Text>
                        <Text>Note : {match.playerPerformance.rating}</Text>
                      </View>
                    </>
                  ) : (
                    <Text>Le joueur n'a pas joué</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  detailContainer: {
    width: width - 30,
    marginVertical: 20,
    // height: height - 100,
    backgroundColor: "white",
    borderRadius: 20,
  },
  playerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  stats: {
    justifyContent: "center",
    alignItems: "center",
  },
  match: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dbdbdb",
    marginVertical: 20,
    padding: 20,
    borderRadius: 20,
  },
});

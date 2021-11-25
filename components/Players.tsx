import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../screens/RootStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Detail"
>;
import { width } from "../constants/Layout";
import { position } from "../constants/Position";

export default function Players({ item, clubs }: any) {
  const navigation = useNavigation<any>();
  const keys = Object.keys(clubs.championshipClubs);
  const club = keys.find((clubId: any) => clubId === item.clubId);
  const nameClub = club && clubs.championshipClubs[club].shortName;
  const uriJersey = club && clubs.championshipClubs[club].defaultJerseyUrl;
  const playerPosition = Object.keys(position).find(
    (key) => position[key] === item.ultraPosition
  );

  return (
    <>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Detail", {
            item: item,
            playerPosition: playerPosition,
            nameClub: nameClub,
            uriJersey: uriJersey,
          })
        }
      >
        <View style={styles.playerCard}>
          <Text style={{ flex: 3 }}>
            {item.firstName && item.firstName} {item.lastName}
          </Text>
          <Text style={{ flex: 1 }}>{playerPosition}</Text>
          <Text style={{ flex: 1 }}>{nameClub}</Text>
          <Image
            source={{ uri: uriJersey }}
            style={{ width: 40, height: 40 }}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  playerCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: width - 50,
    height: 50,
    backgroundColor: "white",
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
});

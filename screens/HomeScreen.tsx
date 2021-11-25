import * as React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  TextInput,
  Platform,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

import Players from "../components/Players";
import Player, { PlayerResponse } from "../interfaces/Player";
import Club from "../interfaces/Club";
import { position } from "../constants/Position";

export default function HomeScreen() {
  const defaultPlayers: PlayerResponse[] = [];
  const [players, setPlayers] =
    React.useState<PlayerResponse[]>(defaultPlayers);
  const [isLoading, setIsLoading]: [boolean, (loading: boolean) => void] =
    React.useState<boolean>(true);
  const [clubs, setClubs] = React.useState<Club[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [newPlayers, setNewPlayers] = React.useState<[]>([]);
  const [selectedPosition, setSelectedPosition] = React.useState<string>("");

  React.useEffect(() => {
    setSearch("");
    const getData = async () => {
      try {
        const playerResponse = await axios.get<PlayerResponse[]>(
          "https://api.mpg.football/api/data/championship-players-pool/1"
        );
        const clubResponse = await axios.get<Club[]>(
          "https://api.mpg.football/api/data/championship-clubs"
        );

        setClubs(clubResponse.data);
        setPlayers(playerResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  React.useEffect(() => {
    // if search on picker - update data
    if (selectedPosition) {
      const playerPosition: number = position[selectedPosition];
      const filter = players.poolPlayers.filter(
        (elem: any) => elem.ultraPosition === playerPosition
      );
      setNewPlayers(filter);
    }
    //if search on input - update data
    if (search) {
      const filter = players.poolPlayers.filter((elem: any) =>
        elem.lastName.toLowerCase().includes(search.toLowerCase())
      );
      setNewPlayers(filter);
    }
  }, [selectedPosition, search]);

  const renderItem: ListRenderItem<Player> = ({ item }) => {
    return <Players item={item} clubs={clubs} />;
  };

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
              paddingBottom: 20,
              borderBottomColor: "#dbdbdb",
              borderBottomWidth: 1,
            }}
          >
            <TextInput
              placeholder='rechercher un joueur'
              value={search}
              onChangeText={handleSearch}
              autoCapitalize='none'
              style={styles.input}
            />
            <Picker
              selectedValue={selectedPosition}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedPosition(itemValue)
              }
              mode='dropdown'
              style={styles.select}
            >
              <Picker.Item label='Gardien' value='G' />
              <Picker.Item label='Lateral' value='L' />
              <Picker.Item label='Milieu Def' value='MD' />
              <Picker.Item label='Milieu Off' value='MO' />
              <Picker.Item label='Attaquant' value='A' />
            </Picker>
          </View>

          <FlatList
            data={search || selectedPosition ? newPlayers : players.poolPlayers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    marginRight: 20,
    width: 200,
    paddingLeft: 20,
  },
  select: {
    backgroundColor: "#dbdbdb",
    width: 150,
    height: 20,
    marginBottom: Platform.OS === "ios" ? 100 : 0,
    borderRadius: 5,
  },
});

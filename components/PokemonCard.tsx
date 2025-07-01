import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface PokemonCardProps {
  id: number;
  name: string;
  imageSource: ImageSourcePropType;
  fished?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  imageSource,
  fished,
}) => {
  const formatId = (id: number): string => {
    return `#${id.toString().padStart(3, "0")}`;
  };

  return (
    <Pressable
      style={[styles.card, { backgroundColor: fished ? "#48D0B0" : "#B0B0B0" }]}
      onPress={() => {
        router.push("/(tabs)/explore");
      }}
    >
      <View style={styles.cardContent}>
        <Text style={styles.pokemonId}>{formatId(id)}</Text>
        <Text style={styles.pokemonName}>{name}</Text>
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.pokemonImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 200,
    borderRadius: 16,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    position: "relative",
  },
  pokemonId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    opacity: 0.6,
    marginBottom: 4,
  },
  pokemonName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
});

export default PokemonCard;

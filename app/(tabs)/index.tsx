import { ScrollView, StyleSheet, Text, View } from "react-native";
import PokemonCard from "../../components/PokemonCard";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PeixeDex</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.cardContainer}>
          <PokemonCard
            id={1}
            name="Surubin"
            imageSource={require("../../assets/tucunare.png")}
          />
          <PokemonCard
            id={2}
            name="Pacu"
            imageSource={require("../../assets/tucunare.png")}
          />
          <PokemonCard
            id={3}
            name="Pintado"
            imageSource={require("../../assets/tucunare.png")}
          />
          <PokemonCard
            id={4}
            name="Tucunaré"
            imageSource={require("../../assets/tucunare.png")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

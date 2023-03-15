import { EcoScore, NovaGroup, NutriScore } from "../constants/Types";
import { Image } from "native-base";
import { StyleSheet } from "react-native";

export function getNutriscoreImage(nutriscore: NutriScore) {
  switch (nutriscore) {
    case "a":
      return (
        <Image
          style={styles.image}
          alt={`Nutriscore A`}
          source={require("../assets/scores/nutriscore/a.png")}
        />
      );
    case "b":
      return (
        <Image
          style={styles.image}
          alt={`Nutriscore B`}
          source={require("../assets/scores/nutriscore/b.png")}
        />
      );
    case "c":
      return (
        <Image
          style={styles.image}
          alt={`Nutriscore C`}
          source={require("../assets/scores/nutriscore/c.png")}
        />
      );
    case "d":
      return (
        <Image
          style={styles.image}
          alt={`Nutriscore D`}
          source={require("../assets/scores/nutriscore/d.png")}
        />
      );
    case "e":
      return (
        <Image
          style={styles.image}
          alt={`Nutriscore E`}
          source={require("../assets/scores/nutriscore/e.png")}
        />
      );
    default:
      return (
        <Image
          style={styles.image}
          alt={`Nutriscore Unknown`}
          source={require("../assets/scores/nutriscore/unknown.png")}
        />
      );
  }
}

export function getEcoScoreImage(ecoscore: EcoScore) {
  switch (ecoscore) {
    case "a":
      return (
        <Image
          style={styles.image}
          alt={`EcoScore A`}
          source={require("../assets/scores/ecoscore/a.png")}
        />
      );
    case "b":
      return (
        <Image
          style={styles.image}
          alt={`EcoScore B`}
          source={require("../assets/scores/ecoscore/b.png")}
        />
      );
    case "c":
      return (
        <Image
          style={styles.image}
          alt={`EcoScore C`}
          source={require("../assets/scores/ecoscore/c.png")}
        />
      );
    case "d":
      return (
        <Image
          style={styles.image}
          alt={`EcoScore D`}
          source={require("../assets/scores/ecoscore/d.png")}
        />
      );
    case "e":
      return (
        <Image
          style={styles.image}
          alt={`EcoScore E`}
          source={require("../assets/scores/ecoscore/e.png")}
        />
      );
    default:
      return (
        <Image
          style={styles.image}
          alt={`EcoScore Unknown`}
          source={require("../assets/scores/ecoscore/unknown.png")}
        />
      );
  }
}

export function getNovaGroupImage(novagroup: NovaGroup) {
  switch (novagroup) {
    case 1:
      return (
        <Image
          style={styles.image}
          alt={`NovaGroup 1`}
          source={require("../assets/scores/novagroup/1.png")}
        />
      );
    case 2:
      return (
        <Image
          style={styles.image}
          alt={`NovaGroup 2`}
          source={require("../assets/scores/novagroup/2.png")}
        />
      );
    case 3:
      return (
        <Image
          style={styles.image}
          alt={`NovaGroup 3`}
          source={require("../assets/scores/novagroup/3.png")}
        />
      );
    case 4:
      return (
        <Image
          style={styles.image}
          alt={`NovaGroup 4`}
          source={require("../assets/scores/novagroup/4.png")}
        />
      );
    default:
      return (
        <Image
          style={styles.image}
          alt={`NovaGroup Unknown`}
          source={require("../assets/scores/novagroup/unknown.png")}
        />
      );
  }
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
});

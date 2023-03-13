import { FlatList, VStack } from "native-base";
import { View, Text } from "./Themed";
import { Image } from "native-base";
import { Linking, StyleSheet } from "react-native";

type FoodBank = {
  name: string;
  url: string;
  image: string;
};

const foodBanks: FoodBank[] = [
  {
    name: "Tavolino Magico",
    url: "https://www.tischlein.ch/it/",
    image:
      "https://assets-global.website-files.com/6073fd5822bcca4be8babaa2/608993d6c3220446ea72ac3a_aaz-partner-tischlein-deck-dich.jpg",
  },
  {
    name: "Thanksgiver",
    url: "https://www.thanksgiver.ch/",
    image:
      "https://static.wixstatic.com/media/1ebe1d_d65b71f7207545a88486fd3646701363~mv2.png/v1/crop/x_0,y_24,w_400,h_347/fill/w_322,h_278,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/1ebe1d_d65b71f7207545a88486fd3646701363~mv2.png",
  },
  {
    name: "Caritas",
    url: "https://www.caritas.ch/",
    image:
      "https://spherestandards.org/wp-content/uploads/caritas-logo-360x360.png",
  },
  {
    name: "Schweizer Tafel",
    url: "https://www.schweizertafel.ch/",
    image: "https://schweizertafel.ch/wp-content/uploads/Logo_klein-2.png",
  },
  {
    name: "HEKS",
    url: "https://www.heks.ch/",
    image: "https://en.heks.ch/themes/beaker/logo-en.png",
  },
  {
    name: "Fondation Partage",
    url: "https://www.partage.ch/en/who-are-we/",
    image:
      "https://etienneetienne.com/wp-content/uploads/2021/09/0c2ada5c-4b07-ea9d-a6a5-f451968becf9.png",
  },
];

// TODO: Fix types
const renderItem = ({ item }: { item: FoodBank }) => {
  return (
    <View style={styles.item}>
      <Image
        size={"sm"}
        borderRadius={10}
        source={{ uri: item.image }}
        alt={`${item.name}'s logo`}
        resizeMode={"contain"}
      />
      <VStack pl={4}>
        <Text style={styles.title}>{item.name}</Text>
        <Text
          onPress={() => {
            Linking.openURL(item.url);
          }}
        >
          {item.url}
        </Text>
      </VStack>
    </View>
  );
};

export default function CHEFoodBanks() {
  return (
    <FlatList
      data={foodBanks.sort((a, b) => a.name.localeCompare(b.name))}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

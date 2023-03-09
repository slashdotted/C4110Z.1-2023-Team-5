import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FlatList } from "react-native";
import { Center } from "native-base";
import { FridgeItem } from "../constants/Types";
import FridgeListItem from "../components/FridgeListItem";
import ItemSheet from "../components/ItemSheet";

export default function FridgeScreen({}: RootTabScreenProps<"Fridge">) {
  const [items, setItems] = useState<FridgeItem[]>(
    [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        product: {
          product_name: "Redbull - Red Bull - 250 ml",
          brands: "Red Bull",
          categories:
            " Beverages, Carbonated drinks, Sodas, Energy drinks, Sweetened beverages, Carbonated Sodas",
          image_url:
            "https://images.openfoodfacts.org/images/products/90162602/front_en.36.400.jpg",
          ingredients_text:
            "water, sucrose, glucose, acidity regulators (sodium citrates, magnesium carbonate), carbon dioxide, acidifier (citric acid), taurine 0,4%, caffeine 0,03%, inositol, vitamins (niacin, pantothenic acid, vitamin b6, vitamin b12), flavourings, colours (caramel, riboflavin) ",
          ecoscore_grade: "unknown" as const,
          nova_group: 4 as const,
          nutriscore_grade: "e" as const,
          nutrient_levels: {
            fat: "fat",
            salt: "salt",
            saturated_fat: "sat fat",
            sugars: "sugars",
          },
        },
        expirationDate: new Date(2023, 3, 2).toISOString(),
      },
      {
        id: "bd7acbea-c1b1-46c2-aed5-3adbb28ba",
        product: {
          product_name: "Oreo - 154g",
          brands: "Oreo, Mondelez",
          categories:
            "Plant-based foods and beverages, Plant-based foods, Snacks, Sweet snacks, Biscuits and cakes, Biscuits, Filled biscuits, Chocolate sandwich cookies",
          image_url:
            "https://images.openfoodfacts.org/images/products/762/230/033/6738/front_en.145.400.jpg",
          ingredients_text:
            "wheat flour, sugar, palm oil, rapeseed oil, low-fat cocoa pulp 4,3%, wheat starch, glucose-fructose syrup, raising agents (ammonium carbonates, potassium carbonates, sodium carbonates), table salt, emulsifier ( soy lecithins), acidity regulator (sodium hydroxide), flavouring ",
          ecoscore_grade: "d" as const,
          nova_group: 4 as const,
          nutriscore_grade: "e" as const,
          nutrient_levels: {
            fat: "fat",
            salt: "salt",
            saturated_fat: "sat fat",
            sugars: "sugars",
          },
        },
        expirationDate: new Date(2023, 2, 15).toISOString(),
      },
      {
        id: "bd7acbea-c1b1-aed5-3ad53abb28ba",
        product: {
          product_name:
            "Biscuits Nutella B-ready x10 gaufrettes fourrés - Ferrero - 220g",
          brands: "Ferrero, Nutella b-ready",
          categories:
            "Snacks, Sweet snacks, Biscuits and cakes, Biscuits, fr:Nutella",
          image_url:
            "https://images.openfoodfacts.org/images/products/800/050/021/7078/front_en.97.400.jpg",
          ingredients_text:
            "chocolate spread with hazelnuts and cocoa for 81,5 % (sugar, palm oil, hazelnuts 13%, skimmed milk powder 8,7%, lean cocoa is 7,4%, emulsifiers : lecithins [soy] , vanillin), wheat flour 16%, yeast of beer, malt extract, salt, skimmed milk powder, emulsifiers : lecithins [soy] , protein, wheat, milk proteins, water ",
          ecoscore_grade: "c" as const,
          nova_group: 4 as const,
          nutriscore_grade: "e" as const,
          nutrient_levels: {
            fat: "fat",
            salt: "salt",
            saturated_fat: "sat fat",
            sugars: "sugars",
          },
        },
        expirationDate: new Date(2023, 2, 12).toISOString(),
      },
    ].sort((a, b) =>
      new Date(a.expirationDate).getTime() >=
      new Date(b.expirationDate).getTime()
        ? 1
        : -1
    )
  );

  const [itemsLongPressed, addItem] = useState<FridgeItem[]>([]);

  const [selectedItem, setSelectedItem] = useState<FridgeItem | null>();

  const renderItem = ({ item }: { item: FridgeItem }) => {
    return (
      <FridgeListItem
        item={item}
        onPress={(item) => {
          setSelectedItem(item);
        }}
        onLongPress={(item) => {
          let index = itemsLongPressed.indexOf(item);
          if (index != -1) {
            addItem((old) => old.filter((i) => i.id != item.id));
          } else {
            addItem((old) => [...old, item]);
          }
        }}
        onDelete={(item) =>
          setItems((prev) => prev.filter((n) => n.id !== item.id))
        }
        selected={itemsLongPressed.includes(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Center>
            <Text>There are no items in your Fridge</Text>
          </Center>
        }
        numColumns={2}
      />
      {selectedItem && (
        <ItemSheet
          product={selectedItem.product}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

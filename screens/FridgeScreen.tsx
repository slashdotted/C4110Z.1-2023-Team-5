import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FlatList } from "react-native";
import { Center } from "native-base";
import { FridgeItem } from "../constants/Types";
import FridgeListItem from "../components/FridgeListItem";

export default function FridgeScreen({}: RootTabScreenProps<"Fridge">) {
  const [items, setItems] = useState<FridgeItem[]>(
    [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        product: {
          product_name: "First Product",
          brands: "Ferrero",
          categories: "Categories",
          image_url: "Img URL",
          ingredients_text: "Ingredients",
          ecoscore_grade: "A" as const,
          nova_group: 1 as const,
          nutriscore_grade: "A" as const,
          nutrient_levels: {
            fat: "fat",
            salt: "salt",
            saturated_fat: "sat fat",
            sugars: "sugars",
          },
        },
        expirationDate: new Date(2023, 3, 2),
      },
      {
        id: "bd7acbea-c1b1-46c2-aed5-3adbb28ba",
        product: {
          product_name: "Second Product",
          brands: "Ferrero",
          categories: "Categories",
          image_url: "Img URL",
          ingredients_text: "Ingredients",
          ecoscore_grade: "A" as const,
          nova_group: 1 as const,
          nutriscore_grade: "A" as const,
          nutrient_levels: {
            fat: "fat",
            salt: "salt",
            saturated_fat: "sat fat",
            sugars: "sugars",
          },
        },
        expirationDate: new Date(2023, 2, 15),
      },
      {
        id: "bd7acbea-c1b1-aed5-3ad53abb28ba",
        product: {
          product_name: "Third Product",
          brands: "Ferrero",
          categories: "Categories",
          image_url: "Img URL",
          ingredients_text: "Ingredients",
          ecoscore_grade: "A" as const,
          nova_group: 1 as const,
          nutriscore_grade: "A" as const,
          nutrient_levels: {
            fat: "fat",
            salt: "salt",
            saturated_fat: "sat fat",
            sugars: "sugars",
          },
        },
        expirationDate: new Date(2023, 2, 12),
      },
    ].sort((a, b) =>
      a.expirationDate.getTime() >= b.expirationDate.getTime() ? 1 : -1
    )
  );

  const renderItem = ({ item }: { item: FridgeItem }) => {
    return (
      <FridgeListItem
        item={item}
        onPress={() => {
          console.log("TODO: show item details");
        }}
        onDelete={(item) =>
          setItems((prev) => prev.filter((n) => n.id !== item.id))
        }
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

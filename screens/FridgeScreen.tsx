import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FlatList } from "react-native";
import { Center } from "native-base";
import { Item } from "../constants/Types";
import FridgeItem from "../components/FridgeItem";

export default function FridgeScreen({}: RootTabScreenProps<"Fridge">) {
  const [items, setItems] = useState<Item[]>(
    [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
        expirationDate: new Date(2023, 3, 2),
        level: 1,
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
        expirationDate: new Date(2023, 3, 2),
        level: 1,
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd9321aa97f63",
        title: "Fourth Item",
        expirationDate: new Date(2023, 3, 4),
        level: 1,
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
        expirationDate: new Date(2023, 3, 3),
        level: 1,
      },
      {
        id: "58694a0f-3da1-471f-bd96-1455as71e29d72",
        title: "Fifth Item",
        expirationDate: new Date(2023, 3, 5),
        level: 1,
      },
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad553abb28ba",
        title: "Sixth Item",
        expirationDate: new Date(2023, 3, 6),
        level: 1,
      },
      {
        id: "58694a0f-3da1-471f-bd96-1453571e29d72",
        title: "Eight Item",
        expirationDate: new Date(2023, 3, 8),
        level: 2,
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd941aa97f63",
        title: "Seventh Item",
        expirationDate: new Date(2023, 3, 7),
        level: 2,
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd29321aa97f63",
        title: "Ninth Item",
        expirationDate: new Date(2023, 3, 10),
        level: 3,
      },
      {
        id: "58694a0f-3da1-471f-bd96-14515as71e29d72",
        title: "Tenth Item",
        expirationDate: new Date(2023, 3, 11),
        level: 3,
      },
    ].sort((a, b) =>
      a.expirationDate.getTime() >= b.expirationDate.getTime() ? 1 : -1
    )
  );

  const renderItem = ({ item }: { item: Item }) => {
    return (
      <FridgeItem
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

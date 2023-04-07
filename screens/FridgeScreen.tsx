import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { FlatList } from "react-native";
import { Center, Fab } from "native-base";
import { FridgeItem } from "../constants/Types";
import FridgeListItem from "../components/FridgeListItem";
import ItemSheet from "../components/ItemSheet";
import RecipeSheet from "../components/RecipeSheet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../storage/store";
import { deleteFridgeItem } from "../storage/reducers/fridgeReducer";
import { useTranslation } from "react-i18next";
import EmptyFridgeScreen from "../components/EmptyFridgeScreen";
import useInternet from "../hooks/useInternet";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function FridgeScreen({}: RootTabScreenProps<"Fridge">) {
  const internet = useInternet();
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.fridge.fridge);

  const [itemsLongPressed, addItem] = useState<FridgeItem[]>([]);

  const [selectedItem, setSelectedItem] = useState<FridgeItem | null>();

  const [showRecipe, setShowRecipe] = useState<boolean>(false);

  const { t } = useTranslation();

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
        onDelete={(item) => {
          dispatch(deleteFridgeItem(item.id));
        }}
        selected={itemsLongPressed.includes(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id + ""}
        ListEmptyComponent={<EmptyFridgeScreen />}
        numColumns={2}
        contentContainerStyle={{ flexGrow: 1 }}
      />
      {selectedItem && (
        <ItemSheet
          product={selectedItem.product}
          onClose={() => setSelectedItem(null)}
          onDeleteItem={(_) => {
            dispatch(deleteFridgeItem(selectedItem.id));
            setSelectedItem(null);
          }}
        />
      )}
      {itemsLongPressed.length > 0 && !showRecipe && (
        <Fab
          style={styles.fab}
          renderInPortal={false}
          position="absolute"
          size="md"
          label={t("Generate recipe") as string}
          right={5}
          bottom={10}
          onPress={() => setShowRecipe(true)}
          icon={
            !internet ? (
              <Feather name="wifi-off" size={24} color="white" />
            ) : (
              <MaterialCommunityIcons name="robot" size={24} color="white" />
            )
          }
          disabled={!internet}
        />
      )}
      {showRecipe && (
        <RecipeSheet
          onClose={() => {
            setShowRecipe(false);
            addItem([]);
          }}
          products={itemsLongPressed}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  fab: {
    backgroundColor: "gray",
  },
});

import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { Ingredient } from "../constants/Types";
import { RootState } from "../storage/store";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { addIngredient } from "../storage/reducers/ingredientsReducer";
import { Center, FlatList } from "native-base";
import { Text, useThemeColor } from "../components/Themed";
import SwipableDeleteButton from "./SwipeableDeleteButton";
import { Swipeable } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

interface IngredientsListItemProp {
  ingredient: Ingredient;
  onDelete: (ingredient: Ingredient) => void;
}

function IngredientsListItem({
  ingredient,
  onDelete,
}: IngredientsListItemProp) {
  return (
    <Swipeable
      containerStyle={styles.listItem}
      renderRightActions={() => (
        <SwipableDeleteButton
          onDelete={() => {
            onDelete(ingredient);
          }}
        />
      )}
    >
      <Text>{ingredient.name}</Text>
    </Swipeable>
  );
}

interface IngredientsListProp {
  defaultIngredients: Array<Ingredient>;
  onChange?: (ingredients: Array<Ingredient>) => void;
}

export default function IngredientsList({
  defaultIngredients,
  onChange,
}: IngredientsListProp) {
  const inputBackgroundColor = useThemeColor(
    { light: "#fff", dark: "#333" },
    "background"
  );

  const [ingredients, setIngredients] =
    useState<Array<Ingredient>>(defaultIngredients);
  const [ingredient, setIngredient] = useState<string>("");
  const storedIngredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    setIngredients(defaultIngredients);

    for (const ingredient of defaultIngredients) {
      if (!storedIngredients.find((i) => i.name == ingredient.name))
        dispatch(addIngredient(ingredient));
    }
  }, [defaultIngredients]);

  const dataSet = storedIngredients.map((ingredient) => {
    return {
      id: ingredient.name,
      title: ingredient.name,
    };
  });

  if (ingredient && !storedIngredients.find((i) => i.name == ingredient))
    dataSet.unshift({
      id: ingredient,
      title: ingredient,
    });

  // sort alphabetically
  dataSet.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  const handleAddIngredient = (item: TAutocompleteDropdownItem) => {
    if (item && item.title && !ingredients.find((i) => i.name == item.title)) {
      setIngredient("");
      const newIngedient = {
        name: item.title || "",
      };

      setIngredients((old) => {
        return [...old, newIngedient];
      });

      dispatch(addIngredient(newIngedient));
      onChange && onChange([...ingredients, newIngedient]);
    }
  };

  const handleDelete = (ingredient: Ingredient) => {
    setIngredients((old) => {
      return old.filter((i) => i.name != ingredient.name);
    });
    onChange && onChange(ingredients.filter((i) => i.name != ingredient.name));
  };

  return (
    <>
      <AutocompleteDropdown
        inputContainerStyle={{
          backgroundColor: inputBackgroundColor,
        }}
        onChangeText={(text) => setIngredient(text)}
        onClear={() => setIngredient("")}
        containerStyle={styles.input}
        dataSet={dataSet}
        onSelectItem={handleAddIngredient}
        clearOnFocus={true}
        textInputProps={{
          placeholder: t("Add ingredient") as string,
        }}
      />
      <FlatList
        style={styles.list}
        data={ingredients.sort((a, b) => {
          return a.name.localeCompare(b.name);
        })}
        renderItem={({ item }) => (
          <IngredientsListItem onDelete={handleDelete} ingredient={item} />
        )}
        ListEmptyComponent={() => (
          <Center mt={3}>
            <Text>{t("No ingredients added yet")}</Text>
          </Center>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
  },
  list: {
    width: "100%",
  },
  listItem: {
    padding: 10,
    fontSize: 18,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

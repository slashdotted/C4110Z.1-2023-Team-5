import {
  View,
  Container,
  Image,
  Box,
  Center,
  VStack,
  Button,
  HStack,
  Input,
  Pressable,
} from "native-base";
import { ScannerStackScreenProps } from "../types";
import { Platform, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../storage/store";
import { EcoScore, NovaGroup, NutriScore, Product } from "../constants/Types";
import { Text } from "../components/Themed";
import ScoreSlider from "../components/ScoreSlider";
import {
  getEcoScoreImage,
  getNovaGroupImage,
  getNutriscoreImage,
} from "../utils/scoreImages";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { addProduct } from "../storage/reducers/productsReducer";
import IngredientsList from "../components/IngredientsList";
import { addFridgeItem } from "../storage/reducers/fridgeReducer";
import DatePicker from "../components/DatePicker";

const nutriScoreGrades = ["unknown", "a", "b", "c", "d", "e"];
const ecoScoreGrades = ["unknown", "a", "b", "c", "d", "e"];
const novaGroupGrades = ["unknown", 1, 2, 3, 4];

export default function AddProductScreen({
  navigation,
}: ScannerStackScreenProps<"AddProduct">) {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [productName, setProductName] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [expiryDate, setExpiryDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dataSet = products.map((product) => {
    return {
      id: product.barcode,
      title: product.product_name,
      product,
    };
  });

  if (productName.length > 0)
    dataSet.unshift({
      id: "new",
      title: productName,
      product: undefined as any,
    });

  const handleAddToFridge = () => {
    if (!selectedProduct || !expiryDate) return;

    dispatch(addProduct(selectedProduct));
    dispatch(
      addFridgeItem({
        id: -1,
        product: selectedProduct,
        expirationDate: expiryDate.toISOString(),
      })
    );

    navigation.goBack();
  };

  const defaultIngredients = useMemo(() => {
    if (!selectedProduct || !selectedProduct.ingredients_text) return [];
    return selectedProduct.ingredients_text.split(",").map((i) => ({
      name: i.trim(),
    }));
  }, [selectedProduct]);

  return (
    <View style={styles.view}>
      <Container size={"lg"} marginX={"auto"} style={styles.container} flex={1}>
        <Center width={"100%"}>
          {selectedProduct ? (
            <Image
              height={120}
              width={"100%"}
              resizeMode={"contain"}
              source={{
                uri: selectedProduct.image_url,
              }}
              alt={selectedProduct.product_name + " image"}
            />
          ) : (
            <Box
              height={120}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              backgroundColor={"gray.200"}
            >
              <Text>Click to add product image</Text>
            </Box>
          )}
        </Center>
        <AutocompleteDropdown
          onClear={() => {
            setSelectedProduct(null);
            setProductName("");
          }}
          onChangeText={(text) => setProductName(text)}
          onSelectItem={(item?) => {
            let selected = item as TAutocompleteDropdownItem & {
              product: Product;
            };

            if (selected && selected.product) {
              setSelectedProduct(selected.product);
            }
          }}
          dataSet={dataSet}
          containerStyle={styles.productName}
        />
        <ScoreSlider
          initial={
            nutriScoreGrades.indexOf(
              selectedProduct?.nutriscore_grade || "unknown"
            ) || 0
          }
          viewBox="0 0 240 130"
          images={nutriScoreGrades.map((i) =>
            getNutriscoreImage(i as NutriScore)
          )}
          onChange={(index) => {
            if (selectedProduct) {
              setSelectedProduct((old) => {
                if (!old) return null;
                return {
                  ...old,
                  nutriscore_grade: nutriScoreGrades[index] as NutriScore,
                };
              });
            }
          }}
        />
        <ScoreSlider
          initial={
            ecoScoreGrades.indexOf(
              selectedProduct?.ecoscore_grade || "unknown"
            ) || 0
          }
          viewBox="0 0 240 130"
          images={ecoScoreGrades.map((i) => getEcoScoreImage(i as EcoScore))}
          onChange={(index) => {
            if (selectedProduct) {
              setSelectedProduct((old) => {
                if (!old) return null;
                return {
                  ...old,
                  ecoscore_grade: ecoScoreGrades[index] as EcoScore,
                };
              });
            }
          }}
        />
        <ScoreSlider
          initial={
            novaGroupGrades.indexOf(selectedProduct?.nova_group || "unknown") ||
            0
          }
          viewBox="0 0 68 130"
          images={novaGroupGrades.map((i) => getNovaGroupImage(i as NovaGroup))}
          onChange={(index) => {
            if (selectedProduct) {
              setSelectedProduct((old) => {
                if (!old) return null;
                return {
                  ...old,
                  nova_group: novaGroupGrades[index] as NovaGroup,
                };
              });
            }
          }}
        />

        <IngredientsList
          defaultIngredients={defaultIngredients}
          onChange={(ingredients) => {
            if (selectedProduct) {
              setSelectedProduct((old) => {
                if (!old) return null;
                return {
                  ...old,
                  ingredients_text: ingredients.map((i) => i.name).join(", "),
                };
              });
            }
          }}
        />

        <Center w={"full"}>
          <HStack alignItems={"center"}>
            <Text
              style={{
                fontSize: 18,
              }}
            >
              Best before:
            </Text>
            <DatePicker value={expiryDate} onDateChange={setExpiryDate} />
          </HStack>
          <Button mt={2} onPress={handleAddToFridge}>
            Add to fridge
          </Button>
        </Center>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  productName: {
    width: "100%",
    marginVertical: 10,
  },
  view: {
    backgroundColor: "white",
    flex: 1,
  },
});

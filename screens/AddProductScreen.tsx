import { View, Container, Image, Box, Center, HStack } from "native-base";
import { ScannerStackScreenProps } from "../types";
import { StyleSheet } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import React, { useState } from "react";
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

const nutriScoreGrades = ["unknown", "a", "b", "c", "d", "e"];
const ecoScoreGrades = ["unknown", "a", "b", "c", "d", "e"];
const novaGroupGrades = ["unknown", 1, 2, 3, 4];

export default function AddProductScreen({
  navigation,
}: ScannerStackScreenProps<"AddProduct">) {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const dataSet = products.map((product) => {
    return {
      id: product.barcode,
      title: product.product_name,
      product,
    };
  });

  return (
    <View style={styles.view}>
      <Container size={"lg"} marginX={"auto"} style={styles.container}>
        <Center width={"100%"}>
          {selectedProduct ? (
            <Image
              height={150}
              width={"100%"}
              resizeMode={"contain"}
              source={{
                uri: selectedProduct.image_url,
              }}
              alt={selectedProduct.product_name + " image"}
            />
          ) : (
            <Box
              height={150}
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
          onClear={() => setSelectedProduct(null)}
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
        />
        <ScoreSlider
          initial={
            ecoScoreGrades.indexOf(
              selectedProduct?.ecoscore_grade || "unknown"
            ) || 0
          }
          viewBox="0 0 240 130"
          images={ecoScoreGrades.map((i) => getEcoScoreImage(i as EcoScore))}
        />
        <ScoreSlider
          initial={
            novaGroupGrades.indexOf(selectedProduct?.nova_group || "unknown") ||
            0
          }
          viewBox="0 0 68 130"
          images={novaGroupGrades.map((i) => getNovaGroupImage(i as NovaGroup))}
        />
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

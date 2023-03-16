import {
  View,
  Container,
  Image,
  Box,
  Center,
  VStack,
  Button,
} from "native-base";
import { ScannerStackScreenProps } from "../types";
import { StyleSheet } from "react-native";
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
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { addProduct } from "../storage/reducers/productsReducer";

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
    if (!selectedProduct) return;
    console.log("selectedProduct", selectedProduct);
    dispatch(addProduct(selectedProduct));
  };

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

        <VStack
          alignItems={"center"}
          position={"absolute"}
          bottom={5}
          justifyContent={"center"}
          width={"100%"}
        >
          <Text
            style={{
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            Best before
          </Text>
          <RNDateTimePicker value={new Date()} mode="date" display="default" />
          <Button marginTop={3} onPress={handleAddToFridge}>
            Add to the fridge
          </Button>
        </VStack>
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

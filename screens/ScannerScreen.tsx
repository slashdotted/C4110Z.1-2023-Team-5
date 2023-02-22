import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Image,
  Spacer,
  VStack,
} from "native-base";
import { OpenFoodFactsApi } from "openfoodfac-ts";
import { Product } from "openfoodfac-ts/dist/OpenFoodFactsApi/types";
import React, { useState, useEffect } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { SvgUri } from "react-native-svg";

const openFoodFactsApi = new OpenFoodFactsApi();

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<string>("Looking for a barcode...");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);

    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );

    setStatus("Searching for product...");

    openFoodFactsApi
      .findProductByBarcode(data)
      .then((product) => {
        setStatus("Product found!");
        setProduct(product);
      })
      .catch((error) => {
        setStatus("Product not found!");
        console.error(error);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!product && (
        <Button
          style={{
            position: "absolute",
            bottom: 30,
            zIndex: 1,
          }}
          onPress={() => {
            // TODO: Add manual product
          }}
        >
          Add manually
        </Button>
      )}

      <Text
        style={{
          padding: 5,
        }}
      >
        {status}
      </Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{ width: "100%", height: "100%" }}
      />

      {product && (
        <>
          <BottomSheet
            backgroundStyle={{
              backgroundColor: "rgb(240,240,240)",
            }}
            backdropComponent={(props) => {
              return (
                <BottomSheetBackdrop
                  disappearsOnIndex={-1}
                  {...props}
                  pressBehavior={"close"}
                />
              );
            }}
            enablePanDownToClose={true}
            snapPoints={["65%", "99%"]}
            index={0}
            onClose={() => {
              setScanned(false);
              setProduct(null);
              setStatus("Looking for a barcode...");
            }}
            style={{
              padding: 20,
            }}
          >
            <Center mb={2}>
              <Text style={styles.title}>{product.product_name}</Text>
            </Center>
            <Center
              backgroundColor={"white"}
              borderRadius={20}
              maxHeight={180}
              padding={5}
            >
              <Image
                src={product.image_url}
                alt={product.product_name}
                resizeMode={"contain"}
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </Center>

            <HStack justifyContent={"space-between"} my={3}>
              <SvgUri
                width={100}
                height={60}
                viewBox="0 0 240 130"
                uri={`https://static.openfoodfacts.org/images/attributes/nutriscore-${
                  product.nutriscore_grade || "unknown"
                }.svg`}
              />

              <SvgUri
                width={100}
                height={60}
                viewBox="0 0 240 130"
                uri={`https://static.openfoodfacts.org/images/attributes/ecoscore-${
                  product.ecoscore_grade || "unknown"
                }.svg`}
              />

              <SvgUri
                width={100}
                height={60}
                viewBox="0 0 68 130"
                uri={`https://static.openfoodfacts.org/images/attributes/nova-group-${
                  product.nova_group || "unknown"
                }.svg`}
              />
            </HStack>

            <Text style={styles.title}>Ingredients</Text>
            <Box
              my={2}
              style={{
                flex: 1,
                padding: 10,
                borderRadius: 20,
                marginBottom: 100,
              }}
              backgroundColor={"white"}
            >
              <BottomSheetFlatList
                data={product.ingredients}
                renderItem={({ item }) => (
                  <Text style={styles.ingredient}>{item.text}</Text>
                )}
                keyExtractor={(item) => item.text || ""}
                ListFooterComponent={<View />}
              />
            </Box>
          </BottomSheet>
          <Center
            style={{
              position: "absolute",
              paddingBottom: 20,
              paddingTop: 6,
              bottom: 0,
              backgroundColor: "rgb(240,240,240)",
              width: "100%",
            }}
          >
            <Button>Add to fridge</Button>
          </Center>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  ingredient: {
    fontSize: 18,
    marginVertical: 2,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

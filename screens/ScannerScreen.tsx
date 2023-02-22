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

const openFoodFactsApi = new OpenFoodFactsApi();

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();

    openFoodFactsApi.findProductByBarcode("737628064502").then((product) => {
      setProduct(product);
    });
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

    openFoodFactsApi.findProductByBarcode(data).then((product) => {
      setProduct(product);
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

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {product && (
        <>
          <BottomSheet
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
            }}
            style={{
              padding: 20,
            }}
          >
            <Center>
              <Image
                src={product.image_url}
                alt={product.product_name}
                resizeMode={"contain"}
                size={"xl"}
              />
            </Center>
            <Text style={styles.title}>{product.product_name}</Text>

            <Text style={styles.ingredients}>Ingredients:</Text>
            <BottomSheetFlatList
              data={product.ingredients}
              renderItem={({ item }) => (
                <Text style={styles.ingredients}>{item.text}</Text>
              )}
              keyExtractor={(item) => item.text || ""}
              ListFooterComponentStyle={{
                padding: 30,
              }}
              ListFooterComponent={<View />}
            />
          </BottomSheet>
          <Center
            style={{
              position: "absolute",
              padding: 10,
              bottom: 0,
              backgroundColor: "white",
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
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ingredients: {
    fontSize: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

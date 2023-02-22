import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, HStack, Image, VStack } from "native-base";
import { OpenFoodFactsApi } from "openfoodfac-ts";
import { Product } from "openfoodfac-ts/dist/OpenFoodFactsApi/types";
import React, { useState, useEffect } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

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
        <BottomSheet
          enablePanDownToClose={true}
          snapPoints={["50%", "100%"]}
          index={0}
          onClose={() => {
            setScanned(false);
          }}
        >
          <HStack>
            <Image
              src={product.image_url}
              alt={product.product_name}
              resizeMode={"contain"}
              size={"xl"}
            />
            <VStack>
              <Text style={styles.title}>{product.product_name}</Text>
              {product.ingredients?.map((ingredient) => (
                <Text style={styles.ingredients}>{ingredient.text}</Text>
              ))}
            </VStack>
          </HStack>
        </BottomSheet>
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

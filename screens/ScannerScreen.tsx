import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "native-base";
import { OpenFoodFactsApi } from "openfoodfac-ts";
import React, { useState, useEffect } from "react";
import ItemSheet from "../components/ItemSheet";
import { ScannerStackScreenProps } from "../types";
import { Product } from "../constants/Types";
import FullScreenLoader from "../components/FullScreenLoader";
import { useDispatch } from "react-redux";
import { addProduct } from "../storage/reducers/productsReducer";
import { useTranslation } from "react-i18next";

const openFoodFactsApi = new OpenFoodFactsApi();

export default function ScannerScreen({
  navigation,
}: ScannerStackScreenProps<"Scanner">) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<string>(
    t("Looking for a barcode...") as string
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();

    handleBarCodeScanned({
      type: "EAN_13",
      data: "8076800195057",
    });
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setLoading(true);
    setScanned(true);

    setStatus(t("Searching for product...") as string);

    openFoodFactsApi
      .findProductByBarcode(data)
      .then((product) => {
        setStatus(t("Product found!") as string);
        setProduct(product as Product);
      })
      .catch((error) => {
        setStatus(t("Product not found!") as string);
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (hasPermission === null) {
    return <Text>{t("Requesting camera permissions...")}</Text>;
  }
  if (hasPermission === false) {
    return <Text>{t("No access to camera")}</Text>;
  }

  return (
    <View style={styles.container}>
      {loading && <FullScreenLoader />}

      {!product && (
        <Button
          style={styles.addButton}
          onPress={() =>
            navigation.navigate("AddProduct", { product: undefined })
          }
        >
          {t("Add manually")}
        </Button>
      )}
      <Text style={styles.status}>{status}</Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
      {product && (
        <ItemSheet
          product={product}
          onClose={() => {
            setScanned(false);
            setProduct(null);
            setStatus(t("Looking for a barcode...") as string);
          }}
          onAddItem={(product) => {
            dispatch(addProduct(product));
          }}
          onContinue={() => {
            navigation.navigate("AddProduct", { product });
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scanner: {
    width: "100%",
    height: "100%",
  },
  status: {
    padding: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  addButton: {
    position: "absolute",
    bottom: 25,
    zIndex: 1,
  },
});

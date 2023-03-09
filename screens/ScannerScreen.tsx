import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button } from "native-base";
import { OpenFoodFactsApi } from "openfoodfac-ts";
import React, { useState, useEffect } from "react";
import ItemSheet from "../components/ItemSheet";
import { ScannerStackScreenProps } from "../types";
import { FridgeItem, Product } from "../constants/Types";
import FullScreenLoader from "../components/FullScreenLoader";
import { useDispatch } from "react-redux";
import { addProduct } from "../storage/reducers/productsReducer";

const openFoodFactsApi = new OpenFoodFactsApi();

export default function ScannerScreen({
    navigation,
}: ScannerStackScreenProps<"Scanner">) {
    const dispatch = useDispatch();

    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [scanned, setScanned] = useState<boolean>(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [status, setStatus] = useState<string>("Looking for a barcode...");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();

        handleBarCodeScanned({
            type: "test",
            data: "3017620425035",
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

        console.log(
            `Bar code with type ${type} and data ${data} has been scanned!`
        );

        setStatus("Searching for product...");

        openFoodFactsApi
            .findProductByBarcode(data)
            .then((product) => {
                setStatus("Product found!");
                setProduct(product as Product);
            })
            .catch((error) => {
                setStatus("Product not found!");
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
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
            {loading && <FullScreenLoader />}

            {!product && (
                <Button
                    style={styles.addButton}
                    onPress={() => navigation.navigate("AddProduct")}
                >
                    Add manually
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
                        setStatus("Looking for a barcode...");
                    }}
                    onAddItem={(product) => {
                        dispatch(addProduct(product));
                        console.log("TODO: Add item", product);
                    }}
                    onAddItemManually={() => navigation.navigate("AddProduct")}
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

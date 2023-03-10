import { StyleSheet } from "react-native";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { Center, Image, HStack, Box, Button, View, FlatList } from "native-base";
import { SvgUri } from "react-native-svg";
import { Text } from "./Themed";
import { FridgeItem, Product } from "../constants/Types";

interface ItemSheetProps {
    onClose: () => void;
    products: FridgeItem[];
}

export default function RecipeSheet({ onClose, products }: ItemSheetProps) {
    return (
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
                onClose={onClose}
                style={{
                    padding: 20,
                }}
            >
                {/* TODO : add call to Open AI APIs */}
                <Text style={styles.title}>Selected Products</Text>
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
                    <FlatList 
                        data={products}
                        renderItem={({ item }) => (
                            <Text>{item.product.product_name}</Text>
                        )}
                    />
                </Box>
            </BottomSheet>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: "bold",
    },
    ingredient: {
        fontSize: 18,
        marginVertical: 2,
    },
});

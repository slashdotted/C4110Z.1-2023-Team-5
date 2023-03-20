import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
    Box,
    Button,
    FlatList,
    AlertDialog,
    HStack,
    VStack,
    ScrollView,
} from "native-base";
import { Text } from "./Themed";
import { FridgeItem, Recipe } from "../constants/Types";
import FullScreenLoader from "./FullScreenLoader";
import { SafeAreaView } from "react-native-safe-area-context";

interface ItemSheetProps {
    onClose: () => void;
    products: FridgeItem[];
}

export default function RecipeSheet({ onClose, products }: ItemSheetProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const cancelRef = React.useRef(null);

    useEffect(() => {
        setRecipe({
            title: "Pasta with Tuna Tomato Sauce",
            ingredients: [
                { name: "Pasta", quantity: "250", unit: "grams" },
                { name: "Tomato Sauce", quantity: "1", unit: "can" },
                { name: "Tuna", quantity: "150", unit: "grams" },
                { name: "Olive Oil", quantity: "2", unit: "tablespoons" },
                { name: "Garlic", quantity: "2", unit: "cloves" },
                { name: "Parmesan Cheese", quantity: "1/4", unit: "cup" },
            ],
            steps: [
                {
                    title: "Cook pasta",
                    description:
                        "Bring a large pot of salted water to a boil. Add pasta and cook until al dente. Drain and set aside.",
                },
                {
                    title: "Prepare the sauce",
                    description:
                        "In a large skillet over medium heat, sauté garlic in olive oil for a minute or until fragrant. Add tuna and cook for a minute or until lightly browned. Pour the tomato sauce, stir and let it cook for 3-5 minutes or until heated through.",
                },
                {
                    title: "Combine pasta and sauce",
                    description:
                        "Add cooked pasta to the skillet with the sauce. Toss to combine and let it cook for a minute to let the pasta absorb the sauce. Add parmesan cheese and toss again.",
                },
                {
                    title: "Serve",
                    description: "Garnish with more parmesan cheese and enjoy.",
                },
            ],
            shoppingCart: [],
        });
    }, []);

    if (!recipe) return <FullScreenLoader />;

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
                <Box style={styles.disclaimerBox}>
                    <Button
                        colorScheme="danger"
                        variant={"outline"}
                        size="sm"
                        onPress={() => setIsOpen(!isOpen)}
                    >
                        Disclaimer
                    </Button>

                    <AlertDialog
                        leastDestructiveRef={cancelRef}
                        isOpen={isOpen}
                        onClose={onClose}
                    >
                        <AlertDialog.Content>
                            <AlertDialog.CloseButton />
                            <AlertDialog.Header>Disclaimer</AlertDialog.Header>
                            <AlertDialog.Body>
                                The recipes provided on this website are for
                                informational purposes only and are not
                                guaranteed to be 100% accurate. We do not take
                                responsibility for any errors or omissions in
                                the recipes or for any adverse effects resulting
                                from the use of the recipes provided on this
                                website. It is the responsibility of the user to
                                verify the accuracy of the recipes and to use
                                their own judgment when preparing and consuming
                                any food based on these recipes.
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button
                                    variant="unstyled"
                                    colorScheme="coolGray"
                                    onPress={onClose}
                                    ref={cancelRef}
                                >
                                    Close
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>
                </Box>

                {recipe && (
                    <BottomSheetScrollView style={styles.itemsBox}>
                        <Text style={styles.title}>{recipe.title}</Text>
                      
                        {recipe.ingredients.map((i) => (
                            <HStack style={styles.item}>
                                <Text style={styles.quantity}>
                                    {i.quantity} {i.unit}
                                </Text>
                                <Text style={styles.name}>{i.name}</Text>
                            </HStack>
                        ))}
                        {recipe.steps.map((i) => (
                            <Box style={styles.steps}>
                                <Text style={styles.name}>{i.title}</Text>
                                <Text style={styles.description}>
                                    {" "}
                                    {i.description}{" "}
                                </Text>
                            </Box>
                        ))}
                    </BottomSheetScrollView>
                )}
            </BottomSheet>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 30,
    },
    ingredient: {
        fontSize: 18,
        marginVertical: 2,
    },
    disclaimerBox: {
        alignItems: "center",
    },
    item: {
        marginHorizontal: 30,
        marginVertical: 10,
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
    },
    quantity: {
        width: "40%",
    },
    name: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight: "bold",
    },
    itemsBox: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        marginBottom: 50,
    },
    description: {
        marginLeft: 15,
        marginVertical: 10,
    },
    steps: {
      marginTop: 20
    }
});

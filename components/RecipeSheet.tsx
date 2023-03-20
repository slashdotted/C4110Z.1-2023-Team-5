import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
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
import generateRecipe from "../utils/generateRecipe";

interface ItemSheetProps {
  onClose: () => void;
  products: FridgeItem[];
}

export default function RecipeSheet({ onClose, products }: ItemSheetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const cancelRef = React.useRef(null);

  useEffect(() => {
    generateRecipe(products).then((recipe) => {
      if (!recipe) return onClose();
      setRecipe(recipe);
    });
  }, []);

  if (!recipe) return <FullScreenLoader />;

  return (
    <>
      <BottomSheet
        backgroundStyle={{
          backgroundColor: "white",
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
        {recipe && (
          <BottomSheetScrollView style={styles.itemsBox}>
            <Text style={styles.title}>{recipe.title}</Text>

            {recipe.ingredients.map((i, index) => (
              <HStack style={styles.item} key={index}>
                <Text style={styles.quantity}>
                  {i.quantity} {i.unit}
                </Text>
                <Text style={styles.name}>{i.name}</Text>
              </HStack>
            ))}
            {recipe.steps.map((i, index) => (
              <VStack style={styles.steps} key={index}>
                <Text style={styles.stepTitle}>{i.title}</Text>
                <Text style={styles.description}>
                  {i.description.replace(". ", ".\n")}
                </Text>
              </VStack>
            ))}
          </BottomSheetScrollView>
        )}

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
                The recipes provided on this website are for informational
                purposes only and are not guaranteed to be 100% accurate. We do
                not take responsibility for any errors or omissions in the
                recipes or for any adverse effects resulting from the use of the
                recipes provided on this website. It is the responsibility of
                the user to verify the accuracy of the recipes and to use their
                own judgment when preparing and consuming any food based on
                these recipes.
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
  disclaimerBox: {
    alignItems: "center",
    marginBottom: 30,
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
    marginBottom: 40,
  },
  description: {
    marginLeft: 15,
    marginVertical: 10,
  },
  steps: {
    marginTop: 20,
    borderWidth: 0.4,
    borderRadius: 10,
    borderColor: "lightgray",
    padding: 15,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

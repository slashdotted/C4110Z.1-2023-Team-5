import { StyleSheet } from "react-native";
import React, { useState } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { Box, Button, FlatList, AlertDialog } from "native-base";
import { SvgUri } from "react-native-svg";
import { Text } from "./Themed";
import { FridgeItem, Product } from "../constants/Types";

interface ItemSheetProps {
  onClose: () => void;
  products: FridgeItem[];
}

export default function RecipeSheet({ onClose, products }: ItemSheetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cancelRef = React.useRef(null);

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
            renderItem={({ item }) => <Text>{item.product.product_name}</Text>}
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
  disclaimerBox: {
    alignItems: "center",
    marginBottom: 25,
  },
});

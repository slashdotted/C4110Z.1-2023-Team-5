import { FontAwesome } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { Text } from "./Themed";
import { Pressable, StyleSheet } from "react-native";
import { FridgeItem } from "../constants/Types";
import { FridgeItem } from "../constants/Types";
import SwipableDeleteButton from "./SwipeableDeleteButton";
import expirationLevel from "../utils/expirationLevel";
import { VStack, Image } from "native-base";

type FridgeItemProps = {
  item: FridgeItem;
  onPress: (item: FridgeItem) => void;
  onLongPress: (item: FridgeItem) => void;
  onDelete: (item: FridgeItem) => void;
  selected: boolean;
};

export default function FridgeListItem({
  item,
  onPress,
  onLongPress,
  onDelete,
  selected,
}: FridgeItemProps) {
  let style = {
    borderColor: "#B91C1C",
    backgroundColor: "rgba(185, 28, 28, 0.2)",
  };
  let icon = { name: "exclamation", color: "red" };

  var level = expirationLevel(item);

  if (level == 2) {
    style.borderColor = "#FF9900";
    style.backgroundColor = "rgba(255, 153, 0, 0.2)";
    icon.name = "warning";
    icon.color = "#FF9900";
  } else if (level == 3) {
    style.borderColor = "#15803D";
    style.backgroundColor = "rgba(21, 128, 61, 0.2)";
    icon.name = "check-square-o";
    icon.color = "#15803D";
  }

    return (
        <Swipeable
            containerStyle={{ flex: 1, margin: 5}}
            renderRightActions={() => (
                <SwipableDeleteButton
                    onDelete={() => {
                        onDelete(item);
                    }}
                />
            )}
        >
            <Pressable
                onPress={() => {
                    onPress(item);
                }}
                onLongPress={() => {
                    onLongPress(item);
                }}
                style={[styles.item, style, selected && { opacity: 0.5 }]}
            >
                <VStack space={4} alignItems="center">
                    <Image
                        source={{
                            uri: item.product.image_url,
                        }}
                        alt="Alternate Text"
                        size={"lg"}
                        resizeMode="contain"
                    />
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.title}
                    >
                        {item.product.product_name}
                    </Text>

                    <Text style={styles.expDate}>
                        {item.expirationDate.toLocaleDateString()}
                    </Text>
                </VStack>
            </Pressable>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: "bold",
      },
    item: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        justifyContent: "space-between",
    },
    expDate: {
        alignContent: "flex-end",
    },
});

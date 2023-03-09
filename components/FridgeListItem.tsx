import { FontAwesome } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { Text } from "./Themed";
import { Pressable, StyleSheet } from "react-native";
import { FridgeItem, Item } from "../constants/Types";
import SwipableDeleteButton from "./SwipeableDeleteButton";
import expirationLevel from "../utils/expirationLevel";

type FridgeItemProps = {
  item: FridgeItem;
  onPress: () => void;
  onDelete: (item: FridgeItem) => void;
};

export default function FridgeListItem({
  item,
  onPress,
  onDelete,
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
    <Swipeable containerStyle={{marginVertical: 5, marginHorizontal: 8}}
      renderRightActions={() => (
        <SwipableDeleteButton
          onDelete={() => {
            onDelete(item);
          }}
        />
      )}
    >
      <Pressable onPress={onPress} style={[styles.item, style]}>
        <FontAwesome
          name={icon.name as any}
          size={25}
          color={icon.color}
          style={{ marginRight: 15 }}
        />
        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{item.product.product_name}</Text>
        <Text style={styles.expDate}>
          {item.expirationDate.toLocaleDateString()}
        </Text>
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    width: "70%",
  },
  item: {
    borderWidth: 1,
    padding: 30,
    flex: 1,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  expDate: {
    alignContent: "flex-end",
  },
});
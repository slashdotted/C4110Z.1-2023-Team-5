import { FontAwesome } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { Text } from "../components/Themed";
import { Pressable, StyleSheet } from "react-native";
import { Item } from "../constants/Types";
import SwipableDeleteButton from "./SwipeableDeleteButton";

type FridgeItemProps = {
  item: Item;
  onPress: () => void;
  onDelete: (item: Item) => void;
};

export default function FridgeItem({
  item,
  onPress,
  onDelete,
}: FridgeItemProps) {
  let style = {
    borderColor: "#B91C1C",
  };
  let icon = { name: "exclamation-circle", color: "red" };

  if (item.level == 2) {
    style.borderColor = "#FF9900";
    icon.name = "warning";
    icon.color = "#FF9900";
  } else if (item.level == 3) {
    style.borderColor = "#15803D";
    icon.name = "check-square-o";
    icon.color = "#15803D";
  }

  return (
    <Swipeable
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
        <Text style={styles.title}>{item.title}</Text>
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
  },
  item: {
    borderWidth: 1,
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 4,
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

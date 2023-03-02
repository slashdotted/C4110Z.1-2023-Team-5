import { Button } from "native-base";
import { StyleSheet } from "react-native";

interface SwipableDeleteButtonProps {
  onDelete: () => void;
}

export default function SwipableDeleteButton({
  onDelete,
}: SwipableDeleteButtonProps) {
  return (
    <Button
      backgroundColor={"red.500"}
      style={styles.deleteButton}
      onPress={onDelete}
    >
      Delete
    </Button>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    paddingHorizontal: 3,
    borderRadius: 4,
    marginVertical: 1,
    marginLeft: 2,
  },
});

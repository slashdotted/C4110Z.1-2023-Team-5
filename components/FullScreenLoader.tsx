import { Spinner, View } from "native-base";
import { StyleSheet } from "react-native";

export default function FullScreenLoader() {
  return (
    <View style={[styles.loader, StyleSheet.absoluteFill]}>
      <Spinner size={"lg"} />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 5,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

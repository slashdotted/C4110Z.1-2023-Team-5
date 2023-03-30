import { useNavigation } from "@react-navigation/native";
import { Image, VStack, Button } from "native-base";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";


export default function EmptyFridgeScreen() {
    const navigation = useNavigation();
    const { t } = useTranslation();
    return (
        <VStack style={styles.container}>
            <Image
                source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png",
                }}
                alt="Empty Fridge Screen"
                size="xl"
                style={styles.image}
            />
            <Button
                variant={"outline"}
                colorScheme={"blue"}
                color={"red"}
                onPress={() => {
                    navigation.navigate("ScannerNavigator");
                }}
            >
                {t("Add an item!")}
            </Button>
        </VStack>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        marginBottom: 20
    }
});
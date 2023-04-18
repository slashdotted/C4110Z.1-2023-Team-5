import { Box, Button, HStack, Modal, Select, VStack } from "native-base";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLanguage,
  setMeasurementSystem,
  showOnboarding,
} from "../storage/reducers/settingsReducer";
import { RootState } from "../storage/store";
import { useTranslation } from "react-i18next";

export default function SettingsScreen({
  navigation,
}: RootTabScreenProps<"Settings">) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.settings.language);
  const measurementSystem = useSelector(
    (state: RootState) => state.settings.measurementSystem
  );
  const [isOpen, setIsOpen] = useState(false);

  const wipeAllData = () => {
    dispatch({ type: "RESET" });
    setIsOpen(false);
  };

  const changeLanguage = (value: string) => {
    dispatch(setLanguage(value));
  };

  const changeMeasurementSystem = (value: string) => {
    dispatch(setMeasurementSystem(value));
  };

  return (
    <View style={styles.container}>
      <VStack>
        <HStack style={styles.setting}>
          <Text>{t("Language")}</Text>
          <Box style={styles.select}>
            <Select selectedValue={language} onValueChange={changeLanguage}>
              <Select.Item label="English" value="en" />
              <Select.Item label="Italiano" value="it" />
            </Select>
          </Box>
        </HStack>
        <HStack style={styles.setting}>
          <Text>{t("Measurement system")}</Text>
          <Box style={styles.select}>
            <Select
              selectedValue={measurementSystem}
              onValueChange={changeMeasurementSystem}
            >
              <Select.Item label="Metric" value="metric" />
              <Select.Item label="Imperial" value="imperial" />
            </Select>
          </Box>
        </HStack>
        <Button variant={"ghost"} onPress={() => dispatch(showOnboarding())}>
          {t("Show onboarding screen again")}
        </Button>
      </VStack>

      <Button
        colorScheme={"danger"}
        variant={"subtle"}
        onPress={() => setIsOpen(true)}
      >
        {t("Wipe all data")}
      </Button>

      <Modal isOpen={isOpen}>
        <Modal.Content>
          <Modal.CloseButton onPress={() => setIsOpen(false)} />
          <Modal.Header>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              {t("Wipe all data?")}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>
              {t(
                "This action cannot be undone. All your data will be permanently deleted."
              )}
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group variant="subtle" flex={1}>
              <Button colorScheme="danger" flex={1} onPress={wipeAllData}>
                {t("Confirm")}
              </Button>
              <Button
                colorScheme="blue"
                flex={1}
                onPress={() => setIsOpen(false)}
              >
                {t("Cancel")}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  setting: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  select: {
    width: 150,
  },
});

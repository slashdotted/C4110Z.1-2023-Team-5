import RNDateTimePicker, {
  AndroidNativeProps,
  IOSNativeProps,
  WindowsNativeProps,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";
import { Text } from "./Themed";
import { Pressable } from "native-base";

interface DatePickerProps {
  onDateChange: (date: Date) => void;
}

export default function DatePicker({
  onDateChange,
  ...props
}: (IOSNativeProps | AndroidNativeProps | WindowsNativeProps) &
  DatePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
      {Platform.OS === "android" && (
        <Pressable
          onPress={() => {
            setShowDatePicker(true);
          }}
          backgroundColor={"gray.100"}
          borderRadius={5}
          p={2}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {props.value
              ? props.value.toLocaleDateString()
              : "Click to select date"}
          </Text>
        </Pressable>
      )}

      {(Platform.OS === "ios" || showDatePicker) && (
        <RNDateTimePicker
          {...props}
          onChange={(event, date) => {
            if (date) onDateChange(date);
            setShowDatePicker(false);
          }}
          mode="date"
        />
      )}
    </>
  );
}

import { Box, HStack } from "native-base";
import { Slider } from "@miblanchard/react-native-slider";
import { StyleSheet } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";

interface ScoreSliderProps {
  images: JSX.Element[];
  initial?: number;
  onChange?: (value: number) => void;
  viewBox?: string;
}

export default function ScoreSlider({
  images,
  viewBox,
  initial,
  onChange,
}: ScoreSliderProps) {
  const [value, setValue] = useState<number>(initial || 0);

  useEffect(() => {
    setValue(initial || 0);
  }, [initial]);

  const Image = useCallback(() => {
    return images[value];
  }, [value]);

  return (
    <HStack style={styles.sliderContainer}>
      <Box width={100} height={60}>
        <Image />
      </Box>
      <Slider
        containerStyle={styles.slider}
        value={value}
        onValueChange={(value) => {
          // @ts-ignore
          setValue(value[0]);
          // @ts-ignore
          onChange?.(value[0]);
        }}
        step={1}
        minimumValue={0}
        maximumValue={images.length - 1}
      />
    </HStack>
  );
}

const styles = StyleSheet.create({
  sliderLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  sliderContainer: {
    display: "flex",
    alignItems: "center",
  },
  slider: {
    marginLeft: 10,
    flex: 1,
  },
});

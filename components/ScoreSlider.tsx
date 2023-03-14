import { HStack } from "native-base";
import { Slider } from "@miblanchard/react-native-slider";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { SvgUri } from "react-native-svg";

interface ScoreSliderProps {
  images: string[];
  initial?: number;
  viewBox?: string;
}

export default function ScoreSlider({
  images,
  viewBox,
  initial,
}: ScoreSliderProps) {
  const [value, setValue] = useState<number>(initial || 0);

  useEffect(() => {
    setValue(initial || 0);
  }, [initial]);

  return (
    <HStack style={styles.sliderContainer}>
      <SvgUri
        width={100}
        height={60}
        viewBox={viewBox || "0 0 240 130"}
        uri={images[value]}
      />
      <Slider
        containerStyle={styles.slider}
        value={value}
        onValueChange={(value) => {
          // @ts-ignore
          setValue(value);
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

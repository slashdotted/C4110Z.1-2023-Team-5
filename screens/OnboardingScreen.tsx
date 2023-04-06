import { Image } from "react-native";
import React, { useTransition } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useDispatch } from "react-redux";
import { hideOnboarding } from "../storage/reducers/settingsReducer";
import { useTranslation } from "react-i18next";

export default function OnboardingScreen() {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    return (
        <Onboarding
        onDone={() => dispatch(hideOnboarding())}
        onSkip={() => dispatch(hideOnboarding())}
            pages={[
                {
                    backgroundColor: "#fff",
                    image: <Image source={require("../assets/images/onboarding-first.png")} />,
                    title: t("Add grocery") as string,
                    subtitle: t("Scan food items to add to your fridge") as string,
                },
                {
                    backgroundColor: "#fff",
                    image: <Image source={require("../assets/images/onboarding-second.png")} />,
                    title: t("Your fridge") as string,
                    subtitle: t("See a list of groceries in your fridge ordered by expiration date") as string,
                },
                {
                    backgroundColor: "#fff",
                    image: <Image source={require("../assets/images/onboarding-third.png")} />,
                    title: t("Foodbanks") as string,
                    subtitle: t("Search for foodbanks with the interactive map") as string,
                },
            ]}
        />
    );
}

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL("/")],
  config: {
    screens: {
      ScannerNavigator: {
        screens: {
          AddProduct: {
            screens: {
              AddProductScreen: "addproduct",
            },
          },
          Scanner: {
            screens: {
              ScannerScreen: "scanner",
            },
          },
        },
      },
      Root: {
        screens: {
          Fridge: {
            screens: {
              FridgeScreen: "fridge",
            },
          },
          FoodBanks: {
            screens: {
              FoodBanksScreen: "foodbanks",
            },
          },
          Settings: {
            screens: {
              SettingsScreen: "settings",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};

export default linking;

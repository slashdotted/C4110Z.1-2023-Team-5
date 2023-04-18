/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Product } from "./constants/Types";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  ScannerNavigator: NavigatorScreenParams<ScannerStackParamList> | undefined;
  Notifications: undefined;
  NotFound: undefined;
};

export type ScannerStackParamList = {
  Scanner: undefined;
  AddProduct: {
    product?: Product;
  };
};

export type ScannerStackScreenProps<
  Screen extends keyof ScannerStackParamList
> = NativeStackScreenProps<ScannerStackParamList, Screen>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Fridge: undefined;
  FoodBanks: undefined;
  ScannerNavigator: NavigatorScreenParams<ScannerStackParamList> | undefined;
  Settings: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

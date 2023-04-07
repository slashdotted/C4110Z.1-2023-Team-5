import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import FoodBanksScreen from "../screens/FoodBanksScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import {
  RootStackParamList,
  RootTabParamList,
  ScannerStackParamList,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import ScannerScreen from "../screens/ScannerScreen";
import FridgeScreen from "../screens/FridgeScreen";
import NotificationScreen from "../screens/NotificationsScreen";
import TabBarIcon from "../components/TabBarIcon";
import IconWithBadge from "../components/IconWithBadge";
import AddProductScreen from "../screens/AddProductScreen";
import { RootState } from "../storage/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllNotifications } from "../storage/reducers/notificatonsReducer";
import { useTranslation } from "react-i18next";
import OnboardingScreen from "../screens/OnboardingScreen";
import { useThemeColor } from "../components/Themed";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const showOnboarding = useSelector((state: RootState) => {
    return state.settings.showOnboarding;
  });

  return showOnboarding ? (
    <OnboardingScreen />
  ) : (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const NotificationsIcon = () => {
  const navigation = useNavigation();
  const notifications = useSelector(
    (state: RootState) =>
      state.notifications.notifications.filter((n) => {
        return new Date(n.date).getTime() <= new Date().getTime();
      }).length
  );

  return (
    <IconWithBadge
      onPress={() => navigation.navigate("Notifications")}
      icon={"bell-o"}
      count={notifications}
    />
  );
};

function RootNavigator() {
  const dispatch = useDispatch();
  const trashIconColor = useThemeColor(
    { light: Colors.light.tint, dark: Colors.dark.tint },
    "text"
  );
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          title: t("Notifications") as string,
          headerRight: () => (
            <Pressable onPress={() => dispatch(deleteAllNotifications())}>
              <FontAwesome name="trash" size={24} color={trashIconColor} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: t("Oops!") as string }}
      />
    </Stack.Navigator>
  );
}

const ScannerStack = createNativeStackNavigator<ScannerStackParamList>();
function ScannerNavigator() {
  const { t } = useTranslation();

  return (
    <ScannerStack.Navigator>
      <ScannerStack.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          title: t("Add grocery") as string,
          headerRight: () => <NotificationsIcon />,
        }}
      />
      <ScannerStack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{
          title: t("Add product") as string,
          headerBackTitle: t("Back") as string,
          headerRight: () => <NotificationsIcon />,
        }}
      />
    </ScannerStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <BottomTab.Navigator
      initialRouteName="Fridge"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerRight: () => <NotificationsIcon />,
      }}
    >
      <BottomTab.Screen
        name="Fridge"
        component={FridgeScreen}
        options={{
          title: t("Your fridge") as string,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ScannerNavigator"
        component={ScannerNavigator}
        options={{
          headerShown: false,
          title: t("Add grocery") as string,
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="FoodBanks"
        component={FoodBanksScreen}
        options={{
          title: t("Food banks") as string,
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

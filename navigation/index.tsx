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

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const dispatch = useDispatch();

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
          title: "Notifications",
          headerRight: () => (
            <Pressable onPress={() => dispatch(deleteAllNotifications())}>
              <FontAwesome name="trash" size={24} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

const ScannerStack = createNativeStackNavigator<ScannerStackParamList>();
function ScannerNavigator() {
  return (
    <ScannerStack.Navigator>
      <ScannerStack.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          headerShown: false,
        }}
      />
      <ScannerStack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{
          headerShown: false,
        }}
      />
    </ScannerStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications.length
  );

  return (
    <BottomTab.Navigator
      initialRouteName="Fridge"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerRight: () => (
          <IconWithBadge
            onPress={() => navigation.navigate("Notifications")}
            icon={"bell-o"}
            count={notifications}
          />
        ),
      }}
    >
      <BottomTab.Screen
        name="Fridge"
        component={FridgeScreen}
        options={{
          title: "Your fridge",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ScannerNavigator"
        component={ScannerNavigator}
        options={{
          title: "Add grocery",
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="FoodBanks"
        component={FoodBanksScreen}
        options={{
          title: "Food banks",
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

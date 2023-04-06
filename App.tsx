import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import FullScreenLoader from "./components/FullScreenLoader";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import store, { persistor } from "./storage/store";
import * as Notifications from "expo-notifications";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./translations/en";
import italian from "./translations/it";
import OnboardingScreen from "./screens/OnboardingScreen";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    ...english, ...italian
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NativeBaseProvider>
          <PersistGate loading={<FullScreenLoader />} persistor={persistor}>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </PersistGate>
        </NativeBaseProvider>
      </Provider>
    );
  }
}

import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export default function useInternet() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected ? true : false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isOnline;
}

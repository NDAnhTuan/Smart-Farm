import { NavigationContainer } from "@react-navigation/native";
import { Platform, StyleSheet, Text, View } from "react-native";
import registerNNPushToken from "native-notify";
import MyTabs from "src/MyTabs";
import { config } from "@/config";
import { NotificationProvider } from "@context/NotificationContext";
import { DevicesProvider } from "@context/DevicesContext";
import { SensorsProvider } from "@context/SensorsContext";

export default function App() {
  registerNNPushToken(config.appId, config.appToken);

  return (
    <NavigationContainer>
      <NotificationProvider>
      <DevicesProvider>
          <SensorsProvider>
            <MyTabs />
          </SensorsProvider>
        </DevicesProvider>
      </NotificationProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

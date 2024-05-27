import { NavigationContainer } from "@react-navigation/native";
import { Platform, StyleSheet, Text, View } from "react-native";
import registerNNPushToken from "native-notify";
import MyTabs from "src/MyTabs";
import { config } from "@/config";
import { NotificationProvider } from "@context/NotificationContext";
import { DevicesProvider } from "@context/DevicesContext";
import { SensorsProvider } from "@context/SensorsContext";
import { SettingsProvider } from "@context/SettingsContext";

export default function App() {
  registerNNPushToken(config.appId, config.appToken);

  return (
      <SettingsProvider>
        <NotificationProvider>
          <DevicesProvider>
            <SensorsProvider>
              <NavigationContainer>
                <MyTabs />
              </NavigationContainer>
            </SensorsProvider>
          </DevicesProvider>
        </NotificationProvider>
      </SettingsProvider>
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

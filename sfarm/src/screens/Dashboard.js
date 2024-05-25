import { View, Text } from "react-native";
import React, { useContext } from "react";
import { SettingsContext } from "@context/SettingsContext";

const Dashboard = () => {
  const {limit} = useContext(SettingsContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Temp: {limit.temp}</Text>
      <Text>Humid: {limit.humid}</Text>
      <Text>Bright: {limit.bright}</Text>
    </View>
  );
};

export default Dashboard;

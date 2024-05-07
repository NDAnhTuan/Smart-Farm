import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/Devices/Home";
import OnOffDevices from "@screens/Devices/OnOffDevices";
import SensorDevices from "@screens/Devices/SensorDevices";

const Stack = createNativeStackNavigator();

const Devices = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="OnOffDevices" component={OnOffDevices} />
      <Stack.Screen name="SensorDevices" component={SensorDevices} />
    </Stack.Navigator>
  );
};

export default Devices;

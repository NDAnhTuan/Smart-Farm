import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Devices from "@screens/Devices";
import Notifications from "@screens/Notifications";
import Dashboard from "@screens/Dashboard";
import Setting from "@screens/Setting";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Thiết bị"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Thiết bị"
        component={Devices}
        options={{
          tabBarLabel: "Thiết bị",
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Thông báo"
        component={Notifications}
        options={{
          tabBarLabel: "Thông báo",
          tabBarIcon: ({ color, size }) => (
            <Icon name="bell" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Thống kê"
        component={Dashboard}
        options={{
          tabBarLabel: "Thống kê",
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={Setting}
        options={{
          tabBarLabel:"Cài đặt",
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;

import { View, Dimensions, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "@context/SettingsContext";
import axios from "axios";
import { config } from "@/config";
import { LineChart } from "react-native-gifted-charts";
import { parseISO, format } from "date-fns";
import { BarChart } from "react-native-gifted-charts";
import { PieChart } from "react-native-gifted-charts";
import { ScrollView } from "react-native-gesture-handler";

const Dashboard = () => {
  const data = [{ value: 50 }, { value: 80 }, { value: 90 }, { value: 70 }];
  return (
    <View style={styles.container}>
      <BarChart data={data} />
      <LineChart data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  }
})
export default Dashboard;

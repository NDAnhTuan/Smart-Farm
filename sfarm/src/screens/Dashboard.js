import { config } from "@/config";
import axios, { all } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, Dimensions, Button, StyleSheet, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const Dashboard = () => {
  const [allFeeds, setAllFeeds] = useState([]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    axios
      .get("https://io.adafruit.com//api/v2/tdttvd/feeds", {
        headers: { "X-AIO-Key": config.password },
      })
      .then((response) => {
        data = response.data.map((item) => {
          return { label: item.name, value: item.key };
        });
        setAllFeeds(data);
        setValue(data[0].value);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (value) {
      let inter = setInterval(() => {
        axios
          .get(
            `https://io.adafruit.com/api/v2/tdttvd/feeds/${value}/data/chart?hours=720`,
            {
              headers: { "X-AIO-Key": config.password },
            }
          )
          .then((response) => setRawData(response.data.data))
          .catch((err) => console.error(err));
      }, 1500);
      return () => {
        if (inter) {
          clearInterval(inter);
        }
      };
    }
  }, [value]);

  // State to manage the current view
  const [timeFrame, setTimeFrame] = useState("24h");

  // Function to format the date for labels
  const formatLabel = (dateStr) => {
    const date = new Date(dateStr);
    if (timeFrame === "24h") {
      return `${date.getHours()}:${date.getMinutes()}`;
    } else if (timeFrame === "week" || timeFrame === "month") {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }
  };

  // Filter data based on the selected timeframe
  const filteredData = rawData.filter((item) => {
    const date = new Date(item[0]);
    if (timeFrame === "24h") {
      return date >= new Date(Date.now() - 24 * 60 * 60 * 1000);
    } else if (timeFrame === "week") {
      return date >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeFrame === "month") {
      return date >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }
  });

  const chartData = {
    labels: filteredData.map((item, index) =>
      index % Math.floor(filteredData.length / 5) === 0
        ? formatLabel(item[0])
        : ""
    ),
    datasets: [
      {
        data: filteredData.map((item) => parseFloat(item[1])),
      },
    ],
  };

  const valueData = filteredData.map((item) => Number(item[1]));

  const asc = (arr) => arr.sort((a, b) => a - b);
  const sortedValue = asc(valueData);

  const min = sortedValue.at(0);
  const max = sortedValue.at(-1);

  const sum = (arr) => arr.reduce((acc, item) => acc + Number(item), 0);

  const quantile = (arr, q) => {
    const sorted = asc(arr);
    const pos = (arr.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
      return sorted[base];
    }
  };

  const mean = sum(sortedValue) / sortedValue.length;
  const q1 = quantile(valueData, 0.25);
  const med = quantile(valueData, 0.5);
  const q3 = quantile(valueData, 0.75);

  const roundValue = (value) => Math.round(value * 100) / 100;

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={allFeeds}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color="black"
            name="Safety"
            size={20}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="24h" onPress={() => setTimeFrame("24h")} />
        <Button title="1 tuần" onPress={() => setTimeFrame("week")} />
        <Button title="1 tháng" onPress={() => setTimeFrame("month")} />
      </View>
      {filteredData.length > 0 ? (
        <>
          <LineChart
            data={chartData}
            width={Dimensions.get("window").width * 0.9} // from react-native
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "2",
                strokeWidth: "1",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={styles.graph}
          />
          <View style={styles.stats}>
            <Text style={styles.statsline}>Min: {roundValue(min)}</Text>
            <Text style={styles.statsline}>Max: {roundValue(max)}</Text>
            <Text style={styles.statsline}>Mean: {roundValue(mean)}</Text>
            <Text style={styles.statsline}>Q1: {roundValue(q1)}</Text>
            <Text style={styles.statsline}>Median: {roundValue(med)}</Text>
            <Text style={styles.statsline}>Q3: {roundValue(q3)}</Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  buttonContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  graph: {
    marginTop: 16,
    borderRadius: 8,
  },
  dropdown: {
    width: "80%",
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  stats: {
    marginTop: 8,
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  statsline: {
    fontWeight: "500",
    lineHeight: 20,
  },
});

export default Dashboard;

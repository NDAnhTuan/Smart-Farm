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
      axios
        .get(
          `https://io.adafruit.com/api/v2/tdttvd/feeds/${value}/data/chart?hours=720`,
          {
            headers: { "X-AIO-Key": config.password },
          }
        )
        .then((response) => setRawData(response.data.data))
        .catch((err) => console.error(err));
    }
  }, [value]);

  // const rawData = [
  //   ["2024-05-26T11:40:36Z", "23.0"],
  //   ["2024-05-26T13:37:17Z", "0.0"],
  //   ["2024-05-26T14:01:16Z", "42.0"],
  //   ["2024-05-26T14:46:33Z", "42.0"],
  //   ["2024-05-27T04:10:13Z", "28.42"],
  //   ["2024-05-27T04:10:49Z", "28.49"],
  //   ["2024-05-27T04:11:49Z", "28.4"],
  //   ["2024-05-27T04:12:25Z", "28.46"],
  //   ["2024-05-27T04:13:01Z", "28.38"],
  //   ["2024-05-27T04:13:37Z", "28.25"],
  //   ["2024-05-27T04:14:37Z", "28.04"],
  //   ["2024-05-27T04:15:30Z", "28.1"],
  //   ["2024-05-27T04:16:06Z", "27.96"],
  //   ["2024-05-27T04:17:14Z", "27.99"],
  //   ["2024-05-27T04:17:50Z", "28.01"],
  //   ["2024-05-27T04:18:25Z", "28.1"],
  // ];

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
});

export default Dashboard;

import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SettingsContext } from "@context/SettingsContext";
import { SensorsContext } from "@context/SensorsContext";
import axios from "axios";

const Setting = () => {
  const { limit, setLimit } = useContext(SettingsContext);
  const { devices } = useContext(SensorsContext);

  // useEffect(() => {
  //   let res = [];
  //   devices.forEach((item) => {
  //     res.push({
  //       key: item.key,
  //       name: item.name,
  //       lower: 0,
  //       upper: 100,
  //     });
  //   });
  //   setLimit(res);
  // }, []);

  console.log(limit);
  return (
    <View style={styles.container}>
      {limit.length > 0 ? (
        limit.map((device) => (
          <View key={device.key}>
            <Text style={styles.label}>{device.name}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Giới hạn dưới"
                value={"" + device.lower}
                onChangeText={(value) => {
                  if (value == "") {
                    value = 0;
                  }
                  let newValue = parseFloat(value);
                  limit.forEach((item) => {
                    if (item.key == device.key && newValue > item.upper) {
                      newValue = item.upper;
                    }
                  });

                  setLimit((prev) => {
                    const data = prev.map((item) => {
                      if (item.key == device.key) {
                        item.lower = Number(newValue);
                      }
                      return item;
                    });
                    return data;
                  });
                }}
                onBlur={() => {
                  let lower = 0;
                  limit.some((item) => {
                    if (item.key == device.key) {
                      lower = item.lower;
                      return true;
                    }
                  });

                  axios
                    .patch("http://localhost:8080/api/device/sensor", {
                      key_sensor: device.key,
                      lowerAlert: lower,
                    })
                    .then((res) => console.log(res.data))
                    .catch((err) => console.error(err));
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Giới hạn trên"
                value={"" + device.upper}
                onChangeText={(value) => {
                  if (value == "") {
                    value = 0;
                  }
                  let newValue = parseFloat(value);
                  limit.forEach((item) => {
                    if (item.key == device.key && newValue < item.lower) {
                      newValue = item.lower;
                    }
                  });

                  setLimit((prev) => {
                    const data = prev.map((item) => {
                      if (item.key == device.key) {
                        item.upper = Number(newValue);
                      }
                      return item;
                    });
                    return data;
                  });
                }}
                onBlur={() => {
                  let upper = 0;
                  limit.some((item) => {
                    if (item.key == device.key) {
                      upper = item.upper;
                      return true;
                    }
                  });

                  axios
                    .patch("http://localhost:8080/api/device/sensor", {
                      key_sensor: device.key,
                      upperAlert: upper,
                    })
                    .catch((err) => console.error(err));
                }}
              />
            </View>
          </View>
        ))
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: "500",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    paddingLeft: 16,
    marginVertical: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default Setting;

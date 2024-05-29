import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SettingsContext } from "@context/SettingsContext";
import { SensorsContext } from "@context/SensorsContext";

const Setting = () => {
  const { limit, setLimit } = useContext(SettingsContext);
  const { devices } = useContext(SensorsContext);

  useEffect(() => {
    let res = [];
    devices.forEach((item) => {
      res.push({
        key: item.key,
        name: item.name,
        lower: 0,
        upper: 100,
      });
    });
    setLimit(res);
  }, []);

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
                keyboardType="numeric"
                placeholder="Giới hạn dưới"
                value={"" + device.lower}
                onChangeText={(value) =>
                  setLimit((prev) => {
                    const data = prev.map((item) => {
                      if (item.key == device.key) {
                        item.lower = Number(value);
                      }
                      return item;
                    });
                    return data;
                  })
                }
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Giới hạn trên"
                value={"" + device.upper}
                onChangeText={(value) =>
                  setLimit((prev) => {
                    const data = prev.map((item) => {
                      if (item.key == device.key) {
                        item.upper = Number(value);
                      }
                      return item;
                    });
                    return data;
                  })
                }
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

import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SettingsContext } from "@context/SettingsContext";

const Setting = () => {
  const { limit, setLimit } = useContext(SettingsContext);
  console.log(limit);
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhiệt độ</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={"" + limit.temp}
        onChangeText={(value) => setLimit((prev) => ({ ...prev, temp: value }))}
      />
      <Text style={styles.label}>Độ ẩm</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={"" + limit.humid}
        onChangeText={(value) =>
          setLimit((prev) => ({ ...prev, humid: value }))
        }
      />
      <Text style={styles.label}>Ánh sáng</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={"" + limit.bright}
        onChangeText={(value) =>
          setLimit((prev) => ({ ...prev, bright: value }))
        }
      />
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
  input: {
    padding: 8,
    paddingLeft: 16,
    marginVertical: 8,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default Setting;

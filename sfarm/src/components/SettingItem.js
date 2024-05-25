import React, { useState } from "react";
import { Text, View, SafeAreaView, Image, Switch, StyleSheet, TextInput } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { config } from "@/config";
const SettingItem = ({ type, name, value}) => {
    const [valueName, setvalueName] = useState(value);
    const handleStatusChange = (val) => {
        // client.publish(`${config.userName}/feeds/${device_key}`, `${value[0]}`);
    
        setvalueName(val)
      };
    return (
        <View style={styles.swi_and_sli}>
             <Text>{name}</Text>
             <SafeAreaView style={styles.setting}>
                <TextInput 
                style={styles.input}
                    value={ '' + valueName}
                    onChangeText={handleStatusChange}
                    keyboardType="numeric"
                />
             </SafeAreaView>
        </View>
    );
}
const styles = StyleSheet.create({
    setting: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      width: 80,
    },
    swi_and_sli: {
        // width: 80,
        // display: "flex",
        // flexDirection: "row",
        // justifyContent: "space-between",
        // alignItems: "center",
      },
      input: {
        height: 40,
        width: 160,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });
export default SettingItem
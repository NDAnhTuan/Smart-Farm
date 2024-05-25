import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SettingItem from '@components/SettingItem';
import { getSettingItem, pushsettingItem } from "@utils/SettingItemUtils";

const Setting = () => {
    const [settingItem, setSettingItem] = useState(getSettingItem());

  return (
    <View style={styles.container}>
        {settingItem.map((setting) => (
            <SettingItem
                type = {setting.Type}
                name = {setting.Name}
                value = {setting.Value}
             />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   setting: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
  
});

export default Setting;
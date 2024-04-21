import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons";
const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Settings</Text>
      <View>
        <Text>Dark Mode </Text> 
        <MaterialCommunityIcons name="toggle-switch-off"/>
      </View>
    </View>
  )
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  screenTitle:{
    textAlign: 'center',
    fontSize: 35,
    fontFamily:"BebasNeue-Regular",
    margin:20,
    color:colors.purple,
  }
})
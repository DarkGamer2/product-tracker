import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import React from 'react'

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Settings</Text>
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
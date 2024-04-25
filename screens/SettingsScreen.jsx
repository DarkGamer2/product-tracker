import { StyleSheet, Text, View,Pressable,Alert } from 'react-native';
import { colors } from '../constants/colors';
import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
const SettingsScreen = () => {
const navigation=useNavigation();
const handleLogout = () => {
  const logout = async () => {
    await fetch("http://192.168.100.208:4040/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      navigation.navigate("Login");
    })
    .catch(error => {
      console.error("Logout error:", error);
      // Handle any logout errors here
    });
  };

  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => logout() }
    ],
    { cancelable: false }
  );
};
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Settings</Text>
      <View>
        <Text>Dark Mode <MaterialCommunityIcons name="toggle-switch-off-outline" size={20}/></Text> 
        
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}><MaterialCommunityIcons name="logout" size={20}/>Logout</Text>
        </Pressable>
  
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
  },
  logoutButton:{
    backgroundColor: colors.purple,
    padding: 10,
    width: 160,
    borderRadius: 8,
    marginTop: 25,
  },
  buttonText:{
    textAlign: 'center',
    fontSize: 15,
    color: colors.white,
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 3
  },
  buttonContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
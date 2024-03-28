import { StyleSheet, Text, View, ScrollView, Image, TextInput, Pressable } from 'react-native'
import React, { useState, useCallback } from 'react'
import { colors } from "../constants/colors"
import PTLogo from "../assets/images/ProductTrackerIcon.png"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'

SplashScreen.preventAutoHideAsync()

const LoginScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [buttonText, setButtonText] = useState('Login')
  const navigation = useNavigation()

  const [fontsLoaded, fontError] = useFonts({
    'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Lato-Italic': require('../assets/fonts/Lato-Italic.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null
  }

  const handleLogin = async () => {
    try {
        const response = await fetch(`http://192.168.11.208:4040/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        // Log response status and body
        console.log('Response Status:', response.status);
        const responseBody = await response.text();
        console.log('Response Body:', responseBody);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = JSON.parse(responseBody);

        // Check for error in response data
        if (data.error) {
            // Handle error here
            console.log("Login failed:", data.error);
        } else {
            // Navigate to BottomTabNavigator and pass username as parameter
            navigation.navigate("BottomTabNavigator", { screen: "Home", params: { username: username } });
        }
    } catch (error) {
        console.log('Error:', error);
        // Handle error here
    }
};

    

  // Function to navigate to Register screen
  const handleRegisterNavigation = () => {
    navigation.navigate("Register")
  }

  return (
    <ScrollView contentContainerStyle={loginStyles.container} onLayout={onLayoutRootView}>
      <View style={loginStyles.centered}>
        <Image style={loginStyles.PTLogoStyle} source={PTLogo} />
        <Text style={loginStyles.appTitle}>Product Tracker</Text>
      </View>
      <View style={loginStyles.centered}>
        <Text style={loginStyles.label}>Username: </Text>
        <TextInput
          style={loginStyles.inputField}
          onChangeText={newUsername => setUsername(newUsername)}
          value={username}
        />
        <Text style={loginStyles.label}>Password: </Text>
        <TextInput
          style={loginStyles.inputField}
          onChangeText={newPassword => setPassword(newPassword)}
          value={password}
        />
      </View>
      <View style={loginStyles.centered}>
        <Pressable style={loginStyles.loginButton} onPress={handleLogin}>
          <Text style={loginStyles.loginButtonText}>{buttonText}</Text>
        </Pressable>
      </View>
      <View style={loginStyles.centered}>
        {/* Use the function for onPress event of register button */}
        <Pressable style={loginStyles.registerButton} onPress={handleRegisterNavigation}>
          <Text style={loginStyles.registerButtonText}>Register</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
// }

export default LoginScreen;

const loginStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  centered: {
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 40,
    fontFamily: 'BebasNeue-Regular',
    color: colors.purple,
    marginTop: 35,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: colors.purple,
    padding: 10,
    width: 160,
    borderRadius: 8,
    marginTop: 25,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.white,
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 3
  },
  registerButton: {
    backgroundColor: colors.pink,
    padding: 10,
    width: 160,
    borderRadius: 8,
    marginTop: 25,
  },
  registerButtonText: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.white,
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 3
  },
  inputField: {
    backgroundColor: colors.smokeWhite,
    width: 200,
    marginBottom: 20,
    borderRadius: 8,
    padding: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: "Lato-Italic",
    color: colors.black,
  },
  PTLogoStyle: {
    width: 100,
    height: 100,
    marginTop: 35,
    marginBottom: 10,
  }
})

import { StyleSheet, Text, View, ScrollView, Image, TextInput, Pressable,Modal } from 'react-native'
import React, { useState, useCallback } from 'react'
import { colors } from "../constants/colors"
import PTLogo from "../assets/images/ProductTrackerIcon.png"
import { useFonts } from "expo-font"
import * as SplashScreen from "expo-splash-screen"
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';
SplashScreen.preventAutoHideAsync()

const LoginScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [buttonText, setButtonText] = useState('Register')
  const [email,setEmail]=useState("");
  const [registerSuccessful,setRegisterSuccessful] = useState(true);
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

  

  // Function to navigate to Register screen
  const handleRegister = () => {
    fetch("http://192.168.11.208:4040/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(() => {
        navigation.navigate("BottomTabNavigator");
    })
    .catch(err => console.log(err));
}

const goBack = () => {
  navigation.navigate("Login");
};
  return (
    <ScrollView contentContainerStyle={registerStyles.container} onLayout={onLayoutRootView}>
      <View style={registerStyles.centered}>
        <Image style={registerStyles.PTLogoStyle} source={PTLogo} />
        <Text style={registerStyles.appTitle}>Create your account</Text>
      </View>
      <View style={registerStyles.centered}>
      <Text style={registerStyles.label}>Email: </Text>
        <TextInput
          style={registerStyles.inputField}
          onChangeText={newEmail => setEmail(newEmail)}
          value={email}
        />
        <Text style={registerStyles.label}>Username: </Text>
        <TextInput
          style={registerStyles.inputField}
          onChangeText={newUsername => setUsername(newUsername)}
          value={username}
        />
        <Text style={registerStyles.label}>Password: </Text>
        <TextInput
          style={registerStyles.inputField}
          onChangeText={newPassword => setPassword(newPassword)}
          value={password}
        />
      </View>
      <View style={registerStyles.centered}>
        <Pressable style={registerStyles.loginButton} onPress={handleRegister}>
          <Text style={registerStyles.loginButtonText}>{buttonText}</Text>
        </Pressable>
        <Pressable style={registerStyles.backButton} onPress={goBack}>
          <Text style={registerStyles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>

      
    </ScrollView>
  )
}

export default LoginScreen

const registerStyles = StyleSheet.create({
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
  },
  backButtonText:{
    textAlign: 'center',
    fontSize: 15,
    color: colors.white,
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 3
  },
  backButton: {
    backgroundColor: colors.red,
    padding: 10,
    width: 160,
    borderRadius: 8,
    marginTop: 25,
  }
})

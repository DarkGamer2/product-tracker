import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createStackNavigator} from "@react-navigation/stack"
import LoginScreen from '../screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import AllProductsScreen from "../screens/AllProductsScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
const NavigationBar = () => {
    const Stack=createStackNavigator();
  return (
   <NavigationContainer>
    <Stack.Navigator initialRouteName='Login' screenOptions={ {headerShown:false}}>
    <Stack.Screen name="Login" component={LoginScreen}/>
    <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator}/>
    <Stack.Screen name="All Products" component={AllProductsScreen}/>
    <Stack.Screen name="Register" component={RegisterScreen}/>
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default NavigationBar


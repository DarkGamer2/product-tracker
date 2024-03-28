import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScannerScreen from '../screens/ScannerScreen';
import {colors} from '../constants/colors';
import { fonts } from '../constants/fonts';
const BottomTabNavigator = ({user}) => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.purple,
        
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: navStyles.label,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        user={user}
      />
      <Tab.Screen
        name="Add Product"
        component={AddProductScreen}
        options={{
          tabBarLabel: 'Add Product',
          tabBarLabelStyle: navStyles.label,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="add-circle" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          tabBarLabel: 'Scanner',
          tabBarLabelStyle: navStyles.label,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="qrcode" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarLabelStyle: navStyles.label,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const navStyles = StyleSheet.create({
  label: {
    fontFamily:`Lato-Italic`,
    fontSize: 12,
  },
});
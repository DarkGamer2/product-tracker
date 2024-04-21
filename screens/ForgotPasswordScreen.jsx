import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react';
import { colors } from '../constants/colors';
const ForgotPasswordScreen = () => {
  return (
    <View style={forgotStyles.container}>
     <View>
        <Text style={forgotStyles.forgotPasswordTitle}>Reset Password</Text>
     </View>
     <View>
        <Text style={forgotStyles.label}>New Password</Text>
        <TextInput style={forgotStyles.inputField}/>
        <Text style={forgotStyles.label}>Confirm New Password</Text>
        <TextInput style={forgotStyles.inputField}/>
        <Pressable style={forgotStyles.loginButton}>
          <Text style={forgotStyles.loginButtonText}>Submit</Text>
        </Pressable>
     </View>
    </View>
  )
}

export default ForgotPasswordScreen

const forgotStyles = StyleSheet.create({
    forgotPasswordTitle:{
        fontSize: 40,
    fontFamily: 'BebasNeue-Regular',
    color: colors.purple,
    marginTop: 35,
    marginBottom: 20,
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
      container: {
        flexGrow: 1,
        justifyContent: 'center',
      },
})
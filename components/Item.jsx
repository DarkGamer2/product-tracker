import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from 'react';
const Item = (props) => {
    const [fontsLoaded, fontError] = useFonts({
        'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
        'Lato-Italic': require('../assets/fonts/Lato-Italic.ttf'),
        'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf')
      });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded, fontError]);
    
      if (!fontsLoaded && !fontError) {
        return null;
      }
    
  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
            <Image source={props.image} style={styles.itemImage} />
            <View style={styles.details}>
                <Text style={styles.itemTitle}>{props.title}</Text>
                <Text style={styles.price}>${props.price}</Text>
            </View>
        </View>
  )
}

export default Item

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
      },
      // details: {
      //   flex: 1,
      // },
      itemTitle: {
        fontFamily:"Roboto-Regular",
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
      },
      price: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5,
        fontFamily:"Lato-Italic",
       
      },
})
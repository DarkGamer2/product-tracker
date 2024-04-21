import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Pressable, Modal, Alert, Image } from 'react-native';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { colors } from '../constants/colors';
import { items } from '../data/items';
import Item from '../components/Item';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
SplashScreen.preventAutoHideAsync();

const HomeScreen = ({ route }) => {
  const username = route && route.params && route.params.username;
  const [fontsLoaded, fontError] = useFonts({
    'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
    'Lato-Italic': require('../assets/fonts/Lato-Italic.ttf')
  });

  const [modalVisible, setModalVisible] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const renderModalItem = ({ item }) => (
    <Item title={item.itemName} image={item.itemImage} price={item.price}/>
  );

  return (
    <View onLayout={onLayoutRootView}>
      <Text style={styles.homeScreenText}>Welcome To <Text style={styles.appTitle}>Product Tracker</Text></Text>
      <Text style={styles.homeScreenText}>Hello <Text style={styles.usernameText}>{username}</Text></Text>
      <FlatList
        data={items.slice(0, 3)}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { width: (Dimensions.get('window').width - 20) / 3 }]}>
            <Image source={item.itemImage} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.itemName}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
        horizontal
      />
      <Pressable
        style={styles.viewProductsButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.viewProductsButtonText}>View All Products</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>All Products</Text>
            <FlatList
              data={items}
              renderItem={renderModalItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.modalFlatListContainer}
            />
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}> <MaterialCommunityIcons name="close" size={20}/>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreenText: {
    textAlign: 'center',
    fontSize: 15
  },
  appTitle: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 35,
    fontFamily: 'BebasNeue-Regular',
    color: colors.purple,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  itemName: {
    textAlign: 'center',
  },
  viewProductsButton: {
    backgroundColor: colors.purple,
    padding: 15,
    borderRadius: 10,
    width: 150,
    marginLeft: 100,
    marginTop: 20,
  },
  viewProductsButtonText: {
    color: colors.white,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color:colors.purple
  },
  modalFlatListContainer: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  modalItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  modalItemDetails: {
    flex: 1,
  },
  modalItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalItemPrice: {
    fontSize: 14,
    color: colors.gray,
  },
  buttonClose: {
    backgroundColor: colors.red,
    width: 120,
    alignSelf: 'center',
    marginBottom: 12,
    borderRadius: 8,
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    color: colors.white,
  },
  helloText:{
    textAlign: 'center',
    fontSize: 15,
    color: colors.black,
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 3
  },
  usernameText:{
    color:colors.purple
  }
});

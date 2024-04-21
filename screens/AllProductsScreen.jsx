import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Pressable,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { colors } from "../constants/colors";
import { items } from "../data/items";
import Item from "../components/Item";

SplashScreen.preventAutoHideAsync();

const HomeScreen = () => {
  const [fontsLoaded, fontError] = useFonts({
    "BebasNeue-Regular": require("../assets/fonts/BebasNeue-Regular.ttf"),
    "Lato-Italic": require("../assets/fonts/Lato-Italic.ttf"),
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

  // Slice the data array to extract the first three items
  const firstThreeItems = items.slice(0, 3);

  // Calculate item width based on screen width
  const screenWidth = Dimensions.get("window").width;
  const itemWidth = (screenWidth - 20) / 3; // Assuming 10 pixels margin on both sides

  const renderGridItem = ({ item }) => (
    <View style={[styles.itemContainer, { width: itemWidth }]}>
      <Item title={item.itemName} image={item.itemImage} />
    </View>
  );

  return (
    <View onLayout={onLayoutRootView}>
      <Text style={styles.homeScreenText}>
        Welcome To <Text style={styles.appTitle}>Product Tracker</Text>
      </Text>
      <FlatList
        data={firstThreeItems}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
      <Pressable
        style={styles.viewProductsButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.viewProductsButtonText}>View All Products</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreenText: {
    textAlign: "center",
    fontSize: 15,
  },
  appTitle: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 35,
    fontFamily: "BebasNeue-Regular",
    color: colors.purple,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "30%", // Adjust this percentage according to your preference
    marginBottom: 10,
  },
  viewProductsButton: {
    backgroundColor: colors.purple,
    padding: 15,
    borderRadius: 10,
    width: 150,
    marginLeft: 100,
    marginTop: 20,
    flex: 1, // Add this line
  },
  viewProductsButtonText: {
    color: colors.white,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  itemContainer: {
    marginBottom: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

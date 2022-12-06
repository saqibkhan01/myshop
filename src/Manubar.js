import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const Manubar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={() => navigation.navigate("HomeD")}>
        <Image
          style={styles.imgheight}
          resizeMode="cover"
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Image
          style={styles.imgheight}
          resizeMode="cover"
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/61/61205.png",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity >
        <Image
          style={styles.imgheight}
          resizeMode="cover"
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/1827/1827347.png",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity >
        <Image
          style={styles.imgheight}
          resizeMode="cover"
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  imgheight: {
    height: 30,
    width: 30,
    // tintColor: focused ? '#e32f45' : '#748c94'
  },
});

export default Manubar;

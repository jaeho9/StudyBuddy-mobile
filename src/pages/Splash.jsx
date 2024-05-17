import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";

const studybuddyIcon = require("assets/icons/home/studybuddy.png");

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Onboarding");
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={studybuddyIcon} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default Splash;

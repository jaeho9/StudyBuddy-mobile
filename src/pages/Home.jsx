import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "components/header";

const menuIcon = require("assets/icons/home/menu.png");
const studybuddyIcon = require("assets/icons/home/studybuddy.png");
const alarmOffIcon = require("assets/icons/home/alarm_off.png");
const add = require('../assets/icons/home/add.png');

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        left={menuIcon}
        title={"새 게시물"}
        right={alarmOffIcon}
        rightClick={"Alarm"}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity>
          <Text>Home</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Add')}>
            <Image source={add} style={{ width: 62, height: 62 }} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Home;

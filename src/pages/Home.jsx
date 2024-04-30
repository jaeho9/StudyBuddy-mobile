import React, { useEffect } from "react";
import { View, Image, TouchableOpacity, SafeAreaView, Dimensions } from "react-native";

import Header from '../components/header';

const menuIcon = require("assets/icons/home/menu.png");
const studybuddyIcon = require("assets/icons/home/studybuddy.png");
const alarmOffIcon = require("assets/icons/home/alarm_off.png");
const add = require('../assets/icons/home/add.png');
const search = require('../assets/icons/home/search.png');

const { width, height } = Dimensions.get("window");

const Home = ({ navigation, route }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        left={menuIcon}
        title={"새 게시물"}
        right={alarmOffIcon}
        rightClick={() => navigation.navigate('Alarm')}
        leftClick={"Alarm"}
      />
      <View style={{ flex: 1, alignItems: 'flex-end', margin: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image source={search} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 50, marginRight: 12 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
          <Image source={add} style={{ width: 68, height: 68 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Home;

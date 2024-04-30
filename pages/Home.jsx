import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "components/Header";
import { useNavigation } from "@react-navigation/native";


const menuIcon = require("assets/icons/home/menu.png");
const studybuddyIcon = require("assets/icons/home/studybuddy.png");
const alarmOffIcon = require("assets/icons/home/alarm_off.png");

const Home = ({}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      <Header
        left={menuIcon}
        title={studybuddyIcon}
        right={alarmOffIcon}
        rightClick={"Alarm"}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={()=> navigation.navigate('Community')}>
          <Text style={{fontWeight:"bold", fontSize:24, color:"#777777"}}>커뮤니티 가입하러 가기!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Home;

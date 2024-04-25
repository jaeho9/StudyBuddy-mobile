import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "components/header";

const backIcon = require("assets/icons/home/back.png");
const deleteIcon = require("assets/icons/home/delete.png");

const Alarm = ({}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        left={backIcon}
        title={"알림"}
        right={deleteIcon}
        leftClick={"Home"}
        rightClick={"Alarm"}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Alarm</Text>
      </View>
    </SafeAreaView>
  );
};
export default Alarm;

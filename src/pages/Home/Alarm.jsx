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
      <Header left={backIcon} title={"댓글 수정"} right={"확인"} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>댓글 수정</Text>
      </View>
    </SafeAreaView>
  );
};
export default Alarm;

import React from "react";
import { SafeAreaView } from "react-native";
import Header from "components/Tab/header";

const backIcon = require("assets/icons/home/back.png");

const Camera = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header left={backIcon} title={"카메라"} leftClick={"EditProfile"} />
    </SafeAreaView>
  );
};

export default Camera;

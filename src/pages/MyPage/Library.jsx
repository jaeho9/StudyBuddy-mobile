import React from "react";
import { SafeAreaView } from "react-native";
import Header from "components/header";

const backIcon = require("assets/icons/home/back.png");

const Library = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header left={backIcon} title={"라이브러리"} leftClick={"EditProfile"} />
    </SafeAreaView>
  );
};

export default Library;

import React from "react";
import { SafeAreaView } from "react-native";
// Header
import Header from "components/Tab/Header";
// Images
const backIcon = require("assets/icons/home/back.png");

const Camera = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header left={backIcon} title={"카메라"} leftClick={() => navigation.navigate("EditProfile")} />
        </SafeAreaView>
    );
};

export default Camera;
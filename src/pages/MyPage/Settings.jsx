import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Header from "components/Tab/header";

const backIcon = require("assets/icons/home/back.png");
const phone = require("assets/icons/mypage/SettingsIcon/phone.png");
const message = require("assets/icons/mypage/SettingsIcon/message.png");
const security = require("assets/icons/mypage/SettingsIcon/security.png");
const info = require("assets/icons/mypage/SettingsIcon/info.png");
const arrow = require("assets/icons/mypage/SettingsIcon/arrow.png");

const Settings = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header left={backIcon} title={"Settings"} leftClick={"MyPage"} />

      <View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
        <View style={{ marginTop: 31, marginLeft: 24, marginRight: 24 }}>
          <Text style={styles.support}>Support</Text>
          <View style={styles.MainContainer}>
            <View style={styles.TocContainer}>
              <TouchableOpacity style={styles.TextContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginTop: 2 }}>
                    <Image
                      source={phone}
                      style={{ marginLeft: 17, marginRight: 16 }}
                    />
                  </View>
                  <Text style={styles.text}>문의하기</Text>
                </View>
                <Image
                  source={arrow}
                  style={{ marginTop: 5, marginRight: 13 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.TocContainer}>
              <TouchableOpacity style={styles.TextContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginTop: 2 }}>
                    <Image
                      source={message}
                      style={{ marginLeft: 17, marginRight: 16 }}
                    />
                  </View>
                  <Text style={styles.text}>자주묻는질문</Text>
                </View>
                <Image
                  source={arrow}
                  style={{ marginTop: 5, marginRight: 13 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.TocContainer}>
              <TouchableOpacity style={styles.TextContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginTop: 2 }}>
                    <Image
                      source={security}
                      style={{ marginLeft: 17, marginRight: 16 }}
                    />
                  </View>
                  <Text style={styles.text}>개인정보처리방침</Text>
                </View>
                <Image
                  source={arrow}
                  style={{ marginTop: 5, marginRight: 13 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.TocContainer}>
              <TouchableOpacity style={styles.TextContainer}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginTop: 2 }}>
                    <Image
                      source={info}
                      style={{ marginLeft: 17, marginRight: 16 }}
                    />
                  </View>
                  <Text style={styles.text}>앱정보</Text>
                </View>
                <Image
                  source={arrow}
                  style={{ marginTop: 5, marginRight: 13 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = {
  MainContainer: {
    flexDirection: "coloum",
    justifyContent: "space-between",
    alignItems: "center",
  },
  TocContainer: {
    borderRadius: 12,
    backgroundColor: "#FFF",
    width: "100%",
    height: 37,
    marginBottom: 17,
    justifyContent: "center",
  },
  TextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  support: {
    color: "#818181",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    marginBottom: 17,
  },
  text: {
    color: "#777",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
  },
};

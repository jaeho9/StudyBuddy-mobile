import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Linking,
} from "react-native";
// Header
import Header from "components/Tab/Header";
// Images
const backIcon = require("assets/icons/home/back.png");
const emailIcon = require("assets/icons/signupandlogin/email.png");
const googleIcon = require("assets/icons/signupandlogin/google.png");
const kakaoIcon = require("assets/icons/signupandlogin/kakao.png");
const naverIcon = require("assets/icons/signupandlogin/naver.png");

const Signup2 = ({ navigation }) => {
  const email = () => {
    navigation.navigate("Signup3");
  };
  const google = () => {
    Linking.openURL("https://www.google.com");
  };
  const kakao = () => {
    Linking.openURL("https://www.google.com");
  };
  const naver = () => {
    Linking.openURL("https://www.naver.com");
  };
  const login = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header
        left={backIcon}
        leftClick={() => navigation.navigate("Signup1")}
      />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>스터디버디</Text>
          <Text style={[styles.title, { color: "#ff7474" }]}>가입하기</Text>
          <View style={{ marginTop: 80 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={email}
              activeOpacity={0.5}
            >
              <Image
                source={emailIcon}
                style={{ width: 24, height: 24, marginRight: 250 }}
              />
              <Text style={styles.buttonText}>이메일로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={google}
              activeOpacity={0.5}
            >
              <Image
                source={googleIcon}
                style={{ width: 24, height: 24, marginRight: 250 }}
              />
              <Text style={styles.buttonText}>구글로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={kakao}
              activeOpacity={0.5}
            >
              <Image
                source={kakaoIcon}
                style={{ width: 24, height: 24, marginRight: 250 }}
              />
              <Text style={styles.buttonText}>카카오로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={naver}
              activeOpacity={0.5}
            >
              <Image
                source={naverIcon}
                style={{ width: 24, height: 24, marginRight: 250 }}
              />
              <Text style={styles.buttonText}>네이버로 시작하기</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", margin: 50 }}
        >
          <Text style={{ fontSize: 16, color: "#777777", marginRight: 10 }}>
            이미 계정이 있나요?{" "}
          </Text>
          <TouchableOpacity onPress={login}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#ff7474" }}
            >
              로그인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#777777",
    marginLeft: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 337,
    height: 45,
    borderColor: "#9C9C9C",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777777",
    position: "absolute",
  },
});

export default Signup2;

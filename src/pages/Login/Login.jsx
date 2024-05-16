import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  Image,
  Linking,
} from "react-native";
import Header from "components/Tab/Header";
import { signIn } from "../lib/auth";

const backIcon = require("assets/icons/home/back.png");
const googleIcon = require("assets/icons/signupandlogin/google.png");
const kakaoIcon = require("assets/icons/signupandlogin/kakao.png");
const naverIcon = require("assets/icons/signupandlogin/naver.png");

const DUMMY_EMAIL = "test@example.com";
const DUMMY_PASSWORD = "password123";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");
  const [isCommunityJoined, setIsCommunityJoined] = useState(false);

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const login = async () => {
    if (!email && !password) {
      setErrorMessages("이메일과 비밀번호를 입력하세요.");
    } else if (!email) {
      setErrorMessages("이메일을 입력하세요.");
    } else if (!validateEmail(email)) {
      setErrorMessages("유효한 이메일 주소를 입력하세요.");
    } else if (!password) {
      setErrorMessages("비밀번호를 입력하세요.");
    } else if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      navigation.navigate("Home");
    } else {
      try {
        await signIn({ email, password });
        navigation.navigate("Home");
      } catch (error) {
        Alert.alert("로그인에 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    const checkCommunityJoined = async () => {
      if (email === "wlgud@naver.com") {
        setIsCommunityJoined(true);
      } else {
        setIsCommunityJoined(false);
      }
    };
    checkCommunityJoined();
  }, [email]);

  const findID = () => {
    navigation.navigate("Account");
  };
  const findPW = () => {
    navigation.navigate("Password");
  };
  const goGoogle = () => {
    Linking.openURL("https://www.google.com");
  };
  const goKakao = () => {
    Linking.openURL("https://www.kakao.com");
  };
  const goNaver = () => {
    Linking.openURL("https://www.naver.com");
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header left={backIcon} leftClick={() => navigation.goBack()} />
      <View style={styles.container}>
        <Text style={styles.headerText}>계정</Text>
        {errorMessages ? (
          <Text style={styles.errorText}>{errorMessages}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={login}
          activeOpacity={0.5}
        >
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <View style={styles.linkContainer}>
          <TouchableOpacity onPress={findID}>
            <Text style={styles.linkText}>계정 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={findPW}>
            <Text style={styles.linkText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.separatorText}>또는</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={goGoogle} activeOpacity={0.5}>
            <Image source={googleIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goKakao} activeOpacity={0.5}>
            <Image source={kakaoIcon} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goNaver} activeOpacity={0.5}>
            <Image source={naverIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 16,
    color: "#ff7474",
    fontWeight: "bold",
    marginVertical: 30,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  input: {
    width: 337,
    height: 45,
    borderColor: "#777777",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF7474",
    alignItems: "center",
    justifyContent: "center",
    width: 374,
    height: 60,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  linkContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },
  linkText: {
    fontSize: 16,
    color: "#777777",
    marginHorizontal: 15,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    borderBottomColor: "#777777",
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
  separatorText: {
    fontSize: 16,
    color: "#777777",
    marginHorizontal: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 40,
  },
});

export default Login;

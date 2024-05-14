import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  Dimensions,
} from "react-native";
// Header
import Header from "components/Tab/Header";
// Images
const backIcon = require("assets/icons/home/back.png");
const arrowIcon = require("assets/icons/signupandlogin/arrow.png");

const { width, height } = Dimensions.get("window");

const Signup1 = ({ navigation }) => {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isAgeChecked, setIsAgeChecked] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);

  const handleAgree = () => {
    if (isTermsChecked && isPrivacyChecked) {
      navigation.navigate("Signup2");
    } else {
      Alert.alert("모든 필수 항목에 동의해주세요.");
    }
  };

  const toggleAllCheck = () => {
    setIsAllChecked(!isAllChecked);
    setIsAgeChecked(!isAllChecked);
    setIsTermsChecked(!isAllChecked);
    setIsPrivacyChecked(!isAllChecked);
  };

  const toggleAgeCheck = () => {
    setIsAgeChecked(!isAgeChecked);
  };

  const toggleTermsCheck = () => {
    setIsTermsChecked(!isTermsChecked);
  };

  const togglePrivacyCheck = () => {
    setIsPrivacyChecked(!isPrivacyChecked);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header left={backIcon} leftClick={() => navigation.navigate("Start")} />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>스터디버디</Text>
          <Text style={[styles.title, { color: "#ff7474" }]}>약관 동의</Text>
          <View style={{ marginTop: 70, width: width - 40 }}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleAllCheck}
            >
              <View
                style={[
                  styles.checkbox,
                  isAllChecked && styles.checkedCheckbox,
                ]}
              />
              <Text style={styles.checkboxText}>모두 동의합니다</Text>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleAgeCheck}
            >
              <View
                style={[
                  styles.checkbox,
                  isAgeChecked && styles.checkedCheckbox,
                ]}
              />
              <Text style={styles.checkboxText}>만 14세 이상입니다</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={toggleTermsCheck}
            >
              <View
                style={[
                  styles.checkbox,
                  isTermsChecked && styles.checkedCheckbox,
                ]}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: width - 90,
                }}
              >
                <Text style={styles.checkboxText}>[필수] 이용약관 동의</Text>
                <Image source={arrowIcon} style={{ width: 7, height: 12 }} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={togglePrivacyCheck}
            >
              <View
                style={[
                  styles.checkbox,
                  isPrivacyChecked && styles.checkedCheckbox,
                ]}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: width - 90,
                }}
              >
                <Text style={styles.checkboxText}>
                  [필수] 개인정보 수집 및 이용동의
                </Text>
                <Image source={arrowIcon} style={{ width: 7, height: 12 }} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAgree}
          activeOpacity={0.5}
        >
          <Text style={styles.buttonText}>동의하기</Text>
        </TouchableOpacity>
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: "#777777",
    marginRight: 20,
    borderRadius: 5,
  },
  checkedCheckbox: {
    backgroundColor: "#FF7474",
  },
  checkboxText: {
    fontSize: 16,
    color: "#717171",
  },
  line: {
    borderBottomColor: "#777777",
    borderBottomWidth: 1,
    marginVertical: 20,
    marginRight: 5,
  },
  button: {
    backgroundColor: "#FF7474",
    alignItems: "center",
    justifyContent: "center",
    width: 374,
    height: 60,
    borderRadius: 8,
    marginBottom: 150,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default Signup1;

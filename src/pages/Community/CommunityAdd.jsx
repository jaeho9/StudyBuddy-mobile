import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet, SafeAreaView } from "react-native";
// Header
import Header from "components/Tab/Header";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const CommunityAdd = () => {
  const navigation = useNavigation();

  const [newCommunity, setNewCommunity] = useState({
    introduce: "",
    name: "",
    reg_date: new Date().toLocaleDateString(),
    rule: "",
  });

  const clear = require("assets/icons/Community/clear.png");
  const mode = require("assets/icons/Community/mode.png");
  const announcement = require("assets/icons/Community/announcement.png");
  const rule = require("assets/icons/Community/rule.png");

  const handleNameChange = (text) => {
    setNewCommunity((prev) => ({ ...prev, name: text }));
  };

  const handleIntroduceChange = (text) => {
    setNewCommunity((prev) => ({ ...prev, introduce: text }));
  };

  const handleRuleChange = (text) => {
    setNewCommunity((prev) => ({ ...prev, rule: text }));
  };
  const checkDuplicateName = async (name) => {
    const querySnapshot = await firestore()
      .collection("community")
      .where("name", "==", name)
      .get();
    return !querySnapshot.empty;
  };
  const handleAddCommunity = async () => {
    const isDuplicate = await checkDuplicateName(newCommunity.name);

    if (!isDuplicate && newCommunity.name && newCommunity.introduce) {
      try {
        const formattedDate = firestore.Timestamp.fromDate(new Date());

        // 먼저 문서 ID를 생성합니다.
        const newDocRef = firestore().collection("community").doc();

        // 문서를 생성하면서 ID를 포함시킵니다.
        await newDocRef.set({
          id: newDocRef.id,
          ...newCommunity,
          reg_date: formattedDate,
          user_id: "1vfLu0QlpF6ZVigXb1GE",
        });

        console.log("Community successfully added with ID:", newDocRef.id);

        // 상태 초기화 및 페이지 이동
        setNewCommunity({
          introduce: "",
          name: "",
          reg_date: new Date().toLocaleDateString(),
          rule: "",
        });
        navigation.navigate("Community");
      } catch (error) {
        console.error("Error adding community:", error);
      }
    } else {
      console.log("Invalid data or duplicate name");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        left={clear}
        leftClick={() => navigation.navigate("Community")}
        title="커뮤니티 추가"
        right={mode}
        rightClick={handleAddCommunity}
      />
      <View style={styles.header}>
        <TextInput
          style={[styles.headerText]}
          placeholder="커뮤니티 이름"
          value={newCommunity.name}
          onChangeText={handleNameChange}
        />
      </View>
      <View style={styles.descriptionSection}>
        <Image source={announcement} style={styles.icon} />
        <TextInput
          style={styles.descriptionText}
          placeholder="커뮤니티 설명"
          value={newCommunity.introduce}
          onChangeText={handleIntroduceChange}
        />
      </View>
      <View style={styles.rulesSection}>
        <Image source={rule} style={styles.icon} />
        <TextInput
          style={styles.rulesTitle}
          placeholder="규칙을 작성해주세요"
          value={newCommunity.rule}
          onChangeText={handleRuleChange}
          multiline={false} // Multiline을 false로 설정
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    borderBottomColor: "rgba(189, 189, 189, 1)",
    borderBottomWidth: 1,
  },
  headerText: {
    color: "rgba(189, 189, 189, 1)",
    fontFamily: "Inter",
    fontSize: 16,
    lineHeight: 22,
    flexGrow: 1,
  },
  errorInput: {
    borderColor: "red",
    borderWidth: 1,
  },
  descriptionSection: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "rgba(189, 189, 189, 1)",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  descriptionText: {
    color: "rgba(189, 189, 189, 1)",
    fontFamily: "Inter",
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  rulesSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    backgroundColor: "#F1F1F1",
  },
  rulesTitle: {
    color: "rgba(189, 189, 189, 1)",
    fontFamily: "Inter",
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },

  icon: {
    marginLeft: 10,
    width: 24,
    height: 24,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tagButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  tagText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CommunityAdd;

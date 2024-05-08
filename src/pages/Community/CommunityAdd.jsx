import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import Header from "components/Tab/header";

const TagModal = ({ visible, onClose, onSelect, onAddCommunity }) => {
  const tags = ["code", "palette"];
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.modalView}>
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={styles.tagButton}
              onPress={() => onSelect(tag)}
            >
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
          <Button
            title="커뮤니티 추가"
            onPress={onAddCommunity}
            color="#FF6347"
          />
          <Button title="닫기" onPress={onClose} color="#FF6347" />
        </View>
      </View>
    </Modal>
  );
};

const CommunityAdd = () => {
  const { communities, addCommunity } = useContext(CommunityContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCommunity, setNewCommunity] = useState({
    title: "",
    members: 0, // 초기값 설정
    posts: 0, // 초기값 설정
    description: "",
    tag: "",
    startDate: new Date().toLocaleDateString(), // 날짜 추가
  });
  const [rulesInput, setRulesInput] = useState("1. ");
  const [isTitleValid, setIsTitleValid] = useState(true);

  const clear = require("assets/icons/Community/clear.png");
  const mode = require("assets/icons/Community/mode.png");
  const announcemnet = require("assets/icons/Community/announcement.png");
  const rule = require("assets/icons/Community/rule.png");
  const handleRulesChange = (text) => {
    const lines = text.split("\n");
    const num = lines.length;
    if (text.endsWith("\n")) {
      lines[num] = `${num + 1}. `;
      text = lines.join("\n");
    }
    setRulesInput(text);
  };

  const checkTitleExists = (title) => {
    const titleExists = communities.some(
      (community) => community.title.toLowerCase() === title.toLowerCase()
    );
    setIsTitleValid(!titleExists);
    return !titleExists;
  };

  const handleTitleChange = (text) => {
    setNewCommunity((prev) => ({ ...prev, title: text }));
    checkTitleExists(text);
  };

  const handleAddCommunity = () => {
    // 파이어베이스 Write 연동 및 데이터값 재작성 필요
    if (
      isTitleValid &&
      newCommunity.title &&
      newCommunity.description &&
      newCommunity.tag &&
      newCommunity.startDate
    ) {
      addCommunity(newCommunity);
      setNewCommunity({
        title: "",
        members: 0,
        description: "",
        posts: 0,
        tag: "",
        startDate: new Date().toLocaleDateString(),
      });
      setRulesInput("1. ");
      setModalVisible(false);
    } else {
      console.log("Invalid data or duplicate title");
    }
  };

  return (
    <View style={styles.container}>
      <Header
        left={clear}
        leftClick={"Community"}
        title="커뮤니티 추가"
        right={mode}
        rightClick={() => setModalVisible(true)}
      />
      <View style={styles.header}>
        <TextInput
          style={[styles.headerText, !isTitleValid && styles.errorInput]}
          placeholder="커뮤니티 이름"
          value={newCommunity.title}
          onChangeText={handleTitleChange}
        />
      </View>
      <View style={styles.descriptionSection}>
        <Image source={announcemnet} style={styles.icon} />
        <TextInput
          style={styles.descriptionText}
          placeholder="커뮤니티 설명"
          onChangeText={(text) =>
            setNewCommunity((prev) => ({ ...prev, description: text }))
          }
        />
      </View>
      <View style={styles.rulesSection}>
        <Image source={rule} style={styles.icon} />
        <TextInput
          style={styles.rulesTitle}
          placeholder="규칙을 작성해주세요"
          value={rulesInput}
          onChangeText={handleRulesChange}
          multiline={true}
        />
      </View>
      <TagModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(tag) => setNewCommunity((prev) => ({ ...prev, tag }))}
        onAddCommunity={handleAddCommunity}
      />
    </View>
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

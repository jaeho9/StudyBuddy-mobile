import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import Header from "components/Tab/header";

const backIcon = require("assets/icons/home/back.png");
const deleteIcon = require("assets/icons/home/delete.png");
const pencilOnIcon = require("assets/icons/home/pencil_on.png");
const heartOffIcon = require("assets/icons/home/heart_off.png");
const commentOffIcon = require("assets/icons/home/comment_off.png");

const Alarm = ({ }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "정보처리기사",
      content: "김도영님이 새 게시물을 작성했습니다.",
      icon: pencilOnIcon,
    },
    {
      id: 2,
      title: "정보보안기사",
      content: "김도영님이 회원님의 게시물을 좋아합니다.",
      icon: heartOffIcon,
    },
    {
      id: 3,
      title: "정보보안기사",
      content: "김도영님이 댓글을 남겼습니다.",
      icon: commentOffIcon,
    },
  ]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      <Header
        left={backIcon}
        title={"알림"}
        right={deleteIcon}
        leftClick={"Home"}
        rightClick={"Alarm"}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", alignItems: "center", padding: 10, borderBottomWidth: 1, borderBottomColor: "#e5e5e5", backgroundColor: item.id === 1 ? "#ffffff" : "#f1f1f1" }}>
              <Image source={item.icon} style={{ width: 20, height: 20, margin: 3, marginLeft: 20, }} />
              <View style={{ margin: 5, marginLeft: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>{item.title}</Text>
                <Text style={{ fontSize: 14 }}>{item.content}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default Alarm;

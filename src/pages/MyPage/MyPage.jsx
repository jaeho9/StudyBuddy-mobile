import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Header from "components/header";
import { useNavigation } from "@react-navigation/native";
import MiddleTab from "components/MiddleTab"; // MiddleTab 컴포넌트 임포트
import { PostList } from "components/PostList";

const menuIcon = require("assets/icons/home/menu.png");
const settings = require("assets/mypage/settings.png");
const link = require("assets/mypage/link.png");
const calendar = require("assets/mypage/calendar.png");
const MyPageProfile = require("assets/mypage/Image/MyPageProfile.png");

const dummyData = {
  id: 1,
  name: "김도영",
  email: "rlaehdud159@gmail.com",
  profileImage: MyPageProfile,
  addtext: true,
  introduction: "정처기 필기를 2주만에 꼭 합격하겠어!",
  link: "www.naver.com",
  date: "1999년 1월 1일",
};

const Mypage = ({}) => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabPress = (index) => {
    setSelectedTab(index);
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        left={menuIcon}
        title={"MyPage"}
        right={settings}
        leftClick={"Home"}
        rightClick={"Settings"}
      />
      <View
        style={{
          height: dummyData.addtext ? 236 : 166, //addtext 여부에 따라
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.Profilecontainer}>
          <Image source={dummyData.profileImage} />
        </View>
        <View style={styles.ProfileTextcontainer}>
          <Text style={styles.ProfileName}>{dummyData.name}</Text>
          <Text style={styles.ProfileEmail}>{dummyData.email}</Text>

          {dummyData.addtext && (
            <View>
              <Text
                style={[styles.ProfileText, { marginTop: 10, marginBottom: 8 }]}
              >
                {dummyData.introduction}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 24.71,
                    marginLeft: -6,
                  }}
                >
                  <Image source={link} />
                  <Text style={styles.ProfileText}>{dummyData.link}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image source={calendar} style={{ marginRight: 2 }} />
                  <Text style={styles.ProfileText}>{dummyData.date}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.ProfileButton}
          onPress={handleEditProfile}
        >
          <Text style={styles.ProfileButtonText}>프로필 수정</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.MiddleTab}>
        <MiddleTab
          text="게시글"
          selected={selectedTab === 0}
          onPress={() => handleTabPress(0)}
        />
        <MiddleTab
          text="하트"
          selected={selectedTab === 1}
          onPress={() => handleTabPress(1)}
        />
        <MiddleTab
          text="댓글"
          selected={selectedTab === 2}
          onPress={() => handleTabPress(2)}
        />
      </View>

      <View style={styles.cardListContainer}>
        <PostList />
      </View>
    </SafeAreaView>
  );
};

export default Mypage;

const styles = {
  Profilecontainer: {
    alignSelf: "flex-start",
    position: "absolute",
    top: 16,
    left: 25,
  },
  ProfileTextcontainer: {
    alignSelf: "flex-start",
    position: "absolute",
    top: 117,
    left: 25,
  },
  ProfileName: {
    color: "#000",
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 22,
  },
  ProfileEmail: {
    color: "#969696",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 22,
  },
  ProfileButton: {
    alignSelf: "flex-start",
    position: "absolute",
    top: 26,
    right: 21,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFF",
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 7,
    paddingLeft: 7,
  },
  ProfileButtonText: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    color: "#9C9C9C",
  },
  MiddleTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingHorizontal: 25,
    marginTop: 16,
  },
  cardListContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    backgroundColor: "#f1f1f1",
  },
  ProfileText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 22,
    color: "#969696",
  },
};

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import Header from "components/Tab/Header";
import { useNavigation } from "@react-navigation/native";
import MiddleTab from "components/Tab/MiddleTab"; // MiddleTab 컴포넌트 임포트
import { MyPagePostList } from "components/List/MyPagePostList";
import { MyPagePostList_heart } from "components/List/MyPagePostList_heart";
import { MyPagePostList_comment } from "components/List/MyPagePostList_comment";

import firestore from "@react-native-firebase/firestore"; // firestore

const menuIcon = require("assets/icons/home/menu.png");
const settings = require("assets/icons/mypage/settings.png");
const link = require("assets/icons/mypage/link.png");
const calendar = require("assets/icons/mypage/calendar.png");
const MyPageProfile = require("assets/icons/mypage/MyPageProfile.png");

const loggedInUserId = "test_id";

const Mypage = ({}) => {
  //user
  const [user, setUser] = useState([]);
  const [dummyData, setDummyData] = useState({});
  const userCollection = firestore().collection("user");

  const user_api = async () => {
    try {
      const user_data = await userCollection.get();
      const userData = user_data._docs
        .find((doc) => doc.id === loggedInUserId) // 로그인 한 아이디 별 데이터 프로필 불러오기
        .data();
      setDummyData({
        id: userData.id,
        name: userData.nickname,
        email: userData.email,
        profileImage: userData.profile_img,
        addtext: link || birthday ? true : false,
        introduction: userData.about_me,
        link: userData.link,
        date: userData.birthday,
      });
      setUser(user_data._docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log("user error", error.message);
    }
  };

  useEffect(() => {
    // 컴포넌트가 처음으로 렌더링될 때 사용자 데이터를 가져옴
    user_api();
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음으로 렌더링될 때 한 번만 실행되도록 함

  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabPress = async (index) => {
    setSelectedTab(index);
    await user_api();
    // 탭에 따라 다른 게시글 목록을 보여주도록 설정
    // 예를 들어, index === 0 이면 게시글 목록을 렌더링
    // index === 1 이면 하트가 눌렸으므로 하트 목록을 렌더링하고, index === 2 이면 댓글 목록을 렌더링
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
          {/* <Image source={dummyData.profileImage} /> */}
          <Image source={MyPageProfile} />
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
      {selectedTab === 0 && <MyPagePostList data={dummyData} type="게시글" />}
      {selectedTab === 1 && (
        <MyPagePostList_heart data={dummyData} type="하트" />
      )}
      {selectedTab === 2 && (
        <MyPagePostList_comment data={dummyData} type="댓글" />
      )}
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

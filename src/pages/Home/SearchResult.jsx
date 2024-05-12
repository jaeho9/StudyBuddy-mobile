import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
// Top Tab
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
// Header
import Header from "components/Tab/Header";
// Images
const arrowLeft = require("assets/icons/add/arrow_left.png");
const profileImg = require("assets/icons/archives/profile.png");
const moreIcon = require("assets/icons/archives/more.png");
const heartOffIcon = require("assets/icons/archives/heart_off.png");
const heartOnIcon = require("assets/icons/archives/heart_on.png");
const commentOffIcon = require("assets/icons/archives/comment_off.png");
const commentOnIcon = require("assets/icons/archives/comment_on.png");
const bookmarkOnIcon = require("assets/icons/archives/bookmark_on.png");
const bookmarkOffIcon = require("assets/icons/archives/bookmark_off.png");
// Dummy Data
const dummy_communityList = [
  {
    id: 0,
    community_name: "전체",
    isClick: true,
  },
  {
    id: 1,
    community_name: "정보처리기능사",
    isClick: false,
  },
  {
    id: 2,
    community_name: "정보처리기사",
    isClick: false,
  },
  {
    id: 3,
    community_name: "정보처리산업기사",
    isClick: false,
  },
  {
    id: 4,
    community_name: "정보보안기사",
    isClick: false,
  },
];
const dummy_communityDetail = [
  {
    id: 0,
    community_name: "정보처리기능사",
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김똥",
    date: "2023.02.04",
    period: "2주",
    startDate: "2024-04-01",
    endDate: "2024-04-07",
    book: "x",
    result: "합격",
    study: "1주차에는 개념 정리 \n2주차에는 기출문제 풀기",
    heart: 122,
    heartClick: false,
    comment: 122,
    commentClick: false,
    bookmark: true,
  },
  {
    id: 1,
    community_name: "정보처리기사",
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김도영",
    date: "2023.02.04",
    period: "2주",
    startDate: "2024-04-01",
    endDate: "2024-04-08",
    book: "x",
    result: "합격",
    study: "1주차에는 개념 정리 \n2주차에는 기출문제 풀기",
    heart: 123,
    heartClick: true,
    comment: 123,
    commentClick: true,
    bookmark: true,
  },
  {
    id: 2,
    community_name: "정보처리산업기사",
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김도영",
    date: "2023.02.04",
    period: "2주",
    startDate: "2024-04-01",
    endDate: "2024-04-02",
    book: "x",
    result: "합격",
    study: "1주차에는 개념 정리 \n2주차에는 기출문제 풀기",
    heart: 123,
    heartClick: true,
    comment: 123,
    commentClick: true,
    bookmark: true,
  },
  {
    id: 3,
    community_name: "정보보안기사",
    profileImg: require("assets/icons/archives/profile.png"),
    name: "이제호",
    date: "2023.02.04",
    period: "2주",
    startDate: "2024-04-01",
    endDate: "2024-04-20",
    book: "x",
    result: "합격",
    study: "1주차에는 개념 정리 \n2주차에는 기출문제 풀기",
    heart: 123,
    heartClick: true,
    comment: 123,
    commentClick: true,
    bookmark: true,
  },
  {
    id: 4,
    community_name: "정보보안기사",
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김도영",
    date: "2023.02.04",
    period: "2주",
    startDate: "2024-04-01",
    endDate: "2024-04-17",
    book: "x",
    result: "합격",
    study: "1주차에는 개념 정리 \n2주차에는 기출문제 풀기",
    heart: 123,
    heartClick: true,
    comment: 123,
    commentClick: true,
    bookmark: true,
  },
];

// 인기 게시물
const LikeTab = () => {
  const [listclick, setListClick] = useState(dummy_communityList);
  const [detailClick, setDetailClick] = useState(dummy_communityDetail);
  const detailLastIndex = dummy_communityDetail.length - 1;

  const handleClickList = (index) => {
    setListClick(
      dummy_communityList.map((v, i) => {
        if (v.isClick === true) {
          v.isClick = false;
        }
        if (v.id === index) {
          v.isClick = !v.isClick;
        }
        return v;
      })
    );
  };

  const handleClickHeart = (index) => {
    setDetailClick(
      dummy_communityDetail.map((v, i) => {
        if (v.id === index) {
          v.heartClick = !v.heartClick;
          if (v.heartClick) {
            v.heart += 1;
          } else {
            v.heart -= 1;
          }
        }
        return v;
      })
    );
  };

  const handelClickComment = (item) => {};

  const handleClickBookmark = (index) => {
    setDetailClick(
      dummy_communityDetail.map((v, i) => {
        if (v.id === index) {
          v.bookmark = !v.bookmark;
        }
        return v;
      })
    );
  };

  const renderCommunityDetail = (item) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 20,
          marginBottom: detailLastIndex === item.id ? 80 : 12,
          paddingHorizontal: 16,
          paddingVertical: 20,
          borderRadius: 12,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ff7474" }}>
          {item.community_name}
        </Text>
        <View style={{ marginTop: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Image source={item.profileImg} style={{ width: 32, height: 32 }} />
            <Text style={{ fontSize: 16, color: "#000000" }}>{item.name}</Text>
            <Text style={{ fontSize: 12, color: "#969696" }}>{item.date}</Text>
          </View>
          <View style={{ marginTop: 8, marginHorizontal: 40, gap: 8 }}>
            <Text style={{ fontSize: 14, color: "#000000" }}>
              1. 준비 기간 : {changeDate(item)}
            </Text>
            <Text style={{ fontSize: 14, color: "#000000" }}>
              2. 교재 : {item.book}
            </Text>
            <Text style={{ fontSize: 14, color: "#000000" }}>
              3. 결과 : {item.result}
            </Text>
          </View>
        </View>

        <View style={{ width: 24, height: 24 }} />
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            right: 12,
            bottom: 10,
            gap: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            <TouchableOpacity onPress={() => handleClickHeart(item.id)}>
              <Image
                source={item.heartClick ? heartOnIcon : heartOffIcon}
                style={{ width: 18, height: 18 }}
              />
            </TouchableOpacity>
            <Text style={{ color: item.heartClick ? "#ff7474" : "#bdbdbd" }}>
              {item.heart}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            <TouchableOpacity onPress={() => handelClickComment(item)}>
              <Image
                source={item.commentClick ? commentOnIcon : commentOffIcon}
                style={{ width: 18, height: 18 }}
              />
            </TouchableOpacity>
            <Text style={{ color: item.commentClick ? "#606060" : "#bdbdbd" }}>
              {item.comment}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleClickBookmark(item.id);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={item.bookmark ? bookmarkOnIcon : bookmarkOffIcon}
              style={{ width: 18, height: 18 }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCommunityListClick = ({ item, index }) => {
    return renderCommunityDetail(item);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={dummy_communityDetail}
        renderItem={renderCommunityListClick}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
      />
    </View>
  );
};

// 최근 게시물
const NewTab = ({ item }) => {
  const [listclick, setListClick] = useState(dummy_communityList);
  const [detailClick, setDetailClick] = useState(dummy_communityDetail);
  const detailLastIndex = dummy_communityDetail.length - 1;

  const handleClickList = (index) => {
    setListClick(
      dummy_communityList.map((v, i) => {
        if (v.isClick === true) {
          v.isClick = false;
        }
        if (v.id === index) {
          v.isClick = !v.isClick;
        }
        return v;
      })
    );
  };

  const handleClickHeart = (index) => {
    setDetailClick(
      dummy_communityDetail.map((v, i) => {
        if (v.id === index) {
          v.heartClick = !v.heartClick;
          if (v.heartClick) {
            v.heart += 1;
          } else {
            v.heart -= 1;
          }
        }
        return v;
      })
    );
  };

  const handelClickComment = (item) => {};

  const handleClickBookmark = (index) => {
    setDetailClick(
      dummy_communityDetail.map((v, i) => {
        if (v.id === index) {
          v.bookmark = !v.bookmark;
        }
        return v;
      })
    );
  };

  const renderCommunityDetail = (item) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 20,
          marginBottom: detailLastIndex === item.id ? 80 : 12,
          paddingHorizontal: 16,
          paddingVertical: 20,
          borderRadius: 12,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ff7474" }}>
          {item.community_name}
        </Text>
        <View style={{ marginTop: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Image source={item.profileImg} style={{ width: 32, height: 32 }} />
            <Text style={{ fontSize: 16, color: "#000000" }}>{item.name}</Text>
            <Text style={{ fontSize: 12, color: "#969696" }}>{item.date}</Text>
          </View>
          <View style={{ marginTop: 8, marginHorizontal: 40, gap: 8 }}>
            <Text style={{ fontSize: 14, color: "#000000" }}>
              1. 준비 기간 : {changeDate(item)}
            </Text>
            <Text style={{ fontSize: 14, color: "#000000" }}>
              2. 교재 : {item.book}
            </Text>
            <Text style={{ fontSize: 14, color: "#000000" }}>
              3. 결과 : {item.result}
            </Text>
          </View>
        </View>

        <View style={{ width: 24, height: 24 }} />
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            right: 12,
            bottom: 10,
            gap: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            <TouchableOpacity onPress={() => handleClickHeart(item.id)}>
              <Image
                source={item.heartClick ? heartOnIcon : heartOffIcon}
                style={{ width: 18, height: 18 }}
              />
            </TouchableOpacity>
            <Text style={{ color: item.heartClick ? "#ff7474" : "#bdbdbd" }}>
              {item.heart}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            <TouchableOpacity onPress={() => handelClickComment(item)}>
              <Image
                source={item.commentClick ? commentOnIcon : commentOffIcon}
                style={{ width: 18, height: 18 }}
              />
            </TouchableOpacity>
            <Text style={{ color: item.commentClick ? "#606060" : "#bdbdbd" }}>
              {item.comment}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleClickBookmark(item.id);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={item.bookmark ? bookmarkOnIcon : bookmarkOffIcon}
              style={{ width: 18, height: 18 }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCommunityListClick = ({ item, index }) => {
    return renderCommunityDetail(item);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={dummy_communityDetail}
        renderItem={renderCommunityListClick}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
      />
    </View>
  );
};

// SearchResult 화면
const SearchResult = ({ route, navigation }) => {
  const { text } = route.params ? route.params : {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        left={arrowLeft}
        leftClick={() => navigation.goBack()}
        title={text}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: "#828282",
          tabBarActiveTintColor: "#333333",
          tabBarIndicatorStyle: {
            backgroundColor: "#FF7474",
            width: 58,
            marginLeft: 70,
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: "#F1F1F1",
          },
          tabBarLabelStyle: {
            fontWeight: "600",
          },
        }}
      >
        <Tab.Screen name="인기" component={LikeTab} />
        <Tab.Screen name="최근" component={NewTab} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default SearchResult;

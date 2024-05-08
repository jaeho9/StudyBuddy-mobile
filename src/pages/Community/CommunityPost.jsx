import React, { useState, useEffect, useContext } from "react";
import { PostList } from "components/Post";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";
import Header from "components/header";
import MiddleTab from "components/MiddleTab";
import CommunityRulesAndMembers from "components/Community/CommunityRulesandMembers";
import { CommunityContext } from "components/Community/CommunityContext";
const CommunityPost = () => {
  const { posts } = useContext(CommunityContext); // 파이어베이스 연동 필요
  const [selectedTab, setSelectedTab] = useState("Popular");
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    const sortPosts = () => {
      let sorted = [];
      if (selectedTab === "Popular") {
        sorted = [...posts].sort((a, b) => b.favorites - a.favorites);
      } else if (selectedTab === "Recent") {
        sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      setSortedPosts(sorted);
    };

    if (posts && posts.length > 0) {
      sortPosts();
    }
  }, [selectedTab, posts]);

  const handleTabPress = (tabId) => {
    setSelectedTab(tabId);
  };
  const contentComponent =
    selectedTab === "Rules" ? (
      <CommunityRulesAndMembers />
    ) : (
      <PostList posts={sortedPosts} />
    );

  const left = require("/assets/icons/Community/chevron_left.png");
  const search = require("/assets/icons/Community/search.png");
  const addfeed = require("/assets/icons/Community/addFeed.png");

  return (
    <View style={styles.container}>
      <Header
        left={require("/assets/icons/Community/chevron_left.png")}
        leftClick={"Community"}
        title={"정보처리기사"}
        right={require("/assets/icons/Community/search.png")}
        rightClick={"CommunitySearch"}
      />
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>인원</Text>
          <Text style={styles.value}>50명</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>시작일</Text>
          <Text style={styles.value}>2023.07.18.</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>설명</Text>
          <Text style={styles.description}>
            정보처리기사 자료를 공유하기 위한 커뮤니티입니다!
          </Text>
        </View>
        <TouchableOpacity style={styles.exitButton}>
          <Text style={styles.exitButtonText}>나가기</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        style={styles.container}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-around", // 탭들 사이의 공간을 균등하게 분배
          alignItems: "center", // 모든 탭을 세로 중앙 정렬
          paddingVertical: 10, // 탭 위아래로 패딩 제공
          backgroundColor: "#f8f8f8",
        }}
      >
        <MiddleTab
          text="Popular"
          selected={selectedTab === "Popular"}
          onPress={() => handleTabPress("Popular")}
        />
        <MiddleTab
          text="Recent"
          selected={selectedTab === "Recent"}
          onPress={() => handleTabPress("Recent")}
        />
        <MiddleTab
          text="Rules"
          selected={selectedTab === "Rules"}
          onPress={() => handleTabPress("Rules")}
        />
      </ScrollView>
      {contentComponent}
      <TouchableOpacity
        style={styles.addFeedButton}
        onPress={() => console.log("Add 페이지로 연결")}
      >
        <Image
          source={require("/assets/icons/Community/addFeed.png")}
          style={styles.addFeedIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  infoContainer: {
    flexDirection: "column",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    color: "#606060",
    fontSize: 13,
    fontWeight: "600",
    marginRight: 6,
  },
  value: {
    color: "#606060",
    fontSize: 12,
    fontWeight: "400",
  },
  description: {
    color: "#606060",
    fontSize: 12,
    fontWeight: "400",
    marginRight: 6,
  },
  exitButton: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    borderRadius: 12,
    backgroundColor: "rgba(255, 116, 116, 0.12)",
    alignSelf: "flex-end",
  },
  exitButtonText: {
    color: "rgba(255, 116, 116, 1)",
    fontSize: 16,
    fontWeight: "400",
  },

  addFeedButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  addFeedIcon: {
    width: 52,
    height: 52,
  },
});

export default CommunityPost;

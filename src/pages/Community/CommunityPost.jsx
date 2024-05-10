import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import Header from "components/Tab/Header";
import MiddleTab from "components/Tab/MiddleTab";
import CommunityRulesAndMembers from "components/Community/CommunityRulesandMembers";
import { PostList } from "components/Post";

const CommunityPost = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { communityId } = route.params;
  const [selectedTab, setSelectedTab] = useState("Popular");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [sortedPosts, setSortedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      console.log("Fetching posts for community ID:", communityId);
      try {
        const snapshot = await firestore()
          .collection("post")
          .where("community_id", "==", communityId)
          .get();
        console.log("Fetched posts count:", snapshot.docs.length); // 로그 추가

        const fetchedPosts = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const postData = doc.data();
            console.log("Processing post:", postData); // 각 포스트 데이터 로그

            const userDoc = await firestore()
              .collection("user")
              .doc(postData.user_id)
              .get();
            const username = userDoc.data()?.nickname || "Unknown User";

            const formattedDate = new Date(postData.reg_date.seconds * 1000)
              .toLocaleDateString("en-CA")
              .replace(/-/g, ".");

            const startDate = new Date(postData.start_date.seconds * 1000);
            const endDate = new Date(postData.end_date.seconds * 1000);
            const durationDays = (endDate - startDate) / (1000 * 3600 * 24);

            const likesSnapshot = await firestore()
              .collection("like")
              .where("post_id", "==", doc.id)
              .get();

            return {
              id: doc.id,
              name: username,
              date: formattedDate,
              content1: `${durationDays}일`,
              content2: `책: ${postData.book}`,
              content3: postData.result,
              favorites: likesSnapshot.size,
              comments: 0,
            };
          })
        );

        console.log("Final fetched posts:", fetchedPosts); // 최종 데이터 로그
        setPosts(fetchedPosts);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch posts for this community.");
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [communityId]);

  const sortPosts = (criteria) => {
    return posts.sort((a, b) => {
      if (criteria === "Popular") {
        return b.favorites - a.favorites;
      } else if (criteria === "Recent") {
        return new Date(b.date) - new Date(a.date);
      }
    });
  };

  const handleTabPress = (tabId) => {
    setSelectedTab(tabId);
  };

  useEffect(() => {
    const sortResults = sortPosts(selectedTab);
    setSortedPosts(sortResults);
  }, [selectedTab, posts]);

  const contentComponent =
    selectedTab === "Rules" ? (
      <CommunityRulesAndMembers communityId={communityId} />
    ) : (
      <PostList posts={sortedPosts} />
    );

  const left = require("/assets/icons/Community/chevron_left.png");
  const search = require("/assets/icons/Community/search.png");
  const addfeed = require("/assets/icons/Community/addFeed.png");
  if (loading) {
    return <Text>Loading...</Text>; // 로딩 중 표시
  }

  return (
    <View style={styles.container}>
      <Header
        left={left}
        leftClick={() => navigation.navigate("Community")}
        title={"정보처리기사"}
        right={search}
        rightClick={() => navigation.navigate("CommunitySearch")}
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
          text="인기"
          selected={selectedTab === "Popular"}
          onPress={() => handleTabPress("Popular")}
        />
        <MiddleTab
          text="최근"
          selected={selectedTab === "Recent"}
          onPress={() => handleTabPress("Recent")}
        />
        <MiddleTab
          text="소개"
          selected={selectedTab === "Rules"}
          onPress={() => handleTabPress("Rules")}
        />
      </ScrollView>
      {contentComponent}
      <TouchableOpacity
        style={styles.addFeedButton}
        onPress={() => console.log("Add 페이지로 연결")}
      >
        <Image source={addfeed} style={styles.addFeedIcon} />
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
    position: "absolute", // 절대 위치
    right: 10, // 오른쪽에서 10dp 떨어진 위치
    bottom: 10, // 하단에서 10dp 떨어진 위치
    width: 50, // 버튼의 폭
    height: 50, // 버튼의 높이
    justifyContent: "center", // 내부 아이템을 중앙 정렬
    alignItems: "center", // 내부 아이템을 중앙 정렬
    borderRadius: 25, // 버튼의 모서리를 둥글게
    backgroundColor: "#f8f8f8", // 버튼의 배경색
  },
  addFeedIcon: {
    width: 52,
    height: 52,
  },
});

export default CommunityPost;

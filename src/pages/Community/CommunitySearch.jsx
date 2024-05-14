import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import Header from "components/Tab/Header";

const CommunitySearch = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const tagImages = {
    code: require("assets/icons/Community/code.png"),
    palette: require("/assets/icons/Community/palette.png"),
  };
  const bookmark = require("assets/icons/Community/bookmark.png");

  const fetchCommunities = async () => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase(); // 공백 제거 및 소문자로 변환
    if (!normalizedSearchTerm) return; // 공백 검색어는 무시

    // Query 객체 생성
    const communityQuery = firestore()
      .collection("community")
      .where("name", ">=", normalizedSearchTerm)
      .where("name", "<=", normalizedSearchTerm + "\uf8ff");

    try {
      // Query 실행
      const snapshot = await communityQuery.get();

      if (snapshot.empty) {
        console.log("No results found.");
        setSearchResults([]);
        return;
      }

      // 결과 처리
      const results = snapshot.docs.map((doc) => {
        const data = doc.data();
        const formattedDate = data.reg_date
          ? new Date(data.reg_date.seconds * 1000)
              .toLocaleDateString("en-CA")
              .replace(/-/g, ".")
          : "날짜 없음";
        return {
          id: doc.id,
          title: data.name || "이름 없음",
          members: data.members || "0명",
          posts: data.posts || "0개",
          startDate: formattedDate,
          tag: data.tag || "code",
        };
      });

      setSearchResults(results);
      console.log("Search results:", results);
    } catch (error) {
      console.error("Error fetching communities:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.communityCard}
      onPress={() =>
        navigation.navigate("CommunityDetails", { communityId: item.id })
      }
    >
      <Text style={styles.communityTitle}>{item.title}</Text>
      <Image source={bookmark} style={styles.bookmarkIcon} />
      <Image source={tagImages[item.tag]} style={styles.tagIcon} />
      <View style={styles.memberInfoContainer}>
        <Text style={styles.label}>인원 </Text>
        <Text style={styles.memberCount}>{`${item.members}`}</Text>
      </View>
      <View style={styles.startDateContainer}>
        <Text style={styles.startDateLabel}>시작일</Text>
        <Text style={styles.startDateValue}>{item.startDate}</Text>
      </View>
      <View style={styles.postInfoContainer}>
        <Text style={styles.postLabel}>게시글</Text>
        <Text style={styles.postCount}>{`${item.posts}`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <Header
        left={require("/assets/icons/Community/chevron_left.png")}
        leftClick={() => navigation.goBack()}
        title={"Search Communities"}
        right={require("/assets/icons/Community/search.png")}
        rightClick={fetchCommunities} // 검색 아이콘 클릭 시 검색 실행
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={fetchCommunities} // 엔터를 눌렀을 때도 검색 실행
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  communityCard: {
    width: "90%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    alignSelf: "center",
    position: "relative",
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FF7474",
  },
  bookmarkIcon: {
    position: "absolute",
    top: -6,
    right: 10,
    width: 52,
    height: 52,
  },
  tagIcon: {
    position: "absolute",
    top: 10,
    right: 26,
    width: 20,
    height: 20,
  },
  memberInfoContainer: {
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  memberCount: {
    fontSize: 14,
    marginLeft: 5,
  },
  startDateContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  startDateLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  startDateValue: {
    fontSize: 14,
    marginLeft: 5,
  },
  postInfoContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  postLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postCount: {
    fontSize: 14,
    marginLeft: 5,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
});

export default CommunitySearch;

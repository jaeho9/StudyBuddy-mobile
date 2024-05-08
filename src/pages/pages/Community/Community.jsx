import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore"; // 파이어스토어 기능 검사 필요
import Header from "components/header";

const tagImages = {
  code: require("assets/icons/Community/code.png"),
  palette: require("/assets/icons/Community/palette.png"),
};

const Community = () => {
  const navigation = useNavigation();
  const [communities, setCommunities] = useState([]);
  const bookmark = require("assets/icons/Community/bookmark.png");

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("community")
      .onSnapshot((snapshot) => {
        const fetchedCommunities = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.name || "000", // 기본값 설정
            members: data.members || "000", // 기본값 설정
            posts: data.posts || "000", // 기본값 설정
            startDate: data.reg_date || "000", // 기본값 설정
            tag: data.tag || "code", // 'code'를 기본 태그로 설정
          };
        });
        setCommunities(fetchedCommunities);
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.communityCard}
      onPress={() =>
        navigation.navigate("CommunityPost", { communityId: item.id })
      }
    >
      <Text style={styles.communityTitle}>{item.title}</Text>
      <Image source={bookmark} style={styles.bookmarkIcon} />
      <Image source={tagImages[item.tag]} style={styles.tagIcon} />
      <View style={styles.memberInfoContainer}>
        <Text style={styles.label}>인원 </Text>
        <Text style={styles.memberCount}>{`${item.members}명`}</Text>
      </View>
      <View style={styles.startDateContainer}>
        <Text style={styles.startDateLabel}>시작일</Text>
        <Text style={styles.startDateValue}>{item.startDate}</Text>
      </View>
      <View style={styles.postInfoContainer}>
        <Text style={styles.postLabel}>게시글</Text>
        <Text style={styles.postCount}>{`${item.posts}개`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <Header
        left={require("/assets/icons/Community/search.png")}
        leftClick={"CommunitySearch"}
        title={"Community"}
        right={require("/assets/icons/Community/group_add.png")}
        rightClick={() => navigation.navigate("CommunityAdd")}
      />
      <FlatList
        data={communities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Text style={styles.moreLink}>더보기</Text>
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
    position: "relative", // 상대적 위치 설정
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
  moreLink: {
    fontSize: 14,
    textAlign: "center",
    color: "#1167b1",
    marginTop: 10,
  },
});

export default Community;

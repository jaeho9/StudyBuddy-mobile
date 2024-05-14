import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

export function PostList({ posts }) {
  const heartOffIcon = require("assets/icons/archives/heart_off.png");
  const heartOnIcon = require("assets/icons/archives/heart_on.png");
  const commentOffIcon = require("assets/icons/archives/comment_off.png");
  const commentOnIcon = require("assets/icons/archives/comment_on.png");
  const bookmarkOnIcon = require("assets/icons/archives/bookmark_on.png");
  const bookmarkOffIcon = require("assets/icons/archives/bookmark_off.png");
  const ProfileImage = require("/assets/icons/Community/Profile.png");

  const renderItem = ({ item }) => (
    <View style={styles.root}>
      <View style={styles.profileContainer}>
        <Image source={ProfileImage} style={{ width: 32, height: 32 }} />
        <Text style={styles.usernameText}>{item.name}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>

      <View style={{ marginHorizontal: 40, gap: 8, marginTop: 8 }}>
        <Text style={{ fontSize: 14, color: "#000000" }}>
          1. 준비 기간 : {item.content1}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ fontSize: 14, color: "#000000" }}
        >
          2. 교재 : {item.content2}
        </Text>
        <Text style={{ fontSize: 14, color: "#000000" }}>
          3. 결과 : {item.content3}
        </Text>
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
          <TouchableOpacity>
            <Image source={heartOffIcon} style={{ width: 18, height: 18 }} />
          </TouchableOpacity>
          <Text style={{ color: "#BDBDBD" }}>{item.favorites}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <TouchableOpacity>
            <Image source={commentOffIcon} style={{ width: 18, height: 18 }} />
          </TouchableOpacity>
          <Text style={{ color: "#BDBDBD" }}>{item.comments}</Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={bookmarkOffIcon} style={{ width: 18, height: 18 }} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id || String(index)} // id가 없는 경우 인덱스 사용
      showsVerticalScrollIndicator={false}
      removeClippedSubviews
    />
  );
}

const styles = StyleSheet.create({
  root: {
    width: 393,
    height: 163,
    borderBottomColor: "rgba(189, 189, 189, 1)",
    borderBottomWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 16,
  },
  backgroundRectangle: {
    width: 137.541,
    height: 183.22,
    flexShrink: 0,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 137.541,
    height: 183.22,
    flexShrink: 0,
  },
  usernameText: {
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    marginLeft: 10, // 이미지와 텍스트 사이의 간격
  },
  dateText: {
    color: "rgba(150, 150, 150, 1)",
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 22,
    marginLeft: 10,
  },
  userInfoContainer: {
    flexDirection: "row",
    width: 108.96,
    height: 23.181,
    alignItems: "flex-start",
    rowGap: 5,
    columnGap: 5,
    flexShrink: 0,
  },
  contentText: {
    width: 294.96301,
    height: 69.544,
    flexShrink: 0,
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Inter",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
  },
  likeCountText: {
    color: "rgba(255, 116, 116, 1)",
    fontFamily: "Inter",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
  },
  iconsContainer: {
    flexDirection: "row",
    width: 145.28,
    height: 23.181,
    alignItems: "center",
    rowGap: 11,
    columnGap: 11,
    flexShrink: 0,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    rowGap: 7,
    columnGap: 7,
  },
  commentCountText: {
    color: "rgba(189, 189, 189, 1)",
    fontFamily: "Inter",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
  },
  commentsContainer: {
    flexDirection: "row",
    alignItems: "center",
    rowGap: 7,
    columnGap: 7,
  },
});

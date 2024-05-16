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
  const BookmarkBorder = require("/assets/icons/Community/bookmark_border.png");
  const FavoriteIcon = require("/assets/icons/Community/favorite.png");
  const SmsIcon = require("/assets/icons/Community/sms.png");
  const ProfileImage = require("/assets/icons/Community/Profile.png");

  const renderItem = ({ item }) => (
    <View style={styles.root}>
      <View style={styles.profileContainer}>
        <Image
          source={ProfileImage}
          style={{ width: 35.22, height: 33.72 }}
          resizeMode="cover"
        />
        <Text style={styles.usernameText}>{item.name}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <Text style={styles.contentText}>
        {item.content1}
        {"\n"}
        {item.content2}
        {"\n"}
        {item.content3}
      </Text>
      <View style={styles.iconsContainer}>
        <View style={styles.likesContainer}>
          <Image source={FavoriteIcon} style={{ width: 24, height: 24 }} />
          <Text style={styles.likeCountText}>{item.favorites}</Text>
        </View>
        <View style={styles.commentsContainer}>
          <Image source={SmsIcon} style={{ width: 24, height: 24 }} />
          <Text style={styles.commentCountText}>{item.comments}</Text>
        </View>
        <Image source={BookmarkBorder} style={{ width: 24, height: 24 }} />
      </View>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id || String(index)} // id가 없는 경우 인덱스 사용
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
    padding: 10,
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
    marginBottom: 10,
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

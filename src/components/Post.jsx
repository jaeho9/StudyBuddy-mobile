import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

export function PostList({ posts }) {
  const heartOffIcon = require("assets/icons/archives/heart_off.png");
  const heartOnIcon = require("assets/icons/archives/heart_on.png");
  const commentOffIcon = require("assets/icons/archives/comment_off.png");
  const commentOnIcon = require("assets/icons/archives/comment_on.png");
  const bookmarkOnIcon = require("assets/icons/archives/bookmark_on.png");
  const bookmarkOffIcon = require("assets/icons/archives/bookmark_off.png");
  const ProfileImage = require("/assets/icons/Community/Profile.png");

  // 사용자 프로필 이미지 URL을 저장할 상태 변수
  const [userProfileImages, setUserProfileImages] = useState({});

  // like
  const [likes, setLikes] = useState([]); // 좋아요 데이터
  const [likeCounts, setLikeCounts] = useState([]); // 각 게시물 좋아요 개수
  const [userLikes, setUserLikes] = useState([]); // 좋아요 여부
  const likeCollection = firestore().collection("like");

  // comment
  const [commentCounts, setCommentCounts] = useState([]);
  const commentCollection = firestore().collection("comment");

  //bookmark
  const [bookmarks, setBookmarks] = useState([]); // 북마크 데이터
  const [userBookmarks, setUserBookmarks] = useState([]); // 사용자가 북마크한 게시물 정보
  const bookmarkCollection = firestore().collection("bookmark");

  useEffect(() => {
    like_api();
    comment_api();
    bookmark_api();
  }, []);

  const bookmark_api = async () => {
    try {
      const bookmark_data = await bookmarkCollection.get();
      const bookmarks = bookmark_data._docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // 북마크 상태 확인
      const userBookmarks = post.map((p) => ({
        postId: p.id,
        isBookmark: bookmarks.some(
          (l) => l.post_id === p.id && l.user_id === "Gsh6TJg50rswXPGaA7Zk"
        ),
      }));

      setUserBookmarks(userBookmarks);
      setBookmarks(bookmarks);
    } catch (error) {
      console.log("bookmark error", error.message);
    }
  };

  const like_api = async () => {
    try {
      const like_data = await likeCollection.get();
      const likes = like_data._docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // 각 게시물의 좋아요 개수 계산
      const likeCounts = post.map((p) => ({
        postId: p.id,
        count: likes.filter((l) => l.post_id === p.id).length,
      }));

      // 좋아요 상태를 확인하여 사용자의 좋아요 여부를 설정
      const userLikes = post.map((p) => ({
        postId: p.id,
        isLiked: likes.some(
          (l) => l.post_id === p.id && l.user_id === "Gsh6TJg50rswXPGaA7Zk"
        ),
      }));

      setLikeCounts(likeCounts);
      setUserLikes(userLikes);
      setLikes(likes);
    } catch (error) {
      console.log("like error", error.message);
    }
  };

  const comment_api = async () => {
    try {
      const comment_data = await commentCollection.get();
      const comments = comment_data._docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // 각 게시물의 댓글 개수 계산
      const commentCounts = post.map((p) => ({
        postId: p.id,
        count: comments.filter((l) => l.post_id === p.id).length,
      }));

      setCommentCounts(commentCounts);
    } catch (error) {
      console.log("comment error", error.message);
    }
  };

  // 사용자 데이터와 함께 프로필 이미지 URL을 가져오는 함수
  const getUserProfileImages = async () => {
    try {
      const imageUrls = {};
      // 모든 사용자 데이터를 순회하며 프로필 이미지 URL을 가져옴
      await Promise.all(
        user.map(async (u) => {
          const imageRef = storage().ref(u.profile_img); // 프로필 이미지 경로를 사용하여 이미지 참조
          const url = await imageRef.getDownloadURL(); // 이미지 URL 가져오기
          imageUrls[u.id] = url; // 사용자 ID를 키로하여 이미지 URL 저장
        })
      );
      setUserProfileImages(imageUrls); // 상태 변수에 이미지 URL 저장
    } catch (error) {
      console.log("Error fetching user profile images:", error.message);
    }
  };

  // 좋아요
  const toggleLike = async (postId) => {
    try {
      const userLiked = userLikes.find((ul) => ul.postId === postId)?.isLiked;

      if (userLiked) {
        // 이미 좋아요를 누른 상태면 좋아요 취소
        await unlikePost(postId);
      } else {
        // 좋아요를 누르지 않은 상태면 좋아요
        await likePost(postId);
      }

      // 좋아요 상태 갱신
      await like_api();
    } catch (error) {
      console.error("Toggle like error:", error);
    }
  };

  const likePost = async (postId) => {
    try {
      await likeCollection.add({
        user_id: "SeDJYBVUGSjQGaWlzPmm",
        post_id: postId,
      });
    } catch (error) {
      console.error("Like post error:", error);
    }
  };

  const unlikePost = async (postId) => {
    try {
      const likeId = likes.find(
        (l) => l.post_id === postId && l.user_id === "Gsh6TJg50rswXPGaA7Zk"
      )?.id;
      if (likeId) {
        await likeCollection.doc(likeId).delete();
      }
    } catch (error) {
      console.error("Unlike post error:", error);
    }
  };

  const toggleBookmark = async (postId) => {
    try {
      const userBookmark = userBookmarks.find(
        (ul) => ul.postId === postId
      )?.isBookmark;

      if (userBookmark) {
        await unBookmarkPost(postId);
      } else {
        await bookmarkPost(postId);
      }

      await bookmark_api();
    } catch (error) {
      console.error("Toggle bookmark error:", error);
    }
  };

  const bookmarkPost = async (postId) => {
    try {
      await bookmarkCollection.add({
        user_id: "SeDJYBVUGSjQGaWlzPmm",
        post_id: postId,
      });
    } catch (error) {
      console.error("Bookmark post error:", error);
    }
  };

  const unBookmarkPost = async (postId) => {
    try {
      const bookmarkId = bookmarks.find(
        (l) => l.post_id === postId && l.user_id === "Gsh6TJg50rswXPGaA7Zk"
      )?.id;
      if (bookmarkId) {
        await bookmarkCollection.doc(bookmarkId).delete();
      }
    } catch (error) {
      console.error("UnBookmark post error:", error);
    }
  };

  const renderItem = ({ item }) => {
    const postId = item.id;
    const likeCount = likeCounts.find((lc) => lc.postId === postId)?.count || 0;
    const isLiked =
      userLikes.find((ul) => ul.postId === postId)?.isLiked || false;
    const commentCount =
      commentCounts.find((cc) => cc.postId === postId)?.count || 0;
    const isBookmark =
      userBookmarks.find((ul) => ul.postId === postId)?.isBookmark || false;

    return (
      <View style={styles.root}>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: userProfileImages[item.user_id] }} // 해당하는 사용자의 프로필 이미지 URL 사용
            style={{ width: 32, height: 32 }}
          />
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
              <Image
                source={commentCount > 0 ? commentOnIcon : commentOffIcon}
                style={{ width: 18, height: 18 }}
              />
            </TouchableOpacity>
            <Text style={{ color: commentCount > 0 ? "#606060" : "#BDBDBD" }}>
              {commentCount}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => toggleBookmark(postId)}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={isBookmark ? bookmarkOnIcon : bookmarkOffIcon}
              style={{ width: 18, height: 18 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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

import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import DeleteConfirmationModal from "components/Modal/DeleteConfirmationModal";
import firestore from "@react-native-firebase/firestore"; // firestore

const BookmarkBorder = require("assets/mypage/PostListIcon/bookmark_border.png");
const FavoriteIcon = require("assets/mypage/PostListIcon/favorite.png");
const SmsIcon = require("assets/mypage/PostListIcon/sms.png");
const ProfileImage = require("assets/mypage/PostListIcon/Profile.png");
const morehoriz = require("assets/mypage/PostListIcon/morehoriz.png");
const close = require("assets/mypage/PostListIcon/close.png");
const mode = require("assets/mypage/PostListIcon/mode.png");

export function MyPagePostList_heart({ data }) {
  const loggedInUserId = data.id; // 로그인 아이디
  const usernickname = data.name; // 수정 해야함
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  //post
  const [post, setPost] = useState([]);
  const postCollection = firestore().collection("post");

  //community
  const [communities, setCommunities] = useState([]);
  const communityCollection = firestore().collection("community");

  //user
  const [user, setUser] = useState([]);
  const userCollection = firestore().collection("user");

  //like
  const [like, setLike] = useState([]);
  const likeCollection = firestore().collection("like");

  useEffect(() => {
    user_api();
    community_api();
    post_api();
    like_api();
  }, []);

  const user_api = async () => {
    try {
      const user_data = await userCollection.get();
      setUser(user_data._docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log("user error", error.message);
    }
  };

  const community_api = async () => {
    try {
      const community_data = await communityCollection.get();
      setCommunities(
        community_data._docs.map((doc) => ({
          community_id: doc._data.id,
          community_name: doc._data.name,
          isClick: false,
        }))
      );
    } catch (error) {
      console.log("community error", error.message);
    }
  };

  const post_api = async () => {
    try {
      const post_data = await postCollection.get();
      setPost(post_data._docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log("post error", error.message);
    }
  };

  const like_api = async () => {
    try {
      const like_data = await likeCollection.get();
      setLike(
        like_data._docs.map((doc) => ({
          post_id: doc._data.post_id,
          user_id: doc._data.user_id,
        }))
      );
    } catch (error) {
      console.log("like error", error.message);
    }
  };

  const onDeletePressed = () => {
    setModalVisible(false); // Close the first modal
    setDeleteModalVisible(true); // Open the delete confirmation modal
  };

  changeDate = (e) => {
    let date = e.toDate();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      if (day < 10) {
        return year + ".0" + month + ".0" + day;
      } else {
        return year + ".0" + month + "." + day;
      }
    } else {
      return year + "." + month + "." + day;
    }
  };

  const renderItem = ({ item, index }) => {
    const likedPost = like.find(
      (likeInfo) =>
        likeInfo.user_id === loggedInUserId && likeInfo.post_id === item.id
    );

    if (likedPost) {
      return (
        <View style={styles.root}>
          {/* ******텍스트 추가******** */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.categoryText}>
              {communities.map((v, i) => {
                if (v.community_id === item.community_id)
                  return v.community_name;
              })}
            </Text>
            {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={morehoriz} />
            </TouchableOpacity> */}
          </View>
          <View style={styles.profileContainer}>
            <Image
              source={ProfileImage}
              style={{ width: 35.22, height: 33.72 }}
              resizeMode="cover"
            />
            <Text style={styles.usernameText}>
              {user.map((v, i) => {
                if (v.id === item.user_id) return v.nickname;
              })}
            </Text>
            <Text style={styles.dateText}>{changeDate(item.reg_date)}</Text>
          </View>
          <View style={styles.conetntContainer}>
            <Text style={styles.contentText}>
              1. 준비 기간 : {changeDate(item.start_date)}
            </Text>
            <Text style={styles.contentText}>
              {truncateText("2. 교재 : " + item.book, 30)}{" "}
              {/* 예시로 최대 길이를 20으로 설정 */}
            </Text>
            <Text style={styles.contentText}>3. 결과 : {item.result}</Text>
          </View>
          <View style={styles.iconsContainer}>
            <View style={styles.likesContainer}>
              <Image source={FavoriteIcon} />
              <Text style={styles.likeCountText}>{item.favorites}</Text>
            </View>
            <View style={styles.commentsContainer}>
              <Image source={SmsIcon} />
              <Text style={styles.commentCountText}>{item.comments}</Text>
            </View>
            <Image source={BookmarkBorder} />
          </View>

          {/* <Modal visible={isModalVisible} transparent={true}>
            <View style={styles.modalContent}>
              <TouchableOpacity onPress={onDeletePressed}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[styles.modaltext, { marginBottom: 3 }]}>
                    삭제하기
                  </Text>
                  <Image
                    source={close}
                    style={[styles.modalicon, { marginTop: 5 }]}
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.modalDivider} />

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[styles.modaltext, { marginTop: 1 }]}>
                    수정하기
                  </Text>
                  <Image
                    source={mode}
                    style={[styles.modalicon, { marginTop: 5 }]}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </Modal> */}

          {/* <DeleteConfirmationModal
            isVisible={isDeleteModalVisible}
            onClose={() => setDeleteModalVisible(false)}
            onDelete={onDeletePressed}
          /> */}
        </View>
      );
    }
  };

  return (
    <FlatList
      data={post}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: "10%" }}
    />
  );
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  } else {
    return text;
  }
}

const styles = StyleSheet.create({
  root: {
    width: "100%", // 100% 로 수정함
    height: 178, // 178로 수정함
    borderBottomColor: "rgba(189, 189, 189, 1)",
    borderBottomWidth: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    padding: 10,
  },
  categoryText: {
    color: "#FF7474",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 22,
    marginLeft: 12,
    marginBottom: 6.32,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
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
  conetntContainer: { marginLeft: 53, marginTop: 7.5 },
  contentText: {
    color: "rgba(0, 0, 0, 1)",
    fontFamily: "Inter",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
  },
  likeCountText: {
    color: "rgba(189, 189, 189, 1)",
    fontFamily: "Inter",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "60%",
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
  modalContent: {
    // 모달 위치 수정중######################################################
    // top: 335,
    // left: 220,
    position: "absolute",
    top: 1,
    right: 1,
    width: 129,
    height: 60,
    justifyContent: "center",
    backgroundColor: "gray",
    borderRadius: 8,
    backgroundColor: "#B0B0B0",
  },
  modalDivider: {
    width: "100%",
    height: 2,
    backgroundColor: "white", // 경계선 색상 추가
  },
  modaltext: {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22, // React Native에서는 lineHeight을 별도로 지정하지 않아도 됩니다.
    marginLeft: 8,
  },
  modalicon: {
    marginRight: 10,
  },
});

// 마이페이지, 커뮤니티 페이지 컴포넌트 따로 만드는게 좋을거 같음 <--------
// 수정하기 누르면 어떤식으로 동작..?

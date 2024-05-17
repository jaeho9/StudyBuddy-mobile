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
import firestore from "@react-native-firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

const BookmarkBorder = require("assets/icons/mypage/PostListIcon/bookmark_border.png");
const FavoriteIcon = require("assets/icons/mypage/PostListIcon/favorite_border.png");
const SmsIcon = require("assets/icons/mypage/PostListIcon/sms.png");
// const ProfileImage = require("assets/icons/mypage/PostListIcon/Profile.png");
const ProfileImage = require("assets/icons/mypage/profile3.png");
const morehoriz = require("assets/icons/mypage/PostListIcon/morehoriz.png");
const close = require("assets/icons/mypage/PostListIcon/close.png");
const mode = require("assets/icons/mypage/PostListIcon/mode.png");

export function MyPagePostList({ data }) {
  const loggedInUserId = data.id;
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [post, setPost] = useState([]);
  const postCollection = firestore().collection("post");
  const [communities, setCommunities] = useState([]);
  const communityCollection = firestore().collection("community");
  const [user, setUser] = useState([]);
  const userCollection = firestore().collection("user");
  const isFocused = useIsFocused();

  useEffect(() => {
    user_api();
    community_api();
    post_api();
  }, [isFocused]);

  const user_api = async () => {
    try {
      const user_data = await userCollection.get();
      setUser(user_data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log("user error", error.message);
    }
  };

  const community_api = async () => {
    try {
      const community_data = await communityCollection.get();
      setCommunities(
        community_data.docs.map((doc) => ({
          community_id: doc.data().id,
          community_name: doc.data().name,
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
      setPost(post_data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log("post error", error.message);
    }
  };

  const openModal = (event) => {
    const { nativeEvent } = event;
    const { pageX, pageY } = nativeEvent;
    setModalPosition({ x: pageX, y: pageY });
    setModalVisible(true);
  };

  const onDeletePressed = () => {
    setModalVisible(false);
    setDeleteModalVisible(true);
  };

  const changeDate = (e) => {
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
    if (loggedInUserId === item.user_id) {
      return (
        <View style={styles.root}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.categoryText}>
              {communities.map((v, i) => {
                if (v.community_id === item.community_id)
                  return v.community_name;
              })}
            </Text>
            <TouchableOpacity onPress={openModal}>
              <Image source={morehoriz} />
            </TouchableOpacity>
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
              {truncateText("2. 교재 : " + item.book, 30)}
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

          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="fade"
            statusBarTranslucent={true}
          >
            <View
              style={{ top: modalPosition.y + 33, left: modalPosition.x - 125 }}
            >
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={onDeletePressed}>
                  <View style={styles.modalButton1}>
                    <Text style={styles.modaltext}>삭제하기</Text>
                    <Image source={close} style={styles.modalicon} />
                  </View>
                </TouchableOpacity>

                <View style={{ marginLeft: -8 }}>
                  <View style={styles.modalDivider} />
                </View>

                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <View style={styles.modalButton2}>
                    <Text style={styles.modaltext}>수정하기</Text>
                    <Image source={mode} style={styles.modalicon} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <DeleteConfirmationModal
            isVisible={isDeleteModalVisible}
            onClose={() => setDeleteModalVisible(false)}
            onDelete={onDeletePressed}
            postId={loggedInUserId}
          />
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
    width: "100%",
    height: 178,
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
    marginLeft: 10,
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
    numberOfLines: 1,
    ellipsizeMode: "tail",
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
    marginLeft: "70%",
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
  modalButton1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 3,
  },
  modalButton2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 3,
  },
  modalContent: {
    backgroundColor: "#B0B0B0",
    borderRadius: 8,
    justifyContent: "center",
    padding: 8,
    width: 129,
    height: 60,
  },
  modalDivider: {
    height: 2,
    width: 129,
    backgroundColor: "white",
  },
  modaltext: {
    color: "#FFF",
    fontFamily: "Inter",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
    marginLeft: 8,
  },
  modalicon: {
    marginRight: 10,
  },
});

export default MyPagePostList;

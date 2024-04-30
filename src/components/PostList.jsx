import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const dummy_data = [
  {
    id: "1", // 고유 ID 추가
    category: "정보처리기사", // MyPage용? 추가 <<<<<<< 더미 데이터를 페이지에서 적용하는 방법..?
    name: "김도영",
    date: "2023.02.04",
    length: "2주", // 오타 수정 ('legnth' -> 'length')
    content1: "1. 준비 기간 : 2주",
    content2: "2. 교재 : X",
    content3: "3. 결과: 합격!",
    favorites: "123",
    comments: "123",
  },
];

export function PostList() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const onDeletePressed = () => {
    setModalVisible(false); // Close the first modal
    setDeleteModalVisible(true); // Open the delete confirmation modal
  };

  const BookmarkBorder = require("../assets/PostListIcon/bookmark_border.png");
  const FavoriteIcon = require("../assets/PostListIcon/favorite_border.png");
  const SmsIcon = require("../assets/PostListIcon/sms.png");
  const ProfileImage = require("../assets/PostListIcon/Profile.png");
  const morehoriz = require("../assets/PostListIcon/morehoriz.png");
  const close = require("../assets/PostListIcon/close.png");
  const mode = require("../assets/PostListIcon/mode.png");

  const renderItem = ({ item }) => (
    <View style={styles.root}>
      {/* ******텍스트 추가******** */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.categoryText}>{item.category}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={morehoriz} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={ProfileImage}
          style={{ width: 35.22, height: 33.72 }}
          resizeMode="cover"
        />
        <Text style={styles.usernameText}>{item.name}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={styles.conetntContainer}>
        <Text style={styles.contentText}>{item.content1}</Text>
        <Text style={styles.contentText}>{item.content2}</Text>
        <Text style={styles.contentText}>{item.content3}</Text>
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
      <Modal visible={isModalVisible} transparent={true}>
        {/* 모달 내용 */}
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onDeletePressed}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
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
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[styles.modaltext, { marginTop: 1 }]}>수정하기</Text>
              <Image
                source={mode}
                style={[styles.modalicon, { marginTop: 5 }]}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
      <DeleteConfirmationModal
        isVisible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onDelete={onDeletePressed}
      />
    </View>
  );

  return (
    <FlatList
      data={dummy_data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
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
    top: 335,
    left: 220,
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

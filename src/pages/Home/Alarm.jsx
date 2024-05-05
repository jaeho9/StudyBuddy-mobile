import React, { useState } from "react";
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
// Header
import Header from "../../components/Tab/header";
import RemoveModal from "components/Modal/RemoveModal";
// Images
const backIcon = require("assets/icons/home/back.png");
const deleteIcon = require("assets/icons/home/delete.png");
const writeOn = require('assets/icons/home/write_on.png');
const writeOff = require('assets/icons/home/write_off.png');
const heartOn = require('assets/icons/home/heart_on.png');
const heartOff = require('assets/icons/home/heart_off.png');
const commentOn = require('assets/icons/home/comment_on.png');
const commentOff = require('assets/icons/home/comment_off.png');
const close = require('assets/icons/home/close.png');
const complete = require('assets/icons/home/complete.png');

const { width, height } = Dimensions.get("window");

// Dummy_data
const dummy_data = [
  {
    id: 1,
    name: '정보처리기사',
    nickname: '김도영',
    content: 'heart'
  },
  {
    id: 2,
    name: '정보보안기사',
    nickname: '하지혜',
    content: 'comment'
  },
  {
    id: 3,
    name: '정보처리기사',
    nickname: '이재호',
    content: 'feed'
  },
  {
    id: 4,
    name: '컴퓨터활용능력',
    nickname: '김지형',
    content: 'heart'
  },
  {
    id: 5,
    name: 'TOEIC',
    nickname: '김상우',
    content: 'feed'
  }
]

const Alarm = () => {
  const [deleteMode, setDeleteMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // 삭제
  const handleDeleteClick = () => {
    setDeleteMode(true);
  };
  // 완료
  const handleCompleteClick = () => {
    setDeleteMode(false);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 24, borderBottomWidth: 1, borderBottomColor: '#DDDDDD' }}
      >
        {item.content === 'heart' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={heartOn} style={{ width: 32, height: 32 }} />
            <View style={{ marginLeft: 12, gap: 6 }}>
              <Text style={{ fontSize: 14, fontWeight: 700, color: '#FF7474' }}>{item.name}</Text>
              <Text style={{ fontSize: 14, color: '#7A7A7A' }}>{item.nickname}님이 회원님의 게시물을 좋아합니다.</Text>
            </View>
          </View>
        ) : item.content === 'comment' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={commentOn} style={{ width: 32, height: 32 }} />
            <View style={{ marginLeft: 12, gap: 6 }}>
              <Text style={{ fontSize: 14, fontWeight: 700, color: '#FF7474' }}>{item.name}</Text>
              <Text style={{ fontSize: 14, color: '#7A7A7A' }}>{item.nickname}님이 댓글을 남겼습니다.</Text>
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={writeOn} style={{ width: 32, height: 32 }} />
            <View style={{ marginLeft: 12, gap: 6 }}>
              <Text style={{ fontSize: 14, fontWeight: 700, color: '#FF7474' }}>{item.name}</Text>
              <Text style={{ fontSize: 14, color: '#7A7A7A' }}>{item.nickname}님이 새 게시물을 작성했습니다.</Text>
            </View>
          </View>
        )
        }

        {/* 삭제모드 */}
        {deleteMode && (
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <Image source={close} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        left={backIcon}
        title={"알림"}
        right={deleteMode ? complete : deleteIcon}
        leftClick={"Home"}
        rightClick={deleteMode ? handleCompleteClick : handleDeleteClick}
      />
      <FlatList
        data={dummy_data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
      />

      <RemoveModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </SafeAreaView>
  );
};
export default Alarm;

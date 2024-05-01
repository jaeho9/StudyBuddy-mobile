import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import CustomHeader from "components/CustomHeader";
import { DeleteModal } from "components/DeleteModal";
import { ModalSelectorPopup } from "components/CustomModal2";
import { dummy_comment } from "dummy_data";

const backIcon = require("assets/icons/archives/back.png");
const fileIcon = require("assets/icons/archives/file.png");
const heartOffIcon = require("assets/icons/archives/heart_off.png");
const heartOnIcon = require("assets/icons/archives/heart_on.png");
const commentOffIcon = require("assets/icons/archives/comment_off.png");
const commentOnIcon = require("assets/icons/archives/comment_on.png");
const bookmarkOnIcon = require("assets/icons/archives/bookmark_on.png");
const bookmarkOffIcon = require("assets/icons/archives/bookmark_off.png");
const moreIcon = require("assets/icons/archives/more.png");

const Post = ({ route }) => {
  const { commentId, commentEdit, item } = route.params;
  const navigation = useNavigation();
  const [detailClick, setDetailClick] = useState(item);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [comment, setComment] = useState();

  var more = useRef([]);
  const [ModalSelectorPopupVisible, setModalSelectorPopupVisible] = useState(
    []
  );
  const [modalX, setModalX] = useState([]);
  const [modalY, setModalY] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    setTimeout(
      () =>
        more.current.forEach((element) => {
          element.measure((fx, fy, width, height, px, py) => {
            setModalX((modalX) => [...modalX, px - width * 4]);
            setModalY((modalY) => [...modalY, py + height]);
            setModalSelectorPopupVisible((ModalSelectorPopupVisible) => [
              ...ModalSelectorPopupVisible,
              false,
            ]);
          });
        }),
      0
    );
  }, []);

  useEffect(() => {
    ModalSelectorPopupVisible.map((e, i) => {
      if (e === true) {
        console.log(e, i);
        let copiedModal = [...ModalSelectorPopupVisible];
        copiedModal[i] = false;
        setModalSelectorPopupVisible(copiedModal);
      }
    });
  }, [isFocused]);

  goodsMoreButtonClicked = (id) => {
    more.current[id].measure((fx, fy, width, height, px, py) => {
      let copiedY = [...modalY];
      copiedY[id] = py + height;
      setModalY(copiedY);

      let copiedModal = [...ModalSelectorPopupVisible];
      copiedModal[id] = true;
      setModalSelectorPopupVisible(copiedModal);
    });
    console.log("post", ModalSelectorPopupVisible);
  };

  changeVisible = (id) => {
    let copiedModal = [...ModalSelectorPopupVisible];
    copiedModal[id] = false;
    setModalSelectorPopupVisible(copiedModal);
  };

  const renderComment = ({ item, index }) => {
    return (
      <View style={{ marginVertical: 8 }}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={
            ModalSelectorPopupVisible[item.id]
              ? ModalSelectorPopupVisible[item.id]
              : false
          }
          onRequestClose={() => {
            let copiedModal = [...ModalSelectorPopupVisible];
            copiedModal[item.id] = false;
            setModalSelectorPopupVisible(copiedModal);
          }}
        >
          <ModalSelectorPopup
            x={modalX[item.id]}
            y={modalY[item.id]}
            id={item.id}
            comment={item.comment}
            item={route.params}
            navigation={navigation}
            visible={ModalSelectorPopupVisible[item.id]}
            changeVisible={() => this.changeVisible(item.id)}
            closeModalPopupMenu={() => {
              let copiedModal = [...ModalSelectorPopupVisible];
              copiedModal[item.id] = false;
              setModalSelectorPopupVisible(copiedModal);
            }}
          />
        </Modal>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Image source={item.profileImg} style={{ width: 32, height: 32 }} />
          <View>
            <Text style={{ fontSize: 14, color: "#000000" }}>김도영</Text>
            <Text style={{ fontSize: 10, color: "#969696" }}>{item.date}</Text>
          </View>
          <TouchableOpacity
            ref={(e) => (more.current[item.id] = e)}
            onPress={() => this.goodsMoreButtonClicked(item.id)}
            style={{
              position: "absolute",
              top: 9,
              right: 11,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0)",
            }}
          >
            <Image source={moreIcon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
        <View style={{ paddingTop: 10 }}>
          <Text>{item.id === commentId ? commentEdit : item.comment}</Text>
        </View>
      </View>
    );
  };

  const handleClickBookmark = () => {
    console.log(commentId);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      <CustomHeader left={backIcon} title={"게시물"} leftClick={"Archives"} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          marginHorizontal: 12,
          marginTop: 14,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <View style={{ paddingTop: 15, paddingHorizontal: 27 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#ff7474" }}>
            {item.community_name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              gap: 5,
            }}
          >
            <Image source={item.profileImg} style={{ width: 32, height: 32 }} />
            <Text style={{ fontSize: 14, color: "#000000" }}>{item.name}</Text>
            <Text style={{ fontSize: 10, color: "#969696" }}>{item.date}</Text>
          </View>
          <View style={{ marginTop: 11, gap: 7 }}>
            <Text style={{ fontSize: 12, color: "#000000" }}>
              1. 준비 기간 : {item.period}
            </Text>
            <Text style={{ fontSize: 12, color: "#000000" }}>
              2. 교재 : {item.book}
            </Text>
            <Text style={{ fontSize: 12, color: "#000000" }}>
              3. 결과 : {item.result}
            </Text>
            <View style={{ gap: 7 }}>
              <Text style={{ fontSize: 12, color: "#000000" }}>
                4. 공부 방법
              </Text>
              <Text style={{ paddingLeft: 11, fontSize: 12, color: "#000000" }}>
                {item.study}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              padding: 6,
              gap: 4,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 8,
            }}
          >
            <Image source={fileIcon} style={{ width: 16, height: 16 }} />
            <View>
              <Text style={{ fontSize: 12, color: "#606060" }}>
                정보처리기사 필기 요약.pdf
              </Text>
              <Text style={{ fontSize: 12, color: "#606060" }}>
                정보처리기사 필기 요약.pdf
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 14,
              gap: 11,
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
              <TouchableOpacity onPress={() => handleClickHeart(item)}>
                <Image
                  source={item.heartClick ? heartOnIcon : heartOffIcon}
                  style={{ width: 18, height: 18 }}
                />
              </TouchableOpacity>
              <Text style={{ color: item.heartClick ? "#ff7474" : "#bdbdbd" }}>
                {item.heart}
              </Text>
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
                  source={item.commentClick ? commentOnIcon : commentOffIcon}
                  style={{ width: 18, height: 18 }}
                />
              </TouchableOpacity>
              <Text
                style={{ color: item.commentClick ? "#606060" : "#bdbdbd" }}
              >
                {item.comment}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                // handleClickBookmark(item.id);
                handleClickBookmark();
              }}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                // source={item.bookmark ? bookmarkOnIcon : bookmarkOffIcon}
                source={bookmarkOnIcon}
                style={{ width: 18, height: 18 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: "#ddd",
            padding: 15,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 12, color: "#333" }}>댓글</Text>
          <FlatList
            data={dummy_comment}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
          />
        </View>
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 11,
          marginBottom: 14,
          borderWidth: 1,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          borderColor: "#e0e0e0",
          backgroundColor: "#fff",
        }}
      >
        <TextInput
          placeholder="댓글을 입력하세요"
          value={comment}
          onChangeText={(text) => setComment(text)}
          style={{
            flex: 1,
            backgroundColor: "#F5F5F5",
            borderRadius: 12,
            margin: 9,
            padding: 8,
          }}
        />
        <TouchableOpacity style={{ paddingRight: 8 }}>
          <Text>등록</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Post;

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import ActionButton from "react-native-action-button";
import CustomHeader from "components/CustomHeader";
import { ModalSelectorPopup } from "components/CustomModal2";
import { dummy_communityList, dummy_communityDetail } from "dummy_data";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const menuIcon = require("assets/icons/archives/menu.png");
const profileImg = require("assets/icons/archives/profile.png");
const searchIcon = require("assets/icons/archives/search.png");
const sortIcon = require("assets/icons/archives/down.png");
const moreIcon = require("assets/icons/archives/more.png");
const alarmOffIcon = require("assets/icons/archives/alarm_off.png");
const alarmOnIcon = require("assets/icons/archives/alarm_on.png");
const heartOffIcon = require("assets/icons/archives/heart_off.png");
const heartOnIcon = require("assets/icons/archives/heart_on.png");
const commentOffIcon = require("assets/icons/archives/comment_off.png");
const commentOnIcon = require("assets/icons/archives/comment_on.png");
const bookmarkOnIcon = require("assets/icons/archives/bookmark_on.png");
const bookmarkOffIcon = require("assets/icons/archives/bookmark_off.png");
// const Icon = require('assets/icons/archives/.png')

const dummy_profile = [
  {
    id: 0,
    nickname: "김도영",
  },
];

const Archives = ({ navigation }) => {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [listclick, setListClick] = useState(dummy_communityList);
  const [detailClick, setDetailClick] = useState(dummy_communityDetail);
  const detailLastIndex = dummy_communityDetail.length - 1;
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
  };

  changeVisible = (id) => {
    let copiedModal = [...ModalSelectorPopupVisible];
    copiedModal[id] = false;
    setModalSelectorPopupVisible(copiedModal);
    setDeleteVisible(true);
  };

  changeDate = (item) => {
    var startDateArr = item.startDate.split("-");
    var endDateArr = item.endDate.split("-");

    var startDateCompare = new Date(
      startDateArr[0],
      startDateArr[1],
      startDateArr[2]
    );
    var endDateCompare = new Date(endDateArr[0], endDateArr[1], endDateArr[2]);

    const diffDate = endDateCompare.getTime() - startDateCompare.getTime();
    const diffDateCalc = Math.abs(diffDate / (1000 * 60 * 60 * 24));

    // console.log(diffDateCalc, "일");
    return diffDateCalc + "일";
  };

  const handleClickList = (index) => {
    setListClick(
      dummy_communityList.map((v, i) => {
        if (v.isClick === true) {
          v.isClick = false;
        }
        if (v.id === index) {
          v.isClick = !v.isClick;
        }
        return v;
      })
    );
  };

  const renderCommunityList = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => handleClickList(item.id)}
        style={{
          marginLeft: 14,
          marginVertical: 6,
          borderRadius: 12,
          borderWidth: item.isClick ? 0 : 1,
          borderColor: item.isClick ? "rgba(255, 116, 116, 0.12)" : "#dddddd",
          alignSelf: "flex-start",
          paddingHorizontal: 7,
          paddingVertical: 4,
          backgroundColor: item.isClick ? "rgba(255, 116, 116, 0.12)" : "#fff",
        }}
      >
        <Text style={{ color: item.isClick ? "#FF7474" : "#9C9C9C" }}>
          {item.community_name}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleClickHeart = (index) => {
    setDetailClick(
      dummy_communityDetail.map((v, i) => {
        if (v.id === index) {
          v.heartClick = !v.heartClick;
          if (v.heartClick) {
            v.heart += 1;
          } else {
            v.heart -= 1;
          }
        }
        return v;
      })
    );
  };

  const handelClickComment = (item) => {};

  const handleClickBookmark = (index) => {
    setDetailClick(
      dummy_communityDetail.map((v, i) => {
        if (v.id === index) {
          v.bookmark = !v.bookmark;
        }
        return v;
      })
    );
  };

  const renderCommunityDetail = (item) => {
    return (
      item.bookmark && (
        <TouchableOpacity
          onPress={() => navigation.navigate("Post", { item: item })}
          style={{
            backgroundColor: "#fff",
            marginHorizontal: 12,
            marginBottom: detailLastIndex === item.id ? 80 : 12,
            paddingVertical: 15,
            paddingHorizontal: 12,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#ff7474" }}>
            {item.community_name}
          </Text>
          <View style={{ marginTop: 8 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Image
                source={item.profileImg}
                style={{ width: 32, height: 32 }}
              />

              <Text style={{ fontSize: 14, color: "#000000" }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 10, color: "#969696" }}>
                {item.date}
              </Text>
            </View>
            <View style={{ marginHorizontal: 40, gap: 7 }}>
              <Text style={{ fontSize: 12, color: "#000000" }}>
                1. 준비 기간 : {changeDate(item)}
              </Text>
              <Text style={{ fontSize: 12, color: "#000000" }}>
                2. 교재 : {item.book}
              </Text>
              <Text style={{ fontSize: 12, color: "#000000" }}>
                3. 결과 : {item.result}
              </Text>
            </View>
          </View>
          {dummy_profile[0].nickname === item.name && (
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
                item={item}
                navigation={navigation}
                visible={ModalSelectorPopupVisible[item.id]}
                // deleteVisible={deleteVisible}
                changeVisible={() => this.changeVisible(item.id)}
                closeModalPopupMenu={() => {
                  let copiedModal = [...ModalSelectorPopupVisible];
                  copiedModal[item.id] = false;
                  setModalSelectorPopupVisible(copiedModal);
                }}
              />
            </Modal>
          )}

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
            {dummy_profile[0].nickname === item.name && (
              <Image source={moreIcon} style={{ width: 24, height: 24 }} />
            )}
          </TouchableOpacity>

          <View style={{ width: 24, height: 24 }} />
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              right: 11,
              bottom: 9,
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
              <TouchableOpacity onPress={() => handleClickHeart(item.id)}>
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
              <TouchableOpacity onPress={() => handelClickComment(item)}>
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
                handleClickBookmark(item.id);
              }}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={item.bookmark ? bookmarkOnIcon : bookmarkOffIcon}
                style={{ width: 18, height: 18 }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    );
  };

  const renderCommunityListClick = ({ item, index }) => {
    return dummy_communityList.map((v, i) => {
      if (v.isClick === true && v.community_name === "전체") {
        return renderCommunityDetail(item);
      } else if (v.isClick === true && v.community_name === item.community_name)
        return renderCommunityDetail(item);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      <CustomHeader left={menuIcon} title={"Archives"} right={alarmOffIcon} />
      <View style={{ flexDirection: "row" }}>
        <FlatList
          data={dummy_communityList}
          renderItem={renderCommunityList}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews
        />
        <TouchableOpacity style={{ marginVertical: 9, marginHorizontal: 12 }}>
          <Image source={searchIcon} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginRight: 12,
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            position: "absolute",
            right: 0,
          }}
        >
          <Text>좋아요순</Text>
          <Image source={sortIcon} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={dummy_communityDetail}
        renderItem={renderCommunityListClick}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
      />
      <ActionButton
        offsetY={80}
        buttonColor="#ff7474"
        onPress={() => navigation.navigate("AddPost")}
      />
    </SafeAreaView>
  );
};

export default Archives;

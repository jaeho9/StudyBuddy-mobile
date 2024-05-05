import React, { useEffect, useState, useRef } from "react";
import { View, Image, TouchableOpacity, SafeAreaView, Dimensions, FlatList, Text, Modal } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
// FireStore
import firestore from '@react-native-firebase/firestore';

// Header
import Header from '../../components/Tab/header';

import ModalSelectorPopup from "../../components/Modal/CustomModal2";

import SelectPicker from "components/SelectPicker";

// Images
const logo = require('assets/icons/home/logo.png');
const add = require('assets/icons/home/add.png');
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

const { width, height } = Dimensions.get("window");

// Dummy_data
const dummy_profile = [
  {
    id: 0,
    nickname: "김도영",
  },
];

const dummy_communityList = [
  {
    id: 0,
    community_name: "전체",
    isClick: true,
  },
  {
    id: 1,
    community_name: "정보처리기능사",
    isClick: false,
  },
  {
    id: 2,
    community_name: "정보처리기사",
    isClick: false,
  },
  {
    id: 3,
    community_name: "정보처리산업기사",
    isClick: false,
  },
  {
    id: 4,
    community_name: "정보보안기사",
    isClick: false,
  },
];

const dummy_communityDetail = [
  {
    id: 0,
    community_name: "정보처리기능사",
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김똥",
    date: "2023.02.04",
    period: "2주",
    startDate: "2024-04-01",
    endDate: "2024-04-07",
    book: "x",
    result: "합격",
    study: "1주차에는 개념 정리 \n2주차에는 기출문제 풀기",
    heart: 122,
    heartClick: false,
    comment: 122,
    commentClick: false,
    bookmark: true,
  },
  {
    id: 1,
    community_name: "정보처리기사",
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김도영",
    date: "2023.02.04",
    period: "2주",
    startDate: "2024-04-01",
    endDate: "2024-04-08",
    book: "x",
    result: "합격",
    study: "1주차에는 개념 정리 \n2주차에는 기출문제 풀기",
    heart: 123,
    heartClick: true,
    comment: 123,
    commentClick: true,
    bookmark: true,
  },
  {
    id: 2,
    community_name: "정보처리산업기사",
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김도영",
    date: "2023.02.04",
    period: "2주",
    startDate: "2024-04-01",
    endDate: "2024-04-02",
    book: "x",
    result: "합격",
    study: "1주차에는 개념 정리 \n2주차에는 기출문제 풀기",
    heart: 123,
    heartClick: true,
    comment: 123,
    commentClick: true,
    bookmark: true,
  },
  {
    id: 3,
    community_name: "정보보안기사",
    profileImg: require("assets/icons/archives/profile.png"),
    name: "이제호",
    date: "2023.02.04",
    period: "2주",
    startDate: "2024-04-01",
    endDate: "2024-04-20",
    book: "x",
    result: "합격",
    study: "1주차에는 개념 정리 \n2주차에는 기출문제 풀기",
    heart: 123,
    heartClick: true,
    comment: 123,
    commentClick: true,
    bookmark: true,
  },
  {
    id: 4,
    community_name: "정보보안기사",
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김도영",
    date: "2023.02.04",
    period: "2주",
    startDate: "2024-04-01",
    endDate: "2024-04-17",
    book: "x",
    result: "합격",
    study: "1주차에는 개념 정리 \n2주차에는 기출문제 풀기",
    heart: 123,
    heartClick: true,
    comment: 123,
    commentClick: true,
    bookmark: true,
  },
];

const dummy_comment = [
  {
    id: 0,
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김도영",
    date: "2023.02.04",
    comment: "이 자료 덕분에 합격했어요! 감사합니다 :)",
  },
  {
    id: 1,
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김똥",
    date: "2023.02.04",
    comment: "이 자료 덕분에 합격했어요! 감사합니다 :)",
  },
  {
    id: 2,
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김똥",
    date: "2023.02.04",
    comment: "이 자료 덕분에 합격했어요! 감사합니다 :)",
  },
  {
    id: 3,
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김똥",
    date: "2023.02.04",
    comment: "이 자료 덕분에 합격했어요! 감사합니다 :)",
  },
  {
    id: 4,
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김똥",
    date: "2023.02.04",
    comment: "이 자료 덕분에 합격했어요! 감사합니다 :)",
  },
  {
    id: 5,
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김똥",
    date: "2023.02.04",
    comment: "이 자료 덕분에 합격했어요! 감사합니다 :)",
  },
  {
    id: 6,
    profileImg: require("assets/icons/archives/profile.png"),
    name: "김똥",
    date: "2023.02.04",
    comment: "이 자료 덕분에 합격했어요! 감사합니다 :)",
  },
];

const Home = ({ navigation, route }) => {

  const [sort, setSort] = useState("");
  const onChangeSort = (value) => setSort(value);

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

  // 커뮤니티 목록
  const renderCommunityList = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => handleClickList(item.id)}
        style={{
          marginRight: 8,
          borderRadius: 16,
          borderWidth: item.isClick ? 0 : 1,
          borderColor: item.isClick ? "rgba(255, 116, 116, 0.12)" : "#dddddd",
          alignSelf: "flex-start",
          padding: 8,
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

  const handelClickComment = (item) => { };

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
      <TouchableOpacity
        onPress={() => navigation.navigate("Post", { item: item })}
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 20,
          marginBottom: detailLastIndex === item.id ? 80 : 12,
          paddingHorizontal: 16,
          paddingVertical: 20,
          borderRadius: 12,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ff7474" }}>
          {item.community_name}
        </Text>
        <View style={{ marginTop: 12 }}>
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 6, }}>
            <Image
              source={item.profileImg}
              style={{ width: 32, height: 32 }}
            />
            <Text style={{ fontSize: 16, color: "#000000" }}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 12, color: "#969696" }}>
              {item.date}
            </Text>
          </View>
          <View style={{ marginTop: 8, marginHorizontal: 40, gap: 8 }}>
            <Text style={{ fontSize: 14, color: "#000000" }}>
              1. 준비 기간 : {changeDate(item)}
            </Text>
            <Text style={{ fontSize: 14, color: "#000000" }}>
              2. 교재 : {item.book}
            </Text>
            <Text style={{ fontSize: 14, color: "#000000" }}>
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
    );
  };

  // 게시판
  const renderCommunityListClick = ({ item, index }) => {
    return dummy_communityList.map((v, i) => {
      if (v.isClick === true && v.community_name === "전체") {
        return renderCommunityDetail(item);
      } else if (v.isClick === true && v.community_name === item.community_name)
        return renderCommunityDetail(item);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
      <Header
        left={menuIcon}
        title={logo}
        right={alarmOffIcon}
        rightClick={() => navigation.navigate('Alarm')}
        leftClick={"Alarm"}
      />

      {/* 커뮤니티 목록 */}
      <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', marginTop: 8, marginHorizontal: 14 }}>
        <FlatList
          data={dummy_communityList}
          renderItem={renderCommunityList}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={{ marginVertical: 9, marginLeft: 12 }}
        >
          <Image source={searchIcon} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>

      {/* 게시판 */}
      <FlatList
        data={dummy_communityDetail}
        renderItem={renderCommunityListClick}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        ListHeaderComponent={() => (
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 8, marginRight: 18, marginBottom: 10 }}>
            <SelectPicker
              onChangeSort={onChangeSort}
            />
            <Image source={sortIcon} style={{ width: 24, height: 24 }} />
          </View>
        )}
      />

      <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', right: 0, bottom: 80, position: 'absolute', zIndex: 10, marginRight: 12 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
          <Image source={add} style={{ width: 68, height: 68 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
};
export default Home;

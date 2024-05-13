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

import { useNavigation, useIsFocused } from "@react-navigation/native";
// FireStore
import firestore from "@react-native-firebase/firestore";
// Components
import Header from "components/Tab/Header";
import { ModalSelect } from "components/Modal/CustomModal";
// SelectPicker
import SelectPicker from "components/SelectPicker";
import { Firestore } from "@firebase/firestore";
// Images
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
const add = require("assets/icons/home/add.png");

const Archives = ({ navigation }) => {
  // Select Picker
  const [sort, setSort] = useState("");
  const onChangeSort = (value) => setSort(value);

  //post
  const [post, setPost] = useState([]);
  const postCollection = firestore().collection("post");

  //community
  const [community, setCommunity] = useState([]);
  const [joinCommunities, setJoinCommunities] = useState([]);
  const [communities, setCommunities] = useState([]);
  const communityCollection = firestore().collection("community");

  //join
  const [join, setJoin] = useState([]);
  const joinCollection = firestore().collection("join");

  //user
  const [user, setUser] = useState([]);
  const userCollection = firestore().collection("user");

  //like
  const [like, setLike] = useState([]);
  const likeCollection = firestore().collection("like");

  //bookmark
  const [bookmark, setBookmark] = useState([]);
  const [bookmarkPost, setBookmarkPost] = useState([]);
  const bookmarkCollection = firestore().collection("bookmark");

  const [whole, setWhole] = useState([
    {
      community_id: 0,
      community_name: "전체",
      isClick: true,
    },
  ]);

  const [lastIndex, setLastIndex] = useState(0);

  // custom modal
  var more = useRef([]);
  const [modalSelectVisible, setModalSelectVisible] = useState([]);
  const deleteVisible = useRef(true);
  const [modalX, setModalX] = useState([]);
  const [modalY, setModalY] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    user_api();
    community_api();
    join_api();
    post_api();
    // like_api();
    bookmark_api();
    setTimeout(
      () =>
        more.current.forEach((element) => {
          element.measure((fx, fy, width, height, px, py) => {
            setModalX((modalX) => [...modalX, px - width * 4]);
            setModalY((modalY) => [...modalY, py + height]);
            setModalSelectVisible((modalSelectVisible) => [
              ...modalSelectVisible,
              false,
            ]);
          });
        }),
      0
    );
  }, []);

  useEffect(() => {
    etc();
    console.log(bookmark);
  }, [bookmark]);

  useEffect(() => {}, [communities]);

  useEffect(() => {
    post_api();
    modalSelectVisible.map((e, i) => {
      if (e === true) {
        let copiedModal = [...modalSelectVisible];
        copiedModal[i] = false;
        setModalSelectVisible(copiedModal);
      }
    });
  }, [isFocused]);

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
      setCommunity(
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

  const join_api = async () => {
    try {
      const join_data = await joinCollection.get();
      setJoin(join_data._docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log("post error", error.message);
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

  const bookmark_id_api = async () => {
    try {
      const bookmark_id_data = await bookmarkCollection
        .where("user_id", "==", "SeDJYBVUGSjQGaWlzPmm")
        .get();
      bookmark_id_data._docs.map((doc) => console.log("bookmark", doc));
    } catch (error) {
      console.log("bookmark id error", error.message);
    }
  };

  const bookmark_api = async () => {
    try {
      const bookmark_data = await bookmarkCollection.get();
      setBookmark(
        bookmark_data._docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.log("bookmark error", error.message);
    }
  };

  etc = () => {
    setLastIndex(post.length - 1);
    let arr = [];
    join.map((v, i) => {
      if (v.user_id === "SeDJYBVUGSjQGaWlzPmm") {
        community.map((a, b) => {
          if (a.community_id === v.community_id) {
            arr.push({
              community_id: a.community_id,
              community_name: a.community_name,
              isClick: a.isClick,
            });
          }
        });
      }
    });
    // setCommunities(whole.concat(community));
    setCommunities(whole.concat(arr));
    setJoinCommunities(arr);
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

  goodsMoreButtonClicked = (id) => {
    more.current[id].measure((fx, fy, width, height, px, py) => {
      let copiedX = [...modalX];
      copiedX[id] = px - width * 4;
      setModalX(copiedX);

      let copiedY = [...modalY];
      copiedY[id] = py + height;
      setModalY(copiedY);

      let copiedModal = [...modalSelectVisible];
      copiedModal[id] = true;
      setModalSelectVisible(copiedModal);
    });
  };

  modalVisible = (id) => {
    let copiedModal = [...modalSelectVisible];
    copiedModal[id] = false;
    setModalSelectVisible(copiedModal);
  };

  const onPressCommunityList = (item) => {
    setCommunities(
      communities.map((v, i) => {
        if (v.isClick === true) {
          v.isClick = false;
        }
        if (v.community_name === item.community_name) {
          v.isClick = !v.isClick;
        }
        return v;
      })
    );
  };

  // 내가 가입한 커뮤니티 리스트만 보여야 함 + 커뮤니티 디비 설계해야 함
  const renderCommunityList = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => onPressCommunityList(item)}
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

  //내가 북마크 누른 게시물이 보여짐
  const renderCommunityDetail = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Post", {
            post_id: item.id,
          })
        }
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 20,
          // marginBottom: lastIndex === index ? 80 : 12,
          marginBottom: 12,
          paddingVertical: 20,
          paddingHorizontal: 16,
          borderRadius: 12,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ff7474" }}>
          {communities.map((v, i) => {
            if (v.community_id === item.community_id) return v.community_name;
          })}
        </Text>
        <View style={{ marginTop: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Image source={profileImg} style={{ width: 32, height: 32 }} />

            <Text style={{ fontSize: 16, color: "#000000" }}>
              {user.map((v, i) => {
                if (v.id === item.user_id) return v.nickname;
              })}
            </Text>
            <Text style={{ fontSize: 12, color: "#969696" }}>
              {changeDate(item.reg_date)}
            </Text>
          </View>
          <View style={{ marginHorizontal: 40, gap: 8, marginTop: 8 }}>
            <Text style={{ fontSize: 14, color: "#000000" }}>
              1. 준비 기간 : {changeDate(item.start_date)} ~{" "}
              {changeDate(item.end_date)}
            </Text>
            <Text style={{ fontSize: 14, color: "#000000" }}>
              2. 교재 : {item.book}
            </Text>
            <Text style={{ fontSize: 14, color: "#000000" }}>
              3. 결과 : {item.result}
            </Text>
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={
            modalSelectVisible[index] ? modalSelectVisible[index] : false
          }
          onRequestClose={() => {
            let copiedModal = [...modalSelectVisible];
            copiedModal[index] = false;
            setModalSelectVisible(copiedModal);
          }}
        >
          <ModalSelect
            x={modalX[index]}
            y={modalY[index]}
            post={item.id}
            navigation={navigation}
            modalVisible={() => this.modalVisible(index)}
            closeModalPopupMenu={() => {
              let copiedModal = [...modalSelectVisible];
              copiedModal[index] = false;
              setModalSelectVisible(copiedModal);
            }}
          />
        </Modal>
        <TouchableOpacity
          ref={(e) => (more.current[index] = e)}
          onPress={() => this.goodsMoreButtonClicked(index)}
          style={{
            position: "absolute",
            top: 9,
            right: 11,
            borderWidth: 1,
            borderColor: "rgba(0,0,0,0)",
          }}
        >
          {item.user_id === "SeDJYBVUGSjQGaWlzPmm" && (
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
            <TouchableOpacity onPress={() => onPressLike(item)}>
              <Image source={heartOffIcon} style={{ width: 18, height: 18 }} />
            </TouchableOpacity>
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
                source={commentOffIcon}
                style={{ width: 18, height: 18 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={bookmarkOnIcon} style={{ width: 18, height: 18 }} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  //내가 가입한 커뮤니티만 나오게 만들어야함
  const renderCommunityListClick = ({ item, index }) => {
    return bookmark?.map((a, b) => {
      var detail;
      if (item.id === a.post_id && a.user_id === "SeDJYBVUGSjQGaWlzPmm") {
        communities?.map((c, d) => {
          if (c.isClick === true && c.community_name === "전체") {
            detail = renderCommunityDetail({ item, index });
          } else if (
            c.isClick === true &&
            c.community_id === item.community_id
          ) {
            detail = renderCommunityDetail({ item, index });
          }
        });
      }
      return detail;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      <Header
        left={menuIcon}
        title={"Archives"}
        right={alarmOffIcon}
        rightClick={() => navigation.navigate("Alarm")}
      />

      {/* 커뮤니티 목록 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 8,
          marginHorizontal: 14,
        }}
      >
        <FlatList
          data={communities}
          renderItem={renderCommunityList}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={{ marginVertical: 9, marginLeft: 12 }}
        >
          <Image source={searchIcon} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>

      {/* 게시판 */}
      <FlatList
        data={post}
        renderItem={renderCommunityListClick}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: 8,
              marginRight: 18,
              marginBottom: 10,
            }}
          >
            <SelectPicker onChangeSort={onChangeSort} />
            <Image source={sortIcon} style={{ width: 24, height: 24 }} />
          </View>
        )}
      />

      {/* Add 버튼 */}
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "flex-end",
          right: 0,
          bottom: 80,
          position: "absolute",
          zIndex: 10,
          marginRight: 12,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Add")}>
          <Image source={add} style={{ width: 72, height: 72 }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Archives;

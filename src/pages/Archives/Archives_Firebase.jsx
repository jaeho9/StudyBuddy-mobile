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
import { ModalSelect } from "components/CustomModal";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

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

const Archives = ({ navigation }) => {
  //post
  const [post, setPost] = useState([]);
  const postCollection = firestore().collection("post");

  //community
  const [community, setCommunity] = useState([]);
  const [joinCommunity, setJoinCommunity] = useState([
    {
      community_id: 0,
      community_name: "전체",
      isClick: true,
    },
  ]);
  const [communities, setCommunities] = useState([]);
  const communityCollection = firestore().collection("community");

  //join
  const [join, setJoin] = useState([]);
  const joinCollection = firestore().collection("join");

  //user
  const [user, setUser] = useState([]);
  const userCollection = firestore().collection("user");

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
  }, [post.length]);

  useEffect(() => {
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
    setCommunities(whole.concat(community));
    setLastIndex(post.length - 1);
    // join.map((v, i) => {
    //   if (v.user_id === "SeDJYBVUGSjQGaWlzPmm") {
    //     community.map((a, b) => {
    //       if (a.community_id === v.community_id) {
    //         console.log(a);
    //         왜 set이 안되지이
    //         setJoinCommunity([...joinCommunity, a]);
    //       }
    //     });
    //   }
    // });
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

  const modalVisible = (id) => {
    let copiedModal = [...modalSelectVisible];
    copiedModal[id] = false;
    setModalSelectVisible(copiedModal);
  };

  // const deleteTrueVisible = () => {
  //   setTimeout(() => {
  //     deleteVisible.current = true;
  //   }, 2000);
  // };

  // const deleteFalseVisible = () => {
  //   setTimeout(() => {
  //     deleteVisible.current = false;
  //   }, 2000);
  // };

  const handleClickList = (item) => {
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
        onPress={() => handleClickList(item)}
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

  //내가 북마크 누른 게시물이 보여짐
  const renderCommunityDetail = ({ item, index }) => {
    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate("Post_Firebase")}
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 12,
          // marginBottom: lastIndex === index ? 80 : 12,
          marginBottom: 12,
          paddingVertical: 15,
          paddingHorizontal: 12,
          borderRadius: 12,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold", color: "#ff7474" }}>
          {communities.map((v, i) => {
            if (v.community_id === item.community_id) return v.community_name;
          })}
        </Text>
        <View style={{ marginTop: 8 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Image source={profileImg} style={{ width: 32, height: 32 }} />

            <Text style={{ fontSize: 14, color: "#000000" }}>
              {user.map((v, i) => {
                if (v.id === item.user_id) return v.nickname;
              })}
            </Text>
            <Text style={{ fontSize: 10, color: "#969696" }}>
              {changeDate(item.reg_date)}
            </Text>
          </View>
          <View style={{ marginHorizontal: 40, gap: 7 }}>
            <Text style={{ fontSize: 12, color: "#000000" }}>
              1. 준비 기간 : {changeDate(item.start_date)}
            </Text>
            <Text style={{ fontSize: 12, color: "#000000" }}>
              2. 교재 : {item.book}
            </Text>
            <Text style={{ fontSize: 12, color: "#000000" }}>
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
            // deleteVisible={deleteVisible}
            // deleteTrueVisible={() => deleteTrueVisible()}
            // deleteFalseVisible={() => deleteFalseVisible()}
            post={item.id}
            navigation={navigation}
            // modalVisible={() => modalVisible(item.id)}
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
          <Image source={moreIcon} style={{ width: 24, height: 24 }} />
          {/* {item.user_id === "SeDJYBVUGSjQGaWlzPmm" && (
            <Image source={moreIcon} style={{ width: 24, height: 24 }} />
          )} */}
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
            <TouchableOpacity>
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
      <CustomHeader left={menuIcon} title={"Archives"} right={alarmOffIcon} />
      <View style={{ flexDirection: "row" }}>
        <FlatList
          data={communities}
          renderItem={renderCommunityList}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews
        />
        <TouchableOpacity
          onPress={() => onPressSearch()}
          style={{ marginVertical: 9, marginHorizontal: 12 }}
        >
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
        data={post}
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

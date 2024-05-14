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
import storage from "@react-native-firebase/storage";
// Components
import Header from "components/Tab/Header";
import { ModalSelect } from "components/Modal/CustomModal";
// SelectPicker
import SelectPicker from "components/SelectPicker";

// Images
const logo = require("assets/icons/home/logo.png");
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

const Home = ({ navigation }) => {
  // Select Picker
  const [sort, setSort] = useState("done");
  const onChangeSort = (value) => {
    setSort(value);
  };

  //post
  const [post, setPost] = useState([]);
  console.log(post);
  const postCollection = firestore().collection("post");

  //community
  const [community, setCommunity] = useState([]);
  const communityCollection = firestore().collection("community");

  //join
  const [joinCommunity, setJoinCommunity] = useState([
    {
      community_id: 0,
      community_name: "전체",
      isClick: true,
    },
  ]); // 가입한 커뮤니티 목록
  const joinCollection = firestore().collection("join");

  //user
  const [user, setUser] = useState([]);
  const userCollection = firestore().collection("user");

  //bookmark
  const [bookmarks, setBookmarks] = useState([]); // 북마크 데이터
  const [userBookmarks, setUserBookmarks] = useState([]); // 사용자가 북마크한 게시물 정보
  const bookmarkCollection = firestore().collection("bookmark");

  const [whole, setWhole] = useState([
    {
      community_id: 0,
      community_name: "전체",
      isClick: true,
    },
  ]);

  // like
  const [likes, setLikes] = useState([]); // 좋아요 데이터
  const [likeCounts, setLikeCounts] = useState([]); // 각 게시물 좋아요 개수
  const [userLikes, setUserLikes] = useState([]); // 좋아요 여부
  const likeCollection = firestore().collection("like");

  // comment
  const [comments, setComments] = useState([]);
  const [commentCounts, setCommentCounts] = useState([]);
  const commentCollection = firestore().collection("comment");

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
    like_api();
    comment_api();
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
      // user_id: SeDJYBVUGSjQGaWlzPmm 설정
      const join_data = await joinCollection
        .where("user_id", "==", "SeDJYBVUGSjQGaWlzPmm")
        .get();
      join_data._docs.map((doc) => ({
        community_id: doc._data.community_id,
        user_id: doc._data.user_id,
      }));

      // 사용자가 가입한 커뮤니티의 데이터를 community에서 찾아서 joinCommunity에 추가
      const userJoinCommunities = join_data._docs.map(
        (doc) => doc._data.community_id
      );
      const userCommunities = community.filter((item) =>
        userJoinCommunities.includes(item.community_id)
      );
      setJoinCommunity(whole.concat(userCommunities));
    } catch (error) {
      console.log("post error", error.message);
    }
  };

  const post_api = async () => {
    try {
      const post_data = await postCollection.orderBy("reg_date", "desc").get();
      setPost(post_data._docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log("post error", error.message);
    }
  };

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
          (l) => l.post_id === p.id && l.user_id === "SeDJYBVUGSjQGaWlzPmm"
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
          (l) => l.post_id === p.id && l.user_id === "SeDJYBVUGSjQGaWlzPmm"
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

  const handleClickList = (item) => {
    setJoinCommunity(
      joinCommunity.map((v, i) => {
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
    if (
      joinCommunity.some(
        (joinItem) => joinItem.community_id === item.community_id
      )
    ) {
      return (
        <TouchableOpacity
          onPress={() => handleClickList(item)}
          style={{
            marginRight: 8,
            borderRadius: 16,
            borderWidth: item.isClick ? 0 : 1,
            borderColor: item.isClick ? "rgba(255, 116, 116, 0.12)" : "#dddddd",
            alignSelf: "flex-start",
            padding: 8,
            backgroundColor: item.isClick
              ? "rgba(255, 116, 116, 0.12)"
              : "#fff",
          }}
        >
          <Text style={{ color: item.isClick ? "#FF7474" : "#9C9C9C" }}>
            {item.community_name}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return null; // 사용자가 가입한 커뮤니티가 아니면 null 반환하여 렌더링하지 않음
    }
  };

  // 게시물 rander
  const renderCommunityListClick = ({ item, index }) => {
    return joinCommunity?.map((c, d) => {
      var detail;
      if (c.isClick === true && c.community_name === "전체") {
        detail = renderCommunityDetail({ item, index });
      } else if (c.isClick === true && c.community_id === item.community_id) {
        detail = renderCommunityDetail({ item, index });
      }
      return detail;
    });
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
        (l) => l.post_id === postId && l.user_id === "SeDJYBVUGSjQGaWlzPmm"
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
        (l) => l.post_id === postId && l.user_id === "SeDJYBVUGSjQGaWlzPmm"
      )?.id;
      if (bookmarkId) {
        await bookmarkCollection.doc(bookmarkId).delete();
      }
    } catch (error) {
      console.error("UnBookmark post error:", error);
    }
  };

  // 준비 기간 일수
  const countDate = (start, end) => {
    let startDate = start.toDate();
    let endDate = end.toDate();
    const diffMSec = endDate.getTime() - startDate.getTime();
    const diffDate = diffMSec / (24 * 60 * 60 * 1000);
    return diffDate;
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

  // 커뮤니티별 게시물
  const renderCommunityDetail = ({ item, index }) => {
    const postId = item.id;
    const likeCount = likeCounts.find((lc) => lc.postId === postId)?.count || 0;
    const isLiked =
      userLikes.find((ul) => ul.postId === postId)?.isLiked || false;
    const commentCount =
      commentCounts.find((cc) => cc.postId === postId)?.count || 0;
    const isBookmark =
      userBookmarks.find((ul) => ul.postId === postId)?.isBookmark || false;

    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate("Post_Firebase")}
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
          {joinCommunity.map((v, i) => {
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
              1. 준비 기간 : {countDate(item.start_date, item.end_date)}일
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontSize: 14, color: "#000000" }}
            >
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
          {item.user_id !== "SeDJYBVUGSjQGaWlzPmm" && (
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
            <TouchableOpacity onPress={() => toggleLike(postId)}>
              <Image
                source={isLiked ? heartOnIcon : heartOffIcon}
                style={{ width: 18, height: 18 }}
              />
            </TouchableOpacity>
            <Text style={{ color: isLiked ? "#FF7474" : "#BDBDBD" }}>
              {likeCount}
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
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f1f1f1", marginBottom: 70 }}
    >
      <Header
        left={menuIcon}
        title={logo}
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
          data={joinCommunity}
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

      {/* 게시물 */}
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
          bottom: 20,
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

export default Home;

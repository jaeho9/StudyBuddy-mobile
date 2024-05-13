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
import Header from "components/Tab/Header";
import { DeleteModal } from "components/Modal/DeleteModal";
import { ModalSelect } from "components/Modal/CustomModal";
import { dummy_comment } from "dummy_data";

// FireStore && File Download
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import RNFetchBlob from "rn-fetch-blob";
// import * as RNFS from "react-native-fs";

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
  //navigation
  const navigation = useNavigation();

  //community
  const [community, setCommunity] = useState([]);
  const pre_community = useRef({});
  const communityCollection = firestore().collection("community");

  //post
  const { post_id } = route.params;
  const post = useRef({});
  const postCollection = firestore().collection("post");

  //user
  const user = useRef({});
  const userCollection = firestore().collection("user");

  //users
  const [users, setUsers] = useState([]);
  const usersCollection = firestore().collection("user");

  //comment
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const commentCollection = firestore().collection("comment");

  //custom modal
  var more = useRef([]);
  const [modalSelectVisible, setModalSelectVisible] = useState([]);
  const [modalX, setModalX] = useState([]);
  const [modalY, setModalY] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    post_api();
    user_api();
    users_api();
    community_api();
    comment_api();
    setTimeout(
      () =>
        more.current.forEach((element) => {
          // console.log("more", more);
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

  useEffect(() => {}, [comments]);

  useEffect(() => {
    console.log("isFocused----------------------");
    setTimeout(() => comment_api(), 1);
    comment_api();
    modalSelectVisible.map((e, i) => {
      if (e === true) {
        let copiedModal = [...modalSelectVisible];
        copiedModal[i] = false;
        setModalSelectVisible(copiedModal);
      }
    });
  }, [isFocused]);

  const post_api = async () => {
    try {
      const post_data = await postCollection.get();
      post_data._docs.map((doc) => {
        if (doc._data.id === post_id) {
          post.current = {
            ...doc.data(),
            id: doc.id,
            start_date: changeDate(doc._data.start_date).replaceAll(".", "-"),
            end_date: changeDate(doc._data.end_date).replaceAll(".", "-"),
            reg_date: changeDate(doc._data.reg_date).replaceAll(".", "-"),
            update_date: changeDate(doc._data.update_date).replaceAll(".", "-"),
          };
        }
      });
    } catch (error) {
      console.log("post error", error.message);
    }
  };

  const users_api = async () => {
    try {
      const users_data = await usersCollection.get();
      setUsers(users_data._docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log("user error", error.message);
    }
  };

  const user_api = async () => {
    try {
      const user_data = await userCollection.get();
      user_data._docs.map((doc) => {
        if (doc._data.id === post.current.user_id) {
          user.current = {
            ...doc.data(),
            id: doc.id,
          };
        }
      });
    } catch (error) {
      console.log("user error", error.message);
    }
  };

  const community_api = async () => {
    try {
      const community_data = await communityCollection.get();
      community_data._docs.map((doc) => {
        if (doc._data.id === post.current.community_id) {
          pre_community.current = {
            ...doc.data(),
            id: doc.id,
          };
          setCommunity({
            ...doc.data(),
            id: doc.id,
          });
        }
      });
    } catch (error) {
      console.log("community error", error.message);
    }
  };

  const comment_api = async () => {
    try {
      const comment_data = await commentCollection.orderBy("reg_date").get();
      let arr = [];
      comment_data._docs.map((doc) => {
        if (doc._data.post_id === post.current.id) {
          arr.push({ ...doc.data(), id: doc.id });
        }
      });
      setComments(arr);
    } catch (error) {
      console.log("comment error", error.message);
    }
  };

  //댓글 등록
  const commentSubmit = (e) => {
    var today = new Date();

    e.preventDefault();
    const commentRef = commentCollection.doc();
    commentRef
      .set({
        id: commentRef.id,
        post_id: post_id,
        user_id: "SeDJYBVUGSjQGaWlzPmm",
        comment: comment,
        reg_date: today,
        update_date: today,
      })
      .then(() => {
        console.log("document success!");
      })
      .catch((error) => {
        console.log(error);
      });
    setComment();
    comment_api();
  };

  changeDate = (e) => {
    let date = e.toDate();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      if (day < 10) {
        return year + "-0" + month + "-0" + day;
      } else {
        return year + "-0" + month + "-" + day;
      }
    } else {
      return year + "-" + month + "-" + day;
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

  const onPressData = async (data) => {
    try {
      const reference = await storage()
        .ref("/file/" + data)
        .getDownloadURL()
        .catch((e) => e);

      const { fs } = RNFetchBlob;
      const downloads = fs.dirs.DownloadDir;
      const filePath = `${downloads}/${data}`;

      RNFetchBlob.config({
        path: filePath,
        fileCache: true,
      })
        .fetch("GET", reference)
        .then((res) => {
          console.log("The file saved to", res.path());
        });
    } catch (error) {
      console.log("onPressData error", error.message);
    }
  };

  //왜 두번 클릭해야 새로고침이 될까?
  const modalVisible = (id) => {
    let copiedModal = [...modalSelectVisible];
    copiedModal[id] = false;
    setModalSelectVisible(copiedModal);

    setTimeout(() => comment_api(), 1);
  };

  const renderComment = ({ item, index }) => {
    return (
      <View style={{ marginVertical: 8 }}>
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
            comment={item.id}
            post={post_id}
            navigation={navigation}
            modalVisible={() => modalVisible(index)}
            closeModalPopupMenu={() => {
              let copiedModal = [...modalSelectVisible];
              copiedModal[index] = false;
              setModalSelectVisible(copiedModal);
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
            <Text style={{ fontSize: 14, color: "#000000" }}>
              {users.map((v, i) => {
                if (v.id === item.user_id) {
                  return v.nickname;
                }
              })}
            </Text>
            <Text style={{ fontSize: 10, color: "#969696" }}>
              {changeDate(item.update_date)}
            </Text>
          </View>
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
        </View>
        <View style={{ paddingTop: 10 }}>
          <Text>{item.comment}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
      <Header
        left={backIcon}
        title={"게시물"}
        leftClick={() => navigation.navigate("Archives")}
      />
      <View
        // showsVerticalScrollIndicator={false}
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
            {pre_community?.current.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              gap: 5,
            }}
          >
            {/* <Image
              source={require(user.current?.profile_img)}
              style={{ width: 32, height: 32 }}
            /> */}
            <Text style={{ fontSize: 14, color: "#000000" }}>
              {user.current?.nickname}
            </Text>
            <Text style={{ fontSize: 10, color: "#969696" }}>
              {post.current?.update_date}
            </Text>
          </View>
          <View style={{ marginTop: 11, gap: 7 }}>
            <Text style={{ fontSize: 12, color: "#000000" }}>
              1. 준비 기간 : {post.current?.start_date} ~{" "}
              {post.current?.end_date}
            </Text>
            <Text style={{ fontSize: 12, color: "#000000" }}>
              2. 교재 : {post.current?.book}
            </Text>
            <Text style={{ fontSize: 12, color: "#000000" }}>
              3. 결과 : {post.current?.result}
            </Text>
            <View style={{ gap: 7 }}>
              <Text style={{ fontSize: 12, color: "#000000" }}>
                4. 공부 방법
              </Text>
              <Text style={{ paddingLeft: 11, fontSize: 12, color: "#000000" }}>
                {post.current?.study}
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
            <TouchableOpacity onPress={() => onPressData(post.current?.data)}>
              <Text style={{ fontSize: 12, color: "#606060" }}>
                {post.current?.data}
              </Text>
            </TouchableOpacity>
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
              <TouchableOpacity
              // onPress={() => handleClickHeart(post)}
              >
                <Image
                  source={heartOffIcon}
                  style={{ width: 18, height: 18 }}
                />
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
            flex: 1,
            borderTopWidth: 1,
            borderTopColor: "#ddd",
            padding: 15,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 12, color: "#333" }}>댓글</Text>

          {/* 댓글이 없는 경우도 생각하기 */}
          {comments.length > 0 && (
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews
            />
          )}
        </View>
      </View>

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
        <TouchableOpacity
          style={{ paddingRight: 8 }}
          onPress={(e) => commentSubmit(e)}
        >
          <Text>등록</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Post;

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Header from "components/Tab/Header";

const arrowLeft = require("assets/icons/add/arrow_left.png");
const Tab = createMaterialTopTabNavigator();

const SearchResult = ({ route, navigation }) => {
  const { text } = route.params ? route.params : {};

  //post
  const [post, setPost] = useState([]);
  const postCollection = firestore().collection("post");

  //community
  const [community, setCommunity] = useState([]);
  const communityCollection = firestore().collection("community");

  useEffect(() => {
    community_api();
  }, [text]);

  const community_api = async () => {
    try {
      const community_data = await communityCollection.where('name', '>=', text).where('name', '<=', text + '\uf8ff').get();
      const communityIds = community_data._docs.map(doc => doc.id);
      const post_data = await postCollection.where('community_id', 'in', communityIds).get();
      setCommunity(
        community_data._docs.map((doc) => ({
          community_id: doc._data.id,
          community_name: doc._data.name,
          isClick: false,
        }))
      );
      setPost(
        post_data._docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.log("community error", error.message);
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

  const renderCommunityDetail = ({ item, index }) => {
    const postId = item.id;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Post", {
            post_id: item.id,
            // isBookmarked: userBookmarks.find((ul) => ul.postId === item.id)?.isBookmark,
            // likeCount: likeCounts.find((lc) => lc.postId === postId)?.count,
            // isLiked: userLikes.find((ul) => ul.postId === postId)?.isLiked,
            // commentCount: commentCounts.find((cc) => cc.postId === postId)?.count
          })}
        style={{
          backgroundColor: "#fff",
          marginHorizontal: 20,
          marginBottom: 12,
          paddingVertical: 20,
          paddingHorizontal: 16,
          borderRadius: 12,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#ff7474" }}>
          {item.community_name}
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
              {item.user_id}
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
            <TouchableOpacity
            // onPress={() => toggleLike(postId)}
            >
              <Image
                source={heartOnIcon}
                style={{ width: 18, height: 18 }}
              />
            </TouchableOpacity>
            {/* <Text style={{ color: isLiked ? "#FF7474" : "#BDBDBD" }}>
                        {likeCount}
                    </Text> */}
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
            {/* <Text style={{ color: commentCount > 0 ? "#606060" : "#BDBDBD" }}>
                        {commentCount}
                    </Text> */}
          </View>
          <TouchableOpacity
            // onPress={() => toggleBookmark(postId)}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={bookmarkOffIcon}
              style={{ width: 18, height: 18 }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        left={arrowLeft}
        leftClick={() => navigation.goBack()}
        title={text}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: "#828282",
          tabBarActiveTintColor: "#333333",
          tabBarIndicatorStyle: {
            backgroundColor: "#FF7474",
            width: 58,
            marginLeft: 70,
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: "#F1F1F1",
          },
          tabBarLabelStyle: {
            fontWeight: "600",
          },
        }}
      >
        {/* 인기 탭 */}
        <Tab.Screen name="인기" options={{ tabBarLabel: "인기" }}>
          {() => (
            <View style={{ marginTop: 20 }}>
              <FlatList
                data={post}
                renderItem={renderCommunityDetail}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews
              />
            </View>
          )}
        </Tab.Screen>
        {/* 최근 탭 */}
        <Tab.Screen name="최근" options={{ tabBarLabel: "최근" }}>
          {() => (
            <View style={{ marginTop: 20 }}>

            </View>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default SearchResult;

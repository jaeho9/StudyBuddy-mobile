import React, { useState, useEffect } from "react";
import {
  View,
  Keyboard,
  Dimensions,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
// FireStore
import firestore from "@react-native-firebase/firestore";
// Modal
import Modal from "react-native-modal";

//Images
const search = require("assets/icons/add/search.png");
const selectOn = require("assets/icons/add/select_on.png");
const selectOff = require("assets/icons/add/select_off.png");
const cancel = require("assets/icons/add/cancel.png");

const { width, height } = Dimensions.get("window");

const CustomModal = ({ isVisible, setIsVisible, onSelectCommunity }) => {
  const [keyword, setKeyword] = useState("");
  const [selectIndex, setSelectIndex] = useState();

  //community
  const [communities, setCommunities] = useState([]);
  const communityCollection = firestore().collection("community");

  //join
  const [join, setJoin] = useState([]);
  const joinCollection = firestore().collection("join");

  //user
  const [user, setUser] = useState([]);
  const userCollection = firestore().collection("user");

  useEffect(() => {
    user_api();
    community_api();
    join_api();
  }, []);

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
      setCommunities(
        community_data._docs.map((doc) => ({
          community_id: doc._data.id,
          community_name: doc._data.name,
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

      setJoin(
        join_data._docs.map((doc) => ({
          community_id: doc._data.community_id,
          user_id: doc._data.user_id,
        }))
      );

      // 사용자가 가입한 커뮤니티의 데이터를 community에서 찾아서 joinCommunity에 추가
      const userJoinCommunities = join_data._docs.map(
        (doc) => doc._data.community_id
      );
      const userCommunities = community.filter((item) =>
        userJoinCommunities.includes(item.community_id)
      );
      setCommunities(whole.concat(userCommunities));
    } catch (error) {
      console.log("post error", error.message);
    }
  };

  const searchCommunity = async () => {
    try {
      // Firestore 쿼리를 사용하여 커뮤니티를 검색합니다.
      const querySnapshot = await communityCollection
        .where("name", ">=", keyword) // 검색어와 일치하는 커뮤니티 검색
        .where("name", "<=", keyword + "\uf8ff") // 검색어로 시작하는 커뮤니티 검색
        .get();

      // 쿼리 결과를 배열로 변환하여 communities 상태를 업데이트합니다.
      const communitiesData = querySnapshot.docs.map((doc) => ({
        community_id: doc.id,
        community_name: doc.data().name,
      }));
      setCommunities(communitiesData);
    } catch (error) {
      console.error("Error searching communities:", error.message);
    }
  };

  const ModalItem = ({ item, index }) => {
    return (
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 700, color: "#717171" }}>
            {communities.map((v, i) => {
              if (v.community_id === item.community_id) return v.community_name;
            })}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onSelectCommunity(item);
              setSelectIndex(index);
              setIsVisible(false);
            }}
          >
            {selectIndex === index && (
              <Image
                source={selectOn}
                style={{
                  position: "absolute",
                  zIndex: 2,
                  width: 24,
                  height: 24,
                }}
              />
            )}
            <Image source={selectOff} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Modal
      useNativeDriver
      isVisible={isVisible}
      animationIn={"slideInUp"}
      animationInTiming={300}
      animationOut={"slideOutDown"}
      animationOutTiming={500}
      backdropColor="#000"
      backdropOpacity={0.4}
      style={{ margin: 0, alignItems: "center", justifyContent: "flex-end" }}
      onBackdropPress={() => {
        Keyboard.dismiss();
        setIsVisible(!isVisible);
      }}
      onBackButtonPress={() => {
        Keyboard.dismiss();
        setIsVisible(!isVisible);
      }}
      hideModalContentWhileAnimating
    >
      <View
        style={{
          width,
          height: height - 160,
          paddingTop: 20,
          paddingHorizontal: 16,
          backgroundColor: "#FFF",
          borderTopStartRadius: 16,
          borderTopEndRadius: 16,
        }}
      >
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 16,
            left: 0,
            right: 0,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 40,
              height: 4,
              borderRadius: 4,
              backgroundColor: "#FF7474",
            }}
          />
        </View>

        <View style={{ flex: 1, marginTop: 16 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 8,
              backgroundColor: "#F1F1F1",
              borderRadius: 12,
            }}
          >
            <TouchableOpacity>
              <Image source={search} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <TextInput
              placeholder="커뮤니티 검색"
              placeholderTextColor="#9C9C9C"
              returnKeyType="search"
              spellCheck={false}
              autoCorrect={false}
              autoCapitalize="none"
              value={keyword}
              textAlignVertical="top"
              multiline
              onChangeText={(text) => setKeyword(text)}
              onSubmitEditing={searchCommunity} // 엔터 키나 검색 버튼을 눌렀을 때 searchCommunity 함수 실행
              allowFontScaling={false}
              style={{
                flex: 1,
                marginLeft: 4,
                paddingVertical: 10,
                backgroundColor: "#F1F1F1",
                borderRadius: 12,
                fontSize: 16,
                letterSpacing: 0.6,
              }}
            />
            {keyword ? (
              <TouchableOpacity
                onPress={() => {
                  setKeyword("");
                  community_api();
                }}
              >
                <Image source={cancel} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        </View>

        <View>
          <FlatList
            data={communities}
            renderItem={ModalItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            style={{
              height: height - 250,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

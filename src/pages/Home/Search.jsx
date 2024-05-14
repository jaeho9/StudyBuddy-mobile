import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Keyboard,
  FlatList,
} from "react-native";

// FireStore
import firestore from "@react-native-firebase/firestore";
// Header
import Header from "../../components/Tab/Header";

// Imgaes
const arrowLeft = require("assets/icons/add/arrow_left.png");
const search = require("assets/icons/add/search.png");
const select = require("assets/icons/add/select.png");
const cancel = require("assets/icons/add/cancel.png");
const logo = require("assets/icons/home/logo.png");
const close = require("assets/icons/home/close.png");

const { width, height } = Dimensions.get("window");

const Search = ({ navigation }) => {
  const [text, setText] = useState("");

  const [searchList, setSearchList] = useState([]);
  const searchCollection = firestore().collection("search_list");

  useEffect(() => {
    search_api();
  });

  const search_api = async () => {
    try {
      const search_data = await searchCollection
        .where("user_id", "==", "SeDJYBVUGSjQGaWlzPmm")
        .get();
      setSearchList(
        search_data._docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (error) {
      console.log("searchList error", error.message);
    }
  };

  const addSearch = async () => {
    try {
      await searchCollection.add({
        search: text,
        id: searchCollection.id,
        user_id: "SeDJYBVUGSjQGaWlzPmm",
      });
      setText("");
      console.log("Create Complete!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Text style={{ fontSize: 16, color: "#717171" }}>{item.search}</Text>
        <TouchableOpacity>
          <Image source={close} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        left={arrowLeft}
        leftClick={() => navigation.goBack()}
        title={logo}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ marginTop: 16, justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 8,
              paddingHorizontal: 8,
              backgroundColor: "#F1F1F1",
              borderRadius: 12,
            }}
          >
            <TouchableOpacity>
              <Image source={search} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <TextInput
              placeholder="검색어를 입력해주세요"
              placeholderTextColor="#9C9C9C"
              returnKeyType="search"
              spellCheck={false}
              autoCorrect={false}
              autoCapitalize="none"
              value={text}
              onChangeText={(text) => setText(text)}
              allowFontScaling={false}
              onSubmitEditing={() => {
                navigation.navigate("SearchResult", { text }); // SearchResult 페이지로 이동
                addSearch(); // addSearch 함수 호출
              }}
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
            {text ? (
              <TouchableOpacity onPress={() => setText("")}>
                <Image source={cancel} style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 24, gap: 8 }}>
            {searchList.length > 0 ? (
              <>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#717171" }}
                >
                  최근 검색어
                </Text>
                <FlatList
                  data={searchList}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews
                />
              </>
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ color: "#717171", fontSize: 16, fontWeight: "bold" }}
                >
                  커뮤니티나 키워드를 검색해 보세요.
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Search;

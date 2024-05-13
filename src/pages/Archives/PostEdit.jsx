import React, { startTransition, useState, useEffect, useRef } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

import { useNavigation, useIsFocused } from "@react-navigation/native";

// Keyboard Aware Scroll View
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// FireStore
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

// Document Picker
import DocumentPicker from "react-native-document-picker";

// Import Pages
import Header from "components/Tab/Header";
import CommunityModal from "components/Modal/CommunityModal";
import ResultModal from "components/Modal/ResultModal";
import CalendarModal from "components/Modal/CalendarModal";
import FileModal from "components/Modal/FileModal";

// Images
const backIcon = require("assets/icons/archives/back.png");
const feedAdd = require("assets/icons/add/feed_add.png");
const feedAddOff = require("assets/icons/add/feed_add_off.png");
const arrowDown = require("assets/icons/add/arrow_down.png");
const arrowRight = require("assets/icons/add/arrow_right.png");
const calendarOn = require("assets/icons/add/calendar_on.png");
const calendarOff = require("assets/icons/add/calendar_off.png");
const storiesOn = require("assets/icons/add/stories_on.png");
const storiesOff = require("assets/icons/add/stories_off.png");
const pasteOn = require("assets/icons/add/paste_on.png");
const pasteOff = require("assets/icons/add/paste_off.png");
const reviewsOn = require("assets/icons/add/reviews_on.png");
const reviewsOff = require("assets/icons/add/reviews_off.png");
const attachFile = require("assets/icons/add/attach_file.png");
const attachFileOn = require("assets/icons/add/attach_file_on.png");

const { width, height } = Dimensions.get("window");

const Add = ({ navigation, route }) => {
  const { id } = route.params;

  // 커뮤니티 선택
  const [communityVisible, setCommunityVisible] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const onSelectCommunity = (community) => {
    setSelectedCommunity(community);
  };

  // 준비 기간
  const [dateVisible, setDateVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const onSelectDate = (startDate, endDate) => {
    setSelectedDate({ startDate, endDate });
  };

  // 교재
  const { book } = route.params ? route.params : {};
  const [selectedBook, setSelectedBook] = useState(null);
  const isFocused = useIsFocused();

  // 결과
  const [resultVisible, setResultVisible] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const onSelectResult = (result) => {
    setSelectedResult(result);
  };

  // 공부 방법
  const [text, setText] = useState("");
  const onChangeText = (inputText) => {
    setText(inputText);
  };

  // 자료
  const [fileVisible, setFileVisible] = useState(false);
  const [filename, setFilename] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const onSelectFile = (file) => {
    setSelectedFile(file);
  };

  //post
  const start = useRef(0);
  const end = useRef(0);
  const edit_post = useRef({});
  const postCollection = firestore().collection("post");

  //community
  const [community, setCommunity] = useState([]);
  const communityCollection = firestore().collection("community");

  useEffect(() => {
    post_read_api();
    community_api();
  }, []);

  useEffect(() => {
    if (book) {
      setSelectedBook(book);
    }
  }, [isFocused]);

  const selectDoc = async () => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: true,
      });
      setSelectedFile(doc.map((item) => item.uri));
      setFilename(doc.map((item) => item.name));

      doc.forEach(async (doc) => {
        await uploadFile(doc.uri, doc.name);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User canclled the upload", err);
      } else {
        console.log(err);
      }
    }
  };

  // 파일 업로드 함수
  const uploadFile = async (uri, filename) => {
    try {
      const reference = storage().ref("/file/" + filename);
      await reference.putFile(uri); // 파일 업로드
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // 현재 날짜와 시간을 가져오기
  const currentDate = new Date();

  //post 읽기
  const post_read_api = async () => {
    try {
      const post_data = await postCollection.get();
      post_data._docs.map((doc) => {
        if (doc._data.id === id) {
          edit_post.current = {
            ...doc.data(),
            id: doc.id,
            start_date: changeDate(doc._data.start_date).replaceAll(".", "-"),
            end_date: changeDate(doc._data.end_date).replaceAll(".", "-"),
          };
        }
      });
      onSelectDate(edit_post.current.start_date, edit_post.current.end_date);
      setSelectedDate({
        startDate: edit_post.current.start_date,
        endDate: edit_post.current.end_date,
      });
      setSelectedBook(edit_post.current.book);
      setSelectedResult(edit_post.current.result);
      setText(edit_post.current.study);
    } catch (error) {
      console.log("post error", error.message);
    }
  };

  //post 수정
  const post_update_api = async () => {
    var cur_date = new Date();
    try {
      const rows = await postCollection.where("id", "==", id);
      rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            community_id: selectedCommunity.community_id,
            start_date: new Date(selectedDate.startDate),
            end_date: new Date(selectedDate.endDate),
            book: book ? book : selectedBook,
            result: selectedResult,
            study: text,
            update_date: cur_date,
          });
        });
      });
    } catch (error) {
      console.log("post_update error", error.message);
    }
  };

  const community_api = async () => {
    try {
      const community_data = await communityCollection.get();
      setCommunity(
        community_data._docs.map((doc) => {
          if (doc._data.id === edit_post.current.community_id) {
            edit_post.current = {
              ...edit_post.current,
              community_name: doc._data.name,
              community_id: doc.id,
            };
          }
        })
      );
      // onSelectCommunity(edit_post.current.community_name);
      setSelectedCommunity({
        community_id: edit_post.current.community_id,
        community_name: edit_post.current.community_name,
      });
    } catch (error) {
      console.log("community error", error.message);
    }
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

  // 커뮤니티, 준비 기간, 교재, 결과, 공부 방법을 작성하면 버튼 활성화
  const isReadyToAddFeed =
    selectedCommunity && selectedDate && selectedBook && selectedResult && text;

  // rightClick 함수 정의
  const rightClick = async () => {
    if (isReadyToAddFeed) {
      await post_update_api();
      navigation.navigate("Archives");
    } else {
      console.log(
        "else",
        selectedCommunity,
        selectedDate,
        selectedBook,
        selectedResult,
        text
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header
        left={backIcon}
        leftClick={() => navigation.goBack()}
        title={"게시물 수정"}
        right={isReadyToAddFeed ? feedAdd : feedAddOff}
        rightClick={rightClick}
      />
      <KeyboardAwareScrollView
        style={{ marginHorizontal: 20, marginVertical: 16 }}
      >
        {/* 커뮤니티 선택 */}
        <TouchableOpacity
          onPress={() => setCommunityVisible(!communityVisible)}
          style={{
            height: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#BDBDBD",
          }}
        >
          {selectedCommunity ? (
            <Text style={{ fontSize: 16, color: "#7A7A7A" }}>
              {selectedCommunity.community_name}
            </Text>
          ) : (
            <Text style={{ fontSize: 16, color: "#BDBDBD" }}>
              커뮤니티 선택
            </Text>
          )}
          <Image source={arrowDown} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>

        {/* 준비 기간 */}
        <TouchableOpacity
          onPress={() => setDateVisible(!dateVisible)}
          style={{
            height: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
            paddingHorizontal: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#BDBDBD",
          }}
        >
          {selectedDate ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={calendarOn}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <Text style={{ fontSize: 16, color: "#7A7A7A" }}>
                {selectedDate.startDate} ~ {selectedDate.endDate}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={calendarOff}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <Text style={{ fontSize: 16, color: "#BDBDBD" }}>준비 기간</Text>
            </View>
          )}
          <Image source={arrowRight} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>

        {/* 교재 */}
        <TouchableOpacity
          onPress={() => navigation.navigate("PostEditBook", { post_id: id })}
          style={{
            height: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
            paddingHorizontal: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#BDBDBD",
          }}
        >
          {selectedBook ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={storiesOn}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ width: width - 120, fontSize: 16, color: "#7A7A7A" }}
              >
                {selectedBook}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={storiesOff}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <Text style={{ fontSize: 16, color: "#BDBDBD" }}>교재</Text>
            </View>
          )}
          <Image source={arrowRight} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>

        {/* 결과 */}
        <TouchableOpacity
          onPress={() => setResultVisible(!resultVisible)}
          style={{
            height: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
            paddingHorizontal: 8,
            borderBottomWidth: 1,
            borderBottomColor: "#BDBDBD",
          }}
        >
          {selectedResult ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={pasteOn}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <Text style={{ fontSize: 16, color: "#7A7A7A" }}>
                {selectedResult}
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={pasteOff}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <Text style={{ fontSize: 16, color: "#BDBDBD" }}>결과</Text>
            </View>
          )}
          <Image source={arrowRight} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>

        {/* 공부 방법 */}
        <View style={{ marginTop: 4 }}>
          {text ? (
            <View
              style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 8,
              }}
            >
              <Image
                source={reviewsOn}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <Text style={{ fontSize: 16, color: "#7A7A7A" }}>공부 방법</Text>
            </View>
          ) : (
            <View
              style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 8,
              }}
            >
              <Image
                source={reviewsOff}
                style={{ width: 24, height: 24, marginRight: 8 }}
              />
              <Text style={{ fontSize: 16, color: "#BDBDBD" }}>공부 방법</Text>
            </View>
          )}
          <TextInput
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
            onChangeText={onChangeText}
            value={text}
            placeholderTextColor="#7A7A7A"
            multiline
            style={{
              height: height / 3,
              padding: 16,
              borderRadius: 4,
              backgroundColor: "#F1F1F1",
              color: "#7A7A7A",
              fontSize: 16,
              lineHeight: 18,
              letterSpacing: 1,
            }}
          />

          {/* 자료 */}
          <TouchableOpacity
            onPress={selectDoc}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              padding: 8,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#BDBDBD",
              flex: 1,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              {selectedFile ? (
                <>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={attachFileOn}
                      style={{ width: 24, height: 24 }}
                    />
                    <Text style={{ fontSize: 16, color: "#7A7A7A" }}>
                      {filename}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setSelectedFile(null)}
                    style={{ justifyContent: "flex-end" }}
                  >
                    <Image source={clear} style={{ width: 24, height: 24 }} />
                  </TouchableOpacity>
                </>
              ) : (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={attachFile}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text style={{ fontSize: 16, color: "#BDBDBD" }}>자료</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <CommunityModal
          isVisible={communityVisible}
          setIsVisible={setCommunityVisible}
          onSelectCommunity={onSelectCommunity}
          selectedCommunity={selectedCommunity}
        />
        <ResultModal
          isVisible={resultVisible}
          setIsVisible={setResultVisible}
          onSelectResult={onSelectResult}
          selectedResult={selectedResult}
        />
        <CalendarModal
          isVisible={dateVisible}
          setIsVisible={setDateVisible}
          onSelectDate={onSelectDate}
          selectedDate={selectedDate}
        />
        <FileModal
          isVisible={fileVisible}
          setIsVisible={setFileVisible}
          onSelectFile={onSelectFile}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Add;

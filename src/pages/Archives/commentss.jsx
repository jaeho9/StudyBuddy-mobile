import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { update } from "firebase/database";

const comments = ({}) => {
  //users
  //김도영 : SeDJYBVUGSjQGaWlzPmm
  //김상우 : 1vfLu0QlpF6ZVigXb1GE
  //김지형 : fm42pUZRwUNiL6dag17y
  //이재호 : 6YPIwmUhloAHeaC6jXax
  //하지혜 : Gsh6TJg50rswXPGaA7Zk
  const userSubmit = (e) => {
    var today = new Date();

    e.preventDefault();
    const userRef = firestore().collection("user").doc();
    userRef
      .set({
        id: userRef.id,
        email: "김도영@naver.com",
        nickname: "김도영",
        profile_img: "assets/icons/archives/profile.png",
        about_me: "안녕!",
        birthday: "",
        link: "",
        reg_date: today,
      })
      .then(() => {
        console.log("document success!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //community 생성
  //정보처리산업기사 : 3VWLQX8WwEmI4oY16FEP
  //섬유디자인산업기사 : 5CijZlwyTF3Zo6NpOgwq
  //정보처리기사 : gPCcHoxW2Vdr9nG2puHk
  //정보처리기능사 : tOJMmHC53VPzOnMhIhat
  //섬유산업기사 : zNSHJ6BiU8btnvXpgWM8
  const communitySubmit = (e) => {
    var today = new Date();

    e.preventDefault();
    const communityRef = firestore().collection("community").doc();
    communityRef
      .set({
        id: communityRef.id,
        user_id: "1vfLu0QlpF6ZVigXb1GE",
        name: "정보처리산업기사",
        reg_date: today,
        introduce: "정보처리산업기사를 위한 커뮤니티입니다!",
        rule: "친철하게 댓글 달아주세요!",
      })
      .then(() => {
        console.log("document success!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //community 가입
  const joinSubmit = (e) => {
    var today = new Date();

    e.preventDefault();
    const joinRef = firestore().collection("join").doc();
    joinRef
      .set({
        id: joinRef.id,
        community_id: "tOJMmHC53VPzOnMhIhat",
        user_id: "Gsh6TJg50rswXPGaA7Zk",
        reg_date: today,
      })
      .then(() => {
        console.log("document success!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //post
  const postSubmit = (e) => {
    var start = new Date(2023, 4, 5);
    var end = new Date(2023, 4, 30);
    var today = new Date();

    e.preventDefault();
    const postRef = firestore().collection("post").doc();
    postRef
      .set({
        id: postRef.id,
        user_id: "Gsh6TJg50rswXPGaA7Zk",
        community_id: "",
        start_date: start,
        end_date: end,
        book: "섬유산업기사 책",
        result: "합격",
        study: "섬유산업기사 책 5회독했습니다!",
        data: "",
        reg_date: today,
        update_date: today,
      })
      .then(() => {
        console.log("document success!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // bookmark & heart
  //김도영 : SeDJYBVUGSjQGaWlzPmm
  //김상우 : 1vfLu0QlpF6ZVigXb1GE
  //김지형 : fm42pUZRwUNiL6dag17y
  //이재호 : 6YPIwmUhloAHeaC6jXax
  //하지혜 : Gsh6TJg50rswXPGaA7Zk
  const bookmark_heart_Submit = (e) => {
    e.preventDefault();
    const bookmarkRef = firestore().collection("bookmark").doc();
    const likeRef = firestore().collection("like").doc();
    bookmarkRef
      .set({
        id: bookmarkRef.id,
        user_id: "SeDJYBVUGSjQGaWlzPmm",
        post_id: "3biFiwxp62wcfXhQSHsT",
      })
      .then(() => {
        console.log("document success!");
      })
      .catch((error) => {
        console.log(error);
      });
    likeRef
      .set({
        id: likeRef.id,
        user_id: "SeDJYBVUGSjQGaWlzPmm",
        post_id: "3biFiwxp62wcfXhQSHsT",
      })
      .then(() => {
        console.log("document success!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // comment
  const commentSubmit = (e) => {
    var start = new Date(2023, 4, 12);
    var end = new Date(2023, 4, 30);
    var today = new Date();

    e.preventDefault();
    const commentRef = firestore().collection("comment").doc();
    commentRef
      .set({
        id: commentRef.id,
        user_id: "wGu6gVKDcZ4UYzdn1fsO",
        comment: "정보 감사합니다!",
        reg_date: today,
        update_date: today,
      })
      .then(() => {
        console.log("document success!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={(e) => bookmark_heart_Submit(e)}>
          <Text>데이터 저장하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default comments;

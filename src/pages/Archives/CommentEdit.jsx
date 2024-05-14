import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import Header from "components/Tab/Header";

// FireStore
import firestore from "@react-native-firebase/firestore";

const backIcon = require("assets/icons/archives/back.png");

const CommentEdit = ({ navigation, route }) => {
  const { id, post_id } = route.params;

  //comment
  const [commentEdit, setCommentEdit] = useState("");
  const comment = useRef();
  const commentCollection = firestore().collection("comment");

  useEffect(() => {
    comment_api();
  }, []);

  const comment_api = async () => {
    try {
      const comment_data = await commentCollection.get();
      comment_data._docs.map((doc) => {
        if (doc._data.id === id) {
          comment.current = {
            ...doc.data(),
            id: doc.id,
          };
        }
      });
      console.log(comment.current);
      setCommentEdit(comment.current.comment);
    } catch (error) {
      console.log("community error", error.message);
    }
  };

  const rightClick = async () => {
    var cur_date = new Date();
    try {
      const rows = await commentCollection.where("id", "==", id);
      rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            comment: commentEdit,
            update_date: cur_date,
          });
        });
      });
      navigation.navigate("Post_Firebase", { id: post_id });
    } catch (error) {
      console.log("community error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        left={backIcon}
        title={"댓글 수정"}
        right={"확인"}
        leftClick={() => navigation.goBack()}
        rightClick={() => rightClick()}
      />
      <View style={{ flex: 1, padding: 18 }}>
        <TextInput
          value={commentEdit}
          onChangeText={(text) => setCommentEdit(text)}
        />
      </View>
    </SafeAreaView>
  );
};
export default CommentEdit;

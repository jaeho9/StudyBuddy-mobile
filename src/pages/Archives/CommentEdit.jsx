import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";

import CustomHeader from "components/CustomHeader";

const backIcon = require("assets/icons/archives/back.png");

const CommentEdit = ({ route }) => {
  const { id, item, comment } = route.params;
  const [commentEdit, setCommentEdit] = useState("");

  useEffect(() => {
    setCommentEdit(comment);
    console.log(comment);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <CustomHeader
        left={backIcon}
        title={"댓글 수정"}
        right={"확인"}
        rightClick={"Post"}
        id={id}
        item={item}
        comment={commentEdit}
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

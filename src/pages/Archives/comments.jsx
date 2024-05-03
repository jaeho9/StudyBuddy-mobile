import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

const comments = ({}) => {
  const [post, setPost] = useState();
  const usersCollection = firestore().collection("post");

  const _callApi = async () => {
    try {
      const data = await usersCollection.get();
      console.log(
        "name",
        data._docs.map((doc) => doc._data.user_id)
      );
      console.log(
        "name",
        data._docs.map((doc) => doc._data.community_name)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const userCollection = firestore().collection("user");
  const user_api = async () => {
    try {
      const user_data = await userCollection.get();
      console.log("user data", user_data._docs[0]._data);
    } catch (error) {
      console.log("user error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={_callApi}>
          <Text>데이터 불러오기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default comments;

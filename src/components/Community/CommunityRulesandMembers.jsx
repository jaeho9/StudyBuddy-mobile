import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

const Width = Dimensions.get("window").width; // 스크린 너비 초기화

const CommunityRulesAndMembers = ({ communityId }) => {
  const [rules, setRules] = useState(null);
  const [members, setMembers] = useState([]);
  const styles = useStyles();

  useEffect(() => {
    const fetchRulesAndMembers = async () => {
      // 규칙 가져오기
      const communityDoc = await firestore()
        .collection("community")
        .doc(communityId)
        .get();

      if (communityDoc.exists) {
        const ruleData = communityDoc.data().rule;
        setRules(ruleData); // 배열이 아닌 형태의 ruleData를 직접 설정
      }

      // 멤버 가져오기
      const joinSnapshot = await firestore()
        .collection("join")
        .where("community_id", "==", communityId)
        .get();

      const memberPromises = joinSnapshot.docs.map(async (doc) => {
        const userDoc = await firestore()
          .collection("user")
          .doc(doc.data().user_id)
          .get();
        return { id: doc.id, name: userDoc.data()?.nickname };
      });

      const membersData = await Promise.all(memberPromises);
      setMembers(membersData);
    };

    fetchRulesAndMembers();
  }, [communityId]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.rulesSection}>
        <Text style={styles.rulesTitle}>규칙</Text>
        <Text style={styles.ruleText}>
          {typeof rules === "string"
            ? rules
            : "규칙 정보가 설정되지 않았습니다."}
        </Text>
      </View>
      <View style={styles.membersSection}>
        <Text style={styles.membersTitle}>멤버</Text>
        <FlatList
          horizontal
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.memberProfile}>
              <Image
                source={require("assets/icons/Community/Profile.png")}
                style={styles.profileImage}
              />
              <Text style={styles.memberName}>{item.name}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

const useStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: Width,
      padding: 20,
      backgroundColor: "rgba(241, 241, 241, 1)",
    },
    rulesSection: {
      borderBottomColor: "rgba(189, 189, 189, 1)",
      borderBottomWidth: 1,
      paddingBottom: 20,
      marginBottom: 20,
    },
    rulesTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "rgba(0, 0, 0, 1)",
      marginBottom: 10,
    },
    ruleText: {
      fontSize: 16,
      color: "rgba(0, 0, 0, 1)",
      marginBottom: 5,
    },
    membersSection: {
      flexDirection: "column",
    },
    membersTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "rgba(0, 0, 0, 1)",
      marginBottom: 10,
    },
    memberProfile: {
      flexDirection: "column",
      alignItems: "center",
      marginRight: 20,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    memberName: {
      fontSize: 16,
      color: "rgba(0, 0, 0, 1)",
      fontWeight: "500",
    },
  });

export default CommunityRulesAndMembers;

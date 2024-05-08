import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
// 파이어스토어로 규칙 및 멤버 id 불러오기로 최적화 필요
const CommunityRulesAndMembers = () => {
  const styles = useStyles();
  const members = [
    { id: "1", name: "김도영" },
    { id: "2", name: "김상우" },
    { id: "3", name: "김지형" },
    { id: "4", name: "이재호" },
    { id: "5", name: "하지혜" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.rulesSection}>
        <Text style={styles.rulesTitle}>규칙</Text>
        <Text style={styles.ruleText}>전공을 꼭 작성해주세요!</Text>
        <Text style={styles.ruleText}>연락처를 남겨주세요!</Text>
        <Text style={styles.ruleText}>댓글은 예의 바르게!</Text>
        <Text style={styles.ruleText}>정보 공유를 활발히!</Text>
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
    </View>
  );
};

const useStyles = () =>
  StyleSheet.create({
    container: {
      width: 393,
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
      flexDirection: "row",
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

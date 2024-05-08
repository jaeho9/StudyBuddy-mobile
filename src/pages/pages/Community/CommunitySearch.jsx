import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function CommunitySearch() {
  const navigation = useNavigation(); // useNavigation hook 사용
  const left = require("/assets/icons/Community/chevron_left.png");
  const search = require("/assets/icons/Community/search.png");
  // 실제 Community 검색 필요
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Community")}>
        <Image source={left} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>커뮤니티 검색하기</Text>
        <Image source={search} style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    width: 393,
    height: 60,
    padding: 10,
    alignItems: "center",
  },
  searchText: {
    color: "#9C9C9C",
    fontFamily: "Inter",
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
    backgroundColor: "#E0E0E0",
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 15,
    flexGrow: 1,
    alignItems: "center",
    borderRadius: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5, // 아이콘과 텍스트 사이 간격
  },
});

export default CommunitySearch;

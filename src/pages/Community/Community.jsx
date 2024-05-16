import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import Header from "components/Tab/Header";

const TagImages = {
  apartment: require("assets/icons/Community/Tags/apartment.png"),
  av_timer: require("assets/icons/Community/Tags/av_timer.png"),
  card_travel: require("assets/icons/Community/Tags/card_travel.png"),
  code: require("assets/icons/Community/Tags/code.png"),
  construction: require("assets/icons/Community/Tags/construction.png"),
  credit_card: require("assets/icons/Community/Tags/credit_card.png"),
  egg: require("assets/icons/Community/Tags/egg_alt.png"),
  forest: require("assets/icons/Community/Tags/forest.png"),
  live_tv: require("assets/icons/Community/Tags/live_tv.png"),
  local_police: require("assets/icons/Community/Tags/local_police.png"),
  local_shupping: require("assets/icons/Community/Tags/local_shipping.png"),
  luggage: require("assets/icons/Community/Tags/luggage.png"),
  medication: require("assets/icons/Community/Tags/medication.png"),
  palette: require("/assets/icons/Community/Tags/palette.png"),
  school: require("assets/icons/Community/Tags/school.png"),
};
const Community = () => {
  const navigation = useNavigation();
  const [communities, setCommunities] = useState([]);
  const bookmark = require("assets/icons/Community/bookmark.png");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const fetchCommunities = async () => {
    const communitySnapshot = await firestore().collection("community").get();
    const communityData = await Promise.all(
      communitySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const formattedDate = data.reg_date
          ? new Date(data.reg_date.seconds * 1000)
            .toLocaleDateString("en-CA")
            .replace(/-/g, ".")
          : "날짜 없음";
        // Fetch members count
        const joinSnapshot = await firestore()
          .collection("join")
          .where("community_id", "==", doc.id)
          .get();

        // Fetch posts count
        const postSnapshot = await firestore()
          .collection("post")
          .where("community_id", "==", doc.id)
          .get();
        return {
          id: doc.id,
          title: data.name || "이름 없음",
          members: joinSnapshot.size,
          posts: postSnapshot.size,
          startDate: formattedDate,
          Tag: data.Tag || null,
        };
      })
    );
    setCommunities(communityData);
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const handleSelectTag = async (tag) => {
    if (selectedCommunity) {
      await firestore()
        .collection("community")
        .doc(selectedCommunity)
        .update({ Tag: tag });
      fetchCommunities();
      setModalVisible(false);
      setSelectedCommunity(null);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.communityCard}
      onPress={() =>
        navigation.navigate("CommunityPost", { communityId: item.id })
      }
    >
      <Text style={styles.communityTitle}>{item.title}</Text>
      <Image source={bookmark} style={styles.bookmarkIcon} />
      <TouchableOpacity
        style={styles.tagIconContainer}
        onPress={() => {
          if (!item.Tag) {
            setSelectedCommunity(item.id);
            setModalVisible(true);
          }
        }}
      >
        {item.Tag ? (
          <Image source={TagImages[item.Tag]} style={styles.TagIcon} />
        ) : (
          <View style={styles.emptyTagIcon} />
        )}
      </TouchableOpacity>
      <View style={styles.memberInfoContainer}>
        <Text style={styles.label}>인원 </Text>
        <Text style={styles.memberCount}>{`${item.members}명`}</Text>
      </View>
      <View style={styles.startDateContainer}>
        <Text style={styles.startDateLabel}>시작일</Text>
        <Text style={styles.startDateValue}>{item.startDate}</Text>
      </View>
      <View style={styles.postInfoContainer}>
        <Text style={styles.postLabel}>게시글</Text>
        <Text style={styles.postCount}>{`${item.posts}개`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.root}>
      <Header
        left={require("/assets/icons/Community/search.png")}
        leftClick={() => navigation.navigate("CommunitySearch")}
        title={"Community"}
        right={require("/assets/icons/Community/group_add.png")}
        rightClick={() => navigation.navigate("CommunityAdd")}
      />
      <View style={{ marginTop: 10, marginBottom: 130 }}>
        <FlatList
          data={communities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews
        />
      </View>

      <Text style={styles.moreLink}>더보기</Text>
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Tag</Text>
            <FlatList
              data={Object.keys(TagImages)}
              keyExtractor={(item) => item}
              numColumns={3}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.tagButton}
                  onPress={() => handleSelectTag(item)}
                >
                  <Image source={TagImages[item]} style={styles.tagIcon} />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  communityCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#FF7474",
  },
  bookmarkIcon: {
    position: "absolute",
    top: -6,
    right: 10,
    width: 52,
    height: 52,
  },
  tagIconContainer: {
    position: "absolute",
    top: 10,
    right: 26,
    width: 20,
    height: 20,
    backgroundColor: "FF7474",
  },
  TagIcon: {
    width: "100%",
    height: "100%",
  },
  emptyTagIcon: {
    width: "100%",
    height: "100%",
    backgroundColor: "FF7474",
  },
  memberInfoContainer: {
    flexDirection: "row",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  memberCount: {
    fontSize: 14,
    marginLeft: 5,
  },
  startDateContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  startDateLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  startDateValue: {
    fontSize: 14,
    marginLeft: 5,
  },
  postInfoContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  postLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postCount: {
    fontSize: 14,
    marginLeft: 5,
  },
  moreLink: {
    fontSize: 14,
    textAlign: "center",
    color: "#1167b1",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FF7474",
    padding: 20,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tagButton: {
    margin: 10,
    padding: 10,
  },
  tagIcon: {
    width: 50,
    height: 50,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1167b1",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Community;

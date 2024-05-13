import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert, // Alert를 임포트합니다.
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // 네비게이션 훅 가져오기
import Header from "components/Tab/header";
import MyPageModal from "components/Modal/MyPageModal"; // MyPageModal 컴포넌트 임포트
import BirthdateModal from "components/Modal/BirthdateModal";
import firestore from "@react-native-firebase/firestore"; // firestore

const backIcon = require("assets/icons/home/back.png");
const settings = require("assets/mypage/settings.png");
const error_red = require("assets/mypage/error_red.png");
const error_blue = require("assets/mypage/error_blue.png");
const MyPageProfile = require("assets/mypage/Image/MyPageProfile.png");
const loggedInUserId = "SeDJYBVUGSjQGaWlzPmm";

const EditProfile = () => {
  const navigation = useNavigation();
  const [isMyPageModalVisible, setMyPageModalVisible] = useState(false);
  const [isDuplicate, setDuplicate] = useState(null);
  const [birthdate, setBirthdate] = useState(null); // 기본값으로 현재 날짜 설정
  const [isBirthdateModalVisible, setBirthdateModalVisible] = useState(false);
  const [nickname, setNickname] = useState(""); // 사용자가 입력한 닉네임 상태
  const [aboutMe, setAboutMe] = useState("");
  const [link, setLink] = useState("");

  const userCollection = firestore().collection("user");

  useEffect(() => {
    // 로그인한 사용자의 정보를 가져오는 함수
    const fetchUserData = async () => {
      try {
        const userRef = firestore().collection("user").doc(loggedInUserId);
        const userData = await userRef.get();
        if (userData.exists) {
          const { nickname, about_me, birthday, link } = userData.data();
          setNickname(nickname || "");
          setAboutMe(about_me || "");
          setBirthdate(birthday || null);
          setLink(link || "");
        } else {
          console.log("사용자 정보가 존재하지 않습니다.");
        }
      } catch (error) {
        console.error(
          "사용자 정보를 가져오는 중에 오류가 발생했습니다:",
          error
        );
      }
    };

    fetchUserData(); // 컴포넌트가 마운트될 때 사용자 정보를 가져옴

    return () => {
      // cleanup 함수
      // 예를 들어 이펙트가 사라질 때 실행되어야 하는 코드
    };
  }, [loggedInUserId]);

  const handleEditProfilePress = () => {
    setMyPageModalVisible(true);
  };

  const handleLibrarySelect = () => {
    setMyPageModalVisible(false);
    navigation.navigate("Library");
  };

  const handleTakePhoto = () => {
    setMyPageModalVisible(false);
    navigation.navigate("Camera");
  };

  const handleOpenBirthdateModal = () => {
    setBirthdateModalVisible(true);
  };

  const handleCloseBirthdateModal = () => {
    setBirthdateModalVisible(false);
  };

  const handleSaveBirthdate = (selectedDate) => {
    setBirthdate(selectedDate);
    handleCloseBirthdateModal();
  };
  const formatDate = (date) => {
    if (!date) return "생년월일 추가"; // 선택된 날짜가 없을 경우의 기본 문구
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    return `${year}-${month}-${day}`;
  };

  const handleDuplicateCheck = async () => {
    try {
      const snapshot = await userCollection
        .where("nickname", "==", nickname)
        .get();
      if (!snapshot.empty) {
        // 중복된 닉네임이 존재할 경우
        setDuplicate(true);
      } else {
        // 중복된 닉네임이 없을 경우
        setDuplicate(false);
      }
    } catch (error) {
      console.error("중복 확인 에러:", error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await userCollection.doc(loggedInUserId).update({
        nickname,
        about_me: aboutMe,
        birthday: birthdate,
        link,
      });
      Alert.alert("프로필이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("프로필 업데이트 에러:", error);
      Alert.alert("프로필 업데이트 중 오류가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        left={backIcon}
        title={"프로필 수정"}
        right={"저장"}
        leftClick={"MyPage"}
        isDuplicate={isDuplicate}
        onSave={handleSaveProfile}
      />
      <View style={styles.ProfileContainer}>
        <View>
          <Image source={MyPageProfile} />
        </View>
        <TouchableOpacity
          style={{ marginTop: 24 }}
          onPress={handleEditProfilePress} // 사진 수정을 눌렀을 때의 동작 설정
        >
          <Text style={styles.PictureEditText}>사진 수정</Text>
        </TouchableOpacity>
      </View>
      <MyPageModal
        isVisible={isMyPageModalVisible}
        onClose={() => setMyPageModalVisible(false)}
        onSelectLibrary={handleLibrarySelect}
        onTakePhoto={handleTakePhoto}
      />
      <BirthdateModal
        isVisible={isBirthdateModalVisible}
        onClose={handleCloseBirthdateModal}
        onSelectDate={handleSaveBirthdate}
      />
      <View style={styles.EditContainer}>
        <View style={[styles.EditText, { marginBottom: 6 }]}>
          <Text style={[styles.Label, { marginRight: 44 }]}>닉네임 </Text>
          <TextInput
            style={[styles.Input, { marginRight: 17 }]}
            placeholder="닉네임을 입력하세요"
            placeholderTextColor="#BDBDBD"
            value={nickname}
            onChangeText={setNickname}
          />
          <TouchableOpacity
            style={styles.Button}
            onPress={handleDuplicateCheck}
          >
            <Text style={styles.ButtonText}>중복 확인</Text>
          </TouchableOpacity>
        </View>
        {isDuplicate !== null && (
          <View
            style={[
              styles.checkContainer,
              { marginLeft: isDuplicate ? 45 : 35 },
            ]}
          >
            <Image source={isDuplicate ? error_red : error_blue} />
            <Text
              style={isDuplicate ? styles.checkText_red : styles.checkText_blue}
            >
              {isDuplicate
                ? "이미 존재하는 닉네임 입니다."
                : "사용 가능한 닉네임 입니다."}
            </Text>
          </View>
        )}
        <View style={styles.EditText}>
          <Text style={[styles.Label, { marginRight: 31 }]}>자기소개 </Text>
          <TextInput
            style={[styles.Input, styles.MultilineInput]}
            placeholder="자기소개 추가"
            placeholderTextColor="#BDBDBD"
            multiline
            value={aboutMe}
            onChangeText={setAboutMe}
          />
        </View>
        <View style={styles.EditText}>
          <Text style={[styles.Label, { marginRight: 31 }]}>생년월일 </Text>
          <TouchableOpacity
            style={[
              styles.Input,
              styles.BirthdateInput,
              { borderBottomColor: "#7A7A7A" },
            ]}
            onPress={handleOpenBirthdateModal}
          >
            <Text
              style={[
                styles.BirthdateText,
                { color: birthdate ? "#000" : "#BDBDBD" },
              ]}
            >
              {formatDate(birthdate)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.EditText}>
          <Text style={[styles.Label, { marginRight: 57 }]}>링크 </Text>
          <TextInput
            style={styles.Input}
            placeholder="링크 추가"
            placeholderTextColor="#BDBDBD"
            value={link}
            onChangeText={setLink}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  ProfileContainer: {
    marginTop: 20,
    marginBottom: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  PictureEditText: {
    color: "#7A7A7A",
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
  EditContainer: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    backgroundColor: "#fff",
  },
  EditText: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  Label: {
    // marginRight: 10,
    color: "#7A7A7A",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
  },
  Input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#7A7A7A",
    paddingVertical: 8,
    paddingHorizontal: 0,
    color: "#000",
  },
  Button: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#7A7A7A",
    backgroundColor: "#FFF",
  },
  ButtonText: {
    color: "#7A7A7A",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
  },
  checkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkText_red: {
    color: "#FF7474",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    marginLeft: 10,
  },
  checkText_blue: {
    color: "#74A3FF",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    marginLeft: 10,
  },
  BirthdateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  BirthdateText: {
    flex: 1,
    paddingVertical: 8,
    color: "#000",
  },
});

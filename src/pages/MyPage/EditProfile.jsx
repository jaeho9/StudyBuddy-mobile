import React, { useState } from "react";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // 네비게이션 훅 가져오기
import Header from "components/Tab/Header";
import MyPageModal from "components/Modal/MyPageModal";// MyPageModal 컴포넌트 임포트
import BirthdateModal from "components/Modal/BirthdateModal";

const backIcon = require("assets/icons/home/back.png");
const settings = require("assets/icons/mypage/settings.png");
const error_red = require("assets/icons/mypage/error_red.png");
const error_blue = require("assets/icons/mypage/error_blue.png");
const MyPageProfile = require("assets/icons/mypage/Image/MyPageProfile.png");

const EditProfile = () => {
    const navigation = useNavigation();
    const [isMyPageModalVisible, setMyPageModalVisible] = useState(false);
    const [isDuplicate, setDuplicate] = useState(false);
    const [birthdate, setBirthdate] = useState(null); // 기본값으로 현재 날짜 설정
    const [isBirthdateModalVisible, setBirthdateModalVisible] = useState(false);

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

    const handleDuplicateCheck = () => {
        setDuplicate(true);
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header
                left={backIcon}
                title={"프로필 수정"}
                right={"저장"}
                leftClick={() => navigation.navigate("MyPage")}
                isDuplicate={isDuplicate}
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
                    />
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={handleDuplicateCheck}
                    >
                        <Text style={styles.ButtonText}>중복 확인</Text>
                    </TouchableOpacity>
                </View>
                {/* {isDuplicate ? ( // 중복일 경우에만 중복 안내 메시지 보이기
          <View style={[styles.checkContainer, { marginLeft: 45 }]}>
            <Image source={error_red} />
            <Text style={styles.checkText_red}>
              이미 존재하는 닉네임 입니다.
            </Text>
          </View>
        ) : (
          // 중복이 아닌 경우의 컨테이너
          <View style={[styles.checkContainer, { marginLeft: 35 }]}>
            <Image source={error_blue} />
            <Text style={styles.checkText_blue}>
              사용 가능한 닉네임 입니다.
            </Text>
          </View>
        )} */}
                <View style={styles.EditText}>
                    <Text style={[styles.Label, { marginRight: 31 }]}>자기소개 </Text>
                    <TextInput
                        style={[styles.Input, styles.MultilineInput]}
                        placeholder="자기소개 추가"
                        placeholderTextColor="#BDBDBD"
                        multiline
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
                                { color: birthdate ? "#7A7A7A" : "#BDBDBD" },
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
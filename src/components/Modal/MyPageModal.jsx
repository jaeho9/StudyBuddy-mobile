import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Image,
} from "react-native";

const photo = require("assets/icons/mypage/photo.png");
const camera = require("assets/icons/mypage/camera.png");

const MyPageModal = ({ isVisible, onClose, onSelectLibrary, onTakePhoto }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image
                        source={require("assets/icons/mypage/Line.png")}
                        style={styles.Image}
                    />
                    <TouchableOpacity style={styles.button} onPress={onSelectLibrary}>
                        <View style={styles.buttonContent}>
                            <Image source={photo} style={styles.buttonImage} />
                            <Text style={styles.buttonText}>라이브러리에서 선택</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
                        <View style={styles.buttonContent}>
                            <Image source={camera} style={styles.buttonImage} />
                            <Text style={styles.buttonText}>사진 찍기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        height: 168,
        width: "100%",
        alignItems: "center",
    },
    button: {
        paddingVertical: 10,
        width: "100%",
    },
    buttonContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonImage: {
        marginRight: 15,
    },
    buttonText: {
        color: "#7A7A7A",
        fontSize: 16,
        lineHeight: 32,
        letterSpacing: -0.48,
        fontWeight: "700",
    },
    Image: { marginBottom: 16 },
});

export default MyPageModal;
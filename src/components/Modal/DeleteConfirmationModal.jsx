import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    StyleSheet,
} from "react-native";

const DeleteConfirmationModal = ({ isVisible, onClose }) => {
    return (
        <Modal visible={isVisible} transparent={true}>
            <View style={styles.modalContent}>
                <Text style={styles.modalText}>게시물 삭제됨</Text>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.cancelButton}>취소</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        width: "96%",
        height: 40,
        marginBottom: 60,
        marginLeft: "2%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#606060",
        borderRadius: 12,
    },
    modalText: {
        color: "#FFF",
        fontFamily: "Inter",
        fontWeight: "400",
        fontSize: 18,
        marginLeft: 20,
    },
    cancelButton: {
        color: "#FFF",
        fontFamily: "Inter",
        fontWeight: "700",
        fontSize: 18,
        marginRight: 20,
    },
});

export default DeleteConfirmationModal;

// 확인 버튼을 추가고려?
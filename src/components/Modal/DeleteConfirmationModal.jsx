import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

const DeleteConfirmationModal = ({ isVisible, onClose, postId }) => {
  const handleDelete = async () => {
    try {
      await firestore().collection("post").doc(postId).delete();
      onClose();
    } catch (error) {
      console.error("게시물 삭제 중 에러 발생:", error);
    }
  };

  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>게시물을 삭제하시겠습니까?</Text>
        <TouchableOpacity onPress={handleDelete}>
          <Text style={styles.cancelButton1}>확인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.cancelButton2}>취소</Text>
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
  cancelButton1: {
    color: "#FFF",
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 18,
  },
  cancelButton2: {
    color: "#FFF",
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 18,
    marginRight: 20,
  },
});

export default DeleteConfirmationModal;

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, Dimensions, } from "react-native";
import DeleteModal from "./RemoveModal";

const { width, height } = Dimensions.get("window");

const deleteIcon = require("assets/icons/archives/delete.png");
const editIcon = require("assets/icons/archives/edit.png");
const moreIcon = require("assets/icons/archives/more.png");

const ModalSelectorPopup = (props) => {
    const [deleteVisible, setDeleteVisible] = useState(false);

    const onPressDelete = () => {
        setDeleteVisible(true);
    };

    const onPressEdit = () => {
        if (props.comment) {
            props.navigation.navigate("CommentEdit", {
                id: props.id,
                item: props.item,
                comment: props.comment,
            });
        } else {
            props.navigation.navigate("PostEdit", {
                id: props.id,
                item: props.item,
            });
        }
    };

    const layout = {
        left: props.x,
        top: props.y,
    };

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={deleteVisible}
                onRequestClose={() =>
                    setDeleteVisible(false)
                }
            >
                <DeleteModal
                    x={0}
                    y={height - 80}
                    closeModalPopupMenu={() =>
                        setDeleteVisible(false)
                    }
                />
            </Modal>
            <TouchableOpacity
                onPress={props.closeModalPopupMenu}
                style={{ flex: 1 }}
            >
                <View style={layout}>
                    <TouchableOpacity
                        onPress={onPressDelete}
                        style={styles.deleteModal}
                    >
                        <Text style={{ color: "#fff" }}>삭제하기</Text>
                        <Image source={deleteIcon} style={{ width: 14, height: 14 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressEdit}
                        style={styles.editModal}
                    >
                        <Text style={{ color: "#fff" }}>수정하기</Text>
                        <Image source={editIcon} style={{ width: 14, height: 14 }} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    deleteModal: {
        backgroundColor: "#B0B0B0",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 45,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
    },
    editModal: {
        backgroundColor: "#B0B0B0",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 45,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomStartRadius: 8,
        borderBottomEndRadius: 8,
    },
});

export default ModalSelectorPopup;

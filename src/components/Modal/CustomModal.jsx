import React, { Component, useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Dimensions,
    Pressable,
} from "react-native";
// Modal
import { DeleteModal } from "components/Modal/DeleteModal";

// Images
const deleteIcon = require("assets/icons/archives/delete.png");
const editIcon = require("assets/icons/archives/edit.png");
const moreIcon = require("assets/icons/archives/more.png");

const { width, height } = Dimensions.get("window");

export class ModalSelect extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        deleteVisible: false,
        editVisible: false,
    };

    async onPressDelete() {
        // await this.props.modalVisible();
        // await this.props.deleteTrueVisible();
    }

    onPressEdit() {
        if (this.props.comment) {
            this.props.navigation.navigate("CommentEdit", {
                id: this.props.id,
            });
        } else {
            this.props.navigation.navigate("PostEdit", {
                id: this.props.post,
            });
        }
    }

    render() {
        const layout = {
            left: this.props.x,
            top: this.props.y,
        };

        return (
            <>
                <Modal
                    animationType="fade"
                    transparent={true}
                    // visible={this.props.deleteVisible.current}
                    visible={false}
                    onRequestClose={() => this.props.deleteFalseVisible()}
                >
                    <DeleteModal
                        x={0}
                        y={height - 80}
                        closeModalPopupMenu={() => this.props.deleteFalseVisible()}
                    />
                </Modal>
                <TouchableOpacity
                    onPress={this.props.closeModalPopupMenu}
                    style={{ flex: 1 }}
                >
                    <View style={layout}>
                        <TouchableOpacity style={styles.deleteModal}>
                            <Text style={{ color: "#fff" }}>삭제하기</Text>
                            <Image source={deleteIcon} style={{ width: 14, height: 14 }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.onPressEdit()}
                            style={styles.editModal}
                        >
                            <Text style={{ color: "#fff" }}>수정하기</Text>
                            <Image source={editIcon} style={{ width: 14, height: 14 }} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </>
        );
    }
}

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
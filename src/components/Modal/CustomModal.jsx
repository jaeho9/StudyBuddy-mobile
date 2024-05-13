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

// FireStore
import firestore from "@react-native-firebase/firestore";

// Images
const deleteIcon = require("assets/icons/archives/delete.png");
const editIcon = require("assets/icons/archives/edit.png");
const moreIcon = require("assets/icons/archives/more.png");

const { width, height } = Dimensions.get("window");

export class ModalSelect extends Component {
  constructor(props) {
    super(props);
  }

  comment_api = async () => {
    try {
      const commentCollection = firestore().collection("comment");
      const rows = await commentCollection.where(
        "id",
        "==",
        this.props.comment
      );
      rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
      console.log("comment delete complete!");
    } catch (error) {
      console.log("comment error", error.message);
    }
  };

  post_api = async () => {
    try {
      const postCollection = firestore().collection("post");
      const rows = await postCollection.where("id", "==", this.props.post);
      rows.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });
      this.setState({
        deleteVisible: true,
      });
      console.log("post delete complete!");
    } catch (error) {
      console.log("post error", error.message);
    }
  };

  state = {
    deleteVisible: false,
  };

  onPressDelete() {
    this.props.modalVisible();
    if (this.props.comment) {
      this.comment_api();
    } else {
      this.post_api();
    }
  }

  onPressEdit() {
    if (this.props.comment) {
      this.props.navigation.navigate("CommentEdit", {
        id: this.props.comment,
        post_id: this.props.post,
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
          visible={this.state.deleteVisible}
          onRequestClose={() =>
            this.setState({
              deleteVisible: false,
            })
          }
        >
          <DeleteModal
            x={0}
            y={height - 80}
            closeModalPopupMenu={() =>
              this.setState({
                deleteVisible: false,
              })
            }
          />
        </Modal>
        <TouchableOpacity
          onPress={this.props.closeModalPopupMenu}
          style={{ flex: 1 }}
        >
          <View style={layout}>
            <TouchableOpacity
              onPress={() => {
                this.onPressDelete();
                this.setState({
                  deleteVisible: true,
                });
              }}
              style={styles.deleteModal}
            >
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

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
import { DeleteModal } from "components/DeleteModal";

const { width, height } = Dimensions.get("window");

const deleteIcon = require("assets/icons/archives/delete.png");
const editIcon = require("assets/icons/archives/edit.png");
const moreIcon = require("assets/icons/archives/more.png");

export class ModalSelectorPopup extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    deleteVisible: false,
    editVisible: false,
  };

  onPressDelete() {
    this.setState({
      deleteVisible: true,
    });
  }

  onPressEdit() {
    if (this.props.comment) {
      this.props.navigation.navigate("CommentEdit", {
        id: this.props.id,
        item: this.props.item,
        comment: this.props.comment,
      });
    } else {
      this.props.navigation.navigate("PostEdit", {
        id: this.props.id,
        item: this.props.item,
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
              onPress={() => this.onPressDelete()}
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

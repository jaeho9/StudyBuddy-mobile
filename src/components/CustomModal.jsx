import React, { Component, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

const deleteIcon = require("assets/icons/archives/delete.png");
const editIcon = require("assets/icons/archives/edit.png");
const moreIcon = require("assets/icons/archives/more.png");

const CustomModal = ({}) => {
  const more = useRef();
  const [ModalSelectorPopupVisible, setModalSelectorPopupVisible] =
    useState(false);
  const [modalX, setModalX] = useState();
  const [modalY, setModalY] = useState();
  useEffect(() => {
    getViewSize();
  }, []);
  goodsMoreButtonClicked = () => {
    setModalSelectorPopupVisible(true);
  };
  const getViewSize = () => {
    more.current.measure((fx, fy, width, height, px, py) => {
      setModalX(px + width / 4.5);
      setModalY(py + height);
      console.log("location:", fx, fy, width, height, px, py);
    });
  };
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={ModalSelectorPopupVisible}
        onRequestClose={() => setModalSelectorPopupVisible(false)}
      >
        <ModalSelectorPopup
          x={modalX}
          y={modalY}
          closeModalPopupMenu={() => setModalSelectorPopupVisible(false)}
        />
      </Modal>
      <TouchableOpacity
        ref={more}
        onPress={this.goodsMoreButtonClicked}
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={moreIcon} style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    </View>
  );
};

export class ModalSelectorPopup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const layout = { flex: 1, left: this.props.x, top: this.props.y };
    return (
      <TouchableOpacity
        onPress={this.props.closeModalPopupMenu}
        style={{ flex: 1 }}
      >
        <View style={layout}>
          <TouchableOpacity style={styles.deleteModal}>
            <Text style={{ color: "#fff" }}>삭제하기</Text>
            <Image source={deleteIcon} style={{ width: 14, height: 14 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editModal}>
            <Text style={{ color: "#fff" }}>수정하기</Text>
            <Image source={editIcon} style={{ width: 14, height: 14 }} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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

export default CustomModal;

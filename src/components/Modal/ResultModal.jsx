import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
// Modal
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");

const MidModal = ({
  isVisible,
  setIsVisible,
  onSelectResult,
  selectedResult,
}) => {
  const [result, setResult] = useState(selectedResult);

  useEffect(() => {
    setResult(selectedResult);
  }, [selectedResult]);

  const handleSelectResult = (selected) => {
    setResult(selected);
  };

  const handleSaveResult = () => {
    onSelectResult(result);
    setIsVisible(false);
  };

  return (
    <Modal
      useNativeDriver
      isVisible={isVisible}
      animationIn={"fadeIn"}
      animationInTiming={300}
      animationOut={"fadeOut"}
      animationOutTiming={300}
      backdropColor="#000"
      backdropOpacity={0.4}
      style={{ margin: 0, alignItems: "center", justifyContent: "center" }}
      onBackdropPress={() => {
        setIsVisible(!isVisible);
      }}
      onBackButtonPress={() => {
        setIsVisible(!isVisible);
      }}
      hideModalContentWhileAnimating
    >
      <View
        style={{
          width: width - 40,
          paddingTop: 20,
          paddingHorizontal: 16,
          backgroundColor: "#FFF",
          borderRadius: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => setIsVisible(false)}>
            <Text style={{ fontSize: 16, fontWeight: 700, color: "#FF7474" }}>
              취소
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: 700, color: "#8A8A8A" }}>
            결과 선택
          </Text>
          <TouchableOpacity onPress={handleSaveResult}>
            <Text style={{ fontSize: 16, fontWeight: 700, color: "#FF7474" }}>
              저장
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 24,
            gap: 20,
          }}
        >
          <TouchableOpacity onPress={() => handleSelectResult("합격")}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: result === "합격" ? "#FF7474" : "#8A8A8A",
              }}
            >
              합격
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelectResult("탈락")}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: result === "탈락" ? "#FF7474" : "#8A8A8A",
              }}
            >
              탈락
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MidModal;

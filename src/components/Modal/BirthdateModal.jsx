import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";

const BirthdateModal = ({ isVisible, onClose, onSelectDate }) => {
  const [date, setDate] = useState(new Date());

  const handleSaveDate = () => {
    const formattedDate = formatDate(date);
    onSelectDate(formattedDate);
    onClose();
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode="date"
            androidVariant="nativeAndroid"
            textColor="#000"
          />
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={handleSaveDate}
              style={styles.saveButton}
            >
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  closeButton: {
    marginTop: 10,
    marginLeft: "40%",
    alignSelf: "center",
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF7474",
  },
  saveButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FF7474",
  },
});

export default BirthdateModal;

import React, { useState } from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
// Modal
import Modal from "react-native-modal";
// Calendar
import { Calendar } from "react-native-calendars";

const { width, height } = Dimensions.get("window");

const CalendarModal = ({ isVisible, setIsVisible, onSelectDate }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  //   const handleSaveResult = () => {
  //     onSelectDate(startDate, endDate);
  //     setIsVisible(false);
  //   };

  const handleSaveResult = () => {
    // 선택된 날짜를 이용하여 생년월일을 설정하고, 모달을 닫습니다.
    onSelectDate(selectedDate);
    setIsVisible(false);
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString); // 선택된 날짜만 저장
  };

  const generateMarkedDates = () => {
    const markedDates = {};

    if (selectedDate) {
      markedDates[selectedDate] = {
        selected: true,
        disableTouchEvent: true,
        selectedDotColor: "#FF7474",
        selectedTextColor: "#FFFFFF", // 선택된 날짜의 텍스트 색상 변경
      };
    }

    return markedDates;
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
          height: height / 1.5,
          paddingTop: 24,
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
            생년월일 선택
          </Text>
          <TouchableOpacity onPress={handleSaveResult}>
            <Text style={{ fontSize: 16, fontWeight: 700, color: "#FF7474" }}>
              저장
            </Text>
          </TouchableOpacity>
        </View>

        <Calendar
          onDayPress={handleDayPress}
          markedDates={generateMarkedDates()}
          style={{
            marginTop: 28,
          }}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#FF7474",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#FF7474",
            dayTextColor: "#2d4150",
            textDisabledColor: "#000",
            arrowColor: "#FF7474",
          }}
          hideExtraDays={true}
          monthFormat={"yyyy년 M월"}
        />
      </View>
    </Modal>
  );
};

export default CalendarModal;

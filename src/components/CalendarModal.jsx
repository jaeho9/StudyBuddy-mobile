import React, { useState } from "react";
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
// Modal
import Modal from 'react-native-modal';
// Calendar
import { Calendar } from 'react-native-calendars';

const { width, height } = Dimensions.get("window");

const CalendarModal = ({ isVisible, setIsVisible, onSelectDate }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSaveResult = () => {
        onSelectDate(startDate, endDate);
        setIsVisible(false);
    };

    const handleDayPress = (day) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(day.dateString);
            setEndDate('');
        } else {
            setEndDate(day.dateString);
        }
    };

    const generateMarkedDates = () => {
        const markedDates = {};
        if (startDate && endDate) {
            const currentDate = new Date(startDate);
            while (currentDate <= new Date(endDate)) {
                markedDates[currentDate.toISOString().slice(0, 10)] = { selected: true, disableTouchEvent: true, selectedDotColor: '#FF7474' };
                currentDate.setDate(currentDate.getDate() + 1);
            }
        } else if (startDate) {
            markedDates[startDate] = { selected: true, disableTouchEvent: true, selectedDotColor: '#FF7474' };
        }
        return markedDates;
    };

    return (
        <Modal
            useNativeDriver
            isVisible={isVisible}
            animationIn={'fadeIn'}
            animationInTiming={300}
            animationOut={'fadeOut'}
            animationOutTiming={300}
            backdropColor='#000'
            backdropOpacity={0.4}
            style={{ margin: 0, alignItems: 'center', justifyContent: 'center' }}
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
                    height: height / 2,
                    paddingTop: 24,
                    paddingHorizontal: 16,
                    backgroundColor: '#FFF',
                    borderRadius: 16
                }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setIsVisible(false)}>
                        <Text style={{ fontSize: 16, fontWeight: 700, color: '#FF7474' }}>취소</Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: 700, color: '#8A8A8A' }}>일정 선택</Text>
                    <TouchableOpacity onPress={handleSaveResult}>
                        <Text style={{ fontSize: 16, fontWeight: 700, color: '#FF7474' }}>저장</Text>
                    </TouchableOpacity>
                </View>

                <Calendar
                    onDayPress={handleDayPress}
                    markedDates={generateMarkedDates()}
                    style={{
                        marginTop: 28
                    }}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#FF7474',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#FF7474',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#000',
                        arrowColor: '#FF7474'
                    }}
                    hideExtraDays={true}
                    monthFormat={'yyyy년 M월'}
                />
            </View>
        </Modal>
    )
}

export default CalendarModal;

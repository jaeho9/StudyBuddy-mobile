import React, { useState } from "react";
import { SafeAreaView, Dimensions } from "react-native";
import { Calendar } from 'react-native-calendars';

import Header from '../components/header';

const arrowLeft = require('../assets/icons/add/arrow_left.png');
const complete = require('../assets/icons/add/complete.png');

const { width, height } = Dimensions.get("window");

const CustomCalendar = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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

    const date = { startDate, endDate };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header
                left={arrowLeft}
                leftClick={"Add"}
                title={"일정 선택"}
                right={complete}
                rightClick={["Add", { date: date }]}
            />

            <Calendar
                onDayPress={handleDayPress}
                markedDates={generateMarkedDates()}
                style={{
                    marginTop: 24
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
                // 이전 달, 다음 달 날짜 숨기기
                hideExtraDays={true}
                // 달 포맷 지정
                monthFormat={'yyyy년 M월'}
            />


        </SafeAreaView>
    )
}

export default CustomCalendar;
import React from "react";
import { SafeAreaView, Text } from "react-native";

import Header from '../components/header';

const arrowLeft = require('../assets/icons/add/arrow_left.png');
const complete = require('../assets/icons/add/complete.png');

const Calendar = () => {
    return (
        <SafeAreaView>
            <Header
                left={arrowLeft}
                leftClick={"Add"}
                title={"일정 선택"}
                right={complete}
            />
        </SafeAreaView>
    )
}

export default Calendar;
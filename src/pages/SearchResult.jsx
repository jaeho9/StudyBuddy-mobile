import React from "react";
import { SafeAreaView } from "react-native";

import Header from '../components/header';

const arrowLeft = require('../assets/icons/add/arrow_left.png');

const SearchResult = ({ route }) => {
    const { text } = route.params ? route.params : {};
    return (
        <SafeAreaView>
            <Header
                left={arrowLeft}
                leftClick={"Search"}
                title={text}
            />
        </SafeAreaView>
    )
}

export default SearchResult;
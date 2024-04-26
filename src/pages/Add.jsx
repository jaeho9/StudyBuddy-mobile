import React, { useState, useRef, useEffect } from "react";
import { Image, KeyboardAvoidingView, SafeAreaView, Text, TextInput, TouchableOpacity, View, Dimensions, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Header from '../components/header';

const clear = require('../assets/icons/add/clear.png');
const feedAdd = require('../assets/icons/add/feed_add.png');
const arrowDown = require('../assets/icons/add/arrow_down.png');
const arrowRight = require('../assets/icons/add/arrow_right.png');
const calendarOn = require('../assets/icons/add/calendar_on.png');
const calendarOff = require('../assets/icons/add/calendar_off.png');
const storiesOn = require('../assets/icons/add/stories_on.png');
const storiesOff = require('../assets/icons/add/stories_off.png');
const pasteOn = require('../assets/icons/add/paste_on.png');
const pasteOff = require('../assets/icons/add/paste_off.png');
const reviewsOn = require('../assets/icons/add/reviews_on.png');
const reviewsOff = require('../assets/icons/add/reviews_off.png');
const attachFile = require('../assets/icons/add/attach_file.png');

const { width, height } = Dimensions.get("window");

const Add = ({ navigation }) => {
    const [text, setText] = useState('');

    const onChangeText = (inputText) => {
        setText(inputText);
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <Header
                left={clear}
                leftClick={"Home"}
                title={"새 게시물"}
                right={feedAdd}
            />
            <KeyboardAwareScrollView style={{ marginHorizontal: 20, marginVertical: 16 }}>
                <View>
                    <TouchableOpacity style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#BDBDBD' }}>
                        <Text style={{ fontSize: 16, color: '#BDBDBD' }}>커뮤니티 선택</Text>
                        <Image source={arrowDown} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#BDBDBD' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={calendarOff} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: '#BDBDBD' }}>준비 기간</Text>
                        </View>
                        <Image source={arrowRight} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#BDBDBD' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={storiesOff} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: '#BDBDBD' }}>교재</Text>
                        </View>
                        <Image source={arrowRight} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ height: 40, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: '#BDBDBD' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={pasteOff} style={{ width: 24, height: 24, marginRight: 8 }} />
                            <Text style={{ fontSize: 16, color: '#BDBDBD' }}>결과</Text>
                        </View>
                        <Image source={arrowRight} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 4 }}>
                    <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8 }}>
                        <Image source={reviewsOff} style={{ width: 24, height: 24, marginRight: 8 }} />
                        <Text style={{ fontSize: 16, color: '#BDBDBD' }}>공부 방법</Text>
                    </View>

                    <TextInput
                        autoCapitalize='none'
                        spellCheck={false}
                        autoCorrect={false}
                        onChangeText={onChangeText}
                        value={text}
                        placeholderTextColor="#7A7A7A"
                        multiline
                        style={{
                            height: height / 3, padding: 8, borderRadius: 4, backgroundColor: '#F1F1F1', color: '#7A7A7A', fontSize: 16, lineHeight: 18, letterSpacing: 1
                        }}
                    />

                    <TouchableOpacity style={{ height: 40, flexDirection: 'row', alignItems: 'center', marginTop: 20, padding: 8, borderRadius: 4, borderWidth: 1, borderColor: '#BDBDBD' }}>
                        <Image source={attachFile} style={{ width: 24, height: 24 }} />
                        <Text style={{ fontSize: 16, color: '#BDBDBD' }}>자료</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Add;

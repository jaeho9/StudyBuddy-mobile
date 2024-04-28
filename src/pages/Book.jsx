import React, { useState } from "react";
import { SafeAreaView, View, Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList, Dimensions } from "react-native";

import Header from '../components/header';

const arrowLeft = require('../assets/icons/add/arrow_left.png');
const search = require('../assets/icons/add/search.png');
const select = require('../assets/icons/add/select.png');

const { width, height } = Dimensions.get("window");

const dummy_data = [
    {
        id: 1,
        name: '정보처리기사',
        img: require('../assets/icons/add/book1.png')
    },
    {
        id: 2,
        name: '정보보안기사',
        img: require('../assets/icons/add/book2.png')
    },
    {
        id: 3,
        name: '컴퓨터활용능력',
        img: require('../assets/icons/add/book3.png')
    },
    {
        id: 4,
        name: 'TOEIC',
        img: require('../assets/icons/add/book2.png')
    }
]

const Book = ({ navigation }) => {
    const [book, setBook] = useState('');
    const [selectBook, setSelectBook] = useState();
    const [selectIndex, setSelectIndex] = useState();


    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectIndex(index)
                    setSelectBook(item)
                }}
                style={{ marginBottom: 12 }}
            >
                {
                    selectIndex === index && (
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ position: 'absolute', zIndex: 2, width: (width / 3) - 10, height: width / 3, backgroundColor: '#D9D9D9', opacity: 0.8 }} />
                        </View>

                    )
                }
                <Image source={item.img} style={{ width: width / 3, height: width / 3 }} resizeMode="contain" />
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <Header
                left={arrowLeft}
                leftClick={"Add"}
                title={"교재 검색"}
                right={select}
                rightClick={['Add', { book: selectBook }]}
            />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ marginTop: 16, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8, paddingLeft: 8, backgroundColor: '#F1F1F1', borderRadius: 12 }}>
                        <TouchableOpacity>
                            <Image source={search} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="교재 검색"
                            placeholderTextColor='#9C9C9C'
                            returnKeyType='search'
                            spellCheck={false}
                            autoCorrect={false}
                            autoCapitalize='none'
                            value={book}
                            onChangeText={(text) => setBook(text)}
                            allowFontScaling={false}
                            style={{
                                flex: 1,
                                marginLeft: 4,
                                paddingVertical: 10,
                                backgroundColor: '#F1F1F1',
                                borderRadius: 12,
                                fontSize: 16,
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 16, justifyContent: 'center', alignItems: 'center' }}>
                        <FlatList
                            data={dummy_data}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            removeClippedSubviews
                            numColumns={3}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </SafeAreaView>
    )
}

export default Book;
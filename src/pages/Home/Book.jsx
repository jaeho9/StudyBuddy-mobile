import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, FlatList, Dimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// Header
import Header from '../../components/Tab/header';
// Axios
import axios from 'axios';

// Imgaes
const arrowLeft = require('../../assets/icons/add/arrow_left.png');
const search = require('../../assets/icons/add/search.png');
const select = require('../../assets/icons/add/select.png');
const cancel = require('../../assets/icons/add/cancel.png');

const { width, height } = Dimensions.get("window");

const Book = ({ navigation }) => {

    const [bookApi, setBookApi] = useState([]); // 책 데이터 배열
    const [book, setBook] = useState('');   // 검색 텍스트
    const [selectBook, setSelectBook] = useState(); // 책 제목
    const [selectIndex, setSelectIndex] = useState();

    // 네이버 검색 API
    const handleSearch = async () => {
        try {
            var client_id = 'iP8vsf1OqIrEPCAFwl5D';
            var client_secret = 'Sky4wuUPmp';
            const api_url = `https://openapi.naver.com/v1/search/book?query=${encodeURI(book)}`;
            const options = {
                headers: {
                    'X-Naver-Client-Id': client_id,
                    'X-Naver-Client-Secret': client_secret
                }
            };
            const response = await axios.get(api_url, options);
            const items = response.data.items.map(item => ({ id: item.isbn, image: item.image, title: item.title }));
            setBookApi(items);
        } catch (error) {
            console.log(error.message);
        }
    }

    // FlatList
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setSelectIndex(index)
                    setSelectBook(item.title)
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
                <Image source={{ uri: item.image }} style={{ width: width / 3, height: width / 3 }} resizeMode="contain" />
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
                rightClick={() => navigation.navigate('Add', { book: selectBook })}
            />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ marginTop: 16, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8, paddingHorizontal: 8, backgroundColor: '#F1F1F1', borderRadius: 12 }}>
                        <TouchableOpacity>
                            <Image source={search} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="교재 검색"
                            placeholderTextColor='#9C9C9C'
                            returnKeyType='search'
                            onSubmitEditing={handleSearch}
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
                                letterSpacing: 0.6
                            }}
                        />
                        {book ? (
                            <TouchableOpacity onPress={() => setBook('')}>
                                <Image source={cancel} style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                        ) : (
                            <View />
                        )}

                    </View>
                    <View style={{ marginTop: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <FlatList
                            data={bookApi}
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
import React, { useState } from "react";
import { View, Keyboard, Dimensions, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
// Modal
import Modal from 'react-native-modal';

//Images
const search = require('../assets/icons/add/search.png');
const selectOn = require('../assets/icons/add/select_on.png');
const selectOff = require('../assets/icons/add/select_off.png');
const cancel = require('../assets/icons/add/cancel.png');

const { width, height } = Dimensions.get("window");

// Dummy_data
const dummy_data = [
    {
        id: 1,
        name: '정보처리기사'
    },
    {
        id: 2,
        name: '정보보안기사'
    },
    {
        id: 3,
        name: '컴퓨터활용능력'
    },
    {
        id: 4,
        name: 'TOEIC'
    }
]

const CustomModal = ({ isVisible, setIsVisible, onSelectCommunity }) => {
    const [keyword, setKeyword] = useState('');
    const [selectIndex, setSelectIndex] = useState();

    const ModalItem = ({ item, index }) => {
        return (
            <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, fontWeight: 700, color: '#717171' }}>{item.name}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            onSelectCommunity(item)
                            setSelectIndex(index)
                            setIsVisible(false)
                        }}>
                        {
                            selectIndex === index && (
                                <Image source={selectOn} style={{ position: 'absolute', zIndex: 2, width: 24, height: 24 }} />
                            )
                        }
                        <Image source={selectOff} style={{ width: 24, height: 24 }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <Modal
            useNativeDriver
            isVisible={isVisible}
            animationIn={'slideInUp'}
            animationInTiming={300}
            animationOut={'slideOutDown'}
            animationOutTiming={500}
            backdropColor='#000'
            backdropOpacity={0.4}
            style={{ margin: 0, alignItems: 'center', justifyContent: 'flex-end' }}
            onBackdropPress={() => {
                Keyboard.dismiss();
                setIsVisible(!isVisible);
            }}
            onBackButtonPress={() => {
                Keyboard.dismiss();
                setIsVisible(!isVisible);
            }}
            hideModalContentWhileAnimating
        >

            <View
                style={{
                    width,
                    height: height - 160,
                    paddingTop: 20,
                    paddingHorizontal: 16,
                    backgroundColor: '#FFF',
                    borderTopStartRadius: 16,
                    borderTopEndRadius: 16
                }}>
                <View
                    pointerEvents='none'
                    style={{
                        position: 'absolute',
                        top: 16,
                        left: 0,
                        right: 0,
                        alignItems: 'center'
                    }}>
                    <View style={{ width: 40, height: 4, borderRadius: 4, backgroundColor: '#FF7474' }} />
                </View>

                <View style={{ flex: 1, marginTop: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, backgroundColor: '#F1F1F1', borderRadius: 12 }}>
                        <TouchableOpacity>
                            <Image source={search} style={{ width: 24, height: 24 }} />
                        </TouchableOpacity>
                        <TextInput
                            placeholder="커뮤니티 검색"
                            placeholderTextColor='#9C9C9C'
                            returnKeyType='search'
                            spellCheck={false}
                            autoCorrect={false}
                            autoCapitalize='none'
                            value={keyword}
                            onChangeText={(text) => setKeyword(text)}
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
                        {keyword ? (
                            <TouchableOpacity onPress={() => setBook('')}>
                                <Image source={cancel} style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                        ) : (
                            <View />
                        )}
                    </View>
                </View>

                <View>
                    <FlatList
                        data={dummy_data}
                        renderItem={ModalItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        style={{
                            height: height - 250
                        }}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default CustomModal;

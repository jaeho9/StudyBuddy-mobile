import React, { useState } from "react";
import { View, Keyboard, Dimensions, Text, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
// Modal
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get("window");

// Dummy_data
const dummy_data = [
    {
        id: 1,
        name: '정보처리기사.pdf'
    },
    {
        id: 2,
        name: '정보보안기사.pdf'
    },
    {
        id: 3,
        name: '컴퓨터활용능력.pdf'
    },
    {
        id: 4,
        name: 'TOEIC.pdf'
    }
]

const FileModal = ({ isVisible, setIsVisible, onSelectFile }) => {
    const [selectIndex, setSelectIndex] = useState();

    const ModalItem = ({ item, index }) => {
        return (
            <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => {
                            onSelectFile(item)
                            setSelectIndex(index)
                            setIsVisible(false)
                        }}>
                        <Text style={{ fontSize: 16, fontWeight: 700, color: '#717171' }}>{item.name}</Text>
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

                <View style={{ marginTop: 24, marginHorizontal: 4 }}>
                    <TouchableOpacity style={{ height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F1F1', borderRadius: 12 }}>
                        <Text style={{ fontSize: 16, fontWeight: 700, color: '#717171' }}>+ 파일 선택</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={dummy_data}
                        renderItem={ModalItem}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        style={{
                            height: height - 250,
                            marginTop: 20
                        }}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default FileModal;
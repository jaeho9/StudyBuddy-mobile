import React, { useState } from "react";
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
// Modal
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get("window");

const RemoveModal = ({ isVisible, setIsVisible }) => {

    return (
        <Modal
            useNativeDriver
            isVisible={isVisible}
            animationIn={'slideInUp'}
            animationInTiming={300}
            animationOut={'slideOutDown'}
            animationOutTiming={300}
            backdropColor='#000'
            backdropOpacity={0.4}
            style={{ marginBottom: 50, alignItems: 'center', justifyContent: 'flex-end' }}
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
                    width: width - 20,
                    justifyContent: 'center',
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    backgroundColor: '#606060',
                    borderRadius: 12
                }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#fff' }}>알림 삭제됨</Text>
                    <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                        <Text style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>취소</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default RemoveModal;

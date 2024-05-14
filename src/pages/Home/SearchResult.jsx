import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firestore } from "@react-native-firebase/firestore";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from "components/Tab/Header";

const arrowLeft = require('assets/icons/add/arrow_left.png');

const Tab = createMaterialTopTabNavigator();

const SearchResult = ({ route, navigation }) => {
    const { text } = route.params ? route.params : {};

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                left={arrowLeft}
                leftClick={() => navigation.goBack()}
                title={text}
            />
            <Tab.Navigator
                screenOptions={{
                    tabBarInactiveTintColor: '#828282',
                    tabBarActiveTintColor: '#333333',
                    tabBarIndicatorStyle: {
                        backgroundColor: '#FF7474',
                        width: 58,
                        marginLeft: 70,
                        height: 3
                    },
                    tabBarStyle: {
                        backgroundColor: '#F1F1F1',
                    },
                    tabBarLabelStyle: {
                        fontWeight: '600'
                    }
                }}
            >
                {/* 인기 탭 */}
                <Tab.Screen name="인기" options={{ tabBarLabel: '인기' }}>
                    {/* FlatList를 사용하여 검색된 게시물을 렌더링 */}
                    {() => (
                        <View style={{ marginTop: 20 }}>
                            {/* <FlatList
                                data={posts}
                                renderItem={renderPostItem}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                removeClippedSubviews
                            /> */}
                        </View>
                    )}
                </Tab.Screen>
                {/* 최근 탭 */}
                <Tab.Screen name="최근" options={{ tabBarLabel: '최근' }}>
                    {/* FlatList를 사용하여 검색된 게시물을 렌더링 */}
                    {() => (
                        <View style={{ marginTop: 20 }}>
                            {/* <FlatList
                                data={posts}
                                renderItem={renderPostItem}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                removeClippedSubviews
                            /> */}
                        </View>
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default SearchResult;

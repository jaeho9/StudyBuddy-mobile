import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
// Onboarding 라이브러리
import Onboarding from 'react-native-onboarding-swiper';
// Images
const onboarding1 = require("assets/icons/onboarding/onboarding1.jpg");
const onboarding2 = require("assets/icons/onboarding/onboarding2.jpg");
const onboarding3 = require("assets/icons/onboarding/onboarding3.jpg");
const onboarding4 = require("assets/icons/onboarding/onboarding4.jpg");

const { width } = Dimensions.get('window');

const Dots = ({ selected }) => {
    return (
        <View
            style={{
                width: 8,
                height: 8,
                borderRadius: 6,
                marginHorizontal: 3,
                marginBottom: 20,
                backgroundColor: selected ? '#FF7474' : '#C4C4C4',
            }}
        >
        </View>
    );
}

const Skip = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 30, marginBottom: 20 }}
        {...props}
    >
        <Text style={{ color: '#4A4A4A', fontSize: 16, fontWeight: 700 }}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({ ...props }) => (
    <TouchableOpacity
        style={{ marginHorizontal: 30, marginBottom: 20, }}
        {...props}
    >
        <Text style={{ color: '#4A4A4A', fontSize: 16, fontWeight: 700 }}>Next</Text>
    </TouchableOpacity>
);

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 30, marginBottom: 20, backgroundColor: '#FF7474', borderRadius: 8, width: width - 60, height: 50 }}
        {...props}
    >
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>시작하기</Text>
    </TouchableOpacity>
);

const UserGuide = ({ navigation }) => {
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Onboarding
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                DotComponent={Dots}
                bottomBarHighlight={false}
                onSkip={() => navigation.replace('Start')}
                onDone={() => navigation.navigate('Start')}
                pages={[
                    {
                        id: 1,
                        backgroundColor: '#fff',
                        title: (<Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FF7474', marginBottom: 12 }}>스터디버디 사용법</Text>),
                        subtitle: (<Text style={{ fontSize: 16, color: '#606060', textAlign: 'center' }}>다양한 아티클을 만나 시간을 효율적으로{'\n'}활용하며 새로운 지식을 습득해보세요.</Text>),
                        image: (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={onboarding1} style={{ width: width - 80, resizeMode: 'contain' }} />
                            </View>
                        )
                    },
                    {
                        id: 2,
                        backgroundColor: '#fff',
                        title: (<Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FF7474', marginBottom: 12 }}>다양한 자료</Text>),
                        subtitle: (<Text style={{ fontSize: 16, color: '#606060', textAlign: 'center' }}>다양한 주제의 자료를 쉽게  찾아보세요.{'\n'}원하는 학습자료를 모두 한 곳에서 확인하세요.</Text>),
                        image: (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={onboarding2} style={{ width: width - 80, resizeMode: 'contain' }} />
                            </View>
                        )
                    },
                    {
                        id: 3,
                        backgroundColor: '#fff',
                        title: (<Text style={{ fontSize: 30, fontWeight: 'bold', color: '#FF7474', marginBottom: 12 }}>스터디 커뮤니티</Text>),
                        subtitle: (<Text style={{ fontSize: 16, color: '#606060', textAlign: 'center' }}>스터디 커뮤니티에 참여하여 공부할 파트너를{'\n'}찾아 목표를 이루어가세요!</Text>),
                        image: (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={onboarding3} style={{ width: width - 50, resizeMode: 'contain', justifyContent: 'center', alignItems: 'center' }} />
                            </View>
                        )
                    },
                    {
                        id: 4,
                        backgroundColor: '#fff',
                        title: (<Text></Text>),
                        subtitle: (<Text style={{ fontSize: 22, fontWeight: 'bold', color: '#FF7474', textAlign: 'center' }}>새로운 학습 여정을 함께 {'\n'}시작해보아요~!</Text>),
                        image: (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={onboarding4} style={{ width: width - 50, resizeMode: 'contain', justifyContent: 'center', alignItems: 'center' }} />
                            </View>
                        )
                    },
                ]}
            />
        </View>
    );
};



export default UserGuide;



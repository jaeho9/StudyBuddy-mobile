import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Alert, Image, Linking } from 'react-native';
import Header from 'components/Header';
import { signIn } from '../lib/auth';

const backIcon = require('assets/icons/home/back.png');
const googleIcon = require('assets/icons/signupandlogin/google.png');
const kakaoIcon = require('assets/icons/signupandlogin/kakao.png');
const naverIcon = require('assets/icons/signupandlogin/naver.png');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState("");
  const [isCommunityJoined, setIsCommunityJoined] = useState(false);

  const login = async () => {
    if (!email && !password) {
      setErrorMessages('이메일과 비밀번호를 입력하세요.');
    } else if (!email) {
      setErrorMessages('이메일을 입력하세요.');
    } else if (!password) {
      setErrorMessages('비밀번호를 입력하세요.');
    } else {
      try {
        await signIn({ email, password });
        navigation.navigate('Home');
      } catch (error) {
        Alert.alert("로그인에 실패하였습니다.");
      }
    }
  };

  useEffect(() => {
    const isCommunityJoined = async () => {
      if (email === 'wlgud@naver.com') {
        setIsCommunityJoined(true);
      } else {
        setIsCommunityJoined(false);
      }
    };
    isCommunityJoined();
  }, [email]);

  const findID = () => {
    navigation.navigate('Account');
  };
  const findPW = () => {
    navigation.navigate('Password');
  };
  const goGoogle = () => {
    Linking.openURL('https://www.google.com');
  };
  const goKakao = () => {
    Linking.openURL('https://www.google.com');
  };
  const goNaver = () => {
    Linking.openURL('https://www.naver.com');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Header left={backIcon} leftClick={'Signup1'} />
      <View style={styles.container}>
        <Text style={{ fontSize: 16, color: '#ff7474', fontWeight: 'bold', marginVertical: 30, marginRight: 310 }}>계정</Text>
        {errorMessages ? <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessages}</Text> : null}
        <TextInput style={styles.input} placeholder="이메일" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} secureTextEntry={true} placeholder="비밀번호" value={password} onChangeText={setPassword} />
        <TouchableOpacity
          style={styles.button}
          onPress={login}
          activeOpacity={0.5}>
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginBottom: 40, marginTop: 15 }}>
          <TouchableOpacity
            style={{ marginRight: 30 }}
            onPress={findID}>
            <Text style={{ fontSize: 16, color: '#777777' }}>계정 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginLeft: 30 }}
            onPress={findPW}>
            <Text style={{ fontSize: 16, color: '#777777' }}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <View style={styles.line1} />
          <Text style={{ fontSize: 16, color: '#777777', marginHorizontal: 10 }}>또는</Text>
          <View style={styles.line2} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }} >
          <TouchableOpacity
            onPress={goGoogle}
            activeOpacity={0.5}>
            <Image source={googleIcon} style={{ width: 24, height: 24, marginRight: 80 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goKakao}
            activeOpacity={0.5}>
            <Image source={kakaoIcon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goNaver}
            activeOpacity={0.5}>
            <Image source={naverIcon} style={{ width: 24, height: 24, marginLeft: 80 }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 400,
  },
  input: {
    width: 337,
    height: 45,
    borderColor: '#777777',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF7474',
    alignItems: 'center',
    justifyContent: 'center',
    width: 374,
    height: 60,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  line1: {
    flex: 1,
    borderBottomColor: '#777777',
    borderBottomWidth: 1,
    marginLeft: 40,
    margin: 20,
  },
  line2: {
    flex: 1,
    borderBottomColor: '#777777',
    borderBottomWidth: 1,
    marginRight: 40,
    margin: 20,
  },
});

export default Login;
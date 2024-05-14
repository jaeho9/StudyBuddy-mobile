import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import Header from 'components/Header';

const backIcon = require('assets/icons/home/back.png');

const checkExistingData = async (nickname, email) => {
  const existingNickname = 'rlawlgud';
  const existingEmail = 'wlgud@naver.com';

  if (nickname === existingNickname) {
    return '이미 존재하는 닉네임입니다.';
  }
  if (email === existingEmail) {
    return '이미 존재하는 이메일입니다.';
  }

  return null;
};

const Signup3 = ({ navigation }) => {
  const login = () => {
    navigation.navigate('Login');
  };

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSignup = async () => {
    // Perform validation checks before signing up
    let isValid = true;

    if (!nickname.trim()) {
      setNicknameError('닉네임을 입력하세요.');
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError('이메일을 입력하세요.');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('비밀번호를 입력하세요.');
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('비밀번호를 확인해주세요.');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      isValid = false;
    }

    if (!isValid) return;

    // Check for existing data before signing up
    const existingDataMsg = await checkExistingData(nickname, email);
    if (existingDataMsg) {
      Alert.alert(existingDataMsg);
      return;
    }

    // If all validations pass, proceed with signing up
    login();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Header left={backIcon} leftClick={'Signup2'} />
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>스터디버디</Text>
          <Text style={[styles.title, { color: '#ff7474' }]}>회원가입</Text>
          <View style={{ marginTop: 80 }}>
            <View>
              <Text style={{ fontSize: 16, color: '#ff7474', fontWeight: 'bold', marginBottom: 20 }}>계정</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="닉네임 입력"
              onChangeText={setNickname}
              value={nickname}
            />
            {nicknameError ? <Text style={styles.errorText}>{nicknameError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="이메일 입력"
              onChangeText={setEmail}
              value={email}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="비밀번호 입력"
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="비밀번호 확인"
              secureTextEntry={true}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          activeOpacity={0.5}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginBottom: 150,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
});

export default Signup3;

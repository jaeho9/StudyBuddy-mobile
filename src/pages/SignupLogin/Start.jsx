import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

const studybuddyIcon = require("assets/icons/home/studybuddy.png");

const Start = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleSignup = () => {
    navigation.navigate('Signup1');
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.container}>
        <Image source={studybuddyIcon} style={styles.logo} />
        <TouchableOpacity style={[styles.button, {width: '100%'}]} onPress={handleLogin} activeOpacity={0.5} >
          <Text style={styles.buttonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {width: '100%'}]} onPress={handleSignup} activeOpacity={0.5}>
          <Text style={styles.buttonText}>새로 시작하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 10,
    marginBottom: 100,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 90,
    height: 70,
    marginBottom: 250,
  },
  button: {
    backgroundColor: '#FF7474',
    alignItems: 'center',
    justifyContent: 'center',
    width: 374,
    height: 60,
    borderRadius: 8,
    marginBottom: 10,
    
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default Start;

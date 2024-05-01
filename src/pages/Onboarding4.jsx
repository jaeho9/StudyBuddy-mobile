import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const onboardingIcon4 = require("assets/icons/onboarding/onboarding4.jpg");

const Onboarding4 = ({navigation}) => {
  const handleStart = () => {
    navigation.navigate('Start');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Image source={onboardingIcon4} style={styles.image} />
      <Text style={styles.description}>
        새로운 학습 여정을 함께 {'\n'}시작해보아요~!
      </Text>
      <TouchableOpacity style={[styles.button, {width: '100%'}]} onPress={handleStart} activeOpacity={0.5} >
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#606060',
    marginBottom: 50,
  },
  image: {
    width: 284,
    height: 284,
    marginBottom: 50,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 100,
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
});

export default Onboarding4;
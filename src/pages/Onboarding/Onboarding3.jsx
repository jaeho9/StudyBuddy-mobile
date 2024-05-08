import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const onboardingIcon3 = require("assets/icons/onboarding/onboarding3.jpg");

const Onboarding3 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Image source={onboardingIcon3} style={styles.image} />
      <Text style={styles.description}>
        스터디 커뮤니티에 참여하여 공부할 파트너를{'\n'}찾아 목표를 이루어가세요!
      </Text>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Start')}>
          <Text style={styles.button}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.indicatorContainer}>
          <View style={[styles.indicator]} />
          <View style={[styles.indicator]} />
          <View style={[styles.activeIndicator]} />
          <View style={[styles.indicator]} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Onboarding4')}>
          <Text style={styles.button}>Next</Text>
        </TouchableOpacity>
      </View>
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
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 50,
    paddingHorizontal: 30,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeIndicator: {
    width: 13,
    height: 13,
    borderRadius: 7,
    marginHorizontal: 5,
    backgroundColor: '#FF7474',
  },
  indicator: {
    width: 11,
    height: 11,
    borderRadius: 6,
    marginHorizontal: 5,
    backgroundColor: '#C4C4C4',
  },
  button: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
});

export default Onboarding3;
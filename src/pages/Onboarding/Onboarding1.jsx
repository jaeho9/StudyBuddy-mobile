import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';

const onboardingIcon = require("assets/icons/onboarding/onboarding1.jpg");

const Onboarding = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>스터디버디 사용법</Text>
      <Image source={onboardingIcon} style={styles.image} />
      <Text style={styles.description}>
        다양한 아티클을 만나 시간을 효율적으로{'\n'}활용하며 새로운 지식을 습득해보세요.
      </Text>
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Start')}>
          <Text style={styles.button}>Skip</Text>
        </TouchableOpacity>
        <View style={styles.indicatorContainer}>
          <View style={[styles.activeIndicator]} />
          <View style={[styles.indicator]} />
          <View style={[styles.indicator]} />
          <View style={[styles.indicator]} />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Onboarding2')}>
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

export default Onboarding;

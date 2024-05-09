import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
// Header
import Header from 'components/Tab/Header';

// Images
const backIcon = require('assets/icons/home/back.png');

const Account = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Header left={backIcon} leftClick={() => navigation.navigate('Login')} title={'계정 찾기'} />
      <View style={styles.container}>
        <Text style={{ fontSize: 16, color: '#ff7474', fontWeight: 'bold', marginVertical: 30, marginRight: 310 }}>계정</Text>
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
});

export default Account;

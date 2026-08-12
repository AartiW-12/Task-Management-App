import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {Colors, Fonts, fontSizes} from '../../constants/style/ConstantStyling'

const Header = ({ text, titleStyle, backIconColor = Colors.primary, onBack, rightComponent }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {navigation.canGoBack() ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack ?? (() => navigation.goBack())}
          activeOpacity={0.8}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}

      <Text style={[styles.title, titleStyle]}>{text}</Text>

      {rightComponent ?? <View style={styles.placeholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: fontSizes.title,
  },

  placeholder: {
    width: 40,
  },
});

export default Header;
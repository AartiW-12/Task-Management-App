import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';

import { Colors, Fonts, fontSizes, Spacings } from '../style/ConstantStyling';

import EyeIcon from '../../assets/images/Icons/EyeIcon.svg';
import ClosedEye from '../../assets/images/Icons/ClosedEye.svg'


function Input({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  style,
  secureTextEntry = false,
  multiline = false,
  isEMail= false,
  numberOfLines = 1,
  textAlignVertical = 'center',
  placeholderTextColor = Colors.inputPlaceholder,
  leftIcon
}) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>

      {leftIcon && (
        <View style={styles.leftIconContainer}>
          {leftIcon}
        </View>
      )}

      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        autoCapitalize={isEMail? 'none' : 'characters'}
        secureTextEntry={secureTextEntry && !isPasswordVisible}

        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={textAlignVertical}
        style={[
          styles.input,
          multiline && styles.multilineInput,
        ]}
      />

      {secureTextEntry && (
        <TouchableOpacity
          style={styles.iconContainer}
          activeOpacity={0.8}
          onPress={() => setIsPasswordVisible(prev => !prev)}
        >
          {isPasswordVisible ?
            <EyeIcon width={20} height={20} />
            :
            <ClosedEye width={20} height={20} />
          }
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    width: Spacings.fullWidth,
    minHeight: 40,
    borderRadius: Spacings.mmd,
    backgroundColor: Colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftIconContainer: {
    paddingLeft: Spacings.mmd,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    paddingHorizontal: Spacings.mmd,
    color: Colors.textColor,
    fontFamily: Fonts.regular,
    fontSize:fontSizes.xs
  },

  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: Spacings.vmd,
    paddingBottom: Spacings.vmd,
  },

  iconContainer: {
    paddingHorizontal: Spacings.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default Input;
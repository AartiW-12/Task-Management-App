import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Fonts, fontSizes, Numbers, Spacings, } from '../../constants/style/ConstantStyling';
import { Strings } from '../../constants/strings/Strings';

import MailIcon from '../../assets/images/Icons/MailIcon.svg';
import LockIcon from '../../assets/images/Icons/Lock.svg';


import Input from '../../constants/input/Input';
import Button from '../../constants/button/Button';
import { useNavigation } from '@react-navigation/native';
import { resetPassword } from '../../services/authServices';
import { auth } from '../../firebase/firebaseConfig';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const navigation = useNavigation()

  const handleResetCode = async() => {
    if (!email.trim()) {
      Alert.alert(Strings.passwordValidationRules.required.email)
      return
    }

    try {
      await resetPassword(email.trim())

      Alert.alert(
        'Check Your Email',
        `If an account exists for ${email}, a password reset link has been sent. Please check your inbox.`,
        [
          {
            text: 'Back to Sign In',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (error) {
      console.log(error)
      if (error.code === 'auth/invalid-email') {
        Alert.alert('Invalid email address')
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert(error.code)
      } else {
        Alert.alert('Something went wrong. Please try again.')
      }
    }
  }

  // const handleResetCode = async () => {
  //   const cleanEmail = email.trim().toLowerCase();

  //   if (!cleanEmail) {
  //     Alert.alert('Error', 'Please enter your email address.');
  //     return;
  //   }

  //   try {
  //     await resetPassword(cleanEmail);

  //     Alert.alert(
  //       'Check Your Email',
  //       `If an account exists for ${cleanEmail}, a password reset link has been sent. Please check your inbox.`,
  //       [
  //         {
  //           text: 'Back to Sign In',
  //           onPress: () => navigation.navigate('Login'),
  //         },
  //       ]
  //     );
  //   } catch (error) {
  //     console.log('Reset password error:', error);

  //     if (error.code === 'auth/invalid-email') {
  //       Alert.alert('Error', 'Please enter a valid email address.');
  //     } else if (error.code === 'auth/too-many-requests') {
  //       Alert.alert('Error', 'Too many attempts. Please try again later.');
  //     } else {
  //       Alert.alert('Error', 'Failed to send reset email. Please try again.');
  //     }
  //   }
  // };



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>

          <LockIcon width={100} height={100} />

          <Text style={styles.title}>{Strings.resetPassword}</Text>

          <Text style={styles.description}>{Strings.resetPasswordInfo}</Text>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>{Strings.inputLabel.email + ' ' + Strings.inputLabel.address}</Text>

            <Input
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder={Strings.placeholders.email}
              leftIcon={<MailIcon width={15} height={15} />}
              placeholderTextColor={Colors.textColor}
            />
          </View>
          <View style={styles.btnContainer}>
            <Button
              text={Strings.sendResetCode}
              onPress={handleResetCode}
              textStyle={styles.btnText}
              style={styles.btn}
            />
          </View>
          <Text style={styles.backToSignIn} onPress={() => navigation.navigate("Login")}>{Strings.backToText + ' ' + Strings.buttonText.signIn}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.screenBackground
  },
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    paddingTop: Spacings.v40
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacings.xxl,
    alignItems: 'center',
  },

  title: {
    fontFamily: Fonts.bold,
    fontSize: fontSizes.xl,
    color: Colors.textColor,
    paddingTop: Spacings.vsm,
    textAlign: 'center',
  },

  description: {
    fontFamily: Fonts.regular,
    fontSize: fontSizes.sm,
    lineHeight: Spacings.vlg,
    color: Colors.textColor,
    opacity: Numbers.p5,
    textAlign: 'center',
    paddingTop: Spacings.vsm,
  },
  inputSection: {
    width: Spacings.fullWidth,
    marginTop: Spacings.vxxl,
  },
  inputLabel: {
    fontFamily: Fonts.regular,
    fontSize: fontSizes.sm,
    marginBottom: Spacings.vxs,
    paddingLeft: Spacings.vxs
  },
  input: {
    flex: 1,
    height: Spacings.fullWidth,
    fontFamily: Fonts.regular,
    fontSize: fontSizes.md,
    opacity: Numbers.p5,
    borderWidth: Numbers.p2,
    borderRadius: Spacings.mxl,
  },
  btnContainer: {
    width: Spacings.fullWidth,
    paddingTop: Spacings.vmd,
  },
  btnText: {
    fontFamily: Fonts.semiBold
  },
  backToSignIn: {
    fontFamily: Fonts.regular,
    fontSize: fontSizes.sm,
    color: Colors.textColor,
    paddingTop: Spacings.vlg,
  },
});
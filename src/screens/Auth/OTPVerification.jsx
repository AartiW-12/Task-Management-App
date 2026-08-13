import React, {useRef, useState} from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Platform, } from 'react-native';

import {Colors, Fonts, fontSizes, Numbers, Spacings} from '../../constants/style/ConstantStyling';
import {Strings} from '../../constants/strings/Strings';
import Button from '../../constants/button/Button';

import MobileIcon from '../../assets/images/Icons/MobileIcon';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['2', '4', '', '', '', '']);

  const inputRefs = useRef([]);
  const navigation = useNavigation()

  const handleVerifyOTP = () => {
      navigation.navigate("ResetPassword")
  };

  const handleOtpChange = (value, index) => {
    const updatedOtp = [...otp];

    updatedOtp[index] = value.slice(-1);

    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>

            <MobileIcon height={100} width={100} />

            <Text style={styles.title}>
              {Strings.enterOTPText}
            </Text>

            <Text style={styles.description}>
              {Strings.sixDigitCode}
            </Text>

            <Text style={styles.email}>
              {Strings.placeholders.email}
            </Text>

            <View style={styles.otpContainer}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={ref => {
                    inputRefs.current[index] = ref;
                  }}
                  value={value}
                  onChangeText={text =>
                    handleOtpChange(text, index)
                  }
                  onKeyPress={event =>
                    handleKeyPress(event, index)
                  }
                  keyboardType="number-pad"
                  maxLength={1}
                  style={[
                    styles.otpInput,
                    value
                      ? styles.otpInputFilled
                      : styles.otpInputEmpty,
                  ]}
                  textAlign="center"
                />
              ))}
            </View>

            <View style={styles.btnContainer}>
              <Button
                text={Strings.buttonText.verifyOTP}
                onPress={handleVerifyOTP}
                style={styles.btn}
                textStyle={styles.btnTextStyle}
              />
            </View>

            <Text style={styles.didntReceive}>
              {Strings.didntReceiveCode}
            </Text>

            <Text style={styles.resendText}>
              Resend in 0:45
            </Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  );
};

export default OTPVerification;
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
        paddingTop:Spacings.vsm
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: Spacings.xxl,
    },
    title: {
        fontFamily: Fonts.bold,
        fontSize: fontSizes.xl,
        color: Colors.textColor,
        marginTop: Spacings.vmd,
        textAlign: 'center',
    },

    description: {
        fontFamily: Fonts.regular,
        fontSize: fontSizes.sm,
        color:Colors.textColor,
        opacity:Numbers.p5,
        paddingTop:Spacings.vxs,
        textAlign: 'center',
    },

    email: {
        fontFamily: Fonts.semiBold,
        fontSize: fontSizes.sm,
        color: Colors.primary,
        textAlign: 'center',
    },
    otpContainer: {
        width: Spacings.fullWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: Spacings.vtitle,
    },
    otpInput: {
        width: Spacings.arrowSize,
        height: Spacings.v40,
        borderRadius: Spacings.mmd,
        backgroundColor:Colors.white,
        fontFamily: Fonts.semiBold,
        fontSize: fontSizes.lg,
        color: Colors.primary,
    },
    btnContainer : {
        width:Spacings.fullWidth,
        paddingTop:Spacings.vxxl
    },
    otpInputFilled: {
        borderWidth: Numbers.p1,
        borderColor: Colors.primary,
    },

    otpInputEmpty: {
        borderWidth: 1,
        borderColor: Colors.gray,
    },
    didntReceive: {
        fontFamily: Fonts.regular,
        fontSize: fontSizes.sm,
        color:Colors.textColor,
        opacity : Numbers.p5,
        marginTop: Spacings.vxxl,
    },

    resendText: {
        fontFamily: Fonts.semiBold,
        fontSize: fontSizes.sm,
        color: Colors.primary,
        paddingTop: Spacings.vxs,
    },
});
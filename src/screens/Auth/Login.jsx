import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native'
import React, { useState } from 'react'

import TaskFlowIcon from '../../assets/images/Icons/TaskFlowIcon.svg'
import { Strings } from '../../constants/strings/Strings'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Fonts, fontSizes, fontWeights, Numbers, Spacings } from '../../constants/style/ConstantStyling'
import { CommonStyles } from '../../constants/style/CommonStyles'

import Input from '../../constants/input/Input'
import Button from '../../constants/button/Button'

import GoogleIcon from '../../assets/images/Icons/Google.svg'
import LockIcon from '../../assets/images/Icons/LockIcon.svg'
import MailIcon from '../../assets/images/Icons/MailIcon.svg'
import { useNavigation } from '@react-navigation/native'
import { googleSignIn, loginUser } from '../../services/authServices'
import { customSnackbar } from '../../components/snackbar/SnackBar'
import Loader from '../../components/loader/Loader'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading , setLoading] = useState(false)

  const navigation = useNavigation()

  const handleSignIn = async () => {
    try {
      if (!email) {
        customSnackbar(Strings.passwordValidationRules.required.email, 'validation')
        return
      }
      if (!password) {
        customSnackbar(Strings.passwordValidationRules.required.password, 'validation')
        return
      }
      setLoading(true)
      const user = await loginUser(email, password)
      customSnackbar(Strings.successMessages.loginSuccess, 'success')
    } catch (error) {
      console.log("error 1234", error.code)
      if (error.code === 'auth/invalid-email') {
        customSnackbar(Strings.errorMessages.invalidCredentials, 'error')
      }

      if (error.code === 'auth/user-not-found') {
        customSnackbar(Strings.errorMessages.userNotExist, 'error')
      }

      if (error.code === 'auth/wrong-password') {
        customSnackbar(Strings.errorMessages.incorrectPass, 'error')
      }

    }
    finally{
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const user = await googleSignIn()
      customSnackbar(Strings.successMessages.googleLoginSuccess)

    } catch (err) {
      customSnackbar(Strings.errorMessages.googleLoginFailed, 'error')
    }
  }

  const handleGithubSignIn = () => {

  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={CommonStyles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.headerContainer}>
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={[Colors.primary, Colors.gardient]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconBackground}
              >
                <TaskFlowIcon
                  height={"100%"}
                  width={"100%"}
                />
              </LinearGradient>
            </View>
            <Text style={styles.welcomeHeading}>{Strings.welcomeBack}</Text>
            <Text style={styles.text}>{Strings.signInTaskflowText}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{Strings.inputLabel.email}</Text>
            <Input
              placeholder={Strings.placeholders.email}
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              isEMail={true}
              leftIcon={<MailIcon width={15} height={15} />}
            />
            <Text style={styles.inputLabel}>{Strings.inputLabel.password}</Text>
            <Input
              placeholder={Strings.placeholders.password}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry={true}
              leftIcon={<LockIcon width={15} height={15} />}
            />
            <Text style={styles.activeLink} onPress={() => navigation.navigate("ForgotPassword")}>{Strings.forgotPassword}</Text>
            <Button
              text={loading ? <Loader visible={true}/> : Strings.buttonText.signIn}
              onPress={handleSignIn}
              style={styles.btn}
              textStyle={styles.btnTextStyle}
            />
            <View style={styles.separator}>
              <View style={styles.divider1} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.divider} />
            </View>
            <View style={styles.signInOptionButtonContainer}>
              <Button
                text={Strings.buttonText.google}
                onPress={handleGoogleSignIn}
                style={styles.signInOptionButton}
                varient="secondary"
                icon={<GoogleIcon width={20} height={20} color={Colors.danger} />}
                textStyle={styles.signInOptionButtonTextStyle}
              />

              <Button
                text={Strings.buttonText.github}
                onPress={handleGithubSignIn}
                style={styles.signInOptionButton}
                varient="secondary"
                icon={<GoogleIcon width={20} height={20} color={Colors.textColor} />}
                textStyle={styles.signInOptionButtonTextStyle}
              />
            </View>
            <Text style={styles.signInOptionText}>{Strings.doNotHavaAccount} <Text style={styles.activeLink} onPress={() => navigation.navigate("Register")}>{Strings.buttonText.createAccount}</Text></Text>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: Numbers.num120,
    backgroundColor: Colors.screenBackground,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: Spacings.vxxl
  },

  iconContainer: {
    width: Numbers.num90,
    height: Numbers.num90,
  },

  iconBackground: {
    width: Spacings.fullWidth,
    height: Spacings.fullWidth,
    borderRadius: Spacings.mtitle,
    overflow: 'hidden',
  },
  welcomeHeading: {
    fontFamily: Fonts.bold,
    fontWeight: fontWeights.w700,
    fontSize: fontSizes.title,
    paddingTop: Spacings.vmd
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: fontSizes.sm,
    opacity: Numbers.p5,
    paddingTop: Spacings.vxs
  },
  inputContainer: {
    width: Spacings.w85,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  inputLabel: {
    paddingVertical: Spacings.vsm,
    alignSelf: 'flex-start',
    fontFamily: Fonts.regular,
    fontSize: fontSizes.sm,
    paddingTop: Spacings.v
  },
  input: {
    height: Numbers.num50,
    borderWidth: Numbers.p2,
    borderColor: Colors.textColor,
    alignSelf: 'center',
    borderRadius: Spacings.mxl,
    fontFamily:Fonts.regular
  },
  activeLink: {
    alignSelf: 'flex-end',
    paddingVertical: Spacings.vsm,
    color: Colors.primary,
    fontFamily: Fonts.semiBold,
    fontSize: fontSizes.sm
  },
  btn: {
    width: Spacings.fullWidth,
    alignSelf: 'center',
  },
  btnTextStyle: {
    fontFamily: Fonts.regular,
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    width:Spacings.fullWidth,
    marginVertical: Spacings.vmd,
  },

  divider1: {
    flex: 1,
    height: Numbers.p1,
    backgroundColor: Colors.textColor,
    opacity: Numbers.p2,
  },
  divider: {
    flex: 1,
    height: Numbers.p1,
    backgroundColor: Colors.textColor,
    opacity: Numbers.p2,
  },

  orText: {
    marginHorizontal: Spacings.mmd,
    fontFamily: Fonts.regular,
    fontSize: fontSizes.sm,
    color: Colors.textColor,
    opacity: Numbers.p5,
  },

  signInOptionButtonContainer: {
    width: Spacings.fullWidth,
    flexDirection: 'row',
    alignSelf: 'center',
    gap: Spacings.vmd,
  },

  signInOptionButton: {
    width: Spacings.w45,
    borderWidth: Numbers.p2,
    backgroundColor: Colors.white,
    elevation: 0,
  },

  signInOptionText: {
    fontFamily: Fonts.regular,
    fontSize: fontSizes.sm,
    color: Colors.textColor,
    textAlign: 'center',
    marginTop: Spacings.vmd,
    paddingTop: Spacings.vxs
  },
  signInOptionButtonTextStyle: {
    fontFamily: Fonts.semiBold,
    color: Colors.textColor,
  }
});
export default Login
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CommonStyles } from '../../constants/style/CommonStyles'
import { Colors, Fonts, fontSizes, Numbers, Spacings } from '../../constants/style/ConstantStyling'
import { Strings } from '../../constants/strings/Strings'
import Input from '../../constants/input/Input'

import ContactIcon from '../../assets/images/Icons/Contact'
import PhoneIcon from '../../assets/images/Icons/PhoneIcon'
import CompanyIcon from '../../assets/images/Icons/CompanyIcon'
import MailIcon from '../../assets/images/Icons/MailIcon'
import LockIcon from '../../assets/images/Icons/LockIcon'
import Button from '../../constants/button/Button'
import { useNavigation } from '@react-navigation/native'

import { registerUser } from '../../services/authServices'
import { createUserProfile } from '../../services/userServices'

const Register = () => {

  const navigation = useNavigation()

  const [fname, setFname] = useState("")
  const [lName, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [cnfmPass, setCnfmPass] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleSignUp = async () => {
    try {

      if (!fname.trim()) {
        Alert.alert('First name is required')
        return
      }

      if (!lName.trim()) {
        Alert.alert('Last name is required')
        return
      }

      if (!email.trim()) {
        Alert.alert('Email is required')
        return
      }

      if (!phone.trim()) {
        Alert.alert('Phone is required')
        return
      }

      if (!company.trim()) {
        Alert.alert('Company is required')
        return
      }

      if (!pass) {
        Alert.alert('Password is required')
        return
      }

      if (pass !== cnfmPass) {
        Alert.alert('Passwords do not match')
        return
      }

      if (!isTermsAccepted) {
        Alert.alert('Please accept terms and conditions')
        return
      }

      // 1. Create Firebase Authentication user
      const user = await registerUser(
        email.trim(),
        pass
      )

      Alert.alert('AUTH USER CREATED:', user.uid)

      // 2. Create Firestore user profile
      await createUserProfile(user.uid, {
        firstName: fname.trim(),
        lastName: lName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        company: company.trim(),
      })

      Alert.alert('REGISTRATION COMPLETED')

    } catch (error) {

      Alert.alert('SIGN UP ERROR:', error.code)
      Alert.alert('SIGN UP ERROR MESSAGE:', error.message)

    }
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={CommonStyles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.nameContainer}>
            <View style={styles.nameSection}>
              <Text style={styles.inputLabel}>{Strings.inputLabel.firstName}</Text>
              <Input
                placeholder={Strings.placeholders.firstName}
                value={fname}
                onChangeText={setFname}
                leftIcon={<ContactIcon height={15} width={15} />}
                style={styles.inputName}
                placeholderTextColor={Colors.textColor}
              />
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.inputLabel}>{Strings.inputLabel.lastName}</Text>
              <Input
                placeholder={Strings.placeholders.lastName}
                value={lName}
                onChangeText={setLname}
                leftIcon={<ContactIcon height={15} width={15} />}
                style={styles.inputName}
                placeholderTextColor={Colors.textColor}
              />
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.inputLabel}>{Strings.inputLabel.email}</Text>
            <Input
              placeholder={Strings.placeholders.email}
              value={email}
              onChangeText={setEmail}
              leftIcon={<MailIcon height={15} width={15} />}
              style={styles.input}
              placeholderTextColor={Colors.textColor}
            />
            <Text style={styles.inputLabel}>{Strings.inputLabel.phone}</Text>
            <Input
              placeholder={Strings.placeholders.phone}
              value={phone}
              onChangeText={setPhone}
              leftIcon={<PhoneIcon height={15} width={15} />}
              style={styles.input}
              placeholderTextColor={Colors.textColor}
            />
            <Text style={styles.inputLabel}>{Strings.inputLabel.company}</Text>
            <Input
              placeholder={Strings.placeholders.company}
              value={company}
              onChangeText={setCompany}
              leftIcon={<CompanyIcon height={15} width={15} />}
              style={styles.input}
              placeholderTextColor={Colors.textColor}
            />
            <Text style={styles.inputLabel}>{Strings.inputLabel.password}</Text>
            <Input
              placeholder={Strings.placeholders.password}
              value={pass}
              onChangeText={setPass}
              leftIcon={<LockIcon height={15} width={15} />}
              style={styles.input}
              placeholderTextColor={Colors.textColor}
            />
            <Text style={styles.inputLabel}>{Strings.inputLabel.cnfmPassword}</Text>
            <Input
              placeholder={Strings.placeholders.password}
              value={cnfmPass}
              onChangeText={setCnfmPass}
              leftIcon={<LockIcon height={15} width={15} />}
              style={styles.input}
              placeholderTextColor={Colors.textColor}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                isTermsAccepted && styles.checkboxChecked,
              ]}
              activeOpacity={0.8}
              onPress={() => setIsTermsAccepted(prev => !prev)}
            >
              {isTermsAccepted && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.checkboxText}>{Strings.termsConditionsText} <Text style={styles.activeLink}>{Strings.terms}</Text> <Text style={styles.checkboxText}>{' ' + Strings.andtext + " "}</Text><Text style={styles.activeLink}>{Strings.privacyPolicy}</Text></Text>
          </View>
          <Button
            text={Strings.buttonText.createAccount}
            onPress={handleSignUp}
            textStyle={styles.btnTextStyle}
            style={styles.btn}
          />
          <Text style={styles.signInOptionText}>{Strings.alreadyHaveAccount}<Text style={styles.activeLink} onPress={() => navigation.navigate('Login')}>{Strings.buttonText.signIn}</Text></Text>
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
    // backgroundColor:"red",

  },
  nameContainer: {
    width: Spacings.w85,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  nameSection: {
    width: Spacings.w48,
  },
  infoContainer: {
    width: Spacings.w85,
    justifyContent: 'center',
  },
  inputLabel: {
    paddingVertical: Spacings.vsm,
    alignSelf: 'flex-start',
    marginLeft: Spacings.w10,
    fontFamily: Fonts.regular,
    fontSize: fontSizes.sm,
    paddingTop: Spacings.v
  },
  inputName: {
    borderWidth: Numbers.p2,
    borderColor: Colors.textColor,
    opacity: Numbers.p5,
    borderRadius: Spacings.mxl,
  },
  input: {
    borderWidth: Numbers.p2,
    borderColor: Colors.textColor,
    opacity: Numbers.p5,
    alignSelf: 'center',
    borderRadius: Spacings.mxl,
    marginLeft: Spacings.w15,
  },
  activeLink: {
    alignSelf: 'flex-end',
    paddingVertical: Spacings.vsm,
    color: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: fontSizes.sm
  },
  signInOptionText: {
    fontFamily: Fonts.regular,
    fontSize: fontSizes.sm,
    color: Colors.textColor,
    textAlign: 'center',
    marginTop: Spacings.vmd,
    paddingTop: Spacings.vxs
  },
  btn: {
    width: Spacings.w90,
    alignSelf: 'center',
  },
  checkboxContainer: {
    width: Spacings.w90,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacings.vmd,
    backgroundColor: Colors.inputBackground,
    borderRadius: Spacings.mxxl,
    marginBottom: Spacings.vsm
  },

  checkbox: {
    width: Spacings.md,
    height: Spacings.md,
    borderWidth: Numbers.p2,
    borderColor: Colors.textColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacings.mxxs
  },

  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },

  checkmark: {
    color: Colors.white,
    fontSize: fontSizes.sm,
    fontFamily: Fonts.medium,
    lineHeight: Numbers.num7,
  },

  checkboxText: {
    marginLeft: Spacings.xs,
    fontFamily: Fonts.regular,
    fontSize: fontSizes.sm,
    color: Colors.textColor,
    paddingVertical: Spacings.vsm
  },
})
export default Register
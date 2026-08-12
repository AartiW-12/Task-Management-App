import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
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

const Register = () => {

  const [fname, setFname] = useState("")
  const [lName, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [cnfmPass, setCnfmPass] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")

  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.inputLabel}>{Strings.inputLabel.firstName}</Text>
            <Input
              placeholder={Strings.placeholders.firstName}
              value={fname}
              onChangeText={setFname}
              leftIcon={<ContactIcon height={15} width={15} />}
              style={styles.input}
              placeholderTextColor={Colors.textColor}
            />
            <Text style={styles.inputLabel}>{Strings.inputLabel.lastName}</Text>
            <Input
              placeholder={Strings.placeholders.lastName}
              value={lName}
              onChangeText={setLname}
              leftIcon={<ContactIcon height={15} width={15} />}
              style={styles.input}
              placeholderTextColor={Colors.textColor}
            />
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
          <Text>{Strings.alreadyHaveAccount}<Text style={styles.activeLink}>{Strings.buttonText.signIn}</Text></Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    paddingTop: Spacings.vmd
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: Numbers.num120,
    backgroundColor: Colors.screenBackground,
  },
  nameContainer : {
    flexDirection:'row',
  },
  inputLabel: {
    paddingVertical: Spacings.vsm,
    alignSelf: 'flex-start',
    marginLeft: Spacings.w10,
    fontFamily: Fonts.regular,
    fontSize: fontSizes.sm,
    paddingTop: Spacings.v
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
})
export default Register
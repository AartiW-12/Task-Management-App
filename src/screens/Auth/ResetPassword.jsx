import {
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Platform
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { CommonStyles } from '../../constants/style/CommonStyles'
import { Strings } from '../../constants/strings/Strings'
import Input from '../../constants/input/Input'

import Security from '../../assets/images/Icons/Security'
import LockIcon from '../../assets/images/Icons/LockIcon'
import Button from '../../constants/button/Button'

import { Colors, Fonts, fontSizes, Numbers, Spacings } from '../../constants/style/ConstantStyling'

const ResetPassword = () => {

    const [password, setPassword] = useState("")
    const [cnfmPass, setCnfmPass] = useState("")

    const hasMinLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password)

    return (
        <View style={CommonStyles.safeArea} >
            <KeyboardAvoidingView
                style={CommonStyles.parentContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.content}>

                        <Security height={100} width={100} />

                        <Text style={styles.title}>
                            {Strings.createNewPassword}
                        </Text>

                        <Text style={styles.description}>
                            {Strings.resetPasswordCondition}
                        </Text>

                        <Text style={styles.inputLable}>
                            {Strings.newPassword}
                        </Text>

                        <Input
                            placeholder={Strings.placeholders.password}
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            leftIcon={<LockIcon height={15} width={15} />}
                            placeholderTextColor={Colors.textColor}
                            secureTextEntry
                        />

                        <Text style={styles.inputLable}>
                            {Strings.inputLabel.cnfmPassword}
                        </Text>

                        <Input
                            placeholder={Strings.placeholders.password}
                            value={cnfmPass}
                            onChangeText={setCnfmPass}
                            style={styles.input}
                            leftIcon={<LockIcon height={15} width={15} />}
                            placeholderTextColor={Colors.textColor}
                            secureTextEntry
                        />

                        <View style={styles.passwordConditions}>
                            <View style={styles.conditionRow}>
                                <View
                                    style={[
                                        styles.conditionIcon,
                                        hasMinLength && styles.conditionIconSuccess
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.conditionIconText,
                                            hasMinLength && styles.conditionIconTextSuccess
                                        ]}
                                    >
                                        ✓
                                    </Text>
                                </View>

                                <Text
                                    style={[
                                        styles.conditionText,
                                        hasMinLength && styles.conditionTextSuccess
                                    ]}
                                >
                                    {Strings.passwordConditions.lengthValidation}
                                </Text>
                            </View>

                            <View style={styles.conditionRow}>
                                <View
                                    style={[
                                        styles.conditionIcon,
                                        hasUppercase && styles.conditionIconSuccess
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.conditionIconText,
                                            hasUppercase && styles.conditionIconTextSuccess
                                        ]}
                                    >
                                        ✓
                                    </Text>
                                </View>

                                <Text
                                    style={[
                                        styles.conditionText,
                                        hasUppercase && styles.conditionTextSuccess
                                    ]}
                                >
                                    {Strings.passwordConditions.uppercaseCondition}
                                </Text>
                            </View>
                            <View style={styles.conditionRow}>
                                <View
                                    style={[
                                        styles.conditionIcon,
                                        hasNumberOrSymbol && styles.conditionIconSuccess
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.conditionIconText,
                                            hasNumberOrSymbol && styles.conditionIconTextSuccess
                                        ]}
                                    >
                                        ✓
                                    </Text>
                                </View>

                                <Text
                                    style={[
                                        styles.conditionText,
                                        hasNumberOrSymbol && styles.conditionTextSuccess
                                    ]}
                                >
                                    {Strings.passwordConditions.oneNumberOrSymbol}
                                </Text>
                            </View>

                        </View>

                        <View style={styles.btnContainer}>
                            <Button
                                text={Strings.resetPassword}
                                style={styles.btn}
                                textStyle={styles.btnTextStyle}
                            />
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: Numbers.num120,
        backgroundColor: Colors.screenBackground,
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
        color: Colors.textColor,
        opacity: Numbers.p5,
        paddingTop: Spacings.vxs,
        textAlign: 'center',
        paddingBottom: Spacings.vsm
    },

    inputLable: {
        paddingVertical: Spacings.vsm,
        alignSelf: 'flex-start',
        marginLeft: Spacings.xs,
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
    },

    passwordConditions: {
        width: Spacings.fullWidth,
        backgroundColor: Colors.inputBackground,
        borderRadius: Spacings.mmd,
        paddingVertical: Spacings.vsm,
        paddingHorizontal: Spacings.mmd,
        marginTop: Spacings.vmd,
    },

    conditionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacings.vxs,
    },

    conditionIcon: {
        width: Numbers.num16,
        height: Numbers.num16,
        borderRadius: Spacings.mxs,
        borderWidth: Numbers.p1,
        borderColor: Colors.gray,
        alignItems: 'center',
        justifyContent: 'center',
    },

    conditionIconSuccess: {
        borderColor: Colors.sucess,
        backgroundColor: Colors.sucess,
    },

    conditionIconText: {
        fontSize: fontSizes.xs,
        color: Colors.darkGray,
        fontFamily: Fonts.bold,
    },

    conditionIconTextSuccess: {
        color: Colors.white,
    },

    conditionText: {
        marginLeft: Spacings.sm,
        fontFamily: Fonts.regular,
        fontSize: fontSizes.sm,
        color: Colors.darkGray,
    },

    conditionTextSuccess: {
        color: Colors.sucess,
    },

    btnContainer: {
        width: Spacings.fullWidth,
        paddingTop: Spacings.vxxl,
        marginBottom: Numbers.num120
    }
})

export default ResetPassword
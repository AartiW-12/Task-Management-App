import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../screens/Auth/Login'
import OnboardingScreen from '../screens/onboarding/OnboardingScreen'
import Register from '../screens/Auth/Register'
import ForgotPassword from '../screens/Auth/ForgotPassword'
import { Colors, Fonts, fontSizes } from '../constants/style/ConstantStyling'
import OTPVerification from '../screens/Auth/OTPVerification'
import ResetPassword from '../screens/Auth/ResetPassword'

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {

    const optionValues = {
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontFamily: Fonts.semiBold,
            fontSize: fontSizes.lg,
        },
        headerStyle: {
            backgroundColor: Colors.screenBackground
        },
        headerShadowVisible:false
    }
    return (
        <Stack.Navigator
        // screenOptions={{headerShown:false , headerBackVisible:false}}
        >
            <Stack.Screen
                name="OnBoardingScreen"
                component={OnboardingScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Register'
                component={Register}
                options={{
                    ...optionValues,
                    headerTitle: 'Create Account'
                    // headerShown:false
                }}
            />
            <Stack.Screen
                name='ForgotPassword'
                component={ForgotPassword}
                options={{
                    ...optionValues,
                    headerTitle: 'Forgot Password'
                }}
            />
            <Stack.Screen
                name='OTPVerification'
                component={OTPVerification}
                options={{
                    ...optionValues,
                    headerTitle: 'Verification'
                }}
            />
            <Stack.Screen
                name='ResetPassword'
                component={ResetPassword}
                options={{
                    ...optionValues,
                    headerTitle: "New Password",
                    headerShadowVisible:false,
                    // headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator
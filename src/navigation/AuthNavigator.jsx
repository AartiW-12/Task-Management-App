import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Login from '../screens/Auth/Login'
import OnboardingScreen from '../screens/onboarding/OnboardingScreen'
import Register from '../screens/Auth/Register'

const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
    console.log("AUTH")
    return (
        <Stack.Navigator
            // screenOptions={{headerShown:false , headerBackVisible:false}}
        >
            <Stack.Screen 
                name="OnBoardingScreen"
                component={OnboardingScreen}
            />
            <Stack.Screen 
                name='Login'
                component={Login}
            />
            <Stack.Screen 
                name='Register'
                component={Register}
            />
        </Stack.Navigator>
    )   
}

export default AuthNavigator
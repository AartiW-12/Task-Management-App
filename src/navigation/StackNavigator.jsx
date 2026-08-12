import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnboardingScreen from '../screens/onboarding/OnboardingScreen'
import Register from '../screens/Auth/Register'
import Home from '../screens/home/Home'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Home'
                component={Home}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator
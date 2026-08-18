import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnboardingScreen from '../screens/onboarding/OnboardingScreen'
import Register from '../screens/Auth/Register'
import Dashboard from '../screens/dashboard/Dashboard'
import BottomTabNavigator from './BottomTabNavigator'
import ProjectDetails from '../screens/projects/ProjectDetails'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    return (
        <Stack.Navigator
        screenOptions={{ headerShown : false}}
        >
            <Stack.Screen 
                name='BottomTabNavigator'
                component={BottomTabNavigator}
            />
            <Stack.Screen 
                name='ProjectDetails'
                component={ProjectDetails}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator
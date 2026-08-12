import { View, Text } from 'react-native'
import React from 'react'
import AuthNavigator from './AuthNavigator'
import StackNavigator from './StackNavigator'


const AppNavigator = () => {
    const isLoggedIn = false
    return (
        <>
            {isLoggedIn ? <StackNavigator /> : <AuthNavigator />}
        </>
    )
}

export default AppNavigator
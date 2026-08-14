import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthNavigator from './AuthNavigator'
import StackNavigator from './StackNavigator'
import SplashScreen from '../screens/splash screen/SplashScreen'


const AppNavigator = () => {
    const [display , setDisplay ] = useState(true)
    const isLoggedIn = false
    useEffect(() => {
        setTimeout(() => {
            setDisplay(false)
        }, 2000);
    },[])
    if(display){
        return <SplashScreen />
    }
    return (
        <>
            {isLoggedIn ? <StackNavigator /> : <AuthNavigator />}
        </>
    )
}

export default AppNavigator
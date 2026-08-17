import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthNavigator from './AuthNavigator'
import StackNavigator from './StackNavigator'
import SplashScreen from '../screens/splash screen/SplashScreen'
import { onAuthStateChanged } from '@react-native-firebase/auth'
import { auth } from '../firebase/firebaseConfig'


const AppNavigator = () => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    const isLoggedIn = false
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("AUTH : ", currentUser)
            setUser(currentUser)
            setAuthLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    if (authLoading) {
        return <SplashScreen />
    }
    return (
        <>
            {user ? <StackNavigator /> : <AuthNavigator />}
        </>
    )
}

export default AppNavigator
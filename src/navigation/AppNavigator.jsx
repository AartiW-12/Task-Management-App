import React, { useEffect, useState } from 'react'
import AuthNavigator from './AuthNavigator'
import StackNavigator from './StackNavigator'
import SplashScreen from '../screens/splash screen/SplashScreen'
import { onAuthStateChanged } from '@react-native-firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { View } from 'react-native'


const AppNavigator = () => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);

        setTimeout(() => {
            setAuthLoading(false);
        }, 2000);
    });

    return () => {
        unsubscribe();
    };
}, []);
    console.log(authLoading)
    if (authLoading) {
        return <View style={{flex : 1}}> 
            <SplashScreen />
        </View>
    }
    return (
        <>
            {user ? <StackNavigator /> : <AuthNavigator />}
        </>
    )
}

export default AppNavigator
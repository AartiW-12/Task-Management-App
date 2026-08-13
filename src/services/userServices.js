import {
    doc,
    setDoc,
    serverTimestamp,
} from '@react-native-firebase/firestore'

import { db } from '../firebase/firebaseConfig'

export const createUserProfile = async (uid, userData) => {
    try {
        await setDoc(doc(db, 'users', uid), {
            ...userData,
            createdAt: serverTimestamp(),
        })

        console.log('USER PROFILE CREATED:', uid)

    } catch (error) {
        console.log('CREATE USER PROFILE ERROR:', error.code)
        throw error
    }
}
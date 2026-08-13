import {
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth'

import { auth } from '../firebase/firebaseConfig'


export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    return userCredential.user

  } catch (error) {
    console.log('REGISTER ERROR:', error.code)

    throw error
  }
}
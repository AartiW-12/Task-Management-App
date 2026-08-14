import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth'

import { auth } from '../firebase/firebaseConfig'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

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

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    return userCredential.user
  }
  catch (err) {
    console.log("Login Error", err.code)
    throw err
  }
}

export const googleSignIn = async () => {
  try {

    //open google account selection
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true
    })

    const response = await GoogleSignin.signIn()

    console.log('GOOGLE RESPONSE:', response)

    const idToken = response.data?.idToken

    console.log('GOOGLE ID TOKEN EXISTS:', !!idToken)

    if (!idToken) {
      throw new Error("GOOGLE SIGN IN FAILED : NO TOEKN FOUND ")
    }

    const googleCredentials = GoogleAuthProvider.credential(idToken)

    const userCredential = signInWithCredential(
      auth,
      googleCredentials
    )

    return (await userCredential).user
  } catch (err) {
    console.log('GOOGLE LOGIN ERROR:', err.code || err.message)
    throw err
  }
}

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return true
  } catch (error) {
    // Only unexpected errors land here now (e.g. auth/invalid-email,
    // network issues) — auth/user-not-found will never fire due to
    // email enumeration protection.
    console.log('RESET PASSWORD ERROR:', error.code)
    throw error
  }
}
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth'

import { auth , db} from '../firebase/firebaseConfig'
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

        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
        })

        const response = await GoogleSignin.signIn()

        const idToken = response.data?.idToken

        if (!idToken) {
            throw new Error('GOOGLE SIGN IN FAILED: NO TOKEN FOUND')
        }
        const googleCredentials =
            GoogleAuthProvider.credential(idToken)

        const userCredential =
            await signInWithCredential(
                auth,
                googleCredentials
            )

        const user = userCredential.user

        console.log("GOOGLE USER:", user)
        console.log("NAME:", user.displayName)
        console.log("EMAIL:", user.email)

        // Split Google display name
        const nameParts = user.displayName?.trim().split(" ") || []

        const firstName = nameParts[0] || ""
        const lastName = nameParts.slice(1).join(" ") || ""

        // Save Google user in Firestore
        await db
            .collection("users")
            .doc(user.uid)
            .set({
                uid: user.uid,
                firstName: firstName,
                lastName: lastName,
                email: user.email || "",
                photoURL: user.photoURL || "",
                provider: "google",
            }, {
                merge: true
            })

        console.log("GOOGLE USER SAVED TO FIRESTORE")

        return user

    } catch (err) {
        console.log("GOOGLE LOGIN ERROR:",err.code || err.message)
        throw err
    }
}

export const resetPassword = async (email) => {
  try {
    const cleanEmail = email.trim().toLowerCase()

    console.log('Checking email:', cleanEmail)

    const usersQuery = await db
      .collection('users')
      .where('email', '==', cleanEmail)
      .get()

    console.log('Users found:', usersQuery.size)

    if (usersQuery.empty) {
      const error = new Error('USER_NOT_FOUND')
      error.code = 'auth/user-not-found'
      throw error
    }

    // User exists → send password reset email
    await sendPasswordResetEmail(auth, cleanEmail)

    console.log('Password reset email sent')

    return true

  } catch (error) {
    console.log(
      'RESET PASSWORD ERROR:',
      error.code || error.message
    )

    throw error
  }
}

export const logoutUser = async () => {
  try {
    await signOut(auth)

    console.log('User logged out successfully')

    return true
  } catch (error) {
    console.log('LOGOUT ERROR:', error.code || error.message)
    throw error
  }
}
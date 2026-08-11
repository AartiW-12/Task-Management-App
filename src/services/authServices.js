import { createUserWithEmailAndPassword, getAuth } from '@react-native-firebase/auth'
import { doc, getFirestore, setDoc } from '@react-native-firebase/firestore'

export const registerUser = async(registerUserData) => {
    try{
        const auth = getAuth()
        const userCredentials = createUserWithEmailAndPassword(
            auth,
            registerUserData.email,
            registerUserData.password
        )

        console.log("USER CREATED", (await userCredentials).user.uid)
        const user = (await userCredentials).user

        const db = getFirestore()
        await setDoc(doc(db, 'users', user.uid), {
            firstName:'John',
            lastName : 'Doe',
            email:user.email,
            role:'user',
            department :'Development',
            phone:'9876543212'
        })

        console.log("Profile Created in firestore")
        return user
    }
    catch(err){
        console.log("REGISTRATION ERROR", err.message);
        
    }
}
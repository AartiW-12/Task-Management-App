import { getAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const auth = getAuth();
export const db = getFirestore()

GoogleSignin.configure({
    webClientId: '1073349498426-hf0g72au8n3c335h8tj7ti9kv6hbujde.apps.googleusercontent.com'
})
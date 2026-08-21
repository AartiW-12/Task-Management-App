import { getAnalytics } from "@react-native-firebase/analytics";
import { getAuth } from "@react-native-firebase/auth";
import { getFirestore } from "@react-native-firebase/firestore";

export const auth = getAuth();
export const db = getFirestore()
export const analytics = getAnalytics();

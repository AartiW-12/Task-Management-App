import {getApps} from '@react-native-firebase/app';

export const testFirebase = () => {
  try {
    const apps = getApps();

    console.log('Firebase apps:', apps);

    if (apps.length > 0) {
      console.log('✅ Firebase is initialized');
      console.log('Firebase app name:', apps[0].name);
      console.log('Firebase project ID:', apps[0].options.projectId);
    } else {
      console.log('❌ Firebase is NOT initialized');
    }
  } catch (error) {
    console.log('❌ Firebase test failed:', error);
  }
};
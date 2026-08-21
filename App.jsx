
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator'
import SplashScreen from './src/screens/splash screen/SplashScreen'
import { CommonStyles } from './src/constants/style/CommonStyles';
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Snackbar } from './src/components/snackbar/SnackBar';

function App() {

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:process.env.WEB_CLIENT_ID
    })
  },[])
  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <AppNavigator />
          <Snackbar />
      </NavigationContainer>
      
    </SafeAreaProvider>
  );
}

export default App;

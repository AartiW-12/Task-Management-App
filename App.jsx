
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator'
import SplashScreen from './src/screens/splash screen/SplashScreen'

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <OnboardingScreen /> */}
        {/* <SplashScreen /> */}
        <AppNavigator />
      </NavigationContainer>
      
    </SafeAreaProvider>
  );
}

export default App;

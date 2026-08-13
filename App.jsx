
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator'
import SplashScreen from './src/screens/splash screen/SplashScreen'
import { CommonStyles } from './src/constants/style/CommonStyles';

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <SafeAreaView style={CommonStyles.flex1}> */}
          <AppNavigator />
        {/* </SafeAreaView> */}
      </NavigationContainer>
      
    </SafeAreaProvider>
  );
}

export default App;

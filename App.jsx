
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingScreen from './src/screens/onboarding/Onboarding';
import { NavigationContainer } from '@react-navigation/native';

function App() {
  return (
    <SafeAreaProvider style={{flex:1}}>
      <NavigationContainer>
        <OnboardingScreen />
      </NavigationContainer>
      
    </SafeAreaProvider>
  );
}

export default App;

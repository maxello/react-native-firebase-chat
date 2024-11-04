import { useFonts } from 'expo-font';
import { Slot, useSegments, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthContextProvider, useAuth } from '@/context/authContext';
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // check if user authentetic or not
    if (typeof isAuthenticated == 'undefined') return;
     
    const inApp = segments[0] == '(app)';
    
    if (isAuthenticated && !inApp) {
      router.replace('home');
    } else if (isAuthenticated == false) {
      router.replace('signIn');
    }
  }, [isAuthenticated]);

  return (
    <Slot />
  )
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}

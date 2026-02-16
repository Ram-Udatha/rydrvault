import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useAuthStore from '../store/authStore';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['http://localhost:3000', 'https://glowing-space-winner-rp5pp7qx996c467-3000.app.github.dev'],
  config: {
    screens: {
      Login: 'login',
      OTP: 'otp',
      Home: 'home',
    },
  },
};

const RootNavigator = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer linking={linking} fallback={<></>}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          cardStyle: { backgroundColor: '#000000' },
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                animationTypeForReplace: 'pop',
              }}
            />
            <Stack.Screen
              name="OTP"
              component={OTPScreen}
              options={{
                animationTypeForReplace: 'slide_from_right',
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              animationTypeForReplace: 'fade',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

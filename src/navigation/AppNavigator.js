import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import HealthConcernsScreen from '../screens/HealthConcernsScreen';
import DietScreen from '../screens/DietScreen';
import LifestyleScreen from '../screens/LifestyleScreen';
import AllergiesScreen from '../screens/AllergiesScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="HealthConcerns" component={HealthConcernsScreen} />
        <Stack.Screen name="Diet" component={DietScreen} />
        <Stack.Screen name="Lifestyle" component={LifestyleScreen} />
        <Stack.Screen name="Allergies" component={AllergiesScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
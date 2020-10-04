import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './home';
import Geolocation from '@react-native-community/geolocation';

const Stack = createStackNavigator();

const Routes = () => {
  React.useEffect(() => {
    Geolocation.getCurrentPosition((info) => console.log(info));
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
